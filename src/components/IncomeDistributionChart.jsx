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
import incomePng from "@assets/income.png";

function IncomeDistributionChart({ panels }) {
  // ✅ 1. 구간 정의 (100만원 단위)
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

  // ✅ 2. 소득 문자열을 숫자로 변환하는 함수
  const parseIncome = (incomeStr) => {
    if (!incomeStr || incomeStr === "무응답" || incomeStr === "-") return null;

    // "월 100만원 미만" → 50 (중간값)
    if (incomeStr.includes("미만")) return 50;

    // "월 100~199만원" → 150 (중간값)
    const match = incomeStr.match(/(\d+)~(\d+)/);
    if (match) {
      const min = parseInt(match[1]);
      const max = parseInt(match[2]);
      return (min + max) / 2;
    }

    // "월 1000만원 이상" → 1000
    if (incomeStr.includes("이상")) return 1000;

    return null;
  };

  // ✅ 3. 각 구간별 인원 수 집계
  const distribution = incomeRanges.map((range) => {
    const count = panels.filter((p) => {
      const income = parseIncome(p.personalIncome);
      return income !== null && income >= range.min && income <= range.max;
    }).length;
    return { name: range.label, value: count };
  });

  // ✅ 4. 차트 렌더링
  return (
    // 🎨 차트 컨테이너: 흰색 배경 + 초록색 테두리
    <div className="flex flex-col bg-white border border-emerald-200 rounded-lg p-6 shadow-sm">
      {/* 📊 차트 제목 및 아이콘 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center space-x-3">
          <img
            src={incomePng}
            height="60px"
            width="60px"
            alt="소득 분포"
            className="object-contain"
          />
          <span className="text-emerald-700 font-medium">[소득 분포]</span>
        </h3>
      </div>

      {/* 📈 반응형 바 차트 */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={distribution}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#047857", fontSize: 11 }}
              axisLine={{ stroke: "#a7f3d0" }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#047857" }}
              axisLine={{ stroke: "#a7f3d0" }}
              label={{
                value: "인원 (명)",
                angle: -90,
                position: "insideLeft",
                fill: "#047857",
              }}
            />
            <Tooltip
              formatter={(value) => [`${value}명`, "인원수"]}
              labelFormatter={(label) => `소득 구간: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #a7f3d0",
                borderRadius: "8px",
              }}
            />
            {/* 🎨 바 색상: 부드러운 초록색 */}
            <Bar dataKey="value" fill="#34d399" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeDistributionChart;
