import React from "react";

function StatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">
          [translate:전체 패널]
        </p>
        <p className="text-2xl">{stats.total}명</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">
          [translate:평균 연령]
        </p>
        <p className="text-2xl">{stats.avgAge}[translate:세]</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">
          [translate:평균 소득]
        </p>
        <p className="text-2xl">{stats.avgIncome}[translate:만원]</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">
          [translate:차량 보유]
        </p>
        <p className="text-2xl">{stats.vehicleOwners}명</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">
          [translate:평균 신뢰도]
        </p>
        <p className="text-2xl">{stats.avgReliability}%</p>
      </div>
    </div>
  );
}

export default StatsOverview;
