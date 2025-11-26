import React, { useEffect, useState } from "react";
import { Loader2, Database, Brain, CheckCircle } from "lucide-react";
import HeaderBar from "@common/bar/HeaderBar";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";
import axios from "axios";

function ProgressBar({ value }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-300">
      <div
        className="h-full transition-all bg-indigo-600"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function SearchingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, model } = location.state || {};

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
    let isMounted = true;

    if (!query) {
      console.error("검색 쿼리가 없습니다.");
      navigate(routes.main);
      return;
    }

    // 검색 모델 기본값 설정
    const searchModel = model || "fast";

    async function fetchData() {
      try {
        console.log("검색 요청:", query, "\n검색 모델:", searchModel);

        const res = await axios.post("http://localhost:5000/api/search", {
          query, // 입력 쿼리
          model: searchModel, // 검색 모델 (fast/deep)
        });

        console.log("검색 응답:", res.data);

        if (isMounted) {
          setTimeout(
            () => {
              // 결과가 없으면 NoResultPage로 이동
              if (!res.data.panels || res.data.panels.length === 0) {
                navigate(routes.noResult, {
                  state: { query, model: searchModel },
                });
              } else {
                navigate(routes.result, {
                  state: {
                    query,
                    model: searchModel,
                    result: res.data,
                  },
                });
              }
            },
            steps.reduce((t, s) => t + s.duration, 0)
          );
        }
      } catch (err) {
        console.error("검색 요청 실패:", err);
        if (isMounted) {
          alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
          navigate(routes.main);
        }
      }
    }

    fetchData();

    let stepTimer;
    let progressTimer;

    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    const progressIncrement = 100 / totalDuration;

    progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement * 10;
        return next >= 100 ? 100 : next;
      });
    }, 10);

    const updateStep = (idx) => {
      if (idx < steps.length) {
        setCurrentStep(idx);
        stepTimer = setTimeout(() => updateStep(idx + 1), steps[idx].duration);
      }
    };

    updateStep(0);

    return () => {
      isMounted = false;
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [query, model, navigate]);

  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      <header className="w-full flex items-center gap-3 px-5 py-5">
        <HeaderBar />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl min-h-[600px] flex flex-col justify-center space-y-10 mx-auto">
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                <CurrentIcon className="w-12 h-12 text-indigo-600 animate-pulse" />
              </div>
              <Loader2 className="w-24 h-24 text-indigo-300 animate-spin absolute inset-0" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl text-gray-800 font-bold">
                패널을 검색하고 있습니다
              </h2>
              <p className="text-gray-600">{steps[currentStep]?.label}</p>
            </div>
          </div>

          <div className="space-y-2 mx-auto w-full max-w-lg">
            <ProgressBar value={progress} />
            <p className="text-xs text-gray-600 text-center">
              {Math.round(progress)}% 완료
            </p>
          </div>

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
                        ? "border-indigo-500 bg-indigo-100"
                        : "border-slate-300"
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
