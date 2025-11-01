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

function OccupationDistributionChart({ occupationDistribution }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="mb-4">[translate:직업 분포 (Top 5)]</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={occupationDistribution}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#06b6d4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OccupationDistributionChart;
