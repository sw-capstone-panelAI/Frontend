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

export function PanelCard({ panel, onClick, selected }) {
  return (
    <div
      className={`p-4 my-1 rounded-lg cursor-pointer border ${
        selected
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-300 bg-gray-50 hover:border-yellow-600 hover:shadow-lg  hover:border-2"
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{panel.id}</h3>
      <p className="text-sm text-gray-600">
        {panel.age}세 · {panel.gender}
      </p>
      <p className="text-sm">
        {panel.occupation} · {panel.residence}
      </p>
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

export function PanelDetailView({ selectedPanel }) {
  const [openCharac, setOpenCharac] = useState(false);
  const [openSubtract, setOpenSubtract] = useState(false);
  const [openAddInfo, setOpenAddInfo] = useState(false);

  if (!selectedPanel) {
    return (
      <div className="h-full flex items-center font-bold justify-center text-gray-500">
        👆원하는 패널을 클릭하여 상세 정보를 확인하세요👆
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl mb-2">{selectedPanel.id}</h2>
              <p className="text-gray-600">
                {selectedPanel.age}세 · {selectedPanel.gender}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">거주지</p>
                <p>{selectedPanel.residence}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">직업</p>
                <p>{selectedPanel.occupation}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">소득</p>
                <p>{selectedPanel.income.toLocaleString()}만원</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <Car className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs text-gray-600">차량</p>
                <p>
                  {selectedPanel.vehicle.hasVehicle
                    ? selectedPanel.vehicle.type
                    : "없음"}
                </p>
              </div>
            </div>
          </div>

          {/* ▼▼ AI 한 줄 요약 ▼▼ */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className=" items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-semibold">고객 성향</h3>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    openCharac ? "rotate-180" : ""
                  }`}
                  onClick={() => setOpenCharac(() => !openCharac)}
                />
              </div>
              {openCharac && (
                <div className="bg-yellow-50 m-2 p-2 rounded-lg border border-yellow-200 shadow-lg">
                  {/* 목업 데이터가 아닐 경우 selectedPanel.고객성향문장 */}{" "}
                  {/* 요약 본문 */}
                  <div className="p-3 space-y-3 text-gray-700 font-bold leading-relaxed">
                    <p>
                      <span className="font-bold text-yellow-800">
                        주요연령대:
                      </span>{" "}
                      40대 후반, 장년층
                    </p>
                    <p>
                      <span className="font-bold text-yellow-800">
                        지역특성:
                      </span>{" "}
                      경기도 성남시 거주, 수도권 중산층 주거지역 거주자.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-800">
                        직업경향:
                      </span>{" "}
                      건설·건축 분야의 기능직, 월 400-499만원의 안정적인
                      개인소득 가진 전문 기술직 종사자.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-800">
                        생활패턴:
                      </span>{" "}
                      4인 가족의 기혼 가장, 다양한 첨단 전자기기와 차량을 보유.
                      소주, 맥주 등 다양한 주류를 즐기는 현대적 소비 성향을
                      보임.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ▼▼ 신뢰도 감점 사유 섹션 ▼▼ */}
          {selectedPanel.reliability < 100 ? (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className=" items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                  <h3 className="text-xl font-semibold">신뢰도 감점 사유</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform ${
                      openSubtract ? "rotate-180" : ""
                    }`}
                    onClick={() => setOpenSubtract(() => !openSubtract)}
                  />
                </div>
                {openSubtract && (
                  <div className="bg-amber-100 m-2 p-2 rounded-lg border border-amber-200 shadow-lg">
                    {/* 목업 데이터가 아닐 경우 selectedPanel.신뢰도감점사유 */}

                    <div className="space-y-3">
                      {/* 감점 포인트 라인 */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 border border-amber-200">
                          <span className="text-xs font-medium text-amber-700">
                            감점 포인트
                          </span>
                        </div>
                        <div className="text-2xl font-extrabold tracking-tight text-amber-700">
                          -{100 - selectedPanel.reliability}점
                        </div>
                      </div>

                      {/* 사유 요약 카드 */}
                      <div className="rounded-xl bg-white border border-amber-200 p-4 shadow-sm">
                        <p className="leading-relaxed text-amber-900">
                          <span className="mr-2 inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
                            사유 요약
                          </span>
                          본 패널은 2010년생으로, 만 16세 미성년자임. 음주
                          경험과 차량 소유에 응답했음. 일반적이지 않음.
                        </p>
                        {/* 핵심 포인트 칩 */}{" "}
                        {/*이부분은 나중에 감점 사유 요약해달라 할때 감점 키워드 배열로 받아와 maps 사용하면 될듯*/}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            2010년생
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            만 16세
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            음주 응답
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            차량 소유 응답
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                            비일반적 패턴
                          </span>
                        </div>
                        {/* 시각 보조: 미니 진행바(선택) */}
                        <div className="mt-4">
                          <div className="h-1.5 w-full rounded-full bg-green-500 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-red-500"
                              style={{
                                width: `${100 - selectedPanel.reliability}%`,
                              }}
                              title={`감점 ${
                                100 - selectedPanel.reliability
                              }점`}
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
            // 신뢰도가 만점인 경우
            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-200">
              <Smile className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold">신뢰도 만족</h3>
              <p className="text-green-600 font-semibold">100%</p>
            </div>
          )}

          {/* ▼▼ 기타 추가 정보 섹션 ▼▼ */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className=" items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ListFilterPlus className="w-8 h-8 text-stone-400" />
                <h3 className="text-xl font-semibold">기타 추가 정보</h3>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    openAddInfo ? "rotate-180" : ""
                  }`}
                  onClick={() => setOpenAddInfo(() => !openAddInfo)}
                />
              </div>
              {openAddInfo && (
                <div className="bg-stone-100 m-2 p-2 rounded-lg border border-stone-300 shadow-lg">
                  {/* 목업 데이터가 아닐 경우 selectedPanel.기타추가정보 */}{" "}
                  <div className="rounded-xl border border-stone-300 bg-stone-50 p-4 sm:p-5 shadow-sm">
                    {/* 상단 요약 배지들 */}
                    <p className="mb-2 font-bold">설문 카테고리별 분류</p>
                    {/* 상세 정보 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* 인구 통계 특성 */}
                      <div className="rounded-lg bg-white border border-stone-200 p-4">
                        <h4 className="mb-3 text-sm font-semibold text-stone-700">
                          인구 통계 특성
                        </h4>
                        <dl className="space-y-2 text-sm text-stone-700">
                          <div className="flex justify-between">
                            <dt className="text-stone-500">결혼여부</dt>
                            <dd className="font-medium">기혼</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-500">자녀수</dt>
                            <dd className="font-medium">1명</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-500">가족수</dt>
                            <dd className="font-medium">3명</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-500">최종학력</dt>
                            <dd className="font-medium">대학교 졸업</dd>
                          </div>
                        </dl>
                      </div>

                      {/* 소비 성향 */}
                      <div className="rounded-lg bg-white border border-stone-200 p-4">
                        <h4 className="mb-3 text-sm font-semibold text-stone-700">
                          소비 성향
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {["로봇청소기", "건조기"].map((d) => (
                            <span
                              key={d}
                              className="text-xs px-2 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-800"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-stone-700 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-stone-500">
                              휴대폰 브랜드
                            </span>
                            <span className="font-medium">삼성</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">
                              휴대폰 모델명
                            </span>
                            <span className="font-medium">갤럭시 S25</span>
                          </div>
                        </div>
                      </div>

                      {/* 생활 패턴 */}
                      <div className="rounded-lg bg-white border border-stone-200 p-4">
                        <h4 className="mb-3 text-sm font-semibold text-stone-700">
                          생활 패턴
                        </h4>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">흡연여부</span>
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-stone-300" />
                              <span className="font-medium text-stone-700">
                                무응답
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">음주여부</span>
                            <span className="inline-flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-stone-300" />
                              <span className="font-medium text-stone-700">
                                무응답
                              </span>
                            </span>
                          </div>
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

export function TotalInfo({ panels = [] }) {
  // 패널 총원
  const panelsCnt = panels.length;

  // 평균 연령
  const panelsAge =
    panelsCnt > 0
      ? (panels.reduce((sum, p) => sum + (p.age || 0), 0) / panelsCnt).toFixed(
          1
        )
      : 0;

  // 평균 소득
  const panelsInco =
    panelsCnt > 0
      ? (
          panels.reduce((sum, p) => sum + (p.income || 0), 0) / panelsCnt
        ).toFixed(1)
      : 0;

  // 최빈 거주지 (가장 많이 사는 지역)
  const residenceCount = panels.reduce((acc, p) => {
    if (!p.residence) return acc;
    acc[p.residence] = (acc[p.residence] || 0) + 1;
    return acc;
  }, {});

  const panelsHome =
    Object.keys(residenceCount).length > 0
      ? Object.entries(residenceCount).sort((a, b) => b[1] - a[1])[0][0]
      : "-";

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 m-6 shadow-md">
      {/* 전체 패널 수 */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Users className="w-6 h-6" />
          <p className="font-semibold text-lg">전체 패널</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsCnt}명</p>
      </div>

      {/* 평균 연령 */}
      <div className="flex flex-col items-center flex-1 border-l border-indigo-100">
        <div className="flex items-center gap-2 text-rose-700 mb-2">
          <User className="w-6 h-6" />
          <p className="font-semibold text-lg">평균 연령</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsAge}세</p>
      </div>

      {/* 거주지 */}
      <div className="flex flex-col items-center flex-1 border-l border-indigo-100">
        <div className="flex items-center gap-2 text-yellow-600 mb-2">
          <MapPin className="w-6 h-6" />
          <p className="font-semibold text-lg">주요 거주지</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsHome}</p>
      </div>

      {/* 평균 소득 */}
      <div className="flex flex-col items-center flex-1 border-l border-indigo-100">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <DollarSign className="w-6 h-6" />
          <p className="font-semibold text-lg">평균 소득</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{panelsInco}만원</p>
      </div>
    </div>
  );
}
