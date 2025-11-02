import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
// 검색 중 로딩 화면을 표시하는 페이지 컴포넌트입니다.

function SearchingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || ""; // MainPage에서 전달받은 query
  // 쿼리 값이 존재할때만 받아오고 없으면 ""

  useEffect(() => {
    if (!query) return; // 쿼리 값 없을 경우 검색 방지

    async function fetchData() {
      try {
        const res = await axios.post("http://localhost:5000/api/search", {
          query,
        });

        // 백엔드 서버의 응답이 완료되면 result 페이지로 이동
        navigate("/result", { state: { query, result: res.data } });
      } catch (err) {
        console.error("요청 실패: ", err);
      }
    }

    fetchData();
  }, [query, navigate]);

  return (
    // 이 부분에 빙글빙글 로딩 효과 넣어주면 될듯
    <div className="flex min-h-screen items-center justify-center text-lg">
      검색 중입니다... 🔍
    </div>
  );
}

export default SearchingPage;
