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
  Sparkles,
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
  const { query, result } = location.state || {};
  const { panels, words } = result;

  // 페이지 전환시 데이터 전송 처리를 위한 객체
  const navigate = useNavigate();

  // 상단 바 검색창 새쿼리 입력시 재검색
  const [newQuery, setQuery] = useState("");
  function onSearch() {
    if (!query?.trim()) return;
    navigate("routes.search", { state: { query: `${newQuery}` } });
  }

  // 상세 패널 선택 여부 상태관리
  const [selectedPanel, setSelectedPanel] = useState(null);

  // 헤더 실제 높이에 맞게 바꿔 주세요 (px 단위). 예: 88px
  const headerHeight = "88px";

  //신뢰도 필터 (0 ~ 100), 신뢰도 필터링 값 변경시 리렌더링
  const [trustfilter, setTrustfilter] = useState(0);
  const [filteredPanels, setFilteredPanels] = useState(panels);
  useEffect(() => {
    setSelectedPanel(null); // 필터 값 선택될 경우 상세패널 컴포넌트 null

    const newPanels = panels
      .filter((p) => p.reliability >= trustfilter)
      .sort((a, b) => {
        return b.reliability - a.reliability;
      });
    setFilteredPanels(newPanels);

    console.log(panels);
  }, [trustfilter, panels]);

  return (
    // ✅ 전체 배경은 루트 컨테이너에
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-100 to-yellow-50">
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
            {/* 드롭다운 박스 신뢰도 필터링 기능 */}
            <div className=" font-bold pb-2 mb-3 border-b border-gray-400">
              <div
                className="
              flex justify-between items-center w-full px-4 py-2
              rounded-full border-2 border-fuchsia-900 bg-pink-100"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-7 h-7 text-primary" />
                  <h2>검색 결과</h2>
                </div>
                <p className="text-right">{filteredPanels?.length ?? 0}명</p>
              </div>
              <div className="flex items-center mt-3 mb-1">
                <Filter className="w-6 h-6 text-blue-700 mr-2" />
                <p>신뢰도 필터 기능</p>
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
                key={panel.id}
                panel={panel}
                selected={selectedPanel?.id === panel.id}
                onClick={() => setSelectedPanel(panel)}
              />
            ))}
          </section>

          {/* 우측: 상세 (페이지 전체 스크롤에 따라 함께 스크롤) */}
          <section className="flex-1 pl-6 border-l border-gray-400">
            {/* AI 기능 버튼 */}
            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl">
              <BrainCircuit className="w-10 h-10 text-blue-700 mr-5" />
              AI 활용 기능
            </p>
            <div className=" grid grid-cols-2 gap-4 m-6 mb-10">
              {/* 패널 공통 특성 요약 버튼 */}
              <AiFeatButton
                title="연관 검색어"
                content="현재 검색과 관련된 키워드를 시각화하여 보여드립니다. 새로운 검색 조합을 발견해보세요."
                exeText="마인드맵으로 탐색하기"
                color="indigo"
                icon={<Network className="text-indigo-700" />}
                // 페이지 전환
                onClick={() => {
                  navigate(routes.resultex);
                }}
              />

              {/* 쿼리 추천 검색어 버튼 */}
              <AiFeatButton
                title="공통 특성 분석"
                content="검색된 패널들의 공통적인 특성을 AI가 자동으로 분석합니다. 숨겨진 패턴을 발견하세요."
                exeText="AI 분석 결과 보기"
                color="blue"
                icon={<SquaresIntersect className="text-blue-700" />}
                // 페이지 전환
                onClick={() => alert("공통 특성")}
              />
            </div>

            {/* 패널 카드 선택시 디테일 카드 */}
            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-gray-400">
              <UserRoundSearch className="w-10 h-10 text-blue-700 mr-5" />
              패널 상세 정보
            </p>
            <div className="mb-10">
              <PanelDetailView selectedPanel={selectedPanel} />
            </div>

            {/* 전체 패널 요약 정보 */}
            <p className="flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-gray-400">
              <Users className="w-10 h-10 text-blue-700 mr-5" />
              전체 패널 정보
            </p>
            <div className="mb-10">
              <TotalInfo panels={filteredPanels} />
            </div>

            {/* 패널 그래프 시각화 */}
            <p className=" flex ml-7 mb-3 pt-2 font-bold text-2xl border-t border-gray-400">
              <ChartColumnBig className="w-10 h-10 text-blue-700 mr-5" />
              패널 주요 정보 시각화
            </p>
            <div className="grid grid-cols-2 gap-4 px-6 pb-10">
              {/* 연령 그래프 */}
              <AgeDistributionChart panels={filteredPanels} />

              {/* 성비 그래프 */}
              <GenderDistributionChart panels={filteredPanels} />

              {/* 직업 그래프 */}
              <IncomeDistributionChart panels={filteredPanels} />

              {/* 거주지 그래프 */}
              <ResidenceDistributionChart panels={filteredPanels} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
