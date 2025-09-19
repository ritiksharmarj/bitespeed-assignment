import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlow } from "@/providers/flow-provider";
import { MessageNode } from "./nodes/message";

const nodeTypes = {
  message: MessageNode,
};

export function FlowArea() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    onDrop,
    onDragOver,
  } = useFlow();

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineType="smoothstep"
        zoomOnScroll={false}
        panActivationKeyCode="Space"
        panOnScroll={true}
        panOnDrag={false}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
