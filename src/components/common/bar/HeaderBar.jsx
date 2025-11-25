import React from "react";
import { Logo } from "@common/bar/logo";

// 📌 네비게이션 바 컴포넌트
function HeaderBar({ children }) {
  return (
    <div className="flex flex-row space-x-5">
      {/* 🏢 로고 영역 */}
      <div className="w-60">
        <Logo />
      </div>

      {/* 📋 자식 컴포넌트 영역 (검색바 등) */}
      <div className="flex justify-items-start">{children}</div>
    </div>
  );
}

export default HeaderBar;
