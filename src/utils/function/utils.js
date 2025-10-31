//tailwindcss 문장단위로 들어왔을때 연결해주는 함수
// 즉 컴포넌트에 기본적으로 적용되어있는 css에 추가로 css를 넣고 싶을때 사용

export function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}