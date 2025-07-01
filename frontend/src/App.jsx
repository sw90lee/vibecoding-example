import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  // API 호출 함수들
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE}/todos`)
      setTodos(response.data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (title) => {
    try {
      const response = await axios.post(`${API_BASE}/todos`, { title })
      setTodos(prev => [response.data, ...prev])
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const toggleTodo = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE}/todos/${id}`)
      setTodos(prev => prev.map(todo => 
        todo.id === id ? response.data : todo
      ))
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/todos/${id}`)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  // 이벤트 핸들러들
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    await addTodo(newTodo)
    setNewTodo('')
  }

  const handleToggle = (id) => {
    toggleTodo(id)
  }

  const handleDelete = (id) => {
    deleteTodo(id)
  }

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          VibeCoding Todo App
        </h1>

        {/* 새 Todo 추가 폼 */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="새 할일을 입력하세요..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newTodo.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              추가
            </button>
          </div>
        </form>

        {/* 로딩 상태 */}
        {loading ? (
          <div className="text-center py-4">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : (
          /* Todo 목록 */
          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                할일이 없습니다. 새로운 할일을 추가해보세요!
              </div>
            ) : (
              todos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 border rounded-md ${
                    todo.completed 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {/* 완료 체크박스 */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  
                  {/* Todo 제목 */}
                  <span
                    className={`flex-1 ${
                      todo.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </span>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* 통계 */}
        {todos.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 text-center">
              총 {todos.length}개 | 완료 {todos.filter(t => t.completed).length}개 | 
              미완료 {todos.filter(t => !t.completed).length}개
            </div>
          </div>
        )}

        {/* 데모 정보 */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <div className="text-xs text-gray-400">
            🚀 VibeCoding Live Demo - 60분 완성 Todo App
          </div>
        </div>
      </div>
    </div>
  )
}

export default App