import { useState, useEffect } from "react";
import { Loader2, Sparkles, ArrowLeft, X } from "lucide-react"; // X 아이콘 추가
import HeaderBar from "@common/bar/HeaderBar";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";

/**
 * 마인드맵 노드 위치 및 중앙 위치
 */
const positions = [
  { x: 30, y: 20 },
  { x: 70, y: 20 },
  { x: 15, y: 45 },
  { x: 50, y: 30 },
  { x: 85, y: 45 },
  { x: 30, y: 70 },
  { x: 70, y: 70 },
  { x: 50, y: 85 },
];
const CENTER_POS = { x: 50, y: 50 };

/**
 * MindMapNode 컴포넌트
 */
function MindMapNode({
  label,
  percentage,
  onClick,
  position,
  isCenter = false,
  isSelected = false,
}) {
  const centerStyle =
    "bg-indigo-600 text-white border-4 border-indigo-700 scale-110 shadow-lg shadow-indigo-500/50 font-bold text-base z-30";
  const selectedStyle =
    "bg-indigo-100 text-indigo-800 border-indigo-600 hover:scale-[1.05] shadow-md z-20";
  const defaultStyle =
    "bg-white text-gray-700 border-gray-300 hover:border-indigo-600 hover:scale-[1.02] shadow-sm z-20";

  return (
    <div
      onClick={onClick}
      className={`absolute px-4 py-2 rounded-full border-2 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center ${
        isCenter ? centerStyle : isSelected ? selectedStyle : defaultStyle
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        minWidth: "100px",
      }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-sm font-medium">{label}</span>
        {!isCenter && percentage !== undefined && (
          <span className="text-xs opacity-70">{percentage}%</span>
        )}
      </div>
    </div>
  );
}

/**
 * Custom Modal Component
 */
const SimpleModal = ({ message, onClose }) => {
  if (!message) return null;

  const handleConfirmClick = () => {
    if (message.onConfirm) message.onConfirm();
    else onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-300 border-t-8 border-indigo-600">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-extrabold text-gray-900">
            {message.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-indigo-50/50 rounded-lg p-4 mb-6 border border-indigo-200">
          <p className="text-gray-700 whitespace-pre-line text-base font-medium">
            {message.body}
          </p>
        </div>
        <button
          onClick={handleConfirmClick}
          className="w-full bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold text-lg border-2 border-indigo-600"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [recommendedQuery, setRecommendedQuery] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation(); // 이건 이전페이지에서 데이터 받아올때 사용
  const navigate = useNavigate();

  // 이전 페이지에서 원본 쿼리 받아옴 구조분해 할당으로 query를 받아와 originalQuery변수에 저장
  const { query: originalQuery } = location.state || {};

  useEffect(() => {
    setTimeout(() => {
      setRelatedQueries([
        { text: "20대 여성", similarity: 0.92 },
        { text: "서울 거주", similarity: 0.88 },
        { text: "직장인", similarity: 0.85 },
        { text: "월소득 300만원", similarity: 0.82 },
        { text: "미혼", similarity: 0.78 },
        { text: "대졸", similarity: 0.75 },
        { text: "IT업계", similarity: 0.72 },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const toggleQuery = (q) => {
    setSelectedQueries((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]
    );
  };

  const generateQuery = () => {
    setRecommendedQuery("");
    setLoading(true);

    setTimeout(() => {
      let newQuery;
      if (selectedQueries.length > 0) {
        newQuery = selectedQueries.join(" ") + " 패널";
      } else {
        const top3 = relatedQueries.slice(0, 3).map((q) => q.text);
        newQuery = top3.join(" ") + " 패널";
      }
      setRecommendedQuery(newQuery);
      setLoading(false);
    }, 800);
  };

  // 변경된 handleSearch: 확인 클릭하면 검색 페이지로 이동
  const handleSearch = () => {
    if (recommendedQuery) {
      setMessage({
        title: "검색 실행 요청",
        body: `'${recommendedQuery}' 검색이 실행되었습니다.\n검색 페이지로 이동합니다.`,
        onConfirm: () => {
          setMessage(null);
          setRecommendedQuery("");
          setSelectedQueries([]);
          navigate(routes.search, { state: { query: `${recommendedQuery}` } });
        },
      });
    }
  };

  // 새로 추가되는 뒤로가기 버튼 클릭 핸들러 : 결과 페이지로 이동
  const handleBackClick = () => {
    navigate(-1); // -1만 넣으면 뒤로가기 알아서 처리해준대요 개꿀
  };

  return (
    <div
      className="
      min-h-screen bg-gradient-to-br from-teal-100 to-yellow-50 
      flex flex-col font-sans"
    >
      {/* Header: 로고 오른쪽에 뒤로가기 버튼 */}
      <header
        className="
        sticky top-0 z-30 p-3 pb-5 
        flex items-center gap-373 justify-between 
        bg-indigo-100 border-b-3 border-violet-500 rounded-b-2xl"
      >
        <HeaderBar />
        <button
          onClick={handleBackClick}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 text-gray-700"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로가기
        </button>
      </header>

      <main className="px-120 pt-7 pb-20">
        {/* Custom Modal */}
        <SimpleModal message={message} onClose={() => setMessage(null)} />

        {/* 원본 검색어 */}
        <section className="mb-6">
          <h3 className="mb-1 text-gray-600 text-sm">원본 검색어</h3>
          <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 font-medium text-indigo-700">
            {originalQuery}
          </p>
        </section>

        {/* 마인드맵 영역 */}
        <section
          className="flex-1 relative bg-white rounded-xl shadow-2xl p-8 mb-6 border border-gray-100"
          style={{ minHeight: 500 }}
        >
          {loading && relatedQueries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full absolute inset-0 bg-white/80 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
              <p className="mt-3 text-gray-600">관련 키워드 분석 중...</p>
            </div>
          ) : relatedQueries.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">
                관련 키워드가 없습니다.
              </p>
            </div>
          ) : (
            <>
              <svg
                className="absolute inset-0 w-full h-full z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {relatedQueries.map((item, idx) => {
                  const pos = positions[idx] || CENTER_POS;
                  const isSelected = selectedQueries.includes(item.text);
                  return (
                    <line
                      key={item.text}
                      x1={CENTER_POS.x}
                      y1={CENTER_POS.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={isSelected ? "#4f46e5" : "#a5b4fc"}
                      strokeWidth={isSelected ? 2.5 : 1}
                      strokeDasharray={isSelected ? "0" : "5 5"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              <MindMapNode
                label={originalQuery}
                position={CENTER_POS}
                isCenter
              />
              {relatedQueries.map((item, idx) => (
                <MindMapNode
                  key={item.text}
                  label={item.text}
                  percentage={Math.round((item.similarity || 0) * 100)}
                  position={positions[idx] || CENTER_POS}
                  onClick={() => toggleQuery(item.text)}
                  isSelected={selectedQueries.includes(item.text)}
                />
              ))}
            </>
          )}
        </section>

        {/* 선택한 키워드 목록 */}
        {selectedQueries.length > 0 && (
          <section className="mb-6">
            <p className="text-sm text-gray-600 mb-2">선택한 키워드:</p>
            <div className="flex flex-wrap gap-2">
              {selectedQueries.map((q) => (
                <div
                  key={q}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full cursor-pointer border-2 border-indigo-600 transition-colors text-sm font-medium"
                  onClick={() => toggleQuery(q)}
                >
                  {q} <span className="text-indigo-500">✕</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 추천 검색어 생성 및 실행 섹션 */}
        <section className="bg-white border border-indigo-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-800">추천 검색어 생성</h3>
          </div>

          {loading &&
          recommendedQuery === "" &&
          (selectedQueries.length > 0 || relatedQueries.length > 0) ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-medium">
                추천 검색어 조합 중...
              </span>
            </div>
          ) : recommendedQuery ? (
            <>
              <div className="bg-indigo-50/70 rounded-lg p-4 border border-indigo-100 mb-4 shadow-inner">
                <p className="text-sm text-indigo-600 mb-1 font-medium">
                  생성된 검색어
                </p>
                <p className="text-xl font-bold text-gray-900 break-words">
                  {recommendedQuery}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold border-2 border-indigo-600 hover:bg-indigo-200"
                >
                  이 검색어로 검색하기
                </button>
                <button
                  onClick={() => setRecommendedQuery("")}
                  className="bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold border-2 border-indigo-600 hover:bg-indigo-200"
                >
                  다시 생성
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-4 text-sm">
                {selectedQueries.length > 0
                  ? "선택한 키워드를 조합하여 새로운 검색어를 만들어보세요."
                  : "마인드맵에서 키워드를 클릭하여 선택하거나, AI 자동 추천을 실행하세요."}
              </p>
              <button
                onClick={generateQuery}
                disabled={loading}
                className="w-full bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 border-2 border-indigo-600 hover:bg-indigo-200 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {selectedQueries.length > 0
                  ? "선택 키워드로 생성"
                  : "AI 자동 추천 생성"}
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
