import { useState, useEffect } from "react";
import { Loader2, Sparkles, ArrowLeft, Network } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";
import axios from "axios";

/**
 * 마인드맵 노드 위치 및 중앙 위치
 */
const positions = [
  { x: 30, y: 25 },
  { x: 70, y: 25 },
  { x: 20, y: 50 },
  { x: 80, y: 50 },
  { x: 50, y: 75 },
];
const CENTER_POS = { x: 50, y: 45 };

/**
 * MindMapNode 컴포넌트
 */
function MindMapNode({ label, count, position, isCenter = false }) {
  const centerStyle =
    "bg-indigo-600 text-white border-4 border-indigo-700 scale-125 shadow-lg shadow-indigo-500/50 font-bold text-lg z-30";
  const defaultStyle =
    "bg-white text-gray-700 border-2 border-indigo-400 shadow-md z-20";

  return (
    <div
      className={`absolute px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap flex items-center justify-center ${
        isCenter ? centerStyle : defaultStyle
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        minWidth: isCenter ? "140px" : "120px",
      }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className={`${isCenter ? "text-base" : "text-sm"} font-semibold`}>
          {label}
        </span>
        {!isCenter && count !== undefined && (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
            {count}명
          </span>
        )}
      </div>
    </div>
  );
}

export default function CommonPage() {
  const [loading, setLoading] = useState(true);
  const [commonKeywords, setCommonKeywords] = useState([]);
  const [summary, setSummary] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { panels } = location.state || {};

  useEffect(() => {
    if (!panels || panels.length === 0) {
      console.error("❌ 패널 데이터가 없습니다!");
      navigate(routes.result);
      return;
    }

    // 공통 특성 분석 API 호출
    const fetchCommonCharacteristics = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:5000/api/common-characteristics",
          { panels }
        );

        setCommonKeywords(response.data.keywords || []);
        setSummary(response.data.summary || "");
        setLoading(false);
      } catch (error) {
        console.error("❌ 공통 특성 분석 오류:", error);
        alert("공통 특성 분석 중 오류가 발생했습니다.");
        navigate(-1);
      }
    };

    fetchCommonCharacteristics();
  }, [panels, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 p-3 pb-5 flex items-center gap-373 justify-between bg-indigo-100 border-b-3 border-indigo-300 rounded-b-2xl shadow-sm">
        <HeaderBar />
        <button
          onClick={handleBackClick}
          className="p-2 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-1 text-indigo-800 font-medium"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로가기
        </button>
      </header>

      <main className="px-120 pt-7 pb-20">
        {/* 페이지 제목 */}
        <section className="mb-6">
          <div className="flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-2xl font-bold text-indigo-800">
                공통 특성 분석
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                검색된 {panels?.length || 0}명의 패널에서 발견된 공통 특성입니다
              </p>
            </div>
          </div>
        </section>

        {/* 마인드맵 영역 */}
        <section
          className="flex-1 relative bg-white rounded-xl shadow-md p-8 mb-6 border-2 border-indigo-200"
          style={{ minHeight: 500 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full absolute inset-0 bg-white/80 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
              <p className="mt-3 text-indigo-700 font-medium">
                공통 특성을 분석하고 있습니다...
              </p>
            </div>
          ) : commonKeywords.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">
                공통 특성을 찾을 수 없습니다.
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
                {commonKeywords.map((item, idx) => {
                  const pos = positions[idx] || CENTER_POS;
                  return (
                    <line
                      key={item.keyword}
                      x1={CENTER_POS.x}
                      y1={CENTER_POS.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke="#818cf8"
                      strokeWidth={2}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              <MindMapNode label="공통 특성" position={CENTER_POS} isCenter />
              {commonKeywords.map((item, idx) => (
                <MindMapNode
                  key={item.keyword}
                  label={item.keyword}
                  count={item.count}
                  position={positions[idx] || CENTER_POS}
                />
              ))}
            </>
          )}
        </section>

        {/* 요약 섹션 */}
        {!loading && summary && (
          <section className="bg-white border-2 border-indigo-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-indigo-800">AI 분석 요약</h3>
            </div>

            <div className="bg-indigo-50/70 rounded-lg p-5 border-2 border-indigo-200">
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                {summary}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
