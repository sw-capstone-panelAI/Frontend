import { useState, useEffect } from "react";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";

// 마인드맵 노드들의 위치 좌표 (x, y는 퍼센트 단위)
const positions = [
  { x: 30, y: 20 }, // 좌상단
  { x: 70, y: 20 }, // 우상단
  { x: 15, y: 45 }, // 좌측 중앙
  { x: 50, y: 45 }, // 상단 중앙
  { x: 85, y: 45 }, // 우측 중앙
  { x: 30, y: 70 }, // 좌하단
  { x: 70, y: 70 }, // 우하단
  { x: 50, y: 90 }, // 하단 중앙
];

/**
 * 마인드맵의 개별 노드 컴포넌트
 * @param {string} label - 노드에 표시될 텍스트
 * @param {number} percentage - 유사도 퍼센트 (중앙 노드 제외)
 * @param {Function} onClick - 클릭 이벤트 핸들러
 * @param {Object} position - 노드의 위치 {x, y}
 * @param {boolean} isCenter - 중앙 노드 여부 (원본 검색어)
 * @param {boolean} isSelected - 선택 상태 여부
 */
function MindMapNode({
  label,
  percentage,
  onClick,
  position,
  isCenter = false,
  isSelected = false,
}) {
  return (
    <div
      onClick={onClick}
      className={`absolute px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
        isCenter
          ? "bg-indigo-600 text-white border-indigo-600 scale-110" // 중앙 노드 스타일
          : isSelected
          ? "bg-indigo-100 border-indigo-600 hover:scale-105" // 선택된 노드 스타일
          : "bg-white border-gray-300 hover:border-indigo-600 hover:scale-105" // 기본 노드 스타일
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)", // 중앙 정렬을 위한 변환
      }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-sm font-medium">{label}</span>
        {/* 중앙 노드가 아닌 경우에만 유사도 퍼센트 표시 */}
        {percentage !== undefined && !isCenter && (
          <span className="text-xs opacity-70">{percentage}%</span>
        )}
      </div>
    </div>
  );
}

export default function RelatedSearchPage() {
  // 원본 검색어 (실제로는 라우터를 통해 전달받음)
  const originalQuery = "패널 조사 대상";

  // 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [relatedQueries, setRelatedQueries] = useState([]); // 관련 키워드 목록
  const [selectedQueries, setSelectedQueries] = useState([]); // 사용자가 선택한 키워드들
  const [recommendedQuery, setRecommendedQuery] = useState(""); // 생성된 추천 검색어

  // 컴포넌트 마운트 시 관련 키워드 불러오기
  useEffect(() => {
    // 실제 환경에서는 API 호출로 대체
    // 여기서는 시뮬레이션을 위해 setTimeout 사용
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

  /**
   * 키워드 선택/해제 토글 함수
   * @param {string} q - 선택할 키워드
   */
  const toggleQuery = (q) => {
    setSelectedQueries(
      (prev) =>
        prev.includes(q)
          ? prev.filter((x) => x !== q) // 이미 선택된 경우 제거
          : [...prev, q] // 선택되지 않은 경우 추가
    );
  };

  /**
   * 추천 검색어 생성 함수
   * 선택한 키워드가 있으면 그것을 사용하고,
   * 없으면 상위 3개 키워드를 자동으로 조합
   */
  const generateQuery = () => {
    if (selectedQueries.length > 0) {
      // 사용자가 선택한 키워드로 검색어 생성
      setRecommendedQuery(selectedQueries.join(" ") + " 패널");
    } else {
      // 자동으로 상위 3개 키워드 선택
      const top3 = relatedQueries.slice(0, 3).map((q) => q.text);
      setRecommendedQuery(top3.join(" ") + " 패널");
    }
  };

  /**
   * 생성된 검색어로 실제 검색 실행
   */
  const handleSearch = () => {
    if (recommendedQuery) {
      alert(`검색 실행: ${recommendedQuery}`);
      // 검색 후 상태 초기화
      setRecommendedQuery("");
      setSelectedQueries([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex flex-col">
      {/* 헤더: 뒤로가기 버튼과 제목 */}
      <header className="flex items-center gap-4 mb-6">
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          추천 키워드 마인드맵
        </h2>
      </header>

      {/* 원본 검색어 표시 섹션 */}
      <section className="mb-6">
        <h3 className="mb-1 text-gray-600 text-sm">원본 검색어</h3>
        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          {originalQuery}
        </p>
      </section>

      {/* 마인드맵 표시 영역 */}
      <section
        className="flex-1 relative bg-white rounded-xl shadow-lg p-8 mb-6"
        style={{ minHeight: 500 }}
      >
        {loading ? (
          // 로딩 중 표시
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
            <p className="mt-3 text-gray-600">관련 키워드 분석 중...</p>
          </div>
        ) : relatedQueries.length === 0 ? (
          // 관련 키워드가 없을 때
          <p className="text-center text-gray-500">관련 키워드가 없습니다.</p>
        ) : (
          // 마인드맵 노드들 렌더링
          <>
            {/* 중앙 노드: 원본 검색어 */}
            <MindMapNode
              label={originalQuery}
              position={{ x: 50, y: 50 }}
              isCenter
            />
            {/* 관련 키워드 노드들 */}
            {relatedQueries.map((item, idx) => (
              <MindMapNode
                key={item.text}
                label={item.text}
                percentage={Math.round((item.similarity || 0) * 100)}
                position={positions[idx] || { x: 50, y: 50 }}
                onClick={() => toggleQuery(item.text)}
                isSelected={selectedQueries.includes(item.text)}
              />
            ))}
          </>
        )}
      </section>

      {/* 선택한 키워드 목록 표시 (선택된 키워드가 있을 때만) */}
      {selectedQueries.length > 0 && (
        <section className="mb-6">
          <p className="text-sm text-gray-600 mb-2">선택한 키워드:</p>
          <div className="flex flex-wrap gap-2">
            {selectedQueries.map((q) => (
              <div
                key={q}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full cursor-pointer border-2 border-indigo-600 hover:bg-indigo-200 transition-colors"
                onClick={() => toggleQuery(q)}
              >
                {q} ✕
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 추천 검색어 생성 및 실행 섹션 */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-800">추천 검색어 생성</h3>
        </div>

        {recommendedQuery ? (
          // 검색어가 생성된 상태
          <>
            <div className="bg-white/70 rounded-lg p-4 border border-indigo-100 mb-4">
              <p className="text-sm text-gray-600 mb-2">생성된 검색어</p>
              <p className="text-xl font-medium text-gray-800">
                {recommendedQuery}
              </p>
            </div>
            <div className="flex gap-3">
              {/* 검색 실행 버튼 */}
              <button
                onClick={handleSearch}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                이 검색어로 검색하기
              </button>
              {/* 다시 생성 버튼 */}
              <button
                onClick={() => setRecommendedQuery("")}
                className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 py-2 px-4 rounded-lg transition-colors font-medium"
              >
                다시 생성
              </button>
            </div>
          </>
        ) : (
          // 검색어 생성 전 상태
          <>
            <p className="text-gray-600 mb-4">
              {selectedQueries.length > 0
                ? "선택한 키워드로 검색어를 생성하시겠습니까?"
                : "AI가 자동으로 추천 검색어를 생성해드립니다"}
            </p>
            {/* 검색어 생성 버튼 */}
            <button
              onClick={generateQuery}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {selectedQueries.length > 0
                ? "선택 키워드로 생성"
                : "자동 추천 생성"}
            </button>
          </>
        )}
      </section>
    </div>
  );
}
