import { toast } from "sonner";
import { useFlow } from "@/providers/flow-provider";
import { Button } from "./ui/button";

export function Header() {
  const { validateFlow } = useFlow();

  const handleSave = () => {
    const validation = validateFlow();

    if (validation.isValid) {
      toast.success("Flow saved successfully!");
    } else {
      toast.error(validation.error);
    }
  };

  return (
    <div className="col-span-full flex w-full items-center justify-end border-b p-4">
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
}
