import { FlowArea } from "./components/flow-area";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <div className="grid h-screen grid-cols-[1fr_260px] grid-rows-[auto_1fr]">
      <Header />
      <FlowArea />
      <Sidebar />
    </div>
  );
}

export default App;
