import { Logo } from "@common/bar/logo";

import { Search } from "lucide-react";

function MainPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        {/* Header */}
        <header className="p-5 flex items-center gap-3">
          <Logo />
        </header>

        {/* Main Content */}
        <main className="mx-100 flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-5 tracking-tight">
            자연어로 패널을 찾아보세요
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            AI가 당신의 검색을 이해하고 정확한 패널을 찾아드립니다
          </p>

          {/* Search Box */}
          <div className="w-full max-w-3xl relative mb-8">
            <input
              type="text"
              placeholder="예: 서울 20대 남자 100명"
              className="w-full h-14 pl-6 pr-14 bg-muted/50 border-2 border-border/50 rounded-xl 
                     focus:border-primary/50 transition-all duration-200
                     placeholder:text-muted-foreground/60"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 
                     bg-primary text-primary-foreground rounded-lg
                     hover:opacity-90 transition-opacity
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* 검색 아이콘 */}
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestion Chips */}
          <div className="flex gap-3 flex-wrap justify-center">
            <button className="px-6 py-3 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-600 hover:bg-indigo-100 hover:border-indigo-400 transition-all hover:-translate-y-0.5">
              서울 20대 남자 100명
            </button>
            <button className="px-6 py-3 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-600 hover:bg-indigo-100 hover:border-indigo-400 transition-all hover:-translate-y-0.5">
              30대 여성 회사원
            </button>
            <button className="px-6 py-3 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-600 hover:bg-indigo-100 hover:border-indigo-400 transition-all hover:-translate-y-0.5">
              차량 보유 고소득자
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default MainPage;
