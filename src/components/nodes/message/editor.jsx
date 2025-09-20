import * as React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFlow } from "@/providers/flow-provider";

export function MessageEditor({ node }) {
  const { updateNodeData } = useFlow();
  const [messageText, setMessageText] = React.useState("");

  // Update local state when node changes
  React.useEffect(() => {
    if (node) {
      setMessageText(node.data.value || "");
    }
  }, [node]);

  const handleTextChange = (event) => {
    const newValue = event.target.value;
    setMessageText(newValue);

    // Update node data in real-time
    if (node) {
      updateNodeData(node.id, { value: newValue });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="message-text">Text</Label>
      <Textarea
        id="message-text"
        value={messageText}
        onChange={handleTextChange}
        placeholder="Enter your message..."
      />
    </div>
  );
}
