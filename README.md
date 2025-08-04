# Todo List Application

Next.js 15와 TypeScript를 사용하여 개발된 현대적인 Todo 리스트 애플리케이션입니다.

## 🚀 주요 기능

### 📋 Todo 관리
- **할 일 추가/수정/삭제**: 완전한 CRUD 기능 지원
- **완료 상태 토글**: 체크박스를 통한 간편한 완료 처리
- **실시간 업데이트**: API 연동으로 즉시 반영

### 🎨 두 가지 뷰 모드
- **Simple 모드**: 간결한 리스트 뷰 (기본)
- **Detail 모드**: 상세 정보와 함께 표시

### 🖼️ 이미지 업로드
- **이미지 첨부**: 할 일에 관련 이미지 추가 가능
- **미리보기**: 업로드된 이미지 즉시 확인
- **편집 기능**: 기존 이미지 교체 가능

### 📝 메모 기능
- **메모 작성**: 할 일에 대한 상세 메모 추가
- **배경 이미지**: 시각적으로 매력적인 메모 섹션

### 📱 반응형 디자인
- **모바일 최적화**: 모든 화면 크기에서 완벽 동작
- **터치 친화적**: 모바일에서도 편리한 사용

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **API**: RESTful API 연동
- **Build Tool**: Next.js App Router

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── layout/        # 레이아웃 관련 컴포넌트
│   │   ├── Todo/          # Todo 관련 컴포넌트
│   │   └── ui/            # UI 기본 컴포넌트
│   ├── items/             # Todo 상세 페이지
│   │   └── [itemId]/      # 동적 라우팅
│   ├── todo-test/         # 테스트 페이지
│   └── assets/            # 이미지 및 아이콘
├── lib/                   # 유틸리티 및 API
├── types/                 # TypeScript 타입 정의
└── styles/                # 전역 스타일
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

1. **프로덕션 빌드**
   ```bash
   npm run build
   ```

2. **프로덕션 서버 실행**
   ```bash
   npm start
   ```

## 📖 사용 방법

### 기본 사용법

1. **할 일 추가**
   - 메인 페이지에서 입력 필드에 할 일을 입력
   - "추가" 버튼 클릭 또는 Enter 키

2. **할 일 완료**
   - 체크박스를 클릭하여 완료 상태 토글

3. **할 일 상세 보기**
   - 할 일 항목을 클릭하여 상세 페이지로 이동

4. **할 일 수정**
   - 상세 페이지에서 제목, 메모, 이미지 수정 가능
   - "저장" 버튼으로 변경사항 저장

5. **할 일 삭제**
   - 상세 페이지에서 "삭제" 버튼 클릭

### 고급 기능

- **이미지 업로드**: 상세 페이지에서 이미지 섹션 클릭
- **메모 작성**: 상세 페이지의 메모 섹션에 텍스트 입력
- **모드 전환**: `/todo-test` 페이지에서 Detail 모드 확인

## 🔧 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_API_URL=https://assignment-todolist-api.vercel.app
NEXT_PUBLIC_TENANT_ID=daegeon
```

## 📝 API 연동

이 애플리케이션은 외부 REST API와 연동됩니다:

- **Base URL**: 환경변수 `NEXT_PUBLIC_API_URL`로 설정 (기본값: `https://assignment-todolist-api.vercel.app`)
- **Tenant ID**: 환경변수 `NEXT_PUBLIC_TENANT_ID`로 설정 (기본값: `daegeon`)
- **Endpoints**:
  - `GET /api/{tenantId}/items` - 할 일 목록 조회
  - `GET /api/{tenantId}/items/{id}` - 할 일 상세 조회
  - `POST /api/{tenantId}/items` - 할 일 생성
  - `PATCH /api/{tenantId}/items/{id}` - 할 일 수정
  - `DELETE /api/{tenantId}/items/{id}` - 할 일 삭제
  - `POST /api/{tenantId}/upload` - 이미지 업로드

## 🎨 컴포넌트 설명

### TodoItem
할 일 항목을 표시하는 컴포넌트입니다.
- **Props**: `todo`, `onToggle`, `mode`
- **모드**: `simple` (기본), `detail`

### Button
재사용 가능한 버튼 컴포넌트입니다.
- **Variants**: `primary`, `secondary`, `danger`, `success`
- **Sizes**: `small`, `large`
- **Icons**: `plus`, `check`, `x`, `edit`

### TodoHeader
전역 헤더 컴포넌트입니다.
- 로고 클릭 시 메인 페이지로 이동
- 반응형 디자인 지원

## 🐛 문제 해결

### 빌드 오류
- Node.js 버전 확인 (18.0.0 이상)
- `npm install` 재실행
- `.next` 폴더 삭제 후 재빌드

### 이미지 로딩 문제
- 파일명에 공백이 있는 경우 언더스코어로 변경
- CSS 경로 확인

### API 연결 오류
- 환경 변수 설정 확인
- 네트워크 연결 상태 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**개발자**: Farmer-Kim  
**버전**: 1.0.0  
**최종 업데이트**: 2025년 08월
