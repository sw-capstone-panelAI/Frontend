import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";
import { PanelCard } from "@components/common/card/Card";
import AgeDistributionChart from "@components/AgeDistributionChart";
import GenderDistributionChart from "@components/GenderDistributionChart";
import ResidenceDistributionChart from "@components/ResidenceDistributionChart";
import Dropdown from "@components/Dropdown";
import AiFeatButton from "@components/common/button/AiFeatButton";

export default function ResultPagePreview() {
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [trustfilter, setTrustfilter] = useState(0);

  // 예시 데이터
  const mockQuery = "서울 20대 남자 100명";
  const mockPanels = [
    {
      panel_id: "P001",
      panel_code: "PANEL-001",
      reliability: 95,
      demographics: {
        gender: { male: 120, female: 0 },
        age: { "20s": 120 },
        residence: { 서울특별시: 120 },
        income: { "300-400만원": 80, "400-500만원": 40 },
      },
    },
    {
      panel_id: "P002",
      panel_code: "PANEL-002",
      reliability: 88,
      demographics: {
        gender: { male: 85, female: 0 },
        age: { "20s": 85 },
        residence: { 서울특별시: 85 },
        income: { "200-300만원": 50, "300-400만원": 35 },
      },
    },
  ];

  const filteredPanels = mockPanels.filter((p) => p.reliability >= trustfilter);

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-white via-emerald-50 to-teal-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 p-3 flex items-center gap-3 bg-emerald-100 border-b-3 border-emerald-300 rounded-b-2xl shadow-sm">
        <HeaderBar>
          {/* 입력 쿼리 표시 */}
          <div className="w-64 p-1 mr-4 flex items-center bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl shadow-sm">
            <p className="px-2 py-1 mr-2 bg-white border-2 border-emerald-300 rounded-xl text-emerald-700 text-xs">
              입력 쿼리
            </p>
            <span className="text-emerald-800 text-sm">{mockQuery}</span>
          </div>

          {/* 검색 입력창 */}
          <div className="relative w-48">
            <input
              type="text"
              placeholder="새 검색..."
              className="w-full h-9 pl-3 pr-10 border-2 border-emerald-200 rounded-xl bg-white text-gray-700 text-sm outline-none"
              readOnly
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-500 text-white rounded-lg">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </HeaderBar>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* 왼쪽: 패널 목록 */}
        <div className="w-2/5 flex flex-col gap-3 overflow-y-auto">
          {/* 검색 결과 헤더 */}
          <div className="flex justify-between items-center px-4 py-2 rounded-full border-2 border-emerald-400 bg-emerald-100 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              <span className="text-sm font-bold text-emerald-800">
                검색 결과
              </span>
            </div>
            <span className="text-sm font-bold text-emerald-800">
              {filteredPanels.length}명
            </span>
          </div>

          {/* 신뢰도 필터 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2">
              <span className="text-base">🔧</span>
              <span className="text-sm text-emerald-800 font-medium">
                신뢰도 필터
              </span>
            </div>
            <Dropdown
              selected={trustfilter}
              setSelected={setTrustfilter}
              options={[
                { value: 0, label: "ALL" },
                { value: 50, label: "50% 이상" },
                { value: 70, label: "70% 이상" },
                { value: 90, label: "90% 이상" },
              ]}
            />
          </div>

          {/* 패널 카드 목록 */}
          {filteredPanels.map((panel, idx) => (
            <PanelCard
              key={panel.panel_id}
              panel={panel}
              selected={selectedPanel?.panel_id === panel.panel_id}
              onClick={() => setSelectedPanel(panel)}
            />
          ))}
        </div>

        {/* 오른쪽: 통계 및 AI 기능 */}
        <div className="flex-1 flex flex-col gap-3 border-l-2 border-emerald-200 pl-4 overflow-y-auto">
          {/* AI 기능 섹션 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <h3 className="text-base font-bold text-emerald-800">
                AI 활용 기능
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <AiFeatButton
                title="추천 검색어"
                description="관련 키워드 시각화"
                icon={<span className="text-base">🗺️</span>}
                onClick={() => {}}
                bgColor="from-emerald-50 to-emerald-100"
                borderColor="border-emerald-300"
                textColor="text-emerald-900"
                buttonColor="bg-emerald-500"
              />
              <AiFeatButton
                title="공통 특성"
                description="AI 자동 분석"
                icon={<span className="text-base">📊</span>}
                onClick={() => {}}
                bgColor="from-teal-50 to-teal-100"
                borderColor="border-teal-300"
                textColor="text-teal-900"
                buttonColor="bg-teal-500"
              />
            </div>
          </div>

          {/* 패널 상세 정보 */}
          {selectedPanel && (
            <div className="border-t-2 border-emerald-200 pt-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                <h3 className="text-base font-bold text-emerald-800">
                  패널 상세 정보
                </h3>
              </div>

              {/* 성별 분포 */}
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-3 shadow-sm">
                <h4 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1">
                  <span>👥</span> 성별 분포
                </h4>
                <GenderDistributionChart
                  demographics={selectedPanel.demographics}
                />
              </div>

              {/* 나이대 분포 */}
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-3 shadow-sm">
                <h4 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1">
                  <span>🎂</span> 나이대 분포
                </h4>
                <AgeDistributionChart
                  demographics={selectedPanel.demographics}
                />
              </div>

              {/* 거주지 분포 */}
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-3 shadow-sm">
                <h4 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1">
                  <span>🗺️</span> 거주지 분포
                </h4>
                <ResidenceDistributionChart
                  demographics={selectedPanel.demographics}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
