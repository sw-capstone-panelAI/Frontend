// 성별 분포 차트 (호환성 유지, 번역 포함)
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import genderPng from "@assets/gender.png";

function GenderDistributionChart({ panels }) {
  const maleCount = panels.filter((p) => p.gender === "남성").length;
  const femaleCount = panels.filter((p) => p.gender === "여성").length;

  return (
    <div className="flex bg-card bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4 py-10 flex flex-col items-center text-center">
        <img src={genderPng} height="150px" width="200px" /> [성별 분포]
      </h3>
      <ResponsiveContainer width="50%" height={250}>
        <PieChart>
          <Pie
            data={[
              { name: "[남성]", value: maleCount },
              { name: "[여성]", value: femaleCount },
            ]}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill="rgba(86, 131, 255, 1)" />
            <Cell fill="rgba(255, 88, 247, 1)" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default GenderDistributionChart;
