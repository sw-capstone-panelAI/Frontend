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
import { ChevronLeft } from "lucide-react";

const REGION_GROUP_COLORS = {
  수도권: "#a5b4fc",
  영남권: "#818cf8",
  호남권: "#6366f1",
  충청권: "#4f46e5",
  강원권: "#4338ca",
  제주권: "#3730a3",
  "기타/해외": "#cbd5e1",
};

const REGION_GROUPS = {
  수도권: ["서울", "경기", "인천"],
  영남권: ["부산", "울산", "대구", "경남", "경북"],
  호남권: ["광주", "전남", "전북"],
  충청권: ["대전", "세종", "충남", "충북"],
  강원권: ["강원"],
  제주권: ["제주"],
  "기타/해외": ["기타/해외"],
};

const DETAIL_COLORS = {
  서울: "#c7d2fe",
  경기: "#a5b4fc",
  인천: "#818cf8",
  부산: "#6366f1",
  울산: "#4f46e5",
  대구: "#4338ca",
  경남: "#3730a3",
  경북: "#312e81",
  광주: "#c7d2fe",
  전남: "#a5b4fc",
  전북: "#818cf8",
  대전: "#6366f1",
  세종: "#4f46e5",
  충남: "#4338ca",
  충북: "#3730a3",
  강원: "#312e81",
  제주: "#3730a3",
  "기타/해외": "#cbd5e1",
};

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
  const [selectedGroup, setSelectedGroup] = useState(null);

  const regionCounts = useMemo(() => {
    const counts = ALL_REGIONS.reduce((acc, region) => {
      acc[region] = 0;
      return acc;
    }, {});

    panels.forEach((p) => {
      const region = p.residence?.trim() || "기타/해외";
      if (Object.prototype.hasOwnProperty.call(counts, region)) {
        counts[region] += 1;
      }
    });

    return counts;
  }, [panels]);

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

  const handleBack = () => {
    setSelectedGroup(null);
  };

  const handlePieClick = (data) => {
    setSelectedGroup(data.name);
  };

  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold text-indigo-900">
          {selectedGroup ? `${selectedGroup} 상세 분포` : "거주지 분포"}
        </h3>

        {/* 뒤로가기 버튼 */}
        {selectedGroup && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-500 text-white rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>전체 보기</span>
          </button>
        )}
      </div>

      {/* 📈 차트 영역 */}
      {!selectedGroup ? (
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
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={detailData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#4338ca" }}
                axisLine={{ stroke: "#a5b4fc" }}
              />
              <YAxis
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
                formatter={(value) => [`${value}명`, "인원"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #cbd5e1",
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

      {!selectedGroup && (
        <p className="text-center text-indigo-900 text-sm mt-4">
          💡 지역권을 클릭하면 상세 지역별 인원수를 확인할 수 있습니다
        </p>
      )}
    </div>
  );
}

export default ResidenceDistributionChart;
