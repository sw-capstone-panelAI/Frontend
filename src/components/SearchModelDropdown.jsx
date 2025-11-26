import { useState } from "react";

import { ChevronDown, Check } from "lucide-react";

// ✅ 검색 모델 드롭다운 컴포넌트
const SearchModelDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const models = [
    {
      id: "fast",
      label: "Fast model",
      description: "시간 절약 빠른 검색",
    },
    {
      id: "deep",
      label: "Deep Search model",
      description: "좋은 답변을 위해 오래 생각 ",
    },
  ];

  const selected = models.find((m) => m.id === value) ?? models[0];

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
    console.log(id);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 선택된 모델 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] text-gray-400">검색 모델</span>
          <span className="text-sm font-medium text-gray-800">
            {selected.label}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-2xl border border-gray-200 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-[11px] text-gray-400">
              검색 시 사용할 AI 모델을 선택하세요
            </p>
          </div>
          <div className="py-1">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id)}
                className="w-full flex items-start justify-between gap-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {model.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {model.description}
                  </span>
                </div>
                {value === model.id && (
                  <Check className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModelDropdown;
