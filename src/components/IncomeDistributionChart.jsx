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

function IncomeDistributionChart({ panels }) {
  const incomeRanges = [
    { label: "100만원 미만", min: 0, max: 99 },
    { label: "100~199만원", min: 100, max: 199 },
    { label: "200~299만원", min: 200, max: 299 },
    { label: "300~399만원", min: 300, max: 399 },
    { label: "400~499만원", min: 400, max: 499 },
    { label: "500~599만원", min: 500, max: 599 },
    { label: "600~699만원", min: 600, max: 699 },
    { label: "700~799만원", min: 700, max: 799 },
    { label: "800~899만원", min: 800, max: 899 },
    { label: "900~999만원", min: 900, max: 999 },
    { label: "1000만원 이상", min: 1000, max: Infinity },
  ];

  const parseIncome = (incomeStr) => {
    if (!incomeStr || incomeStr === "무응답" || incomeStr === "-") return null;
    if (incomeStr.includes("미만")) return 50;
    const match = incomeStr.match(/(\d+)~(\d+)/);
    if (match) {
      const min = parseInt(match[1]);
      const max = parseInt(match[2]);
      return (min + max) / 2;
    }
    if (incomeStr.includes("이상")) return 1000;
    return null;
  };

  const distribution = incomeRanges.map((range) => {
    const count = panels.filter((p) => {
      const income = parseIncome(p.personalIncome);
      return income !== null && income >= range.min && income <= range.max;
    }).length;
    return { name: range.label, value: count };
  });

  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-indigo-900">소득 분포</h3>
      </div>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={distribution}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#4338ca", fontSize: 11 }}
              axisLine={{ stroke: "#a5b4fc" }}
              angle={-45}
              textAnchor="end"
              height={80}
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
              formatter={(value) => [`${value}명`, "인원수"]}
              labelFormatter={(label) => `소득 구간: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeDistributionChart;
