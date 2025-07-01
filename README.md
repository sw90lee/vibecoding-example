# VibeCoding Todo App

60분 라이브 코딩 데모용 Todo 애플리케이션

## 목표
바이브 코딩 기법을 활용한 빠른 풀스택 개발 데모

## 기술 스택
- **Backend**: Go + Gin + SQLite
- **Frontend**: React + Vite + Tailwind CSS
- **Demo Duration**: 1시간

## 프로젝트 구조
```
├── backend/          # Go API 서버
├── frontend/         # React 애플리케이션
├── CLAUDE.md         # 프로젝트 가이드라인
├── PRD.md           # 제품 요구사항 문서
└── TASK.md          # 라이브 코딩 계획
```

## 빠른 시작

### Phase 1: 백엔드 (25분)
```bash
cd backend
go mod init todo-api
go get github.com/gin-gonic/gin github.com/mattn/go-sqlite3
# main.go 구현
go run main.go
```

### Phase 2: 프론트엔드 (25분)
```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
# App.jsx 구현
npm run dev
```

### Phase 3: 통합 테스트 (10분)
- 전체 기능 테스트
- 데모 시연

## 핵심 기능
- Todo 목록 조회
- Todo 추가
- Todo 완료/미완료 토글
- Todo 삭제

## API 엔드포인트
- `GET /api/todos` - Todo 목록 조회
- `POST /api/todos` - Todo 생성
- `PATCH /api/todos/:id` - Todo 상태 토글
- `DELETE /api/todos/:id` - Todo 삭제

## 개발 명령어

### API 테스트
```bash
# Todo 목록 조회
curl http://localhost:8080/api/todos

# Todo 생성
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo"}'

# Todo 상태 토글
curl -X PATCH http://localhost:8080/api/todos/1

# Todo 삭제
curl -X DELETE http://localhost:8080/api/todos/1
```

## 라이브 데모 버전 제한사항
- 사용자 인증 생략 (시간 절약)
- 단일 파일 구현 (복잡성 최소화)
- 기본적인 에러 처리만 포함
- SQLite 파일 기반 저장소 사용

---

🚀 **VibeCoding**: 빠르고 효율적인 개발을 위한 AI 협업 코딩 기법