import React, { useState } from "react";
import { PanelCard, PanelDetailView } from "../components/common/card/Card";
import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { MapPin, Briefcase, DollarSign, Car } from "lucide-react";
import { Button } from "../components/common/button/Button";

import AgeDistributionChart from "../components/AgeDistributionChart";
import GenderDistributionChart from "../components/GenderDistributionChart";

import OccupationDistributionChart from "../components/OccupationDistributionChart";
import ResidenceDistributionChart from "../components/ResidenceDistributionChart";

export default function ResultPage() {
  /*---------------백엔드에서 받아올 목업 데이터 관련---------------------*/
  //location 객체 생성(페이지간 데이터 전송을 위한 객체? 정도로 생각하면 될듯)
  const location = useLocation();
  // searchingPage에서 query와 panels 데이터를 받아옴
  const { query, result } = location.state || {};
  const { panels, words } = result; // result에는(패널, 추천어, 공통 특성 ...등 모든 요청 데이터들이 들어있음)

  console.log(words);
  /*---------------쿼리 재입력을 위한 함수----------------------------*/
  const navigate = useNavigate();
  const [newQuery, setQuery] = useState("");
  // 검색 함수(인풋 입력 후 서버 전송)
  function onSearch() {
    if (!query.trim()) return; // 빈 값 전송 방지

    console.log(newQuery); // 서버에 입력 데이터 전송
    navigate("/search", { state: { query: `${newQuery}` } }); // 서칭 페이지로 넘어감 (로딩 화면)
  }

  /*---------------패널 관련----------------------------*/
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

  return (
    <div className="overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/*헤더바 영역*/}
      <header className="p-3 bg-indigo-100">
        <HeaderBar>
          <div
            className="
            w-320 p-1 mr-20 flex text-xl font-bold items-center
            bg-gradient-to-r from-indigo-500 to-100 rounded-xl"
          >
            <p className="p-1 py-2 mr-2 bg-blue-100 content-center rounded-xl">
              입력 쿼리
            </p>{" "}
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
      {/*메인 영역*/}
      <main>
        <div className="w-screen flex gap-6 p-6 max-h-screen bg-blue-50">
          {/* 좌측: 패널 리스트 */}
          <section className="w-80 overflow-y-auto">
            {panels.map((panel) => (
              <PanelCard
                key={panel.id}
                panel={panel}
                selected={selectedPanel?.id === panel.id}
                onClick={() => setSelectedPanel(panel)}
              />
            ))}
          </section>

          {/* 우측: 패널 상세보기 */}
          <section
            className="flex-1 pl-6 flex flex-col"
            style={{ maxHeight: "calc(100vh - 48px)" }}
          >
            <div className="flex-1 border-l border-gray-300">
              <PanelDetailView selectedPanel={selectedPanel} />
            </div>

            <div className="grid grid-cols-2 gap-3">
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
