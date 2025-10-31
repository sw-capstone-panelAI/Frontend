import React from "react";
import Logo from "@components/common/bar/logo";
import CustomButton from "@components/common/button/custom-button";
import { useNavigate } from "react-router-dom";

// 네비게이션 안의 a태그 재활용 가능하게
const NavigationItem = ({ text, url }) => {
  return (
    <a
      href={url}
      className="
      font-semibold text-gray-700 hover:text-green-700 
      px-3 py-auto rounded-lg hover:bg-green-200 transition-colors
      "
    >
      {text}
    </a>
  );
};

// 네비게이션 바
function HeaderBar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Logo />
        <nav>
          <ul className="flex gap-5 list-none items-center">
            <li>
              <NavigationItem text="지도" url="/about" />
            </li>
            <li>
              <NavigationItem text="안심 봉투" url="/about" />
            </li>
            <li>
              <NavigationItem text="AI약품검색" url="/about" />
            </li>
            <li>
              <NavigationItem text="퀴즈" url="/about" />
            </li>
            <li>
              <NavigationItem text="게시판" url="/about" />
            </li>
          </ul>
        </nav>
        <CustomButton
          type="button"
          color="gradient"
          onClick={() => {
            navigate("/about");
          }}
        >
          내 주변 수거함 찾기
        </CustomButton>
      </div>
    </>
  );
}

export default HeaderBar;
