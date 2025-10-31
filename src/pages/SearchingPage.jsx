import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// 검색 중 로딩 화면을 표시하는 페이지 컴포넌트입니다.

function SearchingPage() {
  const location = useLocation();
  const query = location.state?.query || ""; // MainPage에서 전달받은 query
  // 쿼리 값이 존재할때만 받아오고 없으면 ""
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // 작성 중

  return (
    <>
      <div>Loding...</div>
    </>
  );
}

export default SearchingPage;
