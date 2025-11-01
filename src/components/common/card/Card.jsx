import React from "react";
import { MapPin, Briefcase, DollarSign, Car } from "lucide-react";

export function PanelCard({ panel, onClick, selected }) {
  return (
    <div
      className={`p-4 my-1 rounded-lg cursor-pointer border ${
        selected
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-300 bg-gray-50 hover:bg-gray-200"
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
  if (!selectedPanel) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        패널을 선택하여 상세 정보를 확인하세요
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6">
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

          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              설문 제공: {selectedPanel.surveyProvider}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
