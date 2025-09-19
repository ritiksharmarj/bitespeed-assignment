import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="col-span-full flex w-full items-center justify-end border-b p-4">
      <Button>Save Changes</Button>
    </div>
  );
}
