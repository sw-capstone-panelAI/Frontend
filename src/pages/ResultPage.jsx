import React, { useState } from "react";
import { PanelCard, PanelDetailView } from "../components/common/card/Card";

export default function ResultPage() {
  const panels = [
    {
      id: "패널001",
      age: 35,
      gender: "남성",
      occupation: "개발자",
      residence: "서울",
      income: 5000,
      reliability: 80,
      vehicle: { hasVehicle: true, type: "SUV" },
      surveyProvider: "설문사 A",
    },
    {
      id: "패널002",
      age: 42,
      gender: "여성",
      occupation: "디자이너",
      residence: "부산",
      income: 4200,
      reliability: 65,
      vehicle: { hasVehicle: false, type: "" },
      surveyProvider: "설문사 B",
    },
  ];

  const [selectedPanel, setSelectedPanel] = useState(null);

  return (
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
  );
}
