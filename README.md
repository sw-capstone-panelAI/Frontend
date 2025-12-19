# PanelFinder Frontend

https://github.com/user-attachments/assets/42aa02ea-233e-431f-9ccc-bde13cb356e2

## Preview
<img width="1587" height="2245" alt="판넬" src="https://github.com/user-attachments/assets/26c8afdd-b434-4414-8b56-4de02a4b3ff7" />

### Members
<table width="50%" align="center">
    <tr>
        <td align="center"><b>LEAD/FE</b></td>
        <td align="center"><b>FE/BE</b></td>
        <td align="center"><b>AI/DATA</b></td>
        <td align="center"><b>AI/DB</b></td>
    </tr>
    <tr>
        <td align="center"><img src="https://avatars.githubusercontent.com/u/173050233?v=4" /></td>
        <td align="center"><img src="https://avatars.githubusercontent.com/u/120187934?v=4" /></td>
        <td align="center"><img src="https://avatars.githubusercontent.com/u/132585785?v=4"></td>
        <td align="center"><img src="https://avatars.githubusercontent.com/u/203871424?v=4" /></td>
    </tr>
    <tr>
        <td align="center"><b><a href="https://github.com/Aegis0424">안성민</a></b></td>
        <td align="center"><b><a href="https://github.com/seungjin777">강승진</a></b></td>
        <td align="center"><b><a href="https://github.com/iral304">송정은</a></b></td>
        <td align="center"><b><a href="https://github.com/hyeon-414">우현</a></b></td> 
    </tr>
</table>

## Tech Stack

### ⚛️ Core Framework
* **React 19.1.1** - UI 라이브러리
* **Vite 7.1.7** - 빌드 도구
* **React Router DOM 7.9.5** - 클라이언트 사이드 라우팅

### 🎨 Styling & UI
* **Tailwind CSS 4.1.16** - 유틸리티 기반 CSS 프레임워크
* **Lucide React 0.548.0** - 아이콘 라이브러리
* **Sonner 2.0.7** - 토스트 알림

### 📊 Data Visualization
* **Recharts 3.3.0** - 차트 라이브러리 (막대 차트, 파이 차트)

### 🔧 Utility
* **Axios 1.13.1** - HTTP 클라이언트

### 🛠️ Development Tools
* **ESLint 9.36.0** - 코드 품질 관리
* **@vitejs/plugin-react 5.0.4** - React Fast Refresh

## Getting Started

### Installation
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# ESLint 실행
npm run lint
```

### Environment Variables
프로젝트는 별도의 환경 변수 설정이 필요하지 않습니다.
백엔드 API URL은 코드 내에서 `http://localhost:5000`로 하드코딩되어 있습니다.

## Project Structure
```
📦Frontend
┣ 📂public
┃ ┗ 📜vite.svg
┣ 📂src
┃ ┣ 📂assets              # 이미지 및 정적 리소스
┃ ┣ 📂components
┃ ┃ ┣ 📂common
┃ ┃ ┃ ┣ 📂bar             # 헤더, 로고 컴포넌트
┃ ┃ ┃ ┣ 📂button          # 버튼 컴포넌트
┃ ┃ ┃ ┣ 📂card            # 패널 카드 컴포넌트
┃ ┃ ┃ ┣ 📂input           # 입력 컴포넌트
┃ ┃ ┃ ┗ 📂mindMap         # 마인드맵 컴포넌트
┃ ┃ ┣ 📂previews          # 프리뷰 컴포넌트
┃ ┃ ┣ 📜AgeDistributionChart.jsx
┃ ┃ ┣ 📜GenderDistributionChart.jsx
┃ ┃ ┣ 📜IncomeDistributionChart.jsx
┃ ┃ ┣ 📜ResidenceDistributionChart.jsx
┃ ┃ ┣ 📜Dropdown.jsx
┃ ┃ ┣ 📜GuideModal.jsx
┃ ┃ ┣ 📜SearchInput.jsx
┃ ┃ ┣ 📜SearchModelDropdown.jsx
┃ ┃ ┗ 📜StatsOverview.jsx
┃ ┣ 📂pages
┃ ┃ ┣ 📜CommonPage.jsx
┃ ┃ ┣ 📜MainPage.jsx
┃ ┃ ┣ 📜NoResultPage.jsx
┃ ┃ ┣ 📜RelatedSearchPage.jsx
┃ ┃ ┣ 📜ResultPage.jsx
┃ ┃ ┣ 📜SearchingPage.jsx
┃ ┃ ┗ 📜TestPage.jsx
┃ ┣ 📂utils
┃ ┃ ┣ 📂constants
┃ ┃ ┃ ┗ 📜routes.js
┃ ┃ ┗ 📂function
┃ ┃   ┗ 📜utils.js
┃ ┣ 📜App.jsx
┃ ┣ 📜index.css
┃ ┗ 📜main.jsx
┣ 📜.gitignore
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜package.json
┣ 📜README.md
┣ 📜tailwind.config.js
┗ 📜vite.config.js
```

## Key Features

### 🏠 메인 페이지
- **자연어 검색**: 복잡한 쿼리 없이 자연어로 패널 검색
- **검색 모델 선택**: Fast Mode(빠른 검색) / Deep Search Mode(정밀 검색)
- **검색 히스토리**: 최근 검색 기록 최대 10개 저장 및 재검색
- **검색 예시 제공**: 인구통계, 생활패턴, 복합 조건 검색 예시
- **인터랙티브 가이드**: 전체 기능 사용법을 단계별로 안내

### 🔍 검색 중 페이지
- **실시간 진행률**: 3단계 검색 프로세스 시각화
- **단계별 안내**: AI 분석 → 데이터베이스 검색 → 결과 정리
- **로딩 애니메이션**: 부드러운 진행률 표시

### 📊 검색 결과 페이지
- **패널 목록**: 신뢰도 순으로 정렬된 패널 카드
- **신뢰도 필터**: 100%, 75%, 50%, 25% 이상 필터링
- **패널 상세 정보**: 기본정보, 직업/소득, 소유정보, 생활습관, 생활패턴
- **키워드 하이라이트**: 검색어와 일치하는 항목 자동 강조
- **접기/펼치기**: 섹션별 열기/닫기 기능
- **CSV 내보내기**: 검색 결과를 CSV 파일로 다운로드

### 📈 데이터 시각화
- **성별 분포**: 파이 차트
- **연령대 분포**: 막대 차트 (10대~90대+)
- **거주지 분포**: 파이 차트 (권역별) + 막대 차트 (지역별)
- **소득 분포**: 막대 차트 (11개 구간)

### 🤖 AI 기능
- **추천 검색어 생성**: 마인드맵 형태로 관련 키워드 시각화
- **키워드 조합**: 최대 4개 키워드 선택 후 새 검색어 자동 생성
- **공통 특성 분석**: 패널들의 공통점 자동 분석 및 마케팅 인사이트 제공

### 🎯 검색 결과 없음 페이지
- **검색 팁 제공**: 효과적인 검색 방법 안내
- **추천 검색어**: 3가지 카테고리별 예시 제공
- **애니메이션**: 순차적 콘텐츠 표시

### 💡 기타 기능
- **반응형 디자인**: 다양한 화면 크기 지원
- **인디고/슬레이트 컬러 테마**: 일관된 디자인 시스템
- **토스트 알림**: 사용자 행동에 대한 즉각적 피드백
- **로컬스토리지**: 검색 히스토리 자동 저장

## API Endpoints

프론트엔드는 다음 백엔드 API를 사용합니다:
```
POST /api/search                    # 패널 검색 (자연어 → SQL)
POST /api/common-characteristics    # 공통 특성 분석
POST /api/related-keywords          # 추천 검색어 생성
POST /api/keywords-newQuery         # 키워드 기반 쿼리 재생성
POST /api/export-csv                # CSV 내보내기
```

## Color Scheme

프로젝트는 **인디고(Indigo)와 슬레이트(Slate)** 컬러 팔레트를 사용합니다:

- **Primary**: Indigo (indigo-50 ~ indigo-900)
- **Secondary**: Slate (slate-50 ~ slate-900)
- **Accent**: Purple, Teal, Emerald
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

## Browser Support

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## License

이 프로젝트는 한성대학교 기업연계 SW캡스톤디자인 수업에서 진행되었습니다.
