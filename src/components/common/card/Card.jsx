import { React, useState } from "react";
import {
  MapPin,
  Briefcase,
  Users,
  User,
  DollarSign,
  Car,
  AlertTriangle,
  ChevronDown,
  ListFilterPlus,
  Star,
  Smile,
} from "lucide-react";

// NULL 값을 '무응답'으로 표시하는 헬퍼 함수
const displayValue = (value, defaultText = "무응답") => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "-" ||
    value === "무응답"
  ) {
    return defaultText;
  }
  return value;
};

// 📋 패널 카드 컴포넌트 (좌측 리스트에 표시)
export function PanelCard({ panel, onClick, selected }) {
  return (
    <div
      className={`p-4 my-1 rounded-lg cursor-pointer border transition-all ${
        selected
          ? "border-emerald-500 bg-emerald-50 shadow-md"
          : "border-emerald-200 bg-white hover:border-emerald-600 hover:shadow-lg hover:border-2"
      }`}
      onClick={onClick}
    >
      {/* 🏷️ 패널 ID */}
      <h3 className="font-semibold text-lg text-emerald-800">{panel.id}</h3>

      {/* 👤 나이 · 성별 */}
      <p className="text-sm text-gray-600">
        {panel.age ? `${panel.age}세` : "나이 미상"} ·{" "}
        {displayValue(panel.gender, "성별 미상")}
      </p>

      {/* 💼 직업 · 거주지 */}
      <p className="text-sm text-emerald-700">
        {displayValue(panel.occupation, "직업 미상")} ·{" "}
        {displayValue(panel.residence, "거주지 미상")}
      </p>

      {/* 📊 신뢰도 표시 */}
      <p className="text-sm text-gray-600 mt-1">
        신뢰도:
        <span
          className={`ml-1 font-semibold ${
            panel.reliability >= 75
              ? "text-green-600"
              : panel.reliability >= 50
              ? "text-yellow-600"
              : panel.reliability >= 25
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {panel.reliability}%
        </span>
      </p>
    </div>
  );
}

// 👤 패널 상세 정보 컴포넌트 (우측에 표시)
export function PanelDetailView({ selectedPanel }) {
  const [openCharac, setOpenCharac] = useState(false);
  const [openSubtract, setOpenSubtract] = useState(false);
  const [openAddInfo, setOpenAddInfo] = useState(false);

  // JSONB 데이터를 문자열로 변환하는 헬퍼 함수
  const formatJsonData = (data) => {
    if (!data) return "없음";
    if (typeof data === "string") return data;
    if (Array.isArray(data)) return data.join(", ");
    if (typeof data === "object") return JSON.stringify(data, null, 2);
    return String(data);
  };

  if (!selectedPanel) {
    return (
      <div className="h-full flex items-center font-bold justify-center text-emerald-600 bg-emerald-50 rounded-lg p-8 border-2 border-dashed border-emerald-300">
        👆 원하는 패널을 클릭하여 상세 정보를 확인하세요 👆
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="bg-white border border-emerald-200 rounded-lg p-6 shadow-md">
          {/* 📌 헤더: ID + 신뢰도 */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl mb-2 text-emerald-800">
                {selectedPanel.mbSn || selectedPanel.id}
              </h2>
              <p className="text-gray-600">
                {selectedPanel.age ? `${selectedPanel.age}세` : "나이 미상"} ·{" "}
                {displayValue(selectedPanel.gender, "성별 미상")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-gray-600">신뢰도</span>
              <span
                className={`text-2xl ${
                  selectedPanel.reliability >= 75
                    ? "text-green-600"
                    : selectedPanel.reliability >= 50
                    ? "text-yellow-600"
                    : selectedPanel.reliability >= 25
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {selectedPanel.reliability}%
              </span>
            </div>
          </div>

          {/* 📊 기본 정보 그리드 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 🏠 거주지 */}
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-600">거주지</p>
                <p className="text-emerald-800 font-medium">
                  {displayValue(selectedPanel.residence)}
                </p>
              </div>
            </div>

            {/* 💼 직업 */}
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-600">직업</p>
                <p className="text-emerald-800 font-medium">
                  {displayValue(selectedPanel.occupation)}
                </p>
              </div>
            </div>

            {/* 💰 소득 */}
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-600">소득</p>
                <p className="text-emerald-800 font-medium">
                  {displayValue(selectedPanel.personalIncome)}
                </p>
              </div>
            </div>

            {/* 🚗 차량 */}
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <Car className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs text-gray-600">차량</p>
                <p className="text-emerald-800 font-medium">
                  {(() => {
                    if (
                      selectedPanel.carModel &&
                      selectedPanel.carModel !== "-" &&
                      selectedPanel.carModel !== "무응답"
                    ) {
                      return selectedPanel.carModel;
                    }
                    if (
                      selectedPanel.carBrand &&
                      selectedPanel.carBrand !== "-" &&
                      selectedPanel.carBrand !== "무응답"
                    ) {
                      return selectedPanel.carBrand;
                    }
                    return selectedPanel.carOwnership === "있음"
                      ? "있음"
                      : "없음";
                  })()}
                </p>
              </div>
            </div>
          </div>

          {/* ⭐ AI 고객 성향 분석 섹션 */}
          <div className="mt-6 pt-6 border-t border-sky-200">
            <div className="items-center justify-between mb-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenCharac(!openCharac)}
              >
                <Star className="w-8 h-8 text-sky-500" />
                <h3 className="text-xl font-semibold text-sky-800">
                  고객 성향
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-sky-600 transition-transform ${
                    openCharac ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openCharac && (
                <div className="bg-sky-50 m-2 p-2 rounded-lg border border-sky-200 shadow-lg">
                  <div className="p-3 space-y-3 text-gray-700 font-medium leading-relaxed">
                    <p>
                      <span className="font-bold text-sky-700">
                        주요연령대:
                      </span>{" "}
                      {selectedPanel.age ? `${selectedPanel.age}세` : "미상"}
                    </p>
                    <p>
                      <span className="font-bold text-sky-700">지역특성:</span>{" "}
                      {displayValue(selectedPanel.residence, "미상")}{" "}
                      {selectedPanel.district &&
                      selectedPanel.district !== "무응답"
                        ? `${selectedPanel.district} 거주`
                        : ""}
                    </p>
                    <p>
                      <span className="font-bold text-sky-700">직업경향:</span>{" "}
                      {displayValue(selectedPanel.occupation, "미상")} /{" "}
                      {displayValue(selectedPanel.role, "직무 미상")}
                    </p>
                    <p>
                      <span className="font-bold text-sky-700">생활패턴:</span>{" "}
                      {displayValue(
                        selectedPanel.maritalStatus,
                        "결혼여부 미상"
                      )}
                      ,{" "}
                      {selectedPanel.familySize &&
                      selectedPanel.familySize !== "무응답"
                        ? `${selectedPanel.familySize}인 가족`
                        : "가족수 미상"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ⚠️ 신뢰도 감점 사유 섹션 */}
          {selectedPanel.reliability < 100 ? (
            <div className="mt-6 pt-6 border-t border-sky-200">
              <div className="items-center justify-between mb-3">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setOpenSubtract(!openSubtract)}
                >
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    신뢰도 감점 사유
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform ${
                      openSubtract ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openSubtract && (
                  <div className="bg-orange-50 m-2 p-2 rounded-lg border border-orange-200 shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 border border-orange-200">
                          <span className="text-xs font-medium text-orange-700">
                            감점 포인트
                          </span>
                        </div>
                        <div className="text-2xl font-extrabold tracking-tight text-orange-700">
                          -{100 - selectedPanel.reliability}점
                        </div>
                      </div>

                      <div className="rounded-xl bg-white border border-orange-200 p-4 shadow-sm">
                        <p className="leading-relaxed text-orange-900 mb-3">
                          <span className="mr-2 inline-flex items-center rounded-md bg-orange-100 px-2 py-0.5 font-semibold text-orange-800">
                            사유 요약
                          </span>
                          {selectedPanel.reliabilityReasons &&
                          selectedPanel.reliabilityReasons.length > 0 ? (
                            <span>
                              {selectedPanel.reliabilityReasons.join(", ")}
                            </span>
                          ) : (
                            <span>
                              검색 조건과 일부 불일치하는 항목이 있습니다.
                            </span>
                          )}
                        </p>

                        {/* 감점 사유 태그 */}
                        {selectedPanel.reliabilityReasons &&
                          selectedPanel.reliabilityReasons.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {selectedPanel.reliabilityReasons.map(
                                (reason, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-2 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800"
                                  >
                                    {reason}
                                  </span>
                                )
                              )}
                            </div>
                          )}

                        <div className="mt-4">
                          <div className="h-1.5 w-full rounded-full bg-green-500 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                              style={{
                                width: `${100 - selectedPanel.reliability}%`,
                              }}
                            />
                          </div>
                          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
                            <span>0점</span>
                            <span>
                              감점 {100 - selectedPanel.reliability}점
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-sky-200">
              <Smile className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                신뢰도 만족
              </h3>
              <p className="text-green-600 font-semibold">100%</p>
            </div>
          )}

          {/* 📋 기타 추가 정보 섹션 */}
          <div className="mt-6 pt-6 border-t border-sky-200">
            <div className="items-center justify-between mb-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenAddInfo(!openAddInfo)}
              >
                <ListFilterPlus className="w-8 h-8 text-cyan-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  기타 추가 정보
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-cyan-600 transition-transform ${
                    openAddInfo ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openAddInfo && (
                <div className="bg-cyan-50 m-2 p-2 rounded-lg border border-cyan-200 shadow-lg">
                  <div className="rounded-xl border border-cyan-200 bg-white p-4 sm:p-5 shadow-sm">
                    <p className="mb-2 font-bold text-cyan-800">
                      설문 카테고리별 분류
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* 👥 인구 통계 특성 */}
                      <div className="rounded-lg bg-sky-50 border border-sky-200 p-4">
                        <h4 className="mb-3 text-sm font-semibold text-sky-700">
                          인구 통계 특성
                        </h4>
                        <dl className="space-y-2 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <dt className="text-gray-500">결혼여부</dt>
                            <dd className="font-medium">
                              {displayValue(selectedPanel.maritalStatus)}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">자녀수</dt>
                            <dd className="font-medium">
                              {selectedPanel.children ?? 0}명
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">가족수</dt>
                            <dd className="font-medium">
                              {displayValue(selectedPanel.familySize)}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">최종학력</dt>
                            <dd className="font-medium">
                              {displayValue(selectedPanel.education)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* 💳 소비 성향 */}
                      <div className="rounded-lg bg-sky-50 border border-sky-200 p-4">
                        <h4 className="mb-3 text-sm font-semibold text-sky-700">
                          소비 성향
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {selectedPanel.ownedProducts &&
                          typeof selectedPanel.ownedProducts === "object" ? (
                            Array.isArray(selectedPanel.ownedProducts) ? (
                              selectedPanel.ownedProducts.length > 0 ? (
                                selectedPanel.ownedProducts.map(
                                  (product, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs px-2 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800"
                                    >
                                      {product}
                                    </span>
                                  )
                                )
                              ) : (
                                <span className="text-xs text-gray-500">
                                  보유 제품 없음
                                </span>
                              )
                            ) : (
                              <span className="text-xs text-gray-500">
                                보유 제품 없음
                              </span>
                            )
                          ) : (
                            <span className="text-xs text-gray-500">
                              보유 제품 정보 없음
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">휴대폰 브랜드</span>
                            <span className="font-medium">
                              {displayValue(selectedPanel.phoneBrand)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">휴대폰 모델명</span>
                            <span className="font-medium">
                              {displayValue(selectedPanel.phoneModel)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">차량 제조사</span>
                            <span className="font-medium">
                              {displayValue(selectedPanel.carBrand)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">차량 모델</span>
                            <span className="font-medium">
                              {displayValue(selectedPanel.carModel)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 🏃 생활 패턴 */}
                      <div className="rounded-lg bg-sky-50 border border-sky-200 p-4">
                        <h4 className="mb-3 text-sm font-semibold text-sky-700">
                          생활 패턴
                        </h4>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">흡연여부</span>
                            <span className="inline-flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  selectedPanel.smokingExperience &&
                                  Array.isArray(
                                    selectedPanel.smokingExperience
                                  ) &&
                                  selectedPanel.smokingExperience.length > 0
                                    ? "bg-red-400"
                                    : "bg-gray-300"
                                }`}
                              />
                              <span className="font-medium text-gray-700">
                                {selectedPanel.smokingExperience &&
                                Array.isArray(
                                  selectedPanel.smokingExperience
                                ) &&
                                selectedPanel.smokingExperience.length > 0
                                  ? "경험 있음"
                                  : "무응답"}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">음주여부</span>
                            <span className="inline-flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  selectedPanel.drinkingExperience &&
                                  Array.isArray(
                                    selectedPanel.drinkingExperience
                                  ) &&
                                  selectedPanel.drinkingExperience.length > 0
                                    ? "bg-amber-400"
                                    : "bg-gray-300"
                                }`}
                              />
                              <span className="font-medium text-gray-700">
                                {selectedPanel.drinkingExperience &&
                                Array.isArray(
                                  selectedPanel.drinkingExperience
                                ) &&
                                selectedPanel.drinkingExperience.length > 0
                                  ? "경험 있음"
                                  : "무응답"}
                              </span>
                            </span>
                          </div>
                          {selectedPanel.smokingExperience &&
                            Array.isArray(selectedPanel.smokingExperience) &&
                            selectedPanel.smokingExperience.length > 0 && (
                              <div className="mt-2 p-2 bg-white rounded border border-sky-200">
                                <p className="text-xs text-gray-600 mb-1">
                                  흡연 상세:
                                </p>
                                <p className="text-xs text-gray-800">
                                  {formatJsonData(
                                    selectedPanel.smokingExperience
                                  )}
                                </p>
                              </div>
                            )}
                          {selectedPanel.drinkingExperience &&
                            Array.isArray(selectedPanel.drinkingExperience) &&
                            selectedPanel.drinkingExperience.length > 0 && (
                              <div className="mt-2 p-2 bg-white rounded border border-sky-200">
                                <p className="text-xs text-gray-600 mb-1">
                                  음주 상세:
                                </p>
                                <p className="text-xs text-gray-800">
                                  {formatJsonData(
                                    selectedPanel.drinkingExperience
                                  )}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// 📊 전체 패널 요약 정보 컴포넌트
export function TotalInfo({ panels = [] }) {
  const panelsCnt = panels.length;

  // 평균 연령 계산
  const panelsAge =
    panelsCnt > 0
      ? (panels.reduce((sum, p) => sum + (p.age || 0), 0) / panelsCnt).toFixed(
          1
        )
      : 0;

  // 최빈 소득 구간 계산 (무응답 제외 후 다음으로 많은 항목 표시)
  const panelsInco = (() => {
    if (panelsCnt === 0) return "미상";

    // 유효 소득만 필터링
    const filteredIncomes = panels.filter(
      (p) =>
        p.personalIncome &&
        p.personalIncome !== "-" &&
        p.personalIncome !== "null" &&
        p.personalIncome !== null &&
        p.personalIncome !== "무응답"
    );

    if (filteredIncomes.length === 0) return "미상";

    // 소득 구간별 카운트
    const incomeCount = filteredIncomes.reduce((acc, p) => {
      const income = p.personalIncome;
      acc[income] = (acc[income] || 0) + 1;
      return acc;
    }, {});

    if (Object.keys(incomeCount).length === 0) return "미상";

    // 최빈 소득 구간 찾기
    const entries = Object.entries(incomeCount);
    const maxEntry = entries.reduce(
      (max, current) => (current[1] > max[1] ? current : max),
      entries[0]
    );
    return maxEntry[0];
  })();

  // 거주지 카운트
  const residenceCount = panels.reduce((acc, p) => {
    const residence = p.residence;
    if (
      residence &&
      residence !== "-" &&
      residence !== "미상" &&
      residence !== "무응답"
    ) {
      acc[residence] = (acc[residence] || 0) + 1;
    }
    return acc;
  }, {});

  // 최빈 거주지 계산
  const panelsHome = (() => {
    const entries = Object.entries(residenceCount);
    if (entries.length === 0) return "무응답";

    const maxEntry = entries.reduce((max, current) => {
      return current[1] > max[1] ? current : max;
    }, entries[0]);

    return maxEntry[0];
  })();

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6 m-6 shadow-md">
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center gap-2 text-sky-600 mb-2">
          <Users className="w-6 h-6" />
          <p className="font-semibold text-lg">전체 패널</p>
        </div>
        <p className="text-3xl font-bold text-sky-800">{panelsCnt}명</p>
      </div>

      <div className="flex flex-col items-center flex-1 border-l border-sky-200">
        <div className="flex items-center gap-2 text-cyan-600 mb-2">
          <User className="w-6 h-6" />
          <p className="font-semibold text-lg">평균 연령</p>
        </div>
        <p className="text-3xl font-bold text-cyan-800">{panelsAge}세</p>
      </div>

      <div className="flex flex-col items-center flex-1 border-l border-sky-200">
        <div className="flex items-center gap-2 text-sky-600 mb-2">
          <MapPin className="w-6 h-6" />
          <p className="font-semibold text-lg">주요 거주지</p>
        </div>
        <p className="text-3xl font-bold text-sky-800">{panelsHome}</p>
      </div>

      <div className="flex flex-col items-center flex-1 border-l border-sky-200">
        <div className="flex items-center gap-2 text-emerald-600 mb-2">
          <DollarSign className="w-6 h-6" />
          <p className="font-semibold text-lg">주요 소득</p>
        </div>
        <p className="text-2xl font-bold text-emerald-700">{panelsInco}</p>
      </div>
    </div>
  );
}
