import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function GenderDistributionChart({ panels }) {
  const maleCount = panels.filter((p) => p.gender === "남성").length;
  const femaleCount = panels.filter((p) => p.gender === "여성").length;

  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-indigo-900"> 성별 분포</h3>
      </div>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={[
                { name: "남성", value: maleCount },
                { name: "여성", value: femaleCount },
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              dataKey="value"
            >
              <Cell fill="#4f46e5" />
              <Cell fill="#64748b" />
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}명`, "인원"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GenderDistributionChart;
