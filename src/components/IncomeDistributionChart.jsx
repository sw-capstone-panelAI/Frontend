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

  // ✅ 2. 각 구간별 인원 수 집계 (널 값 처리 추가)
  const distribution = incomeRanges.map((range) => {
    const count = panels.filter(
      (p) =>
        p.income !== null &&
        p.income !== undefined &&
        p.income >= range.min &&
        p.income <= range.max
    ).length;
    return { name: range.label, value: count };
  });

  // ✅ 3. 차트 렌더링
  return (
    // 🎨 차트 컨테이너: 흰색 배경 + 초록색 테두리
    <div className="flex flex-col bg-white border border-emerald-200 rounded-lg p-6 shadow-sm">
      {/* 📊 차트 제목 및 아이콘 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center space-x-3">
          <img
            src={incomePng}
            height="60px"
            width="60px"
            alt="소득 분포"
            className="object-contain"
          />
          <span className="text-emerald-700 font-medium">[소득 분포]</span>
        </h3>
      </div>

      {/* 📈 반응형 바 차트 */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={distribution}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#047857" }}
              axisLine={{ stroke: "#a7f3d0" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#047857" }}
              axisLine={{ stroke: "#a7f3d0" }}
              label={{
                value: "인원 (명)",
                angle: -90,
                position: "insideLeft",
                fill: "#047857",
              }}
            />
            <Tooltip
              formatter={(value) => [`${value}명`, "인원수"]}
              labelFormatter={(label) => `소득 구간: ${label}만원`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #a7f3d0",
                borderRadius: "8px",
              }}
            />
            {/* 🎨 바 색상: 부드러운 초록색 */}
            <Bar dataKey="value" fill="#34d399" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeDistributionChart;
