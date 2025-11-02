import { React, useState } from "react";
import {
  MapPin,
  Briefcase,
  Users,
  User,
  DollarSign,
  Car,
  AlertTriangle,
  ChevronDown,
  ListFilterPlus,
  Star,
} from "lucide-react";

export function PanelCard({ panel, onClick, selected }) {
  return (
    <div
      className={`p-4 my-1 rounded-lg cursor-pointer border ${
        selected
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-300 bg-gray-50 hover:border-yellow-600 hover:shadow-lg  hover:border-2"
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{panel.id}</h3>
      <p className="text-sm text-gray-600">
        {panel.age}세 · {panel.gender}
      </p>
      <p className="text-sm">
        {panel.occupation} · {panel.residence}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        신뢰도:
        <span
          className={`ml-1 font-semibold ${
            panel.reliability >= 75
              ? "text-green-600"
              : panel.reliability >= 50
              ? "text-yellow-600"
              : panel.reliability >= 25
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {panel.reliability}%
        </span>
      </p>
    </div>
  );
}

export function PanelDetailView({ selectedPanel }) {
  const [openCharac, setOpenCharac] = useState(false);
  const [openSubtract, setOpenSubtract] = useState(false);
  const [openAddInfo, setOpenAddInfo] = useState(false);

  if (!selectedPanel) {
    return (
      <div className="h-full flex items-center font-bold justify-center text-gray-500">
        👆원하는 패널을 클릭하여 상세 정보를 확인하세요👆
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl mb-2">{selectedPanel.id}</h2>
              <p className="text-gray-600">
                {selectedPanel.age}세 · {selectedPanel.gender}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-gray-600">신뢰도</span>
              <span
                className={`text-2xl ${
                  selectedPanel.reliability >= 75
                    ? "text-green-600"
                    : selectedPanel.reliability >= 50
                    ? "text-yellow-600"
                    : selectedPanel.reliability >= 25
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {selectedPanel.reliability}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">거주지</p>
                <p>{selectedPanel.residence}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">직업</p>
                <p>{selectedPanel.occupation}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">소득</p>
                <p>{selectedPanel.income.toLocaleString()}만원</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <Car className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">차량</p>
                <p>
                  {selectedPanel.vehicle.hasVehicle
                    ? selectedPanel.vehicle.type
                    : "없음"}
                </p>
              </div>
            </div>
          </div>

          {/* ▼▼ AI 한 줄 요약 ▼▼ */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className=" items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-semibold">고객 성향</h3>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    openCharac ? "rotate-180" : ""
                  }`}
                  onClick={() => setOpenCharac(() => !openCharac)}
                />
              </div>
              {openCharac && (
                <div className="bg-yellow-50 m-2 p-2 rounded-lg border border-yellow-200 shadow-lg">
                  {/* 목업 데이터가 아닐 경우 selectedPanel.고객성향문장 */}{" "}
                  null
                </div>
              )}
            </div>
          </div>

          {/* ▼▼ 신뢰도 감점 사유 섹션 ▼▼ */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className=" items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                <h3 className="text-xl font-semibold">신뢰도 감점 사유</h3>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    openSubtract ? "rotate-180" : ""
                  }`}
                  onClick={() => setOpenSubtract(() => !openSubtract)}
                />
              </div>
              {openSubtract && (
                <div className="bg-amber-100 m-2 p-2 rounded-lg border border-amber-200 shadow-lg">
                  {/* 목업 데이터가 아닐 경우 selectedPanel.신뢰도감점사유 */}
                  null
                </div>
              )}
            </div>
          </div>

          {/* ▼▼ 기타 추가 정보 섹션 ▼▼ */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className=" items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ListFilterPlus className="w-8 h-8 text-stone-400" />
                <h3 className="text-xl font-semibold">기타 추가 정보</h3>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    openAddInfo ? "rotate-180" : ""
                  }`}
                  onClick={() => setOpenAddInfo(() => !openAddInfo)}
                />
              </div>
              {openAddInfo && (
                <div className="bg-stone-100 m-2 p-2 rounded-lg border border-stone-300 shadow-lg">
                  {/* 목업 데이터가 아닐 경우 selectedPanel.기타추가정보 */}{" "}
                  null
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function TotalInfo({ panels = [] }) {
  // 패널 총원
  const panelsCnt = panels.length;

  // 평균 연령
  const panelsAge =
    panelsCnt > 0
      ? (panels.reduce((sum, p) => sum + (p.age || 0), 0) / panelsCnt).toFixed(
          1
        )
      : 0;

  // 평균 소득
  const panelsInco =
    panelsCnt > 0
      ? (
          panels.reduce((sum, p) => sum + (p.income || 0), 0) / panelsCnt
        ).toFixed(1)
      : 0;

  // 최빈 거주지 (가장 많이 사는 지역)
  const residenceCount = panels.reduce((acc, p) => {
    if (!p.residence) return acc;
    acc[p.residence] = (acc[p.residence] || 0) + 1;
    return acc;
  }, {});

  const panelsHome =
    Object.keys(residenceCount).length > 0
      ? Object.entries(residenceCount).sort((a, b) => b[1] - a[1])[0][0]
      : "-";

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 m-6 shadow-md">
      {/* 전체 패널 수 */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Users className="w-6 h-6" />
          <p className="font-semibold text-lg">전체 패널</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsCnt}명</p>
      </div>

      {/* 평균 연령 */}
      <div className="flex flex-col items-center flex-1 border-l border-indigo-100">
        <div className="flex items-center gap-2 text-rose-700 mb-2">
          <User className="w-6 h-6" />
          <p className="font-semibold text-lg">평균 연령</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsAge}세</p>
      </div>

      {/* 거주지 */}
      <div className="flex flex-col items-center flex-1 border-l border-indigo-100">
        <div className="flex items-center gap-2 text-yellow-600 mb-2">
          <MapPin className="w-6 h-6" />
          <p className="font-semibold text-lg">주요 거주지</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsHome}</p>
      </div>

      {/* 평균 소득 */}
      <div className="flex flex-col items-center flex-1 border-l border-indigo-100">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <DollarSign className="w-6 h-6" />
          <p className="font-semibold text-lg">평균 소득</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsInco}만원</p>
      </div>
    </div>
  );
}
