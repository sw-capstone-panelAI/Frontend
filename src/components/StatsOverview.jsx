import React from "react";

function StatsOverview({ stats }) {
  return (
    // 📊 통계 카드 그리드 레이아웃
    <div className="grid grid-cols-5 gap-4">
      {/* 📌 전체 패널 수 카드: 흰색 배경 + 초록색 테두리 */}
      <div className="bg-white border border-emerald-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-emerald-600 mb-1">[translate:전체 패널]</p>
        <p className="text-2xl text-gray-800">{stats.total}명</p>
      </div>

      {/* 📌 평균 연령 카드 */}
      <div className="bg-white border border-emerald-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-emerald-600 mb-1">[translate:평균 연령]</p>
        <p className="text-2xl text-gray-800">{stats.avgAge}[translate:세]</p>
      </div>

      {/* 📌 평균 소득 카드 */}
      <div className="bg-white border border-emerald-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-emerald-600 mb-1">[translate:평균 소득]</p>
        <p className="text-2xl text-gray-800">
          {stats.avgIncome}[translate:만원]
        </p>
      </div>

      {/* 📌 차량 보유 카드 */}
      <div className="bg-white border border-emerald-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-emerald-600 mb-1">[translate:차량 보유]</p>
        <p className="text-2xl text-gray-800">{stats.vehicleOwners}명</p>
      </div>

      {/* 📌 평균 신뢰도 카드 */}
      <div className="bg-white border border-emerald-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-emerald-600 mb-1">[translate:평균 신뢰도]</p>
        <p className="text-2xl text-gray-800">{stats.avgReliability}%</p>
      </div>
    </div>
  );
}

export default StatsOverview;
