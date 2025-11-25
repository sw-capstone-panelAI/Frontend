// Dropdown.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * props:
 * - options: [{ label: string, value: string|number }]
 * - value: string|number|null
 * - onChange: (newValue) => void
 * - placeholder: string
 */
export default function Dropdown({
  options = [],
  value = null,
  onChange,
  placeholder = "선택하세요",
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const selected = options.find((o) => o.value === value) || null;

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (!open) return;
      if (
        btnRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    // 🎨 드롭다운 컨테이너: 슬레이트 색상 테두리
    <div className="relative inline-block w-64 border border-slate-300 rounded-lg">
      {/* 🔘 드롭다운 버튼: 흰색 배경 + 인디고 포커스 */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white text-left
                   flex items-center justify-between gap-2
                   hover:bg-indigo-50 focus:outline-none focus:ring-0 focus:border-indigo-400"
      >
        <span className={selected ? "text-slate-800" : "text-slate-400"}>
          {selected ? selected.label : placeholder}
        </span>
        {/* 🔽 화살표 아이콘 */}
        <svg
          className={`w-4 h-4 transition-transform text-indigo-500 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* 📋 드롭다운 메뉴: 흰색 배경 + 인디고 hover */}
      {open && (
        <div
          ref={menuRef}
          className="absolute z-50 mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-md overflow-hidden"
        >
          <div className="max-h-60 overflow-auto py-1">
            {options.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-500">옵션 없음</div>
            )}
            {options.map((opt) => (
              <div
                key={String(opt.value)}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 ${
                  value === opt.value
                    ? "text-indigo-700 font-medium bg-indigo-50"
                    : "text-slate-800"
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
