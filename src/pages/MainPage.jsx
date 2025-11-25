import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useState } from "react";
import routes from "@utils/constants/routes";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Sparkles, Users, TrendingUp } from "lucide-react";

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

  // 검색 예시 데이터
  const searchExamples = [
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "인구통계 기반 검색",
      query: "서울 거주하는 20대 여성 ",
      description: "나이, 성별, 지역, 직업 등으로 검색",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "생활패턴 기반 검색",
      query: "운동 좋아하고 술 좋아하는 30대",
      description: "취미, 관심사, 생활습관으로 검색",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      title: "복합 조건 검색",
      query: "호남권에 거주하고 있는 AI 챗봇 사용해본 사람",
      description: "여러 조건을 조합하여 검색",
    },
  ];

  const handleExampleClick = (exampleQuery) => {
    setQuery(exampleQuery);
    navigate(routes.search, { state: { query: exampleQuery } });
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
        <header className="p-5 flex items-center gap-3 justify-between">
          <HeaderBar />
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg border-2 border-indigo-600 hover:bg-indigo-200 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">가이드</span>
          </button>
        </header>

        <main className="mx-100 my-50 flex-1 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-indigo-600 to-slate-600 bg-clip-text text-transparent mb-5 tracking-tight">
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

          {/* 검색 예시 섹션 */}
          <div className="mt-16 w-full max-w-5xl px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-300"></div>
              <h2 className="text-lg font-semibold text-gray-700">
                이런 식으로 검색해보세요
              </h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchExamples.map((example, index) => (
                <div
                  key={index}
                  onClick={() => handleExampleClick(example.query)}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      {example.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 text-left">
                      {example.title}
                    </h3>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-3 mb-3 group-hover:bg-indigo-100 transition-colors">
                    <p className="text-indigo-800 font-medium text-sm">
                      "{example.query}"
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm text-left">
                    {example.description}
                  </p>

                  <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>클릭하여 검색하기</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* 추가 팁 섹션 */}
            <div className="mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-800 mb-2">💡 검색 팁</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 나이, 성별, 지역 등 기본 정보와 함께 검색하세요</li>

                    <li>• 여러 조건을 자유롭게 조합할 수 있습니다</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
