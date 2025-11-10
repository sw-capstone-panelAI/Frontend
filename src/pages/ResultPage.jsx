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
} from "lucide-react";
import AgeDistributionChart from "@components/AgeDistributionChart";
import GenderDistributionChart from "@components/GenderDistributionChart";
import IncomeDistributionChart from "@components/IncomeDistributionChart";
import ResidenceDistributionChart from "@components/ResidenceDistributionChart";
import Dropdown from "@components/Dropdown";
import AiFeatButton from "@components/common/button/AiFeatButton";

export default function ResultPage() {
  const location = useLocation();
  const { query: originalQuery, result } = location.state || {};

  const { panels = [], words = [] } = result || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!originalQuery || !result) {
      console.error("❌ 검색 결과 데이터가 없습니다!");
      console.log("originalQuery:", originalQuery);
      console.log("result:", result);
      navigate(routes.main);
    } else {
      console.log("✅ 검색 결과 수신:", panels.length, "개의 패널");
    }
  }, [originalQuery, result, panels, navigate]);

  const [newQuery, setQuery] = useState("");
  function onSearch() {
    if (!newQuery?.trim()) return;
    navigate(routes.search, { state: { query: `${newQuery}` } });
  }

  const [selectedPanel, setSelectedPanel] = useState(null);

  const headerHeight = "88px";

  const [trustfilter, setTrustfilter] = useState(0);
  const [filteredPanels, setFilteredPanels] = useState(panels);

  // useEffect(() => {
  //   setSelectedPanel(null);

  //   const newPanels = panels
  //     .filter((p) => p.reliability >= trustfilter)
  //     .sort((a, b) => {
  //       return b.reliability - a.reliability;
  //     });
  //   setFilteredPanels(newPanels);

  //   console.log("필터링된 패널:", newPanels.length);
  // }, [trustfilter, panels]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-emerald-50 to-teal-50">
      <header
        className="
              sticky top-0 z-30 p-5
              flex items-center gap-3
              bg-emerald-100 border-b-3 border-emerald-300 rounded-b-2xl shadow-sm
              "
      >
        <HeaderBar>
          <div className="w-320 p-1 mr-30 flex items-center bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl shadow-sm">
            <p className="px-2 py-1 mr-2 bg-white border-2 border-emerald-300 content-center rounded-xl text-emerald-700 text-sm">
              입력 쿼리
            </p>
            <span className="text-emerald-800 text-base">{originalQuery}</span>
          </div>

          <SearchInput
            value={newQuery}
            onChange={setQuery}
            onSearch={onSearch}
            placeholder="🤖 검색할 자연어 쿼리를 입력하세요! 🤖"
          />
        </HeaderBar>
      </header>

      <main className="flex-1" style={{ ["--header-h"]: headerHeight }}>
        <div className="flex gap-6 p-6">
          <section
            className="
              w-80 shrink-0 pr-2
              sticky
              top-[var(--header-h)]
              h-[calc(100vh-var(--header-h)-1.5rem)]
              overflow-y-auto
              bg-transparent
            "
          >
            <div className="font-bold pb-2 mb-3 border-b border-emerald-300">
              <div
                className="
              flex justify-between items-center w-full px-4 py-2
              rounded-full border-2 border-emerald-400 bg-emerald-100 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-7 h-7 text-emerald-600" />
                  <h2 className="text-emerald-800">검색 결과</h2>
                </div>
                <p className="text-right text-emerald-800">
                  {filteredPanels?.length ?? 0}명
                </p>
              </div>

              <div className="flex items-center mt-3 mb-1">
                <Filter className="w-6 h-6 text-emerald-600 mr-2" />
                <p className="text-emerald-800">신뢰도 필터 기능</p>
              </div>
              <Dropdown
                options={[
                  { label: "100%", value: "100" },
                  { label: "75%", value: "75" },
                  { label: "50%", value: "50" },
                  { label: "25%", value: "25" },
                  { label: "ALL", value: "0" },
                ]}
                value={trustfilter}
                onChange={setTrustfilter}
                placeholder="필터링 %를 선택하세요"
              />
            </div>

            {filteredPanels.map((panel) => (
              <PanelCard
                key={panel["패널id"]}
                panel={panel}
                selected={selectedPanel?.id === panel.id}
                onClick={() => setSelectedPanel(panel)}
              />
            ))}
          </section>

          <section className="flex-1 p-6 border-l border-emerald-200">
            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl text-emerald-800">
              <BrainCircuit className="w-10 h-10 text-emerald-600 mr-5" />
              AI 활용 기능
            </p>
            <div className="grid grid-cols-2 gap-4 m-6 mb-10">
              <AiFeatButton
                title="추천 검색어"
                content="현재 검색과 관련된 키워드를 시각화하여 보여드립니다. 새로운 검색 조합을 발견해보세요."
                exeText="마인드맵으로 탐색하기"
                color="emerald"
                icon={<Network className="text-emerald-600" />}
                onClick={() => {
                  navigate(routes.resultex, {
                    state: { query: `${originalQuery}` },
                  });
                }}
              />

              <AiFeatButton
                title="공통 특성 분석"
                content="검색된 패널들의 공통적인 특성을 AI가 자동으로 분석합니다. 숨겨진 패턴을 발견하세요."
                exeText="AI 분석 결과 보기"
                color="teal"
                icon={<SquaresIntersect className="text-teal-600" />}
                onClick={() => alert("공통 특성")}
              />
            </div>

            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-emerald-200 text-emerald-800">
              <UserRoundSearch className="w-10 h-10 text-emerald-600 mr-5" />
              패널 상세 정보
            </p>
            <div className="mb-10">
              <PanelDetailView selectedPanel={selectedPanel} />
            </div>

            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-emerald-200 text-emerald-800">
              <Users className="w-10 h-10 text-emerald-600 mr-5" />
              전체 패널 정보
            </p>
            <div className="mb-10">
              <TotalInfo panels={filteredPanels} />
            </div>

            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-emerald-200 text-emerald-800">
              <ChartColumnBig className="w-10 h-10 text-emerald-600 mr-5" />
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
