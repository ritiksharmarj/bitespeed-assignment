import { NodesList } from "./nodes-list";

export function Sidebar() {
  return (
    <div className="border-l bg-sidebar p-4">
      <NodesList />
    </div>
  );
}
