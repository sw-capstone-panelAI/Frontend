import { Search } from "lucide-react";
import { CustomInput } from "@common/input/CustomInput";

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "자연어로 패널을 찾아보세요",
  disabled = false,
}) {
  // 🔍 엔터키 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        {/* 🔍 검색 입력 필드: 흰색 배경 + 슬레이트/인디고 포커스 */}
        <CustomInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-14 pl-6 pr-14 bg-white border-2 border-slate-300 rounded-xl
                     focus:border-indigo-400 transition-all duration-200
                     placeholder:text-gray-400"
        />
        {/* 🔍 검색 버튼: 인디고 배경 */}
        <button
          onClick={onSearch}
          disabled={disabled || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5
                     bg-indigo-600 text-indigo-800 rounded-lg
                     hover:bg-indigo-700 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
