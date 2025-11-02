import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useState } from "react";
import routes from "@utils/constants/routes";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 검색 함수(인풋 입력 후 서버 전송)
  function onSearch() {
    if (!query.trim()) return; // 빈 값 전송 방지

    console.log(query); // 서버에 입력 데이터 전송
    navigate(routes.search, { state: { query: `${query}` } }); // 서칭 페이지로 넘어감 (로딩 화면)
  }

  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-br from-cyan-100 to-pink-200 flex flex-col">
        {/* Header */}
        <header className="p-5 flex items-center gap-3">
          <HeaderBar />
        </header>

        {/* Main Content */}
        <main className="mx-100 my-50 flex-1 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-5 tracking-tight">
            자연어로 패널을 찾아보세요
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            AI가 당신의 검색을 이해하고 정확한 패널을 찾아드립니다
          </p>

          {/* Search Box */}
          <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={onSearch}
            placeholder="예: 서울 20대 남자 100명"
          />
        </main>
      </div>
    </>
  );
}

export default MainPage;
