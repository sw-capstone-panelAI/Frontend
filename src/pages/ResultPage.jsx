import React, { useState } from "react";
import { PanelCard, PanelDetailView } from "../components/common/card/Card";
import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useLocation, useNavigate } from "react-router-dom";

import AgeDistributionChart from "../components/AgeDistributionChart";
import GenderDistributionChart from "../components/GenderDistributionChart";
import OccupationDistributionChart from "../components/OccupationDistributionChart";
import ResidenceDistributionChart from "../components/ResidenceDistributionChart";

export default function ResultPage() {
  const location = useLocation();
  const { query, result } = location.state || {};
  const { panels, words } = result;
  const navigate = useNavigate();

  const [newQuery, setQuery] = useState("");
  function onSearch() {
    if (!query?.trim()) return;
    navigate("/search", { state: { query: `${newQuery}` } });
  }

  const [selectedPanel, setSelectedPanel] = useState(null);

  const ageDistribution = [
    { name: "20대", value: 40 },
    { name: "30대", value: 30 },
    { name: "40대", value: 20 },
    { name: "50대", value: 10 },
  ];
  const genderStats = { male: 55, female: 45 };
  const occupationDistribution = [
    { name: "개발자", value: 35 },
    { name: "디자이너", value: 25 },
    { name: "마케터", value: 15 },
    { name: "영업", value: 15 },
    { name: "기타", value: 10 },
  ];
  const residenceDistribution = [
    { name: "서울", value: 50 },
    { name: "부산", value: 20 },
    { name: "대구", value: 10 },
    { name: "인천", value: 10 },
    { name: "광주", value: 10 },
  ];

  // 헤더 실제 높이에 맞게 바꿔 주세요 (px 단위). 예: 88px
  const headerHeight = "88px";

  return (
    // ✅ 전체 배경은 루트 컨테이너에
    <div className="min-h-screen flex flex-col bg-teal-50">
      {/* 헤더 */}
      <header
        className="sticky top-0 z-30 p-3 bg-indigo-100 border-b-3 border-violet-500 rounded-b-2xl"
        style={{ height: headerHeight }} // (선택) 고정 높이 쓰면 계산이 더 명확
      >
        <HeaderBar>
          <div className="w-320 p-1 mr-20 flex text-xl font-bold items-center bg-gradient-to-r from-fuchsia-400 to-100 rounded-xl">
            <p className="p-1 py-2 mr-2 bg-slate-50 border-2 border-indigo-400 content-center rounded-xl">
              입력 쿼리
            </p>
            {query}
          </div>
          <SearchInput
            value={newQuery}
            onChange={setQuery}
            onSearch={onSearch}
            placeholder="🤖 검색할 자연어 쿼리를 입력하세요! 🤖"
          />
        </HeaderBar>
      </header>

      {/* 본문 */}
      {/* ✅ 헤더 높이를 CSS 변수로 내려 sticky와 height 계산에 재사용 */}
      <main className="flex-1" style={{ ["--header-h"]: headerHeight }}>
        <div className="flex gap-6 p-6">
          {/* 좌측: 패널 리스트 (독립 스크롤) */}
          <section
            className="
              w-80 shrink-0 pr-2
              sticky
              top-[var(--header-h)]               /* 헤더 바로 아래에 붙음 */
              h-[calc(100vh-var(--header-h)-1.5rem)]  /* 화면높이 - 헤더 - p-6의 위쪽 패딩(=1.5rem) */
              overflow-y-auto
              bg-transparent
            "
          >
            {panels.map((panel) => (
              <PanelCard
                key={panel.id}
                panel={panel}
                selected={selectedPanel?.id === panel.id}
                onClick={() => setSelectedPanel(panel)}
              />
            ))}
          </section>

          {/* 우측: 상세 (페이지 전체 스크롤에 따라 함께 스크롤) */}
          <section className="flex-1 pl-6 border-l border-gray-400">
            <div>
              <PanelDetailView selectedPanel={selectedPanel} />
            </div>

            <div className="grid grid-cols-2 gap-4 px-6 pb-10">
              <AgeDistributionChart ageDistribution={ageDistribution} />
              <GenderDistributionChart stats={genderStats} />
              <OccupationDistributionChart
                occupationDistribution={occupationDistribution}
              />
              <ResidenceDistributionChart
                residenceDistribution={residenceDistribution}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
