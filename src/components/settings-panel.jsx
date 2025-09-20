import { ArrowLeftIcon } from "lucide-react";
import { useFlow } from "@/providers/flow-provider";
import { MessageEditor } from "./nodes/message/editor";
import { Button } from "./ui/button";

const nodeEditors = {
  message: {
    title: "Message",
    component: MessageEditor,
  },
};

export function SettingsPanel() {
  const { selectedNode, setSelectedNode } = useFlow();

  const handleBack = () => {
    setSelectedNode(null);
  };

  if (!selectedNode) return null;

  const { component: EditorComponent, title } = nodeEditors[selectedNode.type];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeftIcon /> {title}
        </Button>
      </div>

      <EditorComponent node={selectedNode} />
    </div>
  );
}
