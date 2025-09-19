import { Toaster } from "sonner";
import { FlowArea } from "./components/flow-area";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { FlowProvider } from "./providers/flow-provider";

function App() {
  return (
    <FlowProvider>
      <div className="grid h-screen grid-cols-[1fr_260px] grid-rows-[auto_1fr]">
        <Header />
        <FlowArea />
        <Sidebar />
      </div>
      <Toaster />
    </FlowProvider>
  );
}

export default App;
