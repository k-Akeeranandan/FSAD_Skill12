import { useEffect, useState } from 'react'

import { createStudent, deleteStudent, getStudents, updateStudent } from '../api/studentApi'
import StudentList from './StudentList'
import AddStudent from './AddStudent'

function StudentManager() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const response = await getStudents()
      setStudents(response.data)
    } catch {
      setErrorMessage('Unable to load students from the backend.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddStudent = async (student) => {
    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const response = await createStudent(student)
      setStudents((current) => [...current, response.data])
    } catch {
      setErrorMessage('Unable to add the student. Check the backend connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStudent = async (id, student) => {
    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const response = await updateStudent(id, student)
      setStudents((current) =>
        current.map((s) => (s.id === id ? response.data : s))
      )
    } catch {
      setErrorMessage('Unable to update the student. Check the backend connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStudent = async (studentId) => {
    try {
      setErrorMessage('')
      await deleteStudent(studentId)
      setStudents((current) =>
        current.filter((student) => student.id !== studentId),
      )
    } catch {
      setErrorMessage('Unable to delete the student. Check the backend connection.')
    }
  }

  const handleUpdateClick = (student) => {
    setEditingStudent(student)
  }

  return (
    <section className="student-manager">
      <div className="student-manager__header">
        <h1>Student Manager</h1>
        <p>Add, view, update, and remove students from a simple class list.</p>
      </div>

      {errorMessage ? <p className="empty-state">{errorMessage}</p> : null}

      <AddStudent
        onAdd={handleAddStudent}
        onUpdate={handleUpdateStudent}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />

      {isLoading ? (
        <p className="empty-state">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="empty-state">No students available</p>
      ) : (
        <StudentList
          students={students}
          onDelete={handleDeleteStudent}
          onUpdate={handleUpdateClick}
        />
      )}
    </section>
  )
}

export default StudentManager