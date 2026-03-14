import axios from 'axios'

const studentApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:2026/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getStudents = () => studentApi.get('/students')

export const createStudent = (student) => studentApi.post('/students', student)

export const deleteStudent = (studentId) => studentApi.delete(`/students/${studentId}`)

export default studentApi