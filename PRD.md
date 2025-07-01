# VibeCoding Todo App - Product Requirements Document (PRD)

## 1. 제품 개요 (Product Overview)

### 제품명
**VibeCoding Todo App**

### 목적
바이브 코딩 기법을 학습하기 위한 라이브 데모용 Todo 관리 애플리케이션

### 타겟 사용자
- 개발자 (바이브 코딩 학습자)
- 프로토타입 및 MVP 개발 학습자
- 간단한 Todo 관리가 필요한 사용자

### 핵심 가치 제안
- 빠른 개발 사이클 시연
- 현대적 기술 스택 활용
- 간단하지만 완전한 풀스택 애플리케이션
- 컨테이너 기반 로컬 배포

### 성공 지표
- 사용자 등록/로그인 성공률 100%
- Todo CRUD 기능 완전 동작
- API 응답 시간 < 500ms
- Docker 컨테이너 정상 실행

## 2. 사용자 요구사항 (User Requirements)

### 주요 사용자 페르소나
**개발자 Alex**
- 연령: 25-35세
- 경험: 중급 개발자
- 목표: 바이브 코딩 기법 학습, 빠른 프로토타이핑
- 니즈: 간단하고 직관적인 Todo 관리

### 사용자 스토리
1. **사용자 등록**: "개발자로서 새로운 계정을 만들어 Todo 앱을 사용하고 싶다"
2. **로그인**: "등록한 계정으로 로그인해서 내 Todo 목록에 접근하고 싶다"
3. **Todo 생성**: "할 일을 빠르게 추가하고 싶다"
4. **Todo 조회**: "내 모든 할 일 목록을 한눈에 보고 싶다"
5. **Todo 수정**: "할 일 내용을 수정하고 싶다"
6. **Todo 완료**: "완료한 할 일을 체크하고 싶다"
7. **Todo 삭제**: "불필요한 할 일을 삭제하고 싶다"
8. **로그아웃**: "안전하게 로그아웃하고 싶다"

### 사용자 여정
1. 홈페이지 접속 → 회원가입 → 로그인
2. 대시보드 접속 → Todo 목록 확인
3. 새 Todo 생성 → 내용 입력 → 저장
4. Todo 상태 변경 (완료/미완료 토글)
5. Todo 수정/삭제
6. 로그아웃

## 3. 기능 요구사항 (Functional Requirements)

### 핵심 기능 (Must Have)
1. **사용자 인증**
   - 사용자 등록 (이메일, 비밀번호)
   - 로그인/로그아웃
   - JWT 토큰 기반 인증

2. **Todo 관리**
   - Todo 생성 (제목, 설명)
   - Todo 목록 조회
   - Todo 수정
   - Todo 삭제
   - Todo 상태 토글 (완료/미완료)

### 부가 기능 (Should Have)
- Todo 필터링 (완료/미완료)
- Todo 검색
- 반응형 UI

### 선택 기능 (Could Have)
- Todo 우선순위
- 마감일 설정
- 카테고리 분류

### 제외 기능 (Won't Have)
- 이메일 인증
- 소셜 로그인
- 실시간 동기화
- 팀 협업 기능

### API 엔드포인트
```
POST /api/auth/register     # 사용자 등록
POST /api/auth/login        # 로그인
POST /api/auth/logout       # 로그아웃
GET  /api/todos             # Todo 목록 조회
POST /api/todos             # Todo 생성
PUT  /api/todos/:id         # Todo 수정
DELETE /api/todos/:id       # Todo 삭제
PATCH /api/todos/:id        # Todo 상태 토글
```

## 4. 비기능 요구사항 (Non-Functional Requirements)

### 성능 요구사항
- API 응답 시간: < 500ms
- 페이지 로딩 시간: < 2초
- 동시 사용자: 최대 10명 (데모용)

### 보안 요구사항
- JWT 토큰 기반 인증
- 비밀번호 해싱 (bcrypt)
- CORS 설정
- 입력 데이터 검증

### 사용성 요구사항
- 직관적인 UI/UX
- 반응형 디자인 (모바일 호환)
- 로딩 상태 표시
- 에러 메시지 표시

### 가용성 요구사항
- 로컬 환경에서 99% 가용성
- 컨테이너 재시작 가능

## 5. 기술 요구사항 (Technical Requirements)

### 기술 스택
**Backend**
- Language: Go
- Framework: Gin
- Database: SQLite
- Authentication: JWT

**Frontend**
- Framework: React 18
- Router: Tanstack Router
- Styling: Tailwind CSS
- Build Tool: Vite
- State Management: React Query

**Infrastructure**
- Containerization: Docker + Docker Compose
- Database: SQLite (파일 기반)
- Deployment: 로컬 컨테이너

### 아키텍처 설계
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │────│   Backend   │────│   SQLite    │
│   (React)   │    │    (Go)     │    │ (Database)  │
│   Port:3000 │    │  Port:8080  │    │   File      │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 데이터베이스 스키마
```sql
-- Users 테이블
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Todos 테이블
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 6. UI/UX 요구사항

### 화면 구성
1. **로그인/회원가입 페이지**
   - 심플한 폼 디자인
   - 이메일/비밀번호 입력
   - 에러 메시지 표시

2. **Todo 대시보드**
   - Todo 목록 표시
   - 새 Todo 추가 버튼
   - 완료/미완료 토글
   - 수정/삭제 버튼

3. **Todo 생성/수정 모달**
   - 제목, 설명 입력
   - 저장/취소 버튼

### 디자인 가이드라인
- 색상: 모던하고 심플한 색상 팔레트
- 타이포그래피: 읽기 쉬운 폰트
- 레이아웃: 클린하고 직관적인 배치
- 반응형: 모바일 우선 디자인

## 7. 제약사항 (Constraints)

### 기술적 제약사항
- SQLite 사용 (단일 서버 제한)
- 로컬 환경에서만 실행
- 파일 기반 데이터베이스

### 시간 제약사항
- 빠른 개발이 목표 (MVP 접근)
- 라이브 데모용 (완벽함보다 속도 우선)

### 리소스 제약사항
- 최소한의 외부 의존성
- 로컬 리소스만 사용
- 클라우드 서비스 사용 안함

## 8. 위험 요소 및 가정사항

### 주요 위험 요소
- 기술 스택 학습 곡선
- 컨테이너 환경 설정 복잡성
- 데이터 손실 위험 (파일 기반 DB)

### 완화 전략
- 단순한 기술 스택 선택
- Docker Compose 활용
- 정기적인 백업 (개발 중)

### 기본 가정사항
- 로컬 환경에서만 실행
- 소규모 사용자 (< 10명)
- 데모/학습 목적
- 실제 프로덕션 환경 미고려

## 9. 라이브 코딩 데모 계획 (1시간)

### Phase 1: Backend 구조 생성 (15분)
- Go 프로젝트 초기화
- 기본 API 서버 설정
- SQLite 연결 및 스키마 생성
- 간단한 인증 미들웨어

### Phase 2: 핵심 API 구현 (15분)
- 사용자 등록/로그인 API
- Todo CRUD API (간소화)
- 기본 JWT 토큰 처리

### Phase 3: Frontend 기본 구조 (20분)
- React 프로젝트 설정
- 로그인 페이지
- Todo 목록 페이지
- API 연동

### Phase 4: 통합 및 데모 (10분)
- Docker Compose 설정
- 로컬 실행 테스트
- 라이브 데모 시연

### 데모 우선순위
1. **필수 (Must Demo)**: 로그인 → Todo 추가 → Todo 완료 토글
2. **선택 (If Time)**: Todo 수정/삭제
3. **생략 (Skip)**: 회원가입, 고급 기능

### 테스트 계획
- API 단위 테스트
- Frontend 컴포넌트 테스트
- 통합 테스트
- 수동 E2E 테스트

### 배포 전략
```bash
# 로컬 배포 명령어
docker-compose up --build

# 개발 모드
docker-compose up -d
```

## 10. 성공 기준

### 기능적 성공 기준
- ✅ 사용자 등록/로그인 100% 동작
- ✅ Todo CRUD 기능 완전 구현
- ✅ 반응형 UI 정상 작동
- ✅ API 응답 시간 < 500ms

### 기술적 성공 기준
- ✅ Docker 컨테이너 정상 실행
- ✅ Frontend-Backend 완전 연동
- ✅ SQLite 데이터 지속성 보장
- ✅ 코드 품질 기준 충족

### 학습 목표 달성
- ✅ 바이브 코딩 기법 시연
- ✅ 현대적 기술 스택 활용
- ✅ MVP 개발 프로세스 경험
- ✅ 컨테이너 기반 배포 경험