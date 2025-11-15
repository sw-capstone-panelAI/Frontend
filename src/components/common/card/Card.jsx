import React from "react";
import { User, Award, AlertTriangle } from "lucide-react";

// 왼쪽 패널 카드 컴포넌트 (임의 번호명 표시)
export function PanelCard({ panel, displayId, selected, onClick }) {
  const reliabilityColor =
    panel.reliability >= 75
      ? "text-green-600"
      : panel.reliability >= 50
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div
      onClick={onClick}
      className={`p-4 mb-2 rounded-lg border-2 cursor-pointer transition-all ${
        selected
          ? "bg-indigo-50 border-indigo-500 shadow-lg"
          : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-indigo-900">{displayId}</h3>
        </div>
        <div className="flex items-center gap-1">
          <Award className={`w-4 h-4 ${reliabilityColor}`} />
          <span className={`text-sm font-semibold ${reliabilityColor}`}>
            {panel.reliability}%
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">성별:</span> {panel.gender}
        </p>
        <p>
          <span className="font-medium">나이:</span> {panel.age}세
        </p>
        <p>
          <span className="font-medium">거주지:</span> {panel.residence}
        </p>
      </div>

      {panel.reliabilityReasons && panel.reliabilityReasons.length > 0 && (
        <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
          <div className="flex items-center gap-1 text-xs text-red-700">
            <AlertTriangle className="w-3 h-3" />
            <span className="font-semibold">감점 사유</span>
          </div>
          <p className="text-xs text-red-600 mt-1">
            {panel.reliabilityReasons.slice(0, 2).join(", ")}
            {panel.reliabilityReasons.length > 2 && "..."}
          </p>
        </div>
      )}
    </div>
  );
}

// 오른쪽 패널 상세 정보 컴포넌트 (실제 패널 ID 표시)
export function PanelDetailView({ selectedPanel }) {
  if (!selectedPanel) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium">패널을 선택해주세요</p>
        <p className="text-sm mt-2">
          왼쪽 목록에서 패널을 클릭하면 상세 정보가 표시됩니다
        </p>
      </div>
    );
  }

  const InfoRow = ({ label, value }) => (
    <div className="flex py-2 border-b border-gray-100 last:border-b-0">
      <span className="w-1/3 text-sm font-semibold text-gray-700">{label}</span>
      <span className="w-2/3 text-sm text-gray-900">{value || "무응답"}</span>
    </div>
  );

  const ArrayInfoRow = ({ label, values }) => (
    <div className="flex py-2 border-b border-gray-100 last:border-b-0">
      <span className="w-1/3 text-sm font-semibold text-gray-700">{label}</span>
      <div className="w-2/3 text-sm text-gray-900">
        {values && values.length > 0 ? (
          <ul className="list-disc list-inside">
            {values.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          "무응답"
        )}
      </div>
    </div>
  );

  const reliabilityColor =
    selectedPanel.reliability >= 75
      ? "bg-green-100 text-green-800 border-green-300"
      : selectedPanel.reliability >= 50
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : "bg-red-100 text-red-800 border-red-300";

  return (
    <div className="bg-white rounded-lg border-2 border-indigo-200 shadow-sm">
      {/* 헤더 - 실제 패널 ID 표시 */}
      <div className="p-4 bg-indigo-50 border-b-2 border-indigo-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-indigo-600" />
            <div>
              <h3 className="text-lg font-bold text-indigo-900">
                패널 ID: {selectedPanel.mbSn}
              </h3>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full border-2 ${reliabilityColor} flex items-center gap-2`}
          >
            <Award className="w-5 h-5" />
            <span className="font-bold text-lg">
              {selectedPanel.reliability}%
            </span>
          </div>
        </div>

        {selectedPanel.reliabilityReasons &&
          selectedPanel.reliabilityReasons.length > 0 && (
            <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-sm text-red-700">
                  신뢰도 감점 사유
                </span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                {selectedPanel.reliabilityReasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* 기본 정보 */}
      <div className="p-4">
        <h4 className="font-bold text-indigo-800 mb-3 pb-2 border-b-2 border-indigo-200">
          📋 기본 정보
        </h4>
        <div className="space-y-1">
          <InfoRow label="성별" value={selectedPanel.gender} />
          <InfoRow label="나이" value={`${selectedPanel.age}세`} />
          <InfoRow label="출생년도" value={`${selectedPanel.birthYear}년`} />
          <InfoRow
            label="거주지"
            value={`${selectedPanel.residence} ${selectedPanel.district}`}
          />
          <InfoRow label="결혼여부" value={selectedPanel.maritalStatus} />
          <InfoRow label="자녀수" value={`${selectedPanel.children}명`} />
          <InfoRow label="가족수" value={selectedPanel.familySize} />
        </div>
      </div>

      {/* 직업 및 소득 정보 */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-bold text-indigo-800 mb-3 pb-2 border-b-2 border-indigo-200">
          💼 직업 및 소득
        </h4>
        <div className="space-y-1">
          <InfoRow label="최종학력" value={selectedPanel.education} />
          <InfoRow label="직업" value={selectedPanel.job} />
          <InfoRow label="직무" value={selectedPanel.role} />
          <InfoRow label="개인소득" value={selectedPanel.personalIncome} />
          <InfoRow label="가구소득" value={selectedPanel.householdIncome} />
        </div>
      </div>

      {/* 소유 정보 */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-bold text-indigo-800 mb-3 pb-2 border-b-2 border-indigo-200">
          📱 소유 정보
        </h4>
        <div className="space-y-1">
          <InfoRow label="휴대폰 브랜드" value={selectedPanel.phoneBrand} />
          <InfoRow label="휴대폰 모델" value={selectedPanel.phoneModel} />
          <InfoRow label="차량 보유" value={selectedPanel.carOwnership} />
          <InfoRow label="자동차 제조사" value={selectedPanel.carBrand} />
          <InfoRow label="자동차 모델" value={selectedPanel.carModel} />
        </div>
      </div>

      {/* 생활 습관 */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-bold text-indigo-800 mb-3 pb-2 border-b-2 border-indigo-200">
          🚬 생활 습관
        </h4>
        <div className="space-y-1">
          <ArrayInfoRow
            label="흡연경험"
            values={selectedPanel.smokingExperience}
          />
          <ArrayInfoRow
            label="음주경험"
            values={selectedPanel.drinkingExperience}
          />
        </div>
      </div>

      {/* 보유 제품 */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-bold text-indigo-800 mb-3 pb-2 border-b-2 border-indigo-200">
          🛍️ 보유 제품
        </h4>
        <ArrayInfoRow label="보유제품" values={selectedPanel.ownedProducts} />
      </div>

      {/* 생활 패턴 정보 */}
      {selectedPanel.lifestylePatterns &&
        Object.keys(selectedPanel.lifestylePatterns).length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <h4 className="font-bold text-indigo-800 mb-3 pb-2 border-b-2 border-indigo-200">
              🌟 생활 패턴
            </h4>
            <div className="space-y-1">
              {Object.entries(selectedPanel.lifestylePatterns).map(
                ([key, value]) =>
                  value !== "무응답" && (
                    <InfoRow
                      key={key}
                      label={key.replace(/_/g, " ")}
                      value={value}
                    />
                  )
              )}
            </div>
          </div>
        )}
    </div>
  );
}

// 전체 패널 정보 요약 컴포넌트
export function TotalInfo({ panels }) {
  if (!panels || panels.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p>검색된 패널이 없습니다</p>
      </div>
    );
  }

  // 가장 많은 거주지역 계산
  const residenceDistribution = panels.reduce((acc, p) => {
    const residence = p.residence || "무응답";
    acc[residence] = (acc[residence] || 0) + 1;
    return acc;
  }, {});

  const mostCommonResidence = Object.entries(residenceDistribution).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 가장 많은 소득 계산 (무응답 제외)
  const incomeDistribution = panels.reduce((acc, p) => {
    const income = p.personalIncome || "무응답";
    acc[income] = (acc[income] || 0) + 1;
    return acc;
  }, {});

  // 무응답을 제외하고 정렬
  const mostCommonIncome = Object.entries(incomeDistribution)
    .filter(([key]) => key !== "무응답") // 무응답 제외
    .sort((a, b) => b[1] - a[1])[0] || ["무응답", 0]; // 데이터가 없으면 무응답 표시

  const avgAge =
    panels.reduce((sum, p) => sum + (p.age || 0), 0) / panels.length;

  return (
    <div className="bg-white rounded-lg border-2 border-indigo-200 shadow-sm p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-indigo-100 rounded-lg border border-indigo-200">
          <p className="text-sm text-gray-600 mb-1">총 패널 수</p>
          <p className="text-2xl font-bold text-indigo-900">
            {panels.length}명
          </p>
        </div>

        <div className="p-4  bg-purple-200 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600 mb-1">가장 많은 거주지역</p>
          <p className="text-2xl font-bold text-purple-900">
            {mostCommonResidence[0]}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {mostCommonResidence[1]}명
          </p>
        </div>

        <div className="p-4 bg-blue-100 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">평균 나이</p>
          <p className="text-2xl font-bold text-blue-900">
            {avgAge.toFixed(1)}세
          </p>
        </div>

        <div className="p-4 bg-purple-100 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600 mb-1">가장 많은 소득</p>
          <div className="text-sm font-semibold text-purple-900">
            {mostCommonIncome[0]}
          </div>
          <p className="text-xs text-gray-500 mt-1">{mostCommonIncome[1]}명</p>
        </div>
      </div>
    </div>
  );
}
