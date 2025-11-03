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

const COLORS = [
  "#aec3ffff", // 10대
  "#aeaeffff", // 20대
  "#ae8bffff", // 30대
  "#ae6cffff", // 40대
  "#ae52ffff", // 50대
  "#ae2effff", // 60대
  "#ae23ffff", // 70대
  "#ae17ffff", // 80대
  "#ae00ffff", // 90대+
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
      const decade = Math.floor(a / 10); // 0~9, 10~19 → 1, 20대 → 2, ...
      let idx;
      if (decade <= 1) idx = 0; // 0~19세 → 10대 버킷에 포함
      else if (decade >= 9) idx = 8; // 90세 이상 → 90대+
      else idx = decade - 1; // 20대~80대
      buckets[idx].value += 1;
    }
    return buckets;
  }, [panels]);

  return (
    <div className="flex bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4 py-10 flex flex-col items-center text-center space-y-2">
        <img src={agePng} height="150px" width="200px" alt="연령대 분포" />
        <span>[연령대 분포]</span>
      </h3>

      <ResponsiveContainer width="100%" height={270}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AgeDistributionChart;
