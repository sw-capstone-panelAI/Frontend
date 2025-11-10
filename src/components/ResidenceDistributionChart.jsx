import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import residencePng from "@assets/residence.png"; // 지역 아이콘 이미지 (필요시 수정)
import { ChevronLeft } from "lucide-react";

// 🎨 지역권별 색상: 초록색~청록색 계열의 부드러운 톤
const REGION_GROUP_COLORS = {
  수도권: "#6ee7b7", // emerald-300
  영남권: "#5eead4", // teal-300
  호남권: "#86efac", // green-300
  충청권: "#a7f3d0", // emerald-200
  강원권: "#059669", // emerald-600
  제주권: "#047857", // emerald-700
  "기타/해외": "#cbd5e1", // slate-300
};

// 🗺️ 지역권 그룹 정의
const REGION_GROUPS = {
  수도권: ["서울", "경기", "인천"],
  영남권: ["부산", "울산", "대구", "경남", "경북"],
  호남권: ["광주", "전남", "전북"],
  충청권: ["대전", "세종", "충남", "충북"],
  강원권: ["강원"],
  제주권: ["제주"],
  "기타/해외": ["기타/해외"],
};

// 🎨 상세 지역별 색상 (같은 권역 내에서 톤 차이)
const DETAIL_COLORS = {
  // 수도권
  서울: "#6ee7b7",
  경기: "#34d399",
  인천: "#10b981",

  // 영남권
  부산: "#5eead4",
  울산: "#2dd4bf",
  대구: "#14b8a6",
  경남: "#0d9488",
  경북: "#0f766e",

  // 호남권
  광주: "#86efac",
  전남: "#4ade80",
  전북: "#22c55e",

  // 충청권
  대전: "#a7f3d0",
  세종: "#d1fae5",
  충남: "#6ee7b7",
  충북: "#34d399",

  // 강원권
  강원: "#059669",

  // 제주권
  제주: "#047857",

  // 기타
  "기타/해외": "#cbd5e1",
};

// 전체 지역 목록
const ALL_REGIONS = [
  "서울",
  "경기",
  "인천",
  "부산",
  "울산",
  "대구",
  "경남",
  "경북",
  "광주",
  "전남",
  "전북",
  "대전",
  "세종",
  "충남",
  "충북",
  "강원",
  "제주",
  "기타/해외",
];

function ResidenceDistributionChart({ panels = [] }) {
  // 🎯 선택된 지역권 상태 (null이면 전체 보기)
  const [selectedGroup, setSelectedGroup] = useState(null);

  // ✅ 지역별 집계
  const regionCounts = useMemo(() => {
    const counts = ALL_REGIONS.reduce((acc, region) => {
      acc[region] = 0;
      return acc;
    }, {});

    panels.forEach((p) => {
      const region = p.residence?.trim() || "기타/해외";
      if (Object.prototype.hasOwnProperty.call(counts, region)) {
        counts[region] += 1;
      } else {
        //counts["기타/해외"] += 1;
      }
    });

    return counts;
  }, [panels]);

  // 📊 지역권별 데이터 (파이 차트용)
  const groupData = useMemo(() => {
    const groupCounts = {};

    Object.entries(REGION_GROUPS).forEach(([groupName, regions]) => {
      groupCounts[groupName] = regions.reduce((sum, region) => {
        return sum + (regionCounts[region] || 0);
      }, 0);
    });

    return Object.entries(groupCounts)
      .map(([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0);
  }, [regionCounts]);

  // 📊 선택된 지역권의 상세 데이터 (막대 차트용)
  const detailData = useMemo(() => {
    if (!selectedGroup) return [];

    const regions = REGION_GROUPS[selectedGroup] || [];
    return regions
      .map((region) => ({
        name: region,
        value: regionCounts[region] || 0,
      }))
      .filter((d) => d.value > 0);
  }, [selectedGroup, regionCounts]);

  // 🔙 뒤로가기 핸들러
  const handleBack = () => {
    setSelectedGroup(null);
  };

  // 🖱️ 파이 차트 클릭 핸들러
  const handlePieClick = (data) => {
    setSelectedGroup(data.name);
  };

  return (
    <div className="flex flex-col bg-white border border-emerald-200 rounded-lg p-6 shadow-sm">
      {/* 📊 차트 제목 및 아이콘 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center space-x-3">
          <img
            src={residencePng}
            height="60px"
            width="60px"
            alt="거주지 분포"
            className="object-contain"
          />
          <span className="text-emerald-700 font-medium">
            {selectedGroup ? `[${selectedGroup} 상세 분포]` : "[거주지 분포]"}
          </span>
        </h3>

        {/* 🔙 뒤로가기 버튼 */}
        {selectedGroup && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>전체 보기</span>
          </button>
        )}
      </div>

      {/* 📈 차트 영역 */}
      {!selectedGroup ? (
        // 🥧 지역권별 파이 차트
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={groupData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(1)}%`
                }
                onClick={handlePieClick}
                cursor="pointer"
              >
                {groupData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={REGION_GROUP_COLORS[entry.name] || "#e2e8f0"}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}명`, "인원"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #a7f3d0",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        // 📊 상세 지역별 막대 차트
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={detailData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#047857" }}
                axisLine={{ stroke: "#a7f3d0" }}
              />
              <YAxis
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
                formatter={(value) => [`${value}명`, "인원"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #a7f3d0",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="value"
                fill={REGION_GROUP_COLORS[selectedGroup]}
                radius={[8, 8, 0, 0]}
              >
                {detailData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      DETAIL_COLORS[entry.name] ||
                      REGION_GROUP_COLORS[selectedGroup]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 💡 안내 메시지 */}
      {!selectedGroup && (
        <p className="text-center text-emerald-900 text-sm mt-4">
          💡 지역권을 클릭하면 상세 지역별 인원수를 확인할 수 있습니다
        </p>
      )}
    </div>
  );
}

export default ResidenceDistributionChart;
