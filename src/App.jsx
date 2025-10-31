import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "@utils/constants/routes";
import MainPage from "./pages/MainPage";
import SearchingPage from "./pages/SearchingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.home} element={<MainPage />} />
          <Route path={routes.search} element={<SearchingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
