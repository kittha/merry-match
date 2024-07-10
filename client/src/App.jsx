import Sidebar from "./components/packagelist/Sidebar";
import Topbar from "./components/packagelist/Topbar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Topbar />
    </div>
  );
}

export default App;
