import { toast } from "sonner";
import { useFlow } from "@/providers/flow-provider";
import { Button } from "./ui/button";

export function Header() {
  const { validateFlow, nodes } = useFlow();

  const handleSave = () => {
    const validation = validateFlow();

    if (validation.isValid) {
      toast.success("Flow saved successfully!");
    } else {
      toast.error(validation.error);
    }
  };

  return (
    <div className="col-span-full flex w-full items-center justify-between border-b p-4">
      <div className="font-semibold text-2xl">bitespeed</div>
      <Button onClick={handleSave} disabled={nodes.length === 0}>
        Save Changes
      </Button>
    </div>
  );
}
