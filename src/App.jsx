import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "@utils/constants/routes";
import MainPage from "./pages/MainPage";
import SearchingPage from "./pages/SearchingPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import RelatedSearchPage from "@/pages/RelatedSearchPage";
import CommonPage from "@/pages/CommonPage";
import NoResultPage from "@/pages/NoResultPage"; // 추가

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.home} element={<MainPage />} />
          <Route path={routes.search} element={<SearchingPage />} />
          <Route path={routes.test} element={<TestPage />} />
          <Route path={routes.result} element={<ResultPage />} />
          <Route path={routes.resultex} element={<RelatedSearchPage />} />
          <Route path={routes.common} element={<CommonPage />} />
          <Route path={routes.noResult} element={<NoResultPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
