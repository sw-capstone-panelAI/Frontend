// AgeDistributionChart.jsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import agePng from "@assets/age.png";

// 🎨 연령대별 색상: 슬레이트+인디고 부드러운 그라데이션
const COLORS = [
  "#e0e7ff", // 10대 - indigo-100
  "#c7d2fe", // 20대 - indigo-200
  "#a5b4fc", // 30대 - indigo-300
  "#818cf8", // 40대 - indigo-400
  "#6366f1", // 50대 - indigo-500
  "#4f46e5", // 60대 - indigo-600
  "#4338ca", // 70대 - indigo-700
  "#3730a3", // 80대 - indigo-800
  "#312e81", // 90대+ - indigo-900
];

function AgeDistributionChart({ panels = [] }) {
  // 연령대 버킷 계산 (10대~90대+)
  const data = useMemo(() => {
    const buckets = [
      { name: "10대", value: 0 },
      { name: "20대", value: 0 },
      { name: "30대", value: 0 },
      { name: "40대", value: 0 },
      { name: "50대", value: 0 },
      { name: "60대", value: 0 },
      { name: "70대", value: 0 },
      { name: "80대", value: 0 },
      { name: "90대+", value: 0 },
    ];

    for (const p of panels) {
      const a = Number(p?.age);
      if (!Number.isFinite(a)) continue; // 숫자 아님 → 스킵
      const decade = Math.floor(a / 10);
      let idx;
      if (decade <= 1) idx = 0; // 0~19세 → 10대 버킷
      else if (decade >= 9) idx = 8; // 90세 이상 → 90대+
      else idx = decade - 1; // 20대~80대
      buckets[idx].value += 1;
    }
    return buckets;
  }, [panels]);

  return (
    // 🎨 차트 컨테이너: 흰색 배경 + 슬레이트 계열 테두리
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
      {/* 📊 차트 제목 및 아이콘 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center space-x-3">
          <img
            src={agePng}
            height="60px"
            width="60px"
            alt="연령대 분포"
            className="object-contain"
          />
          <span className="text-indigo-700 font-medium">[연령대 분포]</span>
        </h3>
      </div>

      {/* 📈 반응형 차트 컨테이너 */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />{" "}
            {/* indigo-100 */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#4338ca" }} /* indigo-700 */
              axisLine={{ stroke: "#a5b4fc" }} /* indigo-300 */
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#4338ca" }}
              axisLine={{ stroke: "#a5b4fc" }}
              label={{
                value: "인원 (명)",
                angle: -90,
                position: "insideLeft",
                fill: "#4338ca",
              }}
            />
            <Tooltip
              formatter={(value) => [`${value}명`, "인원"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #cbd5e1", // slate-300
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AgeDistributionChart;
