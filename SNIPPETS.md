# 코드 스니펫 및 명령어 치트시트

## Go 스니펫

### 기본 import
```go
package main

import (
    "database/sql"
    "net/http"
    "github.com/gin-gonic/gin"
    _ "github.com/mattn/go-sqlite3"
)
```

### SQLite 연결
```go
db, err := sql.Open("sqlite3", "./todos.db")
if err != nil {
    panic(err)
}
defer db.Close()
```

### 테이블 생성
```sql
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## React 스니펫

### useState 훅
```javascript
import { useState, useEffect } from 'react'

const [todos, setTodos] = useState([])
const [newTodo, setNewTodo] = useState('')
```

### axios API 호출
```javascript
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

// GET
const fetchTodos = async () => {
    const response = await axios.get(`${API_BASE}/todos`)
    setTodos(response.data)
}

// POST
const addTodo = async (title) => {
    await axios.post(`${API_BASE}/todos`, { title })
    fetchTodos()
}
```

## API 테스트 명령어

### curl 명령어
```bash
# 서버 실행 확인
curl http://localhost:8080/health

# Todo 목록 조회
curl http://localhost:8080/api/todos

# Todo 생성
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Go"}'

# Todo 상태 토글
curl -X PATCH http://localhost:8080/api/todos/1

# Todo 삭제
curl -X DELETE http://localhost:8080/api/todos/1
```

### npm 명령어
```bash
# React 프로젝트 생성
npm create vite@latest frontend -- --template react

# 의존성 설치
npm install axios

# Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer

# 개발 서버 실행
npm run dev
```

## Tailwind CSS 클래스

### 레이아웃
```css
/* 컨테이너 */
.container.mx-auto.px-4.py-8

/* 플렉스박스 */
.flex.items-center.justify-between
.flex.flex-col.space-y-4

/* 그리드 */
.grid.grid-cols-1.gap-4
```

### 버튼 스타일
```css
/* 기본 버튼 */
.bg-blue-500.hover:bg-blue-600.text-white.px-4.py-2.rounded

/* 삭제 버튼 */
.bg-red-500.hover:bg-red-600.text-white.px-2.py-1.rounded.text-sm

/* 체크박스 */
.w-4.h-4.text-blue-600.rounded
```

### 입력 필드
```css
/* 텍스트 입력 */
.border.border-gray-300.rounded.px-3.py-2.w-full

/* 포커스 상태 */
.focus:outline-none.focus:ring-2.focus:ring-blue-500
```

## 자주 사용하는 패턴

### Error Handling (Go)
```go
if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
    return
}
```

### CORS 설정 (Go)
```go
r.Use(func(c *gin.Context) {
    c.Header("Access-Control-Allow-Origin", "*")
    c.Header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    c.Header("Access-Control-Allow-Headers", "Content-Type")
    
    if c.Request.Method == "OPTIONS" {
        c.AbortWithStatus(204)
        return
    }
    
    c.Next()
})
```

### 비동기 처리 (React)
```javascript
const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    try {
        await addTodo(newTodo)
        setNewTodo('')
    } catch (error) {
        console.error('Failed to add todo:', error)
    }
}
```

## 디버깅 명령어

### Go 디버깅
```bash
# 로그 출력 확인
go run main.go

# 특정 포트 확인
lsof -i :8080
```

### React 디버깅
```bash
# 개발 서버 재시작
npm run dev

# 브라우저 콘솔에서 네트워크 탭 확인
# F12 -> Network -> XHR/Fetch 필터
```

## 빠른 참조

### Go Gin 라우터
```go
r := gin.Default()
r.GET("/api/todos", getTodos)
r.POST("/api/todos", createTodo)
r.PATCH("/api/todos/:id", toggleTodo)
r.DELETE("/api/todos/:id", deleteTodo)
r.Run(":8080")
```

### React 컴포넌트 구조
```javascript
function App() {
    const [todos, setTodos] = useState([])
    
    useEffect(() => {
        fetchTodos()
    }, [])
    
    return (
        <div className="container mx-auto px-4 py-8">
            {/* 입력 폼 */}
            {/* Todo 목록 */}
        </div>
    )
}
```