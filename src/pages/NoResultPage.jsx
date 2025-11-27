import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchX, Sparkles, Users, TrendingUp } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import routes from "@utils/constants/routes";

export default function NoResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const originalQuery = location.state?.query || "";
  const searchModel = location.state?.model || "fast";
  const [query, setQuery] = useState("");

  // 애니메이션 상태
  const [showIcon, setShowIcon] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSuggestionTitle, setShowSuggestionTitle] = useState(false);
  const [showCards, setShowCards] = useState([false, false, false]);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowIcon(true), 200),
      setTimeout(() => setShowTitle(true), 400),
      setTimeout(() => setShowSubtitle(true), 600),
      setTimeout(() => setShowSearch(true), 800),
      setTimeout(() => setShowSuggestionTitle(true), 1000),
      setTimeout(() => setShowCards([true, false, false]), 1200),
      setTimeout(() => setShowCards([true, true, false]), 1350),
      setTimeout(() => setShowCards([true, true, true]), 1500),
      setTimeout(() => setShowTip(true), 1700),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const onSearch = () => {
    if (!query.trim()) return;

    const savedHistory = localStorage.getItem("searchHistory");
    const searchHistory = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [
      query,
      ...searchHistory.filter((h) => h !== query),
    ].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    navigate(routes.search, {
      state: {
        query,
        model: searchModel, // 검색 모델 유지
      },
    });
  };

  const suggestedSearches = [
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "인구통계 검색",
      query: "서울 거주하는 30대 남성",
      description: "지역, 나이, 성별로 검색",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "생활패턴 검색",
      query: "ott 이용하는 20대",
      description: "OTT, 취미, 관심사로 검색",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      title: "소득/직업 검색",
      query: "월소득 400만원 이상 직장인",
      description: "소득, 직업, 학력으로 검색",
    },
  ];

  const handleSuggestionClick = (suggestedQuery) => {
    const savedHistory = localStorage.getItem("searchHistory");
    const searchHistory = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [
      suggestedQuery,
      ...searchHistory.filter((h) => h !== suggestedQuery),
    ].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    navigate(routes.search, {
      state: {
        query: suggestedQuery,
        model: searchModel, // 검색 모델 유지
      },
    });
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      <header className="p-5 flex items-center gap-3 justify-between">
        <HeaderBar />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 transition-all duration-500 ${
                showIcon
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <SearchX className="w-12 h-12 text-gray-400" />
            </div>

            <h1
              className={`text-3xl font-bold text-gray-800 mb-3 transition-all duration-500 ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              검색 결과가 없습니다
            </h1>

            <div
              className={`transition-all duration-500 ${
                showSubtitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {originalQuery && (
                <p className="text-lg text-gray-600 mb-2">
                  <span className="font-semibold text-indigo-600">
                    {originalQuery}
                  </span>
                  에 해당하는 패널을 찾지 못했습니다.
                </p>
              )}
              <p className="text-gray-500">
                다른 검색어로 시도하거나 아래 추천 검색어를 이용해보세요.
              </p>
            </div>
          </div>

          <div
            className={`mb-12 flex flex-col items-center transition-all duration-500 ${
              showSearch
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              새로운 검색어를 입력하세요
            </h2>
            <SearchInput
              value={query}
              onChange={setQuery}
              onSearch={onSearch}
              placeholder="예: 경기도 20대 여성 직장인"
            />
          </div>

          <div className="mb-8">
            <div
              className={`flex items-center justify-center gap-2 mb-6 transition-all duration-500 ${
                showSuggestionTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-300"></div>
              <h2 className="text-lg font-semibold text-gray-700">
                이런 검색어는 어떠세요?
              </h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedSearches.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.query)}
                  className={`group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-indigo-300 ${
                    showCards[index]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      {suggestion.icon}
                    </div>
                    <h3 className="font-bold text-gray-800">
                      {suggestion.title}
                    </h3>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-3 mb-3 group-hover:bg-indigo-100 transition-colors">
                    <p className="text-indigo-800 font-medium text-sm">
                      {suggestion.query}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {suggestion.description}
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
          </div>

          <div
            className={`bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 transition-all duration-500 ${
              showTip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">검색 팁</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • 너무 구체적인 조건보다는 넓은 범위로 먼저 검색해보세요
                  </li>
                  <li>
                    • 지역명은 서울, 경기 등 시/도 단위로 검색하면 더 정확한
                    결과를 얻을 수 있습니다
                  </li>
                  <li>• 나이는 20대, 30대 등 연령대로 검색해보세요</li>
                  <li>
                    • 여러 조건을 동시에 사용할 때는 핵심 조건 위주로 검색하세요
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
