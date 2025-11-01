import React from "react";
import { Logo } from "@common/bar/logo";

// 네비게이션 바
function HeaderBar({ children }) {
  return (
    <div className="flex flex-row space-x-5">
      <div className="w-60">
        <Logo />
      </div>
      <div className="flex justify-items-start">{children}</div>
    </div>
  );
}

export default HeaderBar;
