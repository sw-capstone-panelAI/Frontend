import React, { useEffect, useState } from "react";
import { Loader2, Database, Brain, CheckCircle } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";
import axios from "axios";

// 인라인 프로그레스 바 컴포넌트
// - value: 0~100 진행률
// - 색상, 모양은 Tailwind CSS로 조절
function ProgressBar({ value }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-indigo-600/20">
      <div
        className="h-full transition-all bg-indigo-600"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function SearchingPage() {
  // 라우터 경로 state에서 전달받은 검색 쿼리
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || ""; // MainPage에서 query 전달받음, 없으면 빈문자열

  // 로딩 진행률(0~100)
  const [progress, setProgress] = useState(0);
  // 현재 진행중인 단계(0, 1, 2)
  const [currentStep, setCurrentStep] = useState(0);

  // 검색 진행 단계
  // duration: 각 단계 애니메이션 지속 시간(ms)
  // icon: 단계별 아이콘
  // label: 아래 보여줄 단계 설명 텍스트
  const steps = [
    { icon: Brain, label: "AI가 검색어를 분석하고 있습니다...", duration: 800 },
    {
      icon: Database,
      label: "데이터베이스에서 패널을 검색 중...",
      duration: 1000,
    },
    { icon: CheckCircle, label: "결과를 정리하고 있습니다...", duration: 500 },
  ];

  // 검색어가 바뀌거나 컴포넌트 마운트 시 실행
  useEffect(() => {
    let isMounted = true; // 컴포넌트 언마운트 방지용

    if (!query) return; // 쿼리 없으면 아무 동작 안함

    async function fetchData() {
      try {
        // 검색 API 호출 (POST)
        const res = await axios.post("http://localhost:5000/api/search", {
          query,
        });
        if (isMounted) {
          // 검색 완료 후, 모든 단계 애니메이션 진행 후 결과페이지로 이동
          setTimeout(
            () => {
              navigate(routes.result, { state: { query, result: res.data } });
            },
            steps.reduce((t, s) => t + s.duration, 0)
          );
        }
      } catch (err) {
        console.error("요청 실패: ", err);
        // 실패 처리: 필요시 에러 상태 처리 및 UI 표시 추가 가능
      }
    }

    fetchData();

    // 단계별 애니메이션 및 진행률 처리 타이머 세팅

    let stepTimer;
    let progressTimer;

    // 전체 단계 누적 시간
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    // 100%를 전체 시간으로 나눈 시간당 진행률 증가량
    const progressIncrement = 100 / totalDuration;

    // 진행률 타이머: 10ms마다 진행률 증가
    progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement * 10;
        return next >= 100 ? 100 : next;
      });
    }, 10);

    // 단계별 현재 단계를 순차적으로 setCurrentStep 설정
    const updateStep = (idx) => {
      if (idx < steps.length) {
        setCurrentStep(idx);
        stepTimer = setTimeout(() => updateStep(idx + 1), steps[idx].duration);
      }
    };

    updateStep(0);

    // 컴포넌트 언마운트 및 리렌더 시 타이머 정리
    return () => {
      isMounted = false; // API 응답 후처리 금지
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [query, navigate]);

  // 현재 단계 아이콘 표시용 변수
  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  // UI 렌더링 부분
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header: 좌측 최상단 로고 배치 및 중앙타이틀 등 확장 가능 */}
      <header className="w-full flex items-center gap-3 px-5 py-5">
        <HeaderBar />
      </header>

      {/* 메인 컨텐츠 랜더링: 로딩 애니메이션, 프로그레스, 단계 표시 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl min-h-[600px] flex flex-col justify-center space-y-10 mx-auto">
          {/* 로딩 아이콘 + 회전 애니메이션 */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-600/10 flex items-center justify-center">
                <CurrentIcon className="w-12 h-12 text-indigo-600 animate-pulse" />
              </div>
              <Loader2 className="w-24 h-24 text-indigo-600/30 animate-spin absolute inset-0" />
            </div>
            {/* 단계별 설명 텍스트 */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl text-gray-800 font-bold">
                패널을 검색하고 있습니다
              </h2>
              <p className="text-gray-600">{steps[currentStep]?.label}</p>
            </div>
          </div>

          {/* 검색어 텍스트는 UI에서 제거함 (요청사항) */}

          {/* 프로그레스 바 + 완료율 표시 */}
          <div className="space-y-2 mx-auto w-full max-w-lg">
            <ProgressBar value={progress} />
            <p className="text-xs text-gray-600 text-center">
              {Math.round(progress)}% 완료
            </p>
          </div>

          {/* 단계별 아이콘 표시 및 현재단계 강조 */}
          <div className="flex justify-between w-full max-w-lg mx-auto">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === currentStep;
              const isCompleted = idx < currentStep;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center gap-2 flex-1 transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100"
                      : isCompleted
                      ? "opacity-50"
                      : "opacity-30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? "border-indigo-600 bg-indigo-600/10"
                        : "border-gray-300"
                    }`}
                  >
                    <StepIcon
                      className={`w-5 h-5 ${
                        isActive ? "text-indigo-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 max-w-[100px]">
                    {step.label.split("...")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
