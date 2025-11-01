import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import residencePng from "@assets/residence.png"; // 지역 아이콘 이미지 (필요시 수정)

const REGION_COLORS = {
  // 🌆 수도권 (보라~하늘톤)
  서울: "#8b5cf6", // violet-500
  경기: "#a78bfa", // violet-400
  인천: "#60a5fa", // blue-400

  // ⚓ 영남권 (주황~붉은톤)
  부산: "#f59e0b", // amber-500
  울산: "#f97316", // orange-500
  대구: "#fb923c", // orange-400
  경남: "#f87171", // red-400
  경북: "#ef4444", // red-500

  // 🌿 호남권 (초록~민트톤)
  광주: "#10b981", // emerald-500
  전남: "#34d399", // emerald-400
  전북: "#2dd4bf", // teal-400

  // 🏔 충청권 (노랑~연보라톤)
  대전: "#facc15", // yellow-400
  세종: "#fde047", // yellow-300
  충남: "#fbbf24", // amber-400
  충북: "#fcd34d", // amber-300

  // 🏞 강원·제주 (파랑~민트톤)
  강원: "#3b82f6", // blue-500
  제주: "#06b6d4", // cyan-500

  // 🌐 기타
  "기타/해외": "#94a3b8", // slate-400
};

// 거주 지역 목록 (고정 순서)
const REGION_LIST = [
  "서울",
  "경기",
  "인천",
  "부산",
  "울산",
  "대구",
  "광주",
  "대전",
  "세종",
  "경남",
  "경북",
  "전남",
  "전북",
  "충남",
  "충북",
  "강원",
  "제주",
  "기타/해외",
];

function ResidenceDistributionChart({ panels = [] }) {
  // ✅ 지역별 집계
  const data = useMemo(() => {
    const counts = REGION_LIST.reduce((acc, region) => {
      acc[region] = 0;
      return acc;
    }, {});

    panels.forEach((p) => {
      const region = p.residence?.trim() || "기타/해외";
      if (Object.prototype.hasOwnProperty.call(counts, region)) {
        counts[region] += 1;
      } else counts["기타/해외"] += 1; // 리스트 외 지역은 기타로
    });

    // Recharts용 데이터 포맷
    return REGION_LIST.map((region) => ({
      name: region,
      value: counts[region],
    })).filter((d) => d.value > 0); // 값 0은 표시 제외
  }, [panels]);

  return (
    <div className="flex bg-white border border-gray-300 rounded-lg p-6">
      <h3 className="mb-4 py-13 pl-5 flex flex-col items-center text-center space-y-2">
        <img
          src={residencePng}
          height="150px"
          width="150px"
          alt="거주지 분포"
        />
        <span>[거주지 분포]</span>
      </h3>

      <ResponsiveContainer width="70%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={REGION_COLORS[entry.name] || "#d1d5db"} // fallback: gray-300
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ResidenceDistributionChart;
