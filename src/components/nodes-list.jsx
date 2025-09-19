import { MessageCircleMoreIcon } from "lucide-react";
import { Button } from "./ui/button";

const draggableNodeList = [
  {
    type: "message",
    title: "Message",
    icon: <MessageCircleMoreIcon />,
  },
];

export function NodesList() {
  const handleOnDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      {draggableNodeList.map((node) => (
        <Button
          key={node.type}
          variant="outline"
          className="flex w-full cursor-grab justify-start"
          draggable
          onDragStart={(event) => handleOnDragStart(event, node.type)}
        >
          {node.icon}
          {node.title}
        </Button>
      ))}
    </div>
  );
}
