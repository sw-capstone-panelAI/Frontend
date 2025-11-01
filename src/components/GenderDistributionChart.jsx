// 성별 분포 차트 (호환성 유지, 번역 포함)
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function GenderDistributionChart({ stats }) {
  return (
    <div className="bg-card bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4">[translate:성별 분포]</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={[
              { name: "[translate:남성]", value: stats.male },
              { name: "[translate:여성]", value: stats.female },
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
            <Cell fill="#8b5cf6" />
            <Cell fill="#06b6d4" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default GenderDistributionChart;
