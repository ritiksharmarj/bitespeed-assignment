import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import * as React from "react";

const FlowContext = React.createContext({});

const initialNodes = [];
const initialEdges = [];

function createNode(type, position) {
  const id = `${type}-${Date.now()}`;

  switch (type) {
    case "message":
      return {
        id,
        type,
        position,
        data: {
          value: "Hello BiteSpeed 👋",
        },
      };

    default:
      return null;
  }
}

export function FlowProvider({ children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  // Initialize ReactFlow instance
  const onInit = React.useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  // Handle new connections between nodes
  const onConnect = React.useCallback(
    (params) => {
      // Check if source handle already has a connection (only one edge per source)
      const sourceHasConnection = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle,
      );

      if (!sourceHasConnection) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, setEdges],
  );

  // Handle node selection
  const onNodeClick = React.useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  // Handle clicking on the background to deselect
  const onPaneClick = React.useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle drop from nodes panel
  const onDrop = React.useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Use ReactFlow instance to get correct position
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode(type, position);
      if (!newNode) return;

      setNodes((nodes) => nodes.concat(newNode));
    },
    [setNodes, reactFlowInstance],
  );

  const onDragOver = React.useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Update node data when editing
  const updateNodeData = React.useCallback(
    (nodeId, newData) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node,
        ),
      );
    },
    [setNodes],
  );

  // Validate flow for save changes
  const validateFlow = React.useCallback(() => {
    if (nodes.length <= 1) return { isValid: true };

    // Find nodes without incoming connections (empty target handles)
    const nodesWithoutIncoming = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    // If more than one node has no incoming connections, it's invalid
    if (nodesWithoutIncoming.length > 1) {
      return {
        isValid: false,
        error: "Cannot save flow",
      };
    }

    return { isValid: true };
  }, [nodes, edges]);

  return (
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        setSelectedNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onNodeClick,
        onPaneClick,
        onDrop,
        onDragOver,
        updateNodeData,
        validateFlow,
        onInit,
        reactFlowInstance,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = React.useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
}
