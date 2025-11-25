import { useState, useEffect } from "react";
import { Loader2, Database, Brain, CheckCircle } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";

function ProgressBar({ value }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-emerald-200">
      <div
        className="h-full transition-all bg-emerald-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function SearchingPagePreview() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, label: "AI가 검색어를 분석하고 있습니다...", duration: 800 },
    {
      icon: Database,
      label: "데이터베이스에서 패널을 검색 중...",
      duration: 1000,
    },
    { icon: CheckCircle, label: "결과를 정리하고 있습니다...", duration: 500 },
  ];

  useEffect(() => {
    // 진행률 애니메이션
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    const progressIncrement = 100 / totalDuration;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement * 10;
        return next >= 100 ? 100 : next;
      });
    }, 10);

    // 단계별 애니메이션
    let accumulated = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCurrentStep(idx);
      }, accumulated);
      accumulated += step.duration;
    });

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-white via-emerald-50 to-teal-50 flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 p-3 pb-5 flex items-center gap-3 bg-emerald-100 border-b-3 border-emerald-300 rounded-b-2xl">
        <HeaderBar />
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        {/* 로딩 아이콘 */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg">
            <CurrentIcon className="w-12 h-12 text-emerald-600 animate-pulse" />
          </div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin" />
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          패널을 검색하고 있습니다
        </h1>

        {/* 현재 단계 설명 */}
        <p className="text-lg text-emerald-700 mb-8">
          {steps[currentStep]?.label}
        </p>

        {/* 프로그레스 바 */}
        <div className="w-full max-w-md mb-6">
          <ProgressBar value={progress} />
          <p className="text-sm text-gray-600 mt-2 font-medium">
            {Math.round(progress)}% 완료
          </p>
        </div>

        {/* 단계 표시 */}
        <div className="flex gap-6 items-center">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isActive
                      ? "border-3 border-emerald-500 bg-emerald-100 shadow-emerald-300"
                      : isCompleted
                      ? "border-2 border-emerald-400 bg-emerald-50"
                      : "border-2 border-emerald-200 bg-white"
                  }`}
                >
                  <StepIcon
                    className={`w-8 h-8 ${
                      isActive
                        ? "text-emerald-600"
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-emerald-300"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-emerald-700"
                      : isCompleted
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label.split("...")[0].split("을")[0].split("를")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
