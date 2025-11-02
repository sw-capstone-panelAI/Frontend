import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import incomePng from "@assets/income.png";

function IncomeDistributionChart({ panels }) {
  // ✅ 1. 구간 정의
  const incomeRanges = [
    { label: "0~1999", min: 0, max: 1999 },
    { label: "2000~2999", min: 2000, max: 2999 },
    { label: "3000~3999", min: 3000, max: 3999 },
    { label: "4000~4999", min: 4000, max: 4999 },
    { label: "5000~5999", min: 5000, max: 5999 },
    { label: "6000~6999", min: 6000, max: 6999 },
    { label: "7000+", min: 7000, max: Infinity },
  ];

  // 널 값 처리 안했음 ----- 널 값 있으면 아마 오류 듯?
  // ✅ 2. 각 구간별 인원 수 집계
  const distribution = incomeRanges.map((range) => {
    const count = panels.filter(
      (p) => p.income >= range.min && p.income <= range.max
    ).length;
    return { name: range.label, value: count };
  });

  // ✅ 3. 차트 렌더링
  return (
    <div className="flex bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4 py-10 flex flex-col items-center text-center space-y-2">
        <img src={incomePng} height="150px" width="200px" alt="연령대 분포" />
        <span>[소득 분포]</span>
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={distribution}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value) => [`${value}명`, "인원수"]}
            labelFormatter={(label) => `소득 구간: ${label}만원`}
          />
          <Bar dataKey="value" fill="#14be56ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeDistributionChart;
