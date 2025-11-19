// 성별 분포 차트 (호환성 유지, 번역 포함)
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import genderPng from "@assets/gender.png";

function GenderDistributionChart({ panels }) {
  // 📊 성별별 인원수 집계
  const maleCount = panels.filter((p) => p.gender === "남성").length;
  const femaleCount = panels.filter((p) => p.gender === "여성").length;

  return (
    // 🎨 차트 컨테이너: 흰색 배경 + 슬레이트 색 테두리
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
      {/* 📊 차트 제목 및 아이콘 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center space-x-3">
          <img
            src={genderPng}
            height="60px"
            width="60px"
            alt="성별 분포"
            className="object-contain"
          />
          <span className="text-indigo-700 font-medium">[성별 분포]</span>
        </h3>
      </div>

      {/* 📈 반응형 파이 차트 */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
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
              outerRadius={120}
              dataKey="value"
            >
              {/* 🎨 남성: 인디고 톤, 여성: 슬레이트 톤 */}
              <Cell fill="#4f46e5" /> {/* indigo-600 */}
              <Cell fill="#64748b" /> {/* slate-500 */}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}명`, "인원"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #cbd5e1", // slate-300
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
