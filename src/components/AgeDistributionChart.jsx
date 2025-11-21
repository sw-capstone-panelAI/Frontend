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
      if (!Number.isFinite(a)) continue;
      const decade = Math.floor(a / 10);
      let idx;
      if (decade <= 1) idx = 0;
      else if (decade >= 9) idx = 8;
      else idx = decade - 1;
      buckets[idx].value += 1;
    }
    return buckets;
  }, [panels]);

  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-indigo-900"> 연령대 분포</h3>
      </div>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#4338ca" }}
              axisLine={{ stroke: "#a5b4fc" }}
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
                border: "1px solid #cbd5e1",
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
