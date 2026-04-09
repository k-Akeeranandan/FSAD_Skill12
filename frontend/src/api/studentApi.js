import axios from 'axios'

const studentApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:2026',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getStudents = () => studentApi.get('/students')

export const createStudent = (student) => studentApi.post('/students', student)

export const updateStudent = (id, student) => studentApi.put(`/students/${id}`, student)

export const deleteStudent = (studentId) => studentApi.delete(`/students/${studentId}`)

export default studentApi