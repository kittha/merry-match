import PackageListPage from "./pages/admin/PackageListPage";
import PackageAddPage from "./pages/admin/PackageAddPage";
import PackageEditAndViewPage from "./pages/admin/PackageEditAndViewPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PackageListPage />} />
        <Route path="/admin/add" element={<PackageAddPage />} />
        <Route
          path="/admin/viewandedit/:packageId"
          element={<PackageEditAndViewPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
