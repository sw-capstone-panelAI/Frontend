import { useState, useEffect } from "react";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";

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

function MindMapNode({
  label,
  percentage,
  onClick,
  position,
  isCenter = false,
  isSelected = false,
}) {
  const centerStyle =
    "bg-emerald-600 text-white border-4 border-emerald-700 scale-110 shadow-lg shadow-emerald-500/50 font-bold text-sm z-30";
  const selectedStyle =
    "bg-emerald-100 text-emerald-800 border-emerald-600 hover:scale-[1.05] shadow-md z-20";
  const defaultStyle =
    "bg-white text-gray-700 border-gray-300 hover:border-emerald-600 hover:scale-[1.02] shadow-sm z-20";

  return (
    <div
      onClick={onClick}
      className={`absolute px-3 py-1.5 rounded-full border-2 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center ${
        isCenter ? centerStyle : isSelected ? selectedStyle : defaultStyle
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        minWidth: "80px",
      }}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="text-xs font-medium">{label}</span>
        {!isCenter && percentage !== undefined && (
          <span className="text-[10px] opacity-70">{percentage}%</span>
        )}
      </div>
    </div>
  );
}

export default function RelatedSearchPagePreview() {
  const [loading, setLoading] = useState(true);
  const [relatedQueries, setRelatedQueries] = useState([]);
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [recommendedQuery, setRecommendedQuery] = useState("");

  const mockQuery = "서울 20대 남자 100명";

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
    }, 1000);
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
    }, 500);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 p-2 pb-3 flex items-center justify-between bg-emerald-100 border-b-3 border-emerald-300 rounded-b-2xl">
        <HeaderBar />
        <button className="p-1.5 rounded-lg hover:bg-emerald-200 transition-colors flex items-center gap-1 text-emerald-800 text-sm">
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </button>
      </header>

      <main className="px-6 pt-4 pb-8 flex-1 overflow-y-auto">
        {/* 원본 검색어 */}
        <section className="mb-3">
          <h3 className="mb-1 text-emerald-700 text-xs">원본 검색어</h3>
          <p className="bg-white p-2 rounded-lg shadow-sm border border-emerald-200 font-medium text-emerald-700 text-sm">
            {mockQuery}
          </p>
        </section>

        {/* 마인드맵 영역 */}
        <section
          className="relative bg-white rounded-xl shadow-lg p-4 mb-3 border border-emerald-100"
          style={{ minHeight: 300 }}
        >
          {loading && relatedQueries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full absolute inset-0 bg-white/80 backdrop-blur-sm">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
              <p className="mt-2 text-emerald-700 text-sm">
                관련 키워드 분석 중...
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
                      stroke={isSelected ? "#059669" : "#a7f3d0"}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray={isSelected ? "0" : "5 5"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              <MindMapNode label={mockQuery} position={CENTER_POS} isCenter />
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
          <section className="mb-3">
            <p className="text-xs text-emerald-700 mb-1">선택한 키워드:</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedQueries.map((q) => (
                <div
                  key={q}
                  className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full cursor-pointer border border-emerald-600 transition-colors text-xs font-medium"
                  onClick={() => toggleQuery(q)}
                >
                  {q} <span className="text-emerald-500">✕</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 추천 검색어 생성 및 실행 섹션 */}
        <section className="bg-white border border-emerald-200 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-emerald-800">
              추천 검색어 생성
            </h3>
          </div>

          {loading && recommendedQuery === "" ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-600 mr-2" />
              <span className="text-emerald-600 font-medium text-sm">
                추천 검색어 조합 중...
              </span>
            </div>
          ) : recommendedQuery ? (
            <>
              <div className="bg-emerald-50/70 rounded-lg p-3 border border-emerald-100 mb-2 shadow-inner">
                <p className="text-xs text-emerald-600 mb-1 font-medium">
                  생성된 검색어
                </p>
                <p className="text-base font-bold text-gray-900 break-words">
                  {recommendedQuery}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-100 text-emerald-800 py-2 px-3 rounded-lg text-xs font-bold border-2 border-emerald-600 hover:bg-emerald-200">
                  이 검색어로 검색하기
                </button>
                <button
                  onClick={() => setRecommendedQuery("")}
                  className="bg-emerald-100 text-emerald-800 py-2 px-3 rounded-lg text-xs font-bold border-2 border-emerald-600 hover:bg-emerald-200"
                >
                  다시 생성
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-2 text-xs">
                {selectedQueries.length > 0
                  ? "선택한 키워드를 조합하여 새로운 검색어를 만들어보세요."
                  : "마인드맵에서 키워드를 클릭하여 선택하거나, AI 자동 추천을 실행하세요."}
              </p>
              <button
                onClick={generateQuery}
                disabled={loading}
                className="w-full bg-emerald-100 text-emerald-800 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border-2 border-emerald-600 hover:bg-emerald-200 disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
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
