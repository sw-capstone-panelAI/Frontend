// 거주지 분포(Top 5)를 바 차트로 보여주는 컴포넌트

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

function ResidenceDistributionChart({ residenceDistribution }) {
  return (
    <div className="bg-card bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4">[translate:거주지 분포 (Top 5)]</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={residenceDistribution}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ResidenceDistributionChart;
