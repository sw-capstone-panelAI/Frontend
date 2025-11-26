import { useState, useEffect } from "react";
import { Loader2, Sparkles, ArrowLeft, X, AlertCircle } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";
import axios from "axios";

const positions = [
  { x: 30, y: 20 },
  { x: 70, y: 20 },
  { x: 15, y: 50 },
  { x: 85, y: 50 },
  { x: 30, y: 80 },
  { x: 70, y: 80 },
];
const CENTER_POS = { x: 50, y: 50 };

function MindMapNode({
  label,
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
      </div>
    </div>
  );
}

function ToastNotification({ show, message }) {
  if (!show) return null;

  return (
    <div
      className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-300"
      style={{
        left: "50%",
        top: "50%",
      }}
    >
      <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-amber-600 max-w-xs">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <p className="text-sm font-bold whitespace-pre-line">{message}</p>
        </div>
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-amber-600"></div>
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-500 absolute left-1/2 transform -translate-x-1/2 -top-[9px]"></div>
        </div>
      </div>
    </div>
  );
}

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
          className="w-full bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold text-lg border-2 border-indigo-600 hover:bg-indigo-200 transition-colors"
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { query: originalQuery, model: searchModel } = location.state || {};

  // 검색 모델 기본값 설정
  const currentModel = searchModel || "fast";

  async function fetchKeyword(originalQuery) {
    try {
      console.log("키워드 생성 요청: ", { originalQuery });

      const res = await axios.post(
        "http://localhost:5000/api/related-keywords",
        {
          query: originalQuery,
        }
      );

      console.log("생성된 추천어:", res.data);
      setRelatedQueries(res.data);
      setLoading(false);
    } catch (err) {
      console.error("요청 실패:", err);
      alert("키워드 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      navigate(-1);
    }
  }

  async function fetchNewQuery(originalQuery, selectedQueries) {
    try {
      console.log("추천어기반 쿼리생성 요청: ", { selectedQueries });

      const res = await axios.post(
        "http://localhost:5000/api/keywords-newQuery",
        {
          query: originalQuery,
          keywords: selectedQueries,
        }
      );

      console.log("생성된 추천어:", res.data);
      setRecommendedQuery(res.data.query);
      setLoading(false);
    } catch (err) {
      console.error("요청 실패:", err);
      alert("키워드 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      navigate(-1);
    }
  }

  useEffect(() => {
    fetchKeyword(originalQuery);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const showToastNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const toggleQuery = (q) => {
    setSelectedQueries((prev) => {
      if (prev.includes(q)) {
        return prev.filter((x) => x !== q);
      }

      if (prev.length >= 4) {
        showToastNotification("최대 4개까지만\n선택할 수 있습니다!");
        return prev;
      }

      return [...prev, q];
    });
  };

  const generateQuery = () => {
    setLoading(true);
    fetchNewQuery(originalQuery, selectedQueries);
  };

  const handleSearch = () => {
    if (recommendedQuery) {
      const savedHistory = localStorage.getItem("searchHistory");
      const searchHistory = savedHistory ? JSON.parse(savedHistory) : [];
      const newHistory = [
        recommendedQuery,
        ...searchHistory.filter((h) => h !== recommendedQuery),
      ].slice(0, 10);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      navigate(routes.search, {
        state: {
          query: recommendedQuery,
          model: currentModel, // 검색 모델 유지
        },
      });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex flex-col font-sans">
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
        <SimpleModal message={message} onClose={() => setMessage(null)} />

        <section className="mb-6">
          <h3 className="mb-1 text-indigo-700 text-sm font-semibold">
            원본 검색어
          </h3>
          <p className="bg-white p-3 rounded-lg shadow-sm border-2 border-indigo-200 font-medium text-indigo-700">
            {originalQuery}
          </p>
        </section>

        <section
          className="flex-1 relative bg-white rounded-xl shadow-md p-8 mb-6 border-2 border-indigo-200"
          style={{ minHeight: 500 }}
        >
          <ToastNotification show={showToast} message={toastMessage} />

          {loading && relatedQueries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full absolute inset-0 bg-white/80 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
              <p className="mt-3 text-indigo-700 font-medium">
                관련 키워드 분석 중...
              </p>
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
                      stroke={isSelected ? "#4f46e5" : "#c7d2fe"}
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
                  position={positions[idx] || CENTER_POS}
                  onClick={() => toggleQuery(item.text)}
                  isSelected={selectedQueries.includes(item.text)}
                />
              ))}
            </>
          )}
        </section>

        {selectedQueries.length > 0 && (
          <section className="mb-6">
            <p className="text-sm text-indigo-700 mb-2 font-semibold">
              선택한 키워드 ({selectedQueries.length}/4):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedQueries.map((q) => (
                <div
                  key={q}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full cursor-pointer border-2 border-indigo-600 hover:bg-indigo-200 transition-colors text-sm font-medium"
                  onClick={() => toggleQuery(q)}
                >
                  {q} <span className="text-indigo-500">✕</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-white border-2 border-indigo-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-800">추천 검색어 생성</h3>
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
              <div className="bg-indigo-50/70 rounded-lg p-4 border-2 border-indigo-200 mb-4 shadow-sm">
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
                  className="flex-1 bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold border-2 border-indigo-600 hover:bg-indigo-200 transition-colors shadow-sm"
                >
                  이 검색어로 검색하기
                </button>
                <button
                  onClick={() => setRecommendedQuery("")}
                  className="bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold border-2 border-indigo-600 hover:bg-indigo-200 transition-colors"
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
                className="w-full bg-indigo-100 text-indigo-800 py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 border-2 border-indigo-600 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
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
