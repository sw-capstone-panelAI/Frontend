import React from "react";
import { Logo } from "@common/bar/logo";

// 네비게이션 바
function HeaderBar({ children }) {
  return (
    <header className="p-5 flex items-center gap-3">
      <div className="flex space-x-30 left-0">
        <Logo />
        {children}
      </div>
    </header>
  );
}

export default HeaderBar;
