import { useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

import Graph from "@assets/Graph.png";
import PanelData from "@assets/PanelData.png";
import ResultPage1 from "@assets/ResultPage1.png";
import ReliabilityFilter from "@assets/ReliabilityFilter.png";
import RelatedSearchPage from "@assets/RelatedSearchPage.png";
import Main from "@assets/Main.png";
import Searching from "@assets/Searching.png";
import History from "@assets/history.png";
import NoDataPage from "@assets/NodataPage.png";
import Common from "@assets/Common.png";

const guideSlides = [
  {
    title: "PanelFinder에 오신 것을 환영합니다! 🎉",
    description:
      "자연어로 원하는 패널을 쉽게 찾을 수 있는 AI 검색 서비스입니다.",
    page: "welcome",
    tooltips: [],
  },
  {
    title: "1단계: 메인 페이지에서 검색하기",
    description: "원하는 패널 조건을 자연어로 입력하세요.",
    page: "main",
    tooltips: [
      {
        position: "top-left",
        text: "PanelFinder 로고를 클릭하면 언제든 메인 페이지로 돌아올 수 있어요",
        icon: "🏠",
      },
      {
        position: "center",
        text: "지역, 연령, 성별, 인원수 등을 자유롭게 입력하세요\n예: '서울 20대 남자 100명'",
        icon: "✍️",
      },
      {
        position: "bottom",
        text: "Enter 키 또는 검색 버튼을 눌러 검색을 시작하세요",
        icon: "🔍",
      },
    ],
  },
  {
    title: "1-1단계: 검색 히스토리 활용하기",
    description: "이전에 검색했던 내역을 빠르게 다시 검색할 수 있습니다.",
    page: "history",
    tooltips: [
      {
        position: "left",
        text: "왼쪽 버튼을 클릭하면 검색 히스토리 사이드바가 열립니다",
        icon: "📜",
      },
      {
        position: "history-list",
        text: "최근 검색한 내역이 최대 10개까지 저장됩니다",
        icon: "🕐",
      },
      {
        position: "quick-search",
        text: "히스토리 항목을 클릭하면 바로 해당 검색을 다시 실행할 수 있어요",
        icon: "⚡",
      },
      {
        position: "delete",
        text: "개별 항목을 삭제하거나 전체 히스토리를 지울 수 있습니다",
        icon: "🗑️",
      },
    ],
  },
  {
    title: "2단계: AI가 패널을 검색 중",
    description: "AI가 입력한 조건을 분석하고 최적의 패널을 찾습니다.",
    page: "searching",
    tooltips: [
      {
        position: "top",
        text: "AI가 자연어를 이해하고 분석합니다",
        icon: "🧠",
      },
      {
        position: "middle",
        text: "실시간으로 검색 진행률을 확인할 수 있어요",
        icon: "📊",
      },
      {
        position: "bottom",
        text: "3단계 프로세스로 정확한 결과를 찾습니다",
        icon: "⚡",
      },
    ],
  },
  {
    title: "3-1단계: 검색 결과 - 패널 목록",
    description:
      "왼쪽에는 매칭된 패널 목록이, 오른쪽에는 AI 활용 기능과 전체 패널의 평균 정보가 표시됩니다.",
    page: "result-1",
    tooltips: [
      {
        position: "left",
        text: "매칭률이 높은 순으로 패널 카드가 나열됩니다",
        icon: "👥",
      },
      {
        position: "right",
        text: "AI가 추천하는 연관 검색어를 확인할 수 있습니다",
        icon: "🤖",
      },
      {
        position: "panel-detail",
        text: "패널을 클릭하면 상세 정보를 확인할 수 있습니다",
        icon: "📋",
      },
      {
        position: "reliability",
        text: "신뢰도 기능: 패널 정보에서 상식적이지 않은 데이터에 대해 감점을 부여합니다\n예: 80대가 중고등학생, 미성년자의 음주/흡연 경험 등\n감점 사유는 패널 상세 정보에서 확인 가능합니다",
        icon: "⚖️",
      },
    ],
  },
  {
    title: "3-2단계: 패널 상세 정보",
    description: "선택한 패널의 모든 정보를 자세히 확인할 수 있습니다.",
    page: "result-2",
    tooltips: [
      {
        position: "basic",
        text: "기본정보: 성별, 연령, 거주지 등의 기본 인적 사항",
        icon: "📝",
      },
      {
        position: "tendency",
        text: "고객성향: 월평균 소득/지출, 구매 패턴, 선호 브랜드, 쇼핑 성향 등",
        icon: "🎯",
      },
      {
        position: "reliability",
        text: "신뢰도만족: 응답 일관성, 논리적 오류, 상식 위배, 중복 응답 등의 감점 사유",
        icon: "⭐",
      },
      {
        position: "additional",
        text: "기타 추가정보: 직업, 학력, 결혼 여부, 취미, 관심사, 라이프스타일 등",
        icon: "➕",
      },
    ],
  },
  {
    title: "3-3단계: 신뢰도 필터 기능",
    description:
      "신뢰도 점수로 패널을 필터링하여 원하는 품질의 데이터만 확인할 수 있습니다.",
    page: "result-3",
    tooltips: [
      {
        position: "filter",
        text: "신뢰도 범위를 선택하여 해당 범주 안의 패널들만 표시합니다",
        icon: "🔧",
      },
      {
        position: "score",
        text: "0~100% 점수로 표현되며, 상식적이지 않은 데이터에 대해 감점됩니다",
        icon: "📊",
      },
      {
        position: "quality",
        text: "신뢰도가 높은 패널만 선별하여 데이터 품질을 향상시킬 수 있습니다",
        icon: "✅",
      },
    ],
  },
  {
    title: "3-4단계: 패널 정보 시각화",
    description:
      "패널의 주요 정보를 다양한 차트로 시각화하여 한눈에 파악할 수 있습니다.",
    page: "result-4",
    tooltips: [
      {
        position: "gender-age",
        text: "성별과 나이대 분포를 시각적으로 확인할 수 있습니다",
        icon: "📊",
      },
      {
        position: "region",
        text: "거주지는 권역별로 구분되어 표시됩니다",
        icon: "🗺️",
      },
      {
        position: "region-detail",
        text: "권역을 클릭하면 각 지역의 세부 인원 분포를 확인할 수 있습니다",
        icon: "🔍",
      },
    ],
  },
  {
    title: "4단계: 연관 검색어로 확장하기",
    description:
      "마인드맵으로 관련 키워드를 탐색하고 새로운 검색어를 만드세요.",
    page: "related",
    tooltips: [
      {
        position: "top",
        text: "원본 검색어와 관련된 키워드들이 연결선으로 표시됩니다",
        icon: "🗺️",
      },
      {
        position: "center",
        text: "원하는 키워드를 클릭하여 선택/해제하세요\n선택한 키워드는 초록색으로 강조됩니다",
        icon: "🎯",
      },
      {
        position: "bottom",
        text: "선택한 키워드로 새로운 검색어를 생성하고\n바로 검색을 시작할 수 있어요",
        icon: "✨",
      },
    ],
  },
  {
    title: "5단계: 공통 특성 분석",
    description:
      "마케팅 전문가를 위한 기능! AI가 검색된 패널들의 공통점을 자동으로 분석합니다.",
    page: "common",
    tooltips: [
      {
        position: "top",
        text: "마케팅 타겟 설정에 유용한 인사이트를 제공합니다",
        icon: "🎯",
      },
      {
        position: "analysis",
        text: "연령대, 지역, 소비 패턴 등 패널들의 주요 공통점을 파악합니다",
        icon: "📊",
      },
      {
        position: "marketing",
        text: "마케팅 캠페인 기획 시 타겟 세그먼트 이해에 활용하세요",
        icon: "💼",
      },
      {
        position: "insight",
        text: "AI가 발견한 패턴을 통해 새로운 마케팅 기회를 발견할 수 있습니다",
        icon: "💡",
      },
    ],
  },
  {
    title: "검색 결과가 없을 때",
    description:
      "조건에 맞는 패널이 없어도 걱정하지 마세요. 검색어를 조정해보세요.",
    page: "nodata",
    tooltips: [
      {
        position: "message",
        text: "검색 조건을 만족하는 패널이 없을 때 표시됩니다",
        icon: "🔍",
      },
      {
        position: "suggestion",
        text: "검색어를 더 넓게 조정하거나 다른 조건으로 시도해보세요",
        icon: "💡",
      },
      {
        position: "tips",
        text: "예: '서울 20대' → '수도권 20~30대'로 범위를 확장",
        icon: "✨",
      },
    ],
  },
  {
    title: "이제 시작해보세요! 🚀",
    description: "PanelFinder로 원하는 패널을 쉽고 빠르게 찾아보세요!",
    page: "finish",
    tooltips: [],
  },
];

function renderPageMockup(pageType) {
  switch (pageType) {
    case "welcome":
      return (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="bg-white rounded-2xl p-16 text-center space-y-8 shadow-2xl border-2 border-indigo-200">
            <div className="text-7xl animate-bounce">🎉</div>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PanelFinder
            </h3>
            <p className="text-gray-700 text-xl font-medium">
              AI 기반 패널 검색 서비스
            </p>
            <div className="flex justify-center gap-8 text-5xl">
              <span className="animate-pulse">💬</span>
              <span className="animate-pulse delay-100">🤖</span>
              <span className="animate-pulse delay-200">📊</span>
            </div>
          </div>
        </div>
      );

    case "main":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={Main}
              alt="메인 페이지"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "history":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={History}
              alt="검색 히스토리"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "searching":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={Searching}
              alt="검색 중 페이지"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "result-1":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={ResultPage1}
              alt="패널 목록"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "result-2":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={PanelData}
              alt="패널 상세 정보"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "result-3":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={ReliabilityFilter}
              alt="신뢰도 필터 기능"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "result-4":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={Graph}
              alt="패널 주요 정보 시각화"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "related":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <div className="mb-4 space-y-2">
              <h4 className="text-sm font-semibold text-indigo-700">
                원본 검색어
              </h4>
              <div className="bg-white border-2 border-indigo-300 rounded-lg px-4 py-2 text-base shadow-md">
                서울 20대 남자 100명
              </div>
            </div>
            <img
              src={RelatedSearchPage}
              alt="연관 검색어 마인드맵"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "common":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <div className="mb-4 bg-white rounded-lg p-4 shadow-md border-2 border-indigo-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💼</span>
                <h4 className="text-lg font-bold text-gray-800">
                  마케팅 전문가를 위한 인사이트
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                타겟 고객층의 공통점을 파악하여 효과적인 마케팅 전략을
                수립하세요
              </p>
            </div>
            <img
              src={Common}
              alt="공통 특성 분석"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
          </div>
        </div>
      );

    case "nodata":
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="p-6">
            <img
              src={NoDataPage}
              alt="검색 결과 없음"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-indigo-300"
            />
            <div className="mt-4 bg-white rounded-lg p-4 shadow-md border-2 border-indigo-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💡</span>
                <h4 className="text-lg font-bold text-gray-800">검색 팁</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 검색 조건의 범위를 넓혀보세요</li>
                <li>• 지역을 확장하거나 연령대를 늘려보세요</li>
                <li>• 필수 조건을 줄이고 다시 시도해보세요</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case "finish":
      return (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="bg-white rounded-2xl p-16 text-center space-y-8 shadow-2xl border-2 border-indigo-200">
            <div className="text-7xl animate-pulse">🚀</div>
            <h3 className="text-4xl font-bold text-gray-900">준비 완료!</h3>
            <p className="text-gray-700 text-xl font-medium">
              이제 PanelFinder를 사용해보세요
            </p>
            <div className="space-y-3 text-base text-gray-600 bg-indigo-50 rounded-lg p-6 border border-indigo-200">
              <p className="flex items-center justify-center gap-2">
                <span className="text-2xl">💡</span>
                구체적으로 입력할수록 더 정확한 결과
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-2xl">📊</span>
                통계 차트로 패널 특성 파악
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-2xl">🔄</span>
                연관 검색어로 다양한 탐색
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function GuideModal({ show, onClose, current, setCurrent }) {
  const slideContainerRef = useRef(null);

  useEffect(() => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollTop = 0;
    }
  }, [current]);

  if (!show) return null;

  const nextSlide = () =>
    current < guideSlides.length - 1 && setCurrent(current + 1);
  const prevSlide = () => current > 0 && setCurrent(current - 1);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full relative border-4 border-indigo-500 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-30 bg-white shadow-lg"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-8 pt-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {guideSlides[current].title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {guideSlides[current].description}
          </p>

          <div
            className="mb-6 h-[600px] overflow-y-auto border-2 border-gray-200 rounded-xl bg-gray-50"
            ref={slideContainerRef}
          >
            {renderPageMockup(guideSlides[current].page)}
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {guideSlides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "w-8 bg-indigo-600" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              disabled={current === 0}
              onClick={prevSlide}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                current === 0
                  ? "bg-gray-200 cursor-not-allowed text-gray-400"
                  : "bg-indigo-100 text-indigo-800 border-2 border-indigo-600 hover:bg-indigo-200"
              }`}
            >
              <ChevronLeft className="w-5 h-5" /> 이전
            </button>

            <span className="text-gray-600 font-medium">
              {current + 1} / {guideSlides.length}
            </span>

            {current < guideSlides.length - 1 ? (
              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg border-2 border-indigo-600 hover:bg-indigo-200 font-medium transition-colors"
              >
                다음 <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-indigo-800 rounded-lg hover:bg-indigo-700 font-bold transition-colors shadow-lg"
              >
                시작하기 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
