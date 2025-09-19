import { ArrowLeftIcon } from "lucide-react";
import * as React from "react";
import { useFlow } from "@/providers/flow-provider";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function SettingsPanel() {
  const { selectedNode, updateNodeData, setSelectedNode } = useFlow();
  const [messageText, setMessageText] = React.useState("");

  // Update local state when selected node changes
  React.useEffect(() => {
    if (selectedNode) {
      setMessageText(selectedNode.data.value || "");
    }
  }, [selectedNode]);

  const handleTextChange = (event) => {
    const newValue = event.target.value;
    setMessageText(newValue);

    // Update node data in real-time
    if (selectedNode) {
      updateNodeData(selectedNode.id, { value: newValue });
    }
  };

  const handleBack = () => {
    setSelectedNode(null);
  };

  if (!selectedNode) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="size-8"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <h3 className="font-medium">Message Settings</h3>
      </div>

      {/* Settings Form */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="message-text" className="font-medium text-sm">
            Message Text
          </Label>
          <Textarea
            id="message-text"
            value={messageText}
            onChange={handleTextChange}
            placeholder="Enter your message..."
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
