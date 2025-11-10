import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useState } from "react";
import routes from "@utils/constants/routes";
import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";

import GuideModal from "@components/GuideModal";

function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const [showGuide, setShowGuide] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSearch = () => {
    if (!query.trim()) return;
    navigate(routes.search, { state: { query } });
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-br from-white via-emerald-50 to-teal-50 flex flex-col">
        <header className="p-5 flex items-center gap-3 justify-between">
          <HeaderBar />
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg border-2 border-emerald-600 hover:bg-emerald-200 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">가이드</span>
          </button>
        </header>

        <main className="mx-100 my-50 flex-1 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-5 tracking-tight">
            자연어로 패널을 찾아보세요
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            AI가 당신의 검색을 이해하고 정확한 패널을 찾아드립니다
          </p>

          <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={onSearch}
            placeholder="예: 서울 20대 남자 100명"
          />
        </main>
      </div>

      <GuideModal
        show={showGuide}
        onClose={() => {
          setShowGuide(false);
          setCurrentSlide(0);
        }}
        current={currentSlide}
        setCurrent={setCurrentSlide}
      />
    </>
  );
}

export default MainPage;
