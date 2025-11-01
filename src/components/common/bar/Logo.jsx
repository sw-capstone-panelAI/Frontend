import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={"flex items-center gap-3 left-0"}
        onClick={() => navigate("/")}
      >
        {/* 아이콘 컨테이너 */}
        <div className="relative">
          {/* Sparkles 아이콘 - 반짝이는 별 모양 */}
          <Sparkles
            className={"w-10 h-10 text-gradient-to-r text-indigo-600"}
          />
        </div>

        {/* 로고 텍스트 */}
        {/* 
        bg-gradient-to-r: 왼쪽에서 오른쪽으로 그라데이션
        from-indigo-600 to-indigo-400: 진한 남색에서 연한 남색으로
        bg-clip-text: 그라데이션을 텍스트에만 적용
        text-transparent: 텍스트를 투명하게 해서 그라데이션이 보이도록
      */}
        <span
          className={
            "text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:bg-gradient-to-l"
          }
        >
          PanelFinder
        </span>
      </div>
    </>
  );
}
