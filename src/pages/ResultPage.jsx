import React, { useState } from "react";
import { PanelCard, PanelDetailView } from "../components/common/card/Card";
import HeaderBar from "@common/bar/HeaderBar";
import { SearchInput } from "@components/SearchInput";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  /*---------------백엔드에서 받아올 목업 데이터 관련---------------------*/
  //location 객체 생성(페이지간 데이터 전송을 위한 객체? 정도로 생각하면 될듯)
  const location = useLocation();
  // searchingPage에서 query와 panels 데이터를 받아옴
  const { query, panels } = location.state || {};

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

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
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
        <div className="flex gap-6 p-6 min-h-screen">
          {/* 좌측: 패널 리스트 */}
          <div className="w-80">
            {panels.map((panel) => (
              <PanelCard
                key={panel.id}
                panel={panel}
                selected={selectedPanel?.id === panel.id}
                onClick={() => setSelectedPanel(panel)}
              />
            ))}
          </div>

          {/* 우측: 패널 상세보기 */}
          <div className="flex-1 border-l border-gray-300">
            <PanelDetailView selectedPanel={selectedPanel} />
          </div>
        </div>
      </main>
    </div>
  );
}
