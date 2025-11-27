import React, { useState } from "react";
import {
  User,
  Award,
  AlertTriangle,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

// 접기/펼치기 섹션 컴포넌트
function CollapsibleSection({ title, icon, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h4 className="font-bold text-indigo-800 flex items-center gap-2">
          {icon} {title}
        </h4>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-indigo-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-indigo-600" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4 space-y-1">{children}</div>}
    </div>
  );
}

// 오른쪽 패널 상세 정보 컴포넌트 (실제 패널 ID 표시)
export function PanelDetailView({ selectedPanel, searchQuery = "" }) {
  const [isExpanded, setIsExpanded] = useState(true); // 전체 열기/닫기 상태

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

  // ============================================================
  // 고급 키워드 매칭 시스템
  // ============================================================

  const queryLower = searchQuery.toLowerCase();

  // 1. 카테고리별 키워드 정의
  const categoryKeywords = {
    // 나이 관련 (X대 형식)
    age: {
      patterns: [
        /10대/,
        /20대/,
        /30대/,
        /40대/,
        /50대/,
        /60대/,
        /70대/,
        /십대/,
        /이십대/,
        /삼십대/,
        /사십대/,
        /오십대/,
        /육십대/,
        /칠십대/,
      ],
      check: (value) => {
        const ageValue = parseInt(value);
        if (isNaN(ageValue)) return false;

        for (const pattern of categoryKeywords.age.patterns) {
          const match = queryLower.match(pattern);
          if (match) {
            const decade =
              match[0].includes("10") || match[0].includes("십")
                ? 10
                : match[0].includes("20") || match[0].includes("이십")
                ? 20
                : match[0].includes("30") || match[0].includes("삼십")
                ? 30
                : match[0].includes("40") || match[0].includes("사십")
                ? 40
                : match[0].includes("50") || match[0].includes("오십")
                ? 50
                : match[0].includes("60") || match[0].includes("육십")
                ? 60
                : match[0].includes("70") || match[0].includes("칠십")
                ? 70
                : null;

            if (
              decade !== null &&
              ageValue >= decade &&
              ageValue < decade + 10
            ) {
              return true;
            }
          }
        }
        return false;
      },
    },

    // 지역 관련
    region: {
      keywords: [
        "서울",
        "부산",
        "대구",
        "인천",
        "광주",
        "대전",
        "울산",
        "세종",
        "경기",
        "강원",
        "충북",
        "충남",
        "전북",
        "전남",
        "경북",
        "경남",
        "제주",
        "호남",
        "영남",
        "수도권",
        "강남",
        "강북",
      ],
      check: (value) => {
        const valueLower = String(value).toLowerCase();
        if (
          queryLower.includes("호남") &&
          (valueLower.includes("전북") ||
            valueLower.includes("전남") ||
            valueLower.includes("광주"))
        ) {
          return true;
        }
        if (
          queryLower.includes("영남") &&
          (valueLower.includes("경북") ||
            valueLower.includes("경남") ||
            valueLower.includes("부산") ||
            valueLower.includes("대구") ||
            valueLower.includes("울산"))
        ) {
          return true;
        }
        if (
          queryLower.includes("수도권") &&
          (valueLower.includes("서울") ||
            valueLower.includes("경기") ||
            valueLower.includes("인천"))
        ) {
          return true;
        }
        return categoryKeywords.region.keywords.some(
          (k) => queryLower.includes(k) && valueLower.includes(k)
        );
      },
    },

    // 차량 관련
    vehicle: {
      keywords: ["차량", "자동차", "차", "승용차", "운전", "자가용", "보유"],
      check: (value) => {
        return categoryKeywords.vehicle.keywords.some((k) =>
          queryLower.includes(k)
        );
      },
    },

    // 흡연 관련
    smoking: {
      keywords: ["흡연", "담배", "피우", "연초"],
      check: (value) => {
        return categoryKeywords.smoking.keywords.some((k) =>
          queryLower.includes(k)
        );
      },
    },

    // 음주 관련
    drinking: {
      keywords: ["음주", "술", "음용", "마시", "주류", "알코올"],
      check: (value) => {
        return categoryKeywords.drinking.keywords.some((k) =>
          queryLower.includes(k)
        );
      },
    },

    // 소득 관련
    income: {
      keywords: [
        "소득",
        "연봉",
        "월급",
        "수입",
        "저소득",
        "고소득",
        "중소득",
        "100만원",
        "200만원",
        "300만원",
        "400만원",
        "500만원",
        "600만원",
        "700만원",
        "800만원",
        "900만원",
        "1000만원",
        "백만원",
        "천만원",
      ],
      check: (value, type = "personal") => {
        const valueLower = String(value).toLowerCase();

        // "가구소득" 키워드가 있으면 가구소득만 하이라이트
        if (
          queryLower.includes("가구소득") ||
          queryLower.includes("가구 소득")
        ) {
          return type === "household";
        }

        // "개인소득" 키워드가 있으면 개인소득만 하이라이트
        if (
          queryLower.includes("개인소득") ||
          queryLower.includes("개인 소득")
        ) {
          return type === "personal";
        }

        // 고소득/저소득/중소득 처리
        if (queryLower.includes("고소득")) {
          const incomeMatch = valueLower.match(/(\d+)만원/);
          if (incomeMatch) {
            const amount = parseInt(incomeMatch[1]);
            return amount >= 400 && type === "personal";
          }
        }

        if (queryLower.includes("저소득")) {
          const incomeMatch = valueLower.match(/(\d+)만원/);
          if (incomeMatch) {
            const amount = parseInt(incomeMatch[1]);
            return amount <= 200 && type === "personal";
          }
        }

        if (queryLower.includes("중소득")) {
          const incomeMatch = valueLower.match(/(\d+)만원/);
          if (incomeMatch) {
            const amount = parseInt(incomeMatch[1]);
            return amount > 200 && amount < 400 && type === "personal";
          }
        }

        // 일반 소득 키워드는 개인소득만 하이라이트 (기본값)
        const hasIncomeKeyword = categoryKeywords.income.keywords.some((k) =>
          queryLower.includes(k)
        );

        return hasIncomeKeyword && type === "personal";
      },
    },

    // 결혼여부 관련
    maritalStatus: {
      keywords: [
        "기혼",
        "미혼",
        "결혼",
        "배우자",
        "독신",
        "싱글",
        "유부남",
        "유부녀",
        "총각",
        "처녀",
      ],
      check: (value) => {
        const valueLower = String(value).toLowerCase();
        return categoryKeywords.maritalStatus.keywords.some(
          (k) => queryLower.includes(k) && valueLower.includes(k)
        );
      },
    },

    // 생활패턴 관련 (칼럼명 기반)
    lifestyle: {
      patterns: {
        체력_관리를_위한_활동: [
          "운동",
          "체력",
          "헬스",
          "요가",
          "필라테스",
          "피트니스",
          "스포츠",
        ],
        이용_중인_OTT_서비스: [
          "ott",
          "넷플릭스",
          "netflix",
          "디즈니",
          "disney",
          "티빙",
          "웨이브",
          "쿠팡플레이",
          "왓챠",
          "스트리밍",
        ],
        반려동물을_키우거나_키웠던_경험: [
          "반려동물",
          "강아지",
          "고양이",
          "애완동물",
          "펫",
          "반려견",
          "반려묘",
        ],
        사용해_본_AI_챗봇_서비스: [
          "ai",
          "챗봇",
          "챗gpt",
          "chatgpt",
          "인공지능",
          "gpt",
          "클로드",
          "claude",
        ],
        해외여행을_간다면_가고싶은_곳: ["여행", "해외여행", "여행지", "관광"],
        스킨케어_제품을_구매할_때_중요하게_고려하는_요소: [
          "스킨케어",
          "화장품",
          "미용",
          "피부관리",
          "피부",
        ],
      },
      check: (columnName, value) => {
        const patterns = categoryKeywords.lifestyle.patterns[columnName];
        if (!patterns) return false;

        return patterns.some((keyword) => queryLower.includes(keyword));
      },
    },
  };

  // 2. 각 필드별 하이라이트 여부 판단 함수
  const shouldHighlight = {
    age: () => {
      return categoryKeywords.age.check(selectedPanel.age);
    },

    region: () => {
      return (
        categoryKeywords.region.check(selectedPanel.residence) ||
        categoryKeywords.region.check(selectedPanel.district)
      );
    },

    vehicle: () => {
      return categoryKeywords.vehicle.check(null);
    },

    smoking: () => {
      return categoryKeywords.smoking.check(null);
    },

    drinking: () => {
      return categoryKeywords.drinking.check(null);
    },

    incomePersonal: (value) => {
      return categoryKeywords.income.check(value, "personal");
    },

    incomeHousehold: (value) => {
      return categoryKeywords.income.check(value, "household");
    },

    maritalStatus: (value) => {
      return categoryKeywords.maritalStatus.check(value);
    },

    lifestyle: (columnName, value) => {
      return categoryKeywords.lifestyle.check(columnName, value);
    },

    general: (value) => {
      if (!value) return false;
      const valueStr = String(value).toLowerCase();

      // 불용어 목록 추가
      const stopwords = [
        "이상",
        "이하",
        "미만",
        "초과",
        "월",
        "년",
        "약",
        "패널",
        "정도",
      ];

      const keywords = queryLower
        .split(/[\s,]+/)
        .filter((k) => k.length >= 2 && !stopwords.includes(k));

      return keywords.some((keyword) => valueStr.includes(keyword));
    },
  };

  // 3. 생활패턴 매칭 개수 계산
  const getMatchingLifestyleCount = () => {
    if (!selectedPanel.lifestylePatterns) return 0;

    return Object.entries(selectedPanel.lifestylePatterns).filter(
      ([key, value]) =>
        value !== "무응답" && shouldHighlight.lifestyle(key, value)
    ).length;
  };

  const matchingLifestyleCount = getMatchingLifestyleCount();

  const InfoRow = ({ label, value, highlight = false }) => (
    <div
      className={`flex py-2 border-b border-gray-100 last:border-b-0 transition-all ${
        highlight
          ? "bg-yellow-50 border-l-4 border-l-yellow-400 pl-2 -ml-2"
          : ""
      }`}
    >
      <span className="w-1/3 text-base font-semibold text-gray-700 flex items-center gap-1">
        {highlight && <Search className="w-4 h-4 text-yellow-600" />}
        {label}
      </span>
      <span
        className={`w-2/3 text-base ${
          highlight ? "font-semibold text-gray-900" : "text-gray-900"
        }`}
      >
        {value || "무응답"}
      </span>
    </div>
  );

  // ArrayInfoRow 컴포넌트를 태그 스타일로 변경
  const ArrayInfoRow = ({
    label,
    values,
    highlight = false,
    useTagStyle = false,
  }) => {
    const [showAll, setShowAll] = useState(false);

    const INITIAL_SHOW_COUNT = 6;
    const displayValues = showAll
      ? values
      : values?.slice(0, INITIAL_SHOW_COUNT);
    const hasMore = values && values.length > INITIAL_SHOW_COUNT;

    return (
      <div
        className={`py-3 border-b border-gray-100 last:border-b-0 transition-all ${
          highlight
            ? "bg-yellow-50 border-l-4 border-l-yellow-400 pl-2 -ml-2"
            : ""
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-semibold text-gray-700 flex items-center gap-1">
            {highlight && <Search className="w-4 h-4 text-yellow-600" />}
            {label}
          </span>
          {values && values.length > 0 && (
            <span className="text-sm px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-full font-medium">
              {values.length}개
            </span>
          )}
        </div>

        <div className="text-base text-gray-900">
          {values && values.length > 0 ? (
            useTagStyle ? (
              <div>
                <div className="flex flex-wrap gap-2">
                  {displayValues.map((item, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-base font-medium border-2 ${
                        highlight
                          ? "bg-yellow-50 border-yellow-400 text-yellow-900"
                          : "bg-white border-indigo-300 text-gray-900 shadow-sm"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {hasMore && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-3 text-base text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        접기
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        {values.length - INITIAL_SHOW_COUNT}개 더보기
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <ul className="list-disc list-inside">
                {values.map((item, idx) => (
                  <li key={idx} className={highlight ? "font-semibold" : ""}>
                    {item}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <span className="text-gray-400">무응답</span>
          )}
        </div>
      </div>
    );
  };

  const reliabilityColor =
    selectedPanel.reliability >= 75
      ? "bg-green-100 text-green-800 border-green-300"
      : selectedPanel.reliability >= 50
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : "bg-red-100 text-red-800 border-red-300";

  return (
    <div className="bg-white rounded-lg border-2 border-indigo-200 shadow-sm">
      {/* 헤더 - 클릭하면 전체 열기/닫기 */}
      <div
        className="p-4 bg-indigo-50 border-b-2 border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-indigo-600" />
            <div>
              <h3 className="text-lg font-bold text-indigo-900">
                패널 ID: {selectedPanel.mbSn}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-full border-2 ${reliabilityColor} flex items-center gap-2`}
            >
              <Award className="w-5 h-5" />
              <span className="font-bold text-lg">
                {selectedPanel.reliability}%
              </span>
            </div>
            {/* 전체 열기/닫기 버튼 */}
            <div className="p-2 rounded-full bg-indigo-200 hover:bg-indigo-300 transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-indigo-700" />
              ) : (
                <ChevronDown className="w-6 h-6 text-indigo-700" />
              )}
            </div>
          </div>
        </div>

        {/* 신뢰도 감점 사유 - 헤더에 포함 */}
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

      {/* 상세 정보 - isExpanded가 true일 때만 표시 */}
      {isExpanded && (
        <>
          {/* 기본 정보 */}
          <CollapsibleSection title="기본 정보" icon="📋" defaultOpen={true}>
            <InfoRow
              label="성별"
              value={selectedPanel.gender}
              highlight={shouldHighlight.general(selectedPanel.gender)}
            />
            <InfoRow
              label="나이"
              value={`${selectedPanel.age}세`}
              highlight={shouldHighlight.age()}
            />
            <InfoRow
              label="출생년도"
              value={`${selectedPanel.birthYear}년`}
              highlight={shouldHighlight.general(`${selectedPanel.birthYear}`)}
            />
            <InfoRow
              label="거주지"
              value={`${selectedPanel.residence} ${selectedPanel.district}`}
              highlight={shouldHighlight.region()}
            />
            <InfoRow
              label="결혼여부"
              value={selectedPanel.maritalStatus}
              highlight={shouldHighlight.maritalStatus(
                selectedPanel.maritalStatus
              )}
            />
            <InfoRow
              label="자녀수"
              value={`${selectedPanel.children}명`}
              highlight={shouldHighlight.general(`${selectedPanel.children}`)}
            />
            <InfoRow
              label="가족수"
              value={selectedPanel.familySize}
              highlight={shouldHighlight.general(selectedPanel.familySize)}
            />
          </CollapsibleSection>

          {/* 직업 및 소득 정보 */}
          <CollapsibleSection title="직업 및 소득" icon="💼" defaultOpen={true}>
            <InfoRow
              label="최종학력"
              value={selectedPanel.education}
              highlight={shouldHighlight.general(selectedPanel.education)}
            />
            <InfoRow
              label="직업"
              value={selectedPanel.job}
              highlight={shouldHighlight.general(selectedPanel.job)}
            />
            <InfoRow
              label="직무"
              value={selectedPanel.role}
              highlight={shouldHighlight.general(selectedPanel.role)}
            />
            <InfoRow
              label="개인소득"
              value={selectedPanel.personalIncome}
              highlight={shouldHighlight.incomePersonal(
                selectedPanel.personalIncome
              )}
            />
            <InfoRow
              label="가구소득"
              value={selectedPanel.householdIncome}
              highlight={shouldHighlight.incomeHousehold(
                selectedPanel.householdIncome
              )}
            />
          </CollapsibleSection>

          {/* 소유 정보 */}
          <CollapsibleSection title="소유 정보" icon="📱" defaultOpen={true}>
            <InfoRow
              label="휴대폰 브랜드"
              value={selectedPanel.phoneBrand}
              highlight={shouldHighlight.general(selectedPanel.phoneBrand)}
            />
            <InfoRow
              label="휴대폰 모델"
              value={selectedPanel.phoneModel}
              highlight={shouldHighlight.general(selectedPanel.phoneModel)}
            />
            <InfoRow
              label="차량 보유"
              value={selectedPanel.carOwnership}
              highlight={shouldHighlight.vehicle()}
            />
            <InfoRow
              label="자동차 제조사"
              value={selectedPanel.carBrand}
              highlight={false}
            />
            <InfoRow
              label="자동차 모델"
              value={selectedPanel.carModel}
              highlight={false}
            />
          </CollapsibleSection>

          {/* 생활 습관 */}
          <CollapsibleSection title="생활 습관" icon="🚬" defaultOpen={true}>
            <ArrayInfoRow
              label="흡연경험"
              values={selectedPanel.smokingExperience}
              highlight={shouldHighlight.smoking()}
              useTagStyle={true}
            />
            <ArrayInfoRow
              label="음주경험"
              values={selectedPanel.drinkingExperience}
              highlight={shouldHighlight.drinking()}
              useTagStyle={true}
            />
          </CollapsibleSection>

          {/* 보유 제품 */}
          <CollapsibleSection title="보유 제품" icon="🛍️" defaultOpen={false}>
            <ArrayInfoRow
              label="보유제품"
              values={selectedPanel.ownedProducts}
              highlight={false}
              useTagStyle={true} // 태그 스타일 적용
            />
          </CollapsibleSection>

          {/* 생활 패턴 정보 */}
          {selectedPanel.lifestylePatterns &&
            Object.keys(selectedPanel.lifestylePatterns).length > 0 && (
              <CollapsibleSection
                title={
                  <div className="flex items-center justify-between w-full pr-8">
                    <span>생활 패턴</span>
                    {matchingLifestyleCount > 0 && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full border border-yellow-300">
                        {matchingLifestyleCount}개 매칭
                      </span>
                    )}
                  </div>
                }
                icon="🌟"
                defaultOpen={matchingLifestyleCount > 0}
              >
                {Object.entries(selectedPanel.lifestylePatterns).map(
                  ([key, value]) =>
                    value !== "무응답" && (
                      <InfoRow
                        key={key}
                        label={key.replace(/_/g, " ")}
                        value={value}
                        highlight={shouldHighlight.lifestyle(key, value)}
                      />
                    )
                )}
              </CollapsibleSection>
            )}
        </>
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

  // 가장 많은 거주지역 계산 (무응답 제외 우선)
  const residenceDistribution = panels.reduce((acc, p) => {
    const residence = p.residence || "무응답";
    acc[residence] = (acc[residence] || 0) + 1;
    return acc;
  }, {});

  const residenceWithoutNoResponse = Object.entries(residenceDistribution)
    .filter(([key]) => key !== "무응답")
    .sort((a, b) => b[1] - a[1]);

  const mostCommonResidence =
    residenceWithoutNoResponse.length > 0
      ? residenceWithoutNoResponse[0]
      : ["무응답", residenceDistribution["무응답"] || 0];

  // 가장 많은 소득 계산 (무응답 제외 우선)
  const incomeDistribution = panels.reduce((acc, p) => {
    const income = p.personalIncome || "무응답";
    acc[income] = (acc[income] || 0) + 1;
    return acc;
  }, {});

  const incomeWithoutNoResponse = Object.entries(incomeDistribution)
    .filter(([key]) => key !== "무응답")
    .sort((a, b) => b[1] - a[1]);

  // 무응답 제외 데이터가 있으면 그 중 1위, 없으면 무응답 표시
  const mostCommonIncome =
    incomeWithoutNoResponse.length > 0
      ? incomeWithoutNoResponse[0]
      : ["무응답", incomeDistribution["무응답"] || 0];

  const avgAge =
    panels.reduce((sum, p) => sum + (p.age || 0), 0) / panels.length;

  return (
    <div className="bg-white rounded-lg border-2 border-indigo-200 shadow-sm p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 총 패널 수 */}
        <div className="p-5 bg-indigo-100 rounded-lg border border-indigo-200">
          <p className="text-base text-gray-700 mb-2 font-medium">총 패널 수</p>
          <p className="text-4xl font-bold text-indigo-900">
            {panels.length}명
          </p>
        </div>

        {/* 가장 많은 거주지역 */}
        <div className="p-5 bg-purple-200 rounded-lg border border-purple-200">
          <p className="text-base text-gray-700 mb-2 font-medium">
            가장 많은 거주지역
          </p>
          <p className="text-3xl font-bold text-purple-900">
            {mostCommonResidence[0]}
          </p>
          <p className="text-sm text-gray-600 mt-1 font-semibold">
            {mostCommonResidence[1]}명
          </p>
        </div>

        {/* 평균 나이 */}
        <div className="p-5 bg-blue-100 rounded-lg border border-blue-200">
          <p className="text-base text-gray-700 mb-2 font-medium">평균 나이</p>
          <p className="text-4xl font-bold text-blue-900">
            {avgAge.toFixed(1)}세
          </p>
        </div>

        {/* 가장 많은 소득 */}
        <div className="p-5 bg-purple-100 rounded-lg border border-purple-200">
          <p className="text-base text-gray-700 mb-2 font-medium">
            가장 많은 소득
          </p>
          <div className="text-lg font-bold text-purple-900">
            {mostCommonIncome[0]}
          </div>
          <p className="text-sm text-gray-600 mt-1 font-semibold">
            {mostCommonIncome[1]}명
          </p>
        </div>
      </div>
    </div>
  );
}
