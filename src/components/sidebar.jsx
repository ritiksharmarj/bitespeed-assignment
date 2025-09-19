import { useFlow } from "@/providers/flow-provider";
import { NodesList } from "./nodes-list";
import { SettingsPanel } from "./settings-panel";

export function Sidebar() {
  const { selectedNode } = useFlow();

  return (
    <div className="border-l bg-sidebar p-4">
      {selectedNode ? <SettingsPanel /> : <NodesList />}
    </div>
  );
}
