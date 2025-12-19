import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useState, useEffect } from "react";
import routes from "@utils/constants/routes";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  Sparkles,
  Users,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  History,
  X,
  Zap,
  Brain,
} from "lucide-react";

import GuideModal from "@components/GuideModal";

function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 검색 모델 상태 (fast | deep)
  const [selectedModel, setSelectedModel] = useState("fast");

  const [showGuide, setShowGuide] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 히스토리 관련 상태
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // 말풍선 툴팁 상태
  const [showTooltip, setShowTooltip] = useState(false);

  // 컴포넌트 마운트 시 로컬스토리지에서 히스토리 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 말풍선 자동 숨김 타이머
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000); // 5초 후 자동 숨김

      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const onSearch = () => {
    if (!query.trim()) return;

    // 히스토리에 추가 (중복 제거)
    const newHistory = [
      query,
      ...searchHistory.filter((h) => h !== query),
    ].slice(0, 10); // 최대 10개
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    // 검색 모델과 자연어 쿼리를 검색 로딩 페이지로 전송
    navigate(routes.search, { state: { query: query, model: selectedModel } });
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

    // 히스토리에 추가
    const newHistory = [
      exampleQuery,
      ...searchHistory.filter((h) => h !== exampleQuery),
    ].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    navigate(routes.search, {
      state: { query: exampleQuery, model: selectedModel },
    });
  };

  const handleHistoryClick = (historyQuery) => {
    setQuery(historyQuery);
    navigate(routes.search, {
      state: { query: historyQuery, model: selectedModel },
    });
  };

  const handleDeleteHistory = (historyQuery, e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    const newHistory = searchHistory.filter((h) => h !== historyQuery);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const handleClearAllHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setShowTooltip(true);
    console.log("🔍 선택된 검색 모델:", model);
  };

  // 검색 모델 설명
  const modelDescriptions = {
    fast: {
      icon: <Zap className="w-4 h-4" />,
      title: "빠른 검색",
      description: "신속한 패널 검색으로 즉시 결과를 확인하세요",
    },
    deep: {
      icon: <Brain className="w-4 h-4" />,
      title: "정밀 검색",
      description: "AI가 깊이 분석하여 더욱 정확한 패널을 찾아드립니다",
    },
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col relative">
        <header className="p-5 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-4">
            <HeaderBar />

            {/* 검색 모델 선택 버튼 */}
            <div className="relative">
              <div className="flex gap-2 bg-white rounded-lg p-1.5 shadow-md border-2 border-gray-200">
                <button
                  onClick={() => handleModelChange("fast")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md transition-all font-semibold ${
                    selectedModel === "fast"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-500 text-white shadow-lg shadow-indigo-300 scale-105 border-2 border-indigo-400"
                      : "text-gray-600 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <Zap
                    className={`w-5 h-5 ${
                      selectedModel === "fast" ? "drop-shadow-sm" : ""
                    }`}
                  />
                  <span className="text-sm">Fast model</span>
                </button>
                <button
                  onClick={() => handleModelChange("deep")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md transition-all font-semibold ${
                    selectedModel === "deep"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-500 text-white shadow-lg shadow-indigo-300 scale-105 border-2 border-indigo-400"
                      : "text-gray-600 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <Brain
                    className={`w-5 h-5 ${
                      selectedModel === "deep" ? "drop-shadow-sm" : ""
                    }`}
                  />
                  <span className="text-sm">DeepSearch model</span>
                </button>
              </div>

              {/* 말풍선 툴팁 */}
              {showTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="relative bg-white rounded-lg shadow-xl border-2 border-indigo-200 p-4 w-72">
                    {/* 위쪽 화살표 */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-indigo-200 rotate-45"></div>

                    {/* 닫기 버튼 */}
                    <button
                      onClick={() => setShowTooltip(false)}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>

                    {/* 내용 */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                        {modelDescriptions[selectedModel].icon}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-gray-800 mb-1">
                          {modelDescriptions[selectedModel].title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {modelDescriptions[selectedModel].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg border-2 border-indigo-600 hover:bg-indigo-200 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">가이드</span>
          </button>
        </header>

        {/* 히스토리 토글 버튼 */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-indigo-800 p-3 rounded-r-lg shadow-lg hover:bg-indigo-700 transition-all z-40"
          style={{ left: showHistory ? "320px" : "0" }}
        >
          {showHistory ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </button>

        {/* 히스토리 사이드바 */}
        <div
          className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 z-30 ${
            showHistory ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <History className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  검색 히스토리
                </h2>
              </div>
              {searchHistory.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  전체 삭제
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">최근 검색한 내역입니다</p>
          </div>

          <div className="overflow-y-auto h-[calc(100%-120px)] p-4">
            {searchHistory.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">검색 기록이 없습니다</p>
              </div>
            ) : (
              <div className="space-y-2">
                {searchHistory.map((historyItem, index) => (
                  <div
                    key={index}
                    onClick={() => handleHistoryClick(historyItem)}
                    className="group flex items-start justify-between p-3 bg-gray-50 hover:bg-indigo-50 rounded-lg cursor-pointer transition-all border border-transparent hover:border-indigo-300"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0 pr-2">
                      <History className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 group-hover:text-indigo-700 break-words whitespace-normal leading-relaxed">
                        {historyItem}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteHistory(historyItem, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

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
