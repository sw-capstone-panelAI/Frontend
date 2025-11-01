import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import agePng from "@assets/age.png";

const COLORS = ["#8b5cf6", "#06b6d4", "#f472b6", "#f59e42", "#2dd4bf"];

function AgeDistributionChart({ ageDistribution }) {
  return (
    <div className="flex bg-card bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4 p-10 flex flex-col items-center text-center">
        <img src={agePng} height="150px" width="150px" /> [연령대 분포]
      </h3>
      <ResponsiveContainer width="50%" height={250}>
        <PieChart>
          <Pie
            data={ageDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {ageDistribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AgeDistributionChart;
