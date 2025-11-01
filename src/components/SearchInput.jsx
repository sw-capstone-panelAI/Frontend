import { Search } from "lucide-react";
import { CustomInput } from "@common/input/CustomInput";

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "자연어로 패널을 찾아보세요",
  disabled = false,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        {/* 검색 입력 필드 */}
        <CustomInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-14 pl-6 pr-14 bg-muted/50 border-2 border-border/50 rounded-xl 
                     focus:border-primary/50 transition-all duration-200
                     placeholder:text-muted-foreground/60"
        />
        {/* 검색 버튼 */}
        <button
          onClick={onSearch}
          disabled={disabled || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 
                     bg-primary text-primary-foreground rounded-lg
                     hover:opacity-90 transition-opacity
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
