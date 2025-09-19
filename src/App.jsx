import { ReactFlowProvider } from "@xyflow/react";
import { Toaster } from "sonner";
import { FlowArea } from "./components/flow-area";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { FlowProvider } from "./providers/flow-provider";

function App() {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <div className="grid h-screen grid-cols-[1fr_260px] grid-rows-[auto_1fr]">
          <Header />
          <FlowArea />
          <Sidebar />
        </div>
        <Toaster />
      </FlowProvider>
    </ReactFlowProvider>
  );
}

export default App;
