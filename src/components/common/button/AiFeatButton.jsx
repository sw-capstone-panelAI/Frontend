import { Sparkles } from "lucide-react";

const COLOR_STYLES = {
  yellow: {
    from: "from-yellow-50",
    to: "to-yellow-100",
    border: "border-yellow-200 hover:border-yellow-300",
    iconBg: "bg-yellow-100 group-hover:bg-yellow-200",
    iconText: "text-yellow-600",
    text: "text-yellow-900",
    labelBg: "bg-yellow-600",
  },
  blue: {
    from: "from-blue-50",
    to: "to-blue-100",
    border: "border-blue-200 hover:border-blue-300",
    iconBg: "bg-blue-100 group-hover:bg-blue-200",
    iconText: "text-blue-600",
    text: "text-blue-900",
    labelBg: "bg-blue-600",
  },
  indigo: {
    from: "from-indigo-50",
    to: "to-purple-50",
    border: "border-indigo-200 hover:border-indigo-300",
    iconBg: "bg-indigo-100 group-hover:bg-indigo-200",
    iconText: "text-indigo-600",
    text: "text-indigo-900",
    labelBg: "bg-indigo-600",
  },
};

const AiFeatButton = ({
  onClick = () => alert("클릭했음"),
  title = "제목",
  content = "내용",
  exeText = "실행",
  icon = null,
  color = "indigo", // 기본값
}) => {
  const colorStyle = COLOR_STYLES[color] || COLOR_STYLES.indigo;

  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br ${colorStyle.from} ${colorStyle.to} 
                  border-2 ${colorStyle.border} rounded-xl p-6 cursor-pointer 
                  hover:shadow-lg transition-all group overflow-hidden`}
    >
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 ${colorStyle.border.replace(
          "border",
          "bg"
        )} rounded-full blur-2xl transition-all`}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`p-3 ${colorStyle.iconBg} rounded-lg transition-colors`}
          >
            {icon || <Sparkles className="w-6 h-6 text-indigo-600" />}
          </div>
          <span
            className={`px-2 py-1 ${colorStyle.labelBg} text-white text-xs rounded-full`}
          >
            AI 기능
          </span>
        </div>
        <h3 className={`text-xl mb-2 ${colorStyle.text}`}>{title}</h3>
        <p className={`text-sm ${colorStyle.iconText} mb-4`}>{content}</p>
        <div
          className={`flex items-center gap-2 ${colorStyle.iconText} group-hover:gap-3 transition-all`}
        >
          <span className="text-sm">{exeText}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AiFeatButton;
