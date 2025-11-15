import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={"flex items-center gap-3 left-0 cursor-pointer"}
        onClick={() => navigate("/")}
      >
        {/* 🎨 아이콘 컨테이너 */}
        <div className="relative">
          {/* ✨ Sparkles 아이콘 - 반짝이는 별 모양: 인디고 색상 */}
          <Sparkles className={"w-10 h-10 text-indigo-500"} />
        </div>

        {/* 🎨 로고 텍스트: 인디고 계열 부드러운 그라데이션 */}
        {/* bg-gradient-to-r: 왼쪽에서 오른쪽으로 그라데이션
            from-indigo-500 to-slate-500: 인디고에서 슬레이트로 자연스러운 컬러 전환
            bg-clip-text: 그라데이션을 텍스트에만 적용
            text-transparent: 텍스트를 투명하게 해서 그라데이션 보이도록 */}
        <span
          className={
            "text-3xl font-bold bg-gradient-to-r from-indigo-500 to-slate-500 bg-clip-text text-transparent hover:bg-gradient-to-l transition-all"
          }
        >
          PanelFinder
        </span>
      </div>
    </>
  );
}
