import React, { useEffect, useState } from "react";
import {
  PanelCard,
  PanelDetailView,
  TotalInfo,
} from "@components/common/card/Card";
import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import routes from "@utils/constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Filter,
  Users,
  Network,
  SquaresIntersect,
  UserRoundSearch,
  ChartColumnBig,
  BrainCircuit,
  Download,
} from "lucide-react";
import AgeDistributionChart from "@components/AgeDistributionChart";
import GenderDistributionChart from "@components/GenderDistributionChart";
import IncomeDistributionChart from "@components/IncomeDistributionChart";
import ResidenceDistributionChart from "@components/ResidenceDistributionChart";
import Dropdown from "@components/Dropdown";
import AiFeatButton from "@components/common/button/AiFeatButton";

export default function ResultPage() {
  const location = useLocation();
  const {
    query: originalQuery,
    model: searchModel,
    result,
  } = location.state || {};
  const { panels: rawPanels = [] } = result || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!originalQuery || !result) {
      console.error("❌ 검색 결과 데이터가 없습니다!");
      navigate(routes.main);
    }
  }, [originalQuery, result, navigate]);

  const [newQuery, setQuery] = useState("");
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [trustfilter, setTrustfilter] = useState("0");
  const [filteredPanels, setFilteredPanels] = useState([]);

  // 검색 모델 기본값 설정
  const currentModel = searchModel || "fast";

  function onSearch() {
    if (!newQuery?.trim()) return;

    // 히스토리에 추가 (중복 제거)
    const savedHistory = localStorage.getItem("searchHistory");
    const searchHistory = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistory = [
      newQuery,
      ...searchHistory.filter((h) => h !== newQuery),
    ].slice(0, 10); // 최대 10개
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    navigate(routes.search, {
      state: {
        query: `${newQuery}`,
        model: currentModel, // 현재 검색 모델 유지
      },
    });
  }

  useEffect(() => {
    setSelectedPanel(null);
    const filterValue = parseInt(trustfilter);

    let newPanels;
    if (filterValue === 100) {
      newPanels = rawPanels.filter((p) => p.reliability === 100);
    } else if (filterValue === 99) {
      newPanels = rawPanels.filter((p) => p.reliability < 100);
    } else if (filterValue === 0) {
      newPanels = [...rawPanels];
    } else {
      newPanels = rawPanels.filter((p) => p.reliability >= filterValue);
    }

    // 신뢰도 순으로 정렬 후 displayId 재할당
    newPanels = newPanels
      .sort((a, b) => b.reliability - a.reliability)
      .map((p, idx) => ({
        ...p,
        displayId: `패널${idx + 1}`,
      }));

    setFilteredPanels(newPanels);
  }, [trustfilter, rawPanels]);

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          panels: filteredPanels,
          query: originalQuery,
        }),
      });

      if (!response.ok) throw new Error("CSV 다운로드 실패");

      // 쿼리명 처리: 특수문자 제거, 길이 제한 50자
      let safeQuery = originalQuery
        .replace(/[^\w\sㄱ-힣]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 50)
        .trim();

      if (!safeQuery) {
        safeQuery = "패널데이터";
      }

      const today = new Date().toISOString().split("T")[0];
      const filename = `${safeQuery}_${today}.csv`;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log(`✅ CSV 다운로드 완료: ${filename}`);
    } catch (error) {
      console.error("❌ CSV 다운로드 오류:", error);
      alert("CSV 다운로드 중 오류가 발생했습니다.");
    }
  };

  const headerHeight = "88px";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      <header className="sticky top-0 z-30 p-5 flex items-center gap-3 bg-indigo-100 border-b-3 border-indigo-300 rounded-b-2xl shadow-sm">
        <HeaderBar />
        <div className="w-320 p-1 mr-30 flex items-center bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-xl shadow-sm">
          <p className="px-2 py-1 mr-2 bg-white border-2 border-indigo-300 rounded-xl text-indigo-700 text-sm">
            입력 쿼리
          </p>
          <span
            className="text-indigo-800 text-base truncate"
            title={originalQuery}
          >
            {originalQuery.length > 40
              ? `${originalQuery.substring(0, 40)}...`
              : originalQuery}
          </span>
        </div>
        <SearchInput
          value={newQuery}
          onChange={setQuery}
          onSearch={onSearch}
          placeholder="🤖 검색할 자연어 쿼리를 입력하세요! 🤖"
        />
      </header>

      <main className="flex-1" style={{ "--header-h": headerHeight }}>
        <div className="flex gap-6 p-6">
          {/* 왼쪽 리스트 */}
          <section className="w-80 shrink-0 pr-2 sticky top-[var(--header-h)] h-[calc(100vh-var(--header-h)-1.5rem)] overflow-y-auto bg-white/90 rounded-lg shadow-md">
            <div className="font-bold pb-2 mb-3 border-b border-indigo-300">
              <div className="flex justify-between items-center w-full px-4 py-2 rounded-full border-2 border-indigo-400 bg-indigo-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-7 h-7 text-indigo-600" />
                  <h2 className="text-indigo-800">검색 결과</h2>
                </div>
                <p className="text-right text-indigo-800">
                  {filteredPanels.length}명
                </p>
              </div>

              <button
                onClick={handleDownloadCSV}
                disabled={filteredPanels.length === 0}
                className="w-full mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-indigo-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>CSV 다운로드</span>
              </button>

              <div className="flex items-center justify-between mt-3 mb-1">
                <div className="flex items-center">
                  <Filter className="w-6 h-6 text-indigo-600 mr-2" />
                  <p className="text-indigo-800">신뢰도 필터 기능</p>
                </div>
                <div className="relative group">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white text-sm flex items-center justify-center cursor-help font-bold">
                    ?
                  </div>
                  <div className="absolute right-0 top-8 w-72 bg-white border-2 border-indigo-300 rounded-xl shadow-2xl p-5 invisible group-hover:visible z-[9999]">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-bold text-indigo-700 text-base">
                        신뢰도란?
                      </span>
                      <br />
                      <br />
                      패널 응답의 일관성과 정확성을 평가한 점수입니다.
                      나이·직업·차량정보 등의 논리적 모순을 검사하여 100점
                      만점으로 산출됩니다.
                    </p>
                  </div>
                </div>
              </div>
              <Dropdown
                options={[
                  { label: "100% (정확히 100점)", value: "100" },
                  { label: "100% 미만", value: "99" },
                  { label: "75% 이상", value: "75" },
                  { label: "50% 이상", value: "50" },
                  { label: "25% 이상", value: "25" },
                  { label: "ALL (전체)", value: "0" },
                ]}
                value={trustfilter}
                onChange={setTrustfilter}
                placeholder="필터링 %를 선택하세요"
              />
            </div>

            {filteredPanels.map((panel) => (
              <PanelCard
                key={panel.id}
                panel={panel}
                displayId={panel.displayId}
                selected={selectedPanel?.id === panel.id}
                onClick={() => setSelectedPanel(panel)}
              />
            ))}
          </section>

          {/* 오른쪽 상세정보 */}
          <section className="flex-1 p-6 border-l border-indigo-200 bg-white/90 rounded-lg shadow-md">
            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl text-indigo-800">
              <BrainCircuit className="w-10 h-10 text-indigo-600 mr-5" />
              AI 활용 기능
            </p>
            <div className="grid grid-cols-2 gap-4 m-6 mb-10">
              <AiFeatButton
                title="추천 검색어"
                content="현재 검색과 관련된 키워드를 시각화하여 보여드립니다. 새로운 검색 조합을 발견해보세요."
                exeText="마인드맵으로 탐색하기"
                color="indigo"
                icon={<Network className="text-indigo-600" />}
                onClick={() => {
                  navigate(routes.resultex, {
                    state: {
                      query: originalQuery,
                      model: currentModel, // 검색 모델 전달
                    },
                  });
                }}
              />
              <AiFeatButton
                title="공통 특성 분석"
                content="검색된 패널들의 공통적인 특성을 AI가 자동으로 분석합니다. 숨겨진 패턴을 발견하세요."
                exeText="AI 분석 결과 보기"
                color="indigo"
                icon={<SquaresIntersect className="text-indigo-600" />}
                onClick={() => {
                  navigate(routes.common, {
                    state: { panels: filteredPanels },
                  });
                }}
              />
            </div>

            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-indigo-200 text-indigo-800">
              <UserRoundSearch className="w-10 h-10 text-indigo-600 mr-5" />
              패널 상세 정보
            </p>
            <div className="mb-10">
              <PanelDetailView
                selectedPanel={selectedPanel}
                searchQuery={originalQuery}
              />
            </div>

            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-indigo-200 text-indigo-800">
              <Users className="w-10 h-10 text-indigo-600 mr-5" />
              전체 패널 정보
            </p>
            <div className="mb-10">
              <TotalInfo panels={filteredPanels} />
            </div>

            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-indigo-200 text-indigo-800">
              <ChartColumnBig className="w-10 h-10 text-indigo-600 mr-5" />
              패널 주요 정보 시각화
            </p>
            <div className="grid grid-cols-2 gap-4 px-6 pb-10">
              <AgeDistributionChart panels={filteredPanels} />
              <GenderDistributionChart panels={filteredPanels} />
              <IncomeDistributionChart panels={filteredPanels} />
              <ResidenceDistributionChart panels={filteredPanels} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
