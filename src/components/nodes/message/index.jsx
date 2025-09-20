import { Handle, Position } from "@xyflow/react";
import { MessageCircleMoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MessageNode(props) {
  const { selected, id: nodeId, data } = props;

  return (
    <div
      className={cn(
        "flex min-w-52 flex-col rounded-xl border bg-card text-card-foreground transition-shadow",
        !selected && "hover:shadow-md",
        selected && "border-ring ring-[3px] ring-ring/50",
      )}
    >
      <div className="rounded-t-xl bg-secondary p-2">
        <div className="pointer-events-none flex items-center gap-2 font-medium text-sm leading-none">
          <MessageCircleMoreIcon className="size-4" />
          Send Message
        </div>
      </div>

      <div className="p-2 text-sm">{data.value || "Hello BiteSpeed 👋"}</div>

      <Handle
        id={`target_${nodeId}`}
        type="target"
        position={Position.Left}
        className="size-2.5! border-2! bg-primary!"
      />

      <Handle
        id={`source_${nodeId}`}
        type="source"
        position={Position.Right}
        className="size-2.5! border-2! bg-primary!"
      />
    </div>
  );
}
