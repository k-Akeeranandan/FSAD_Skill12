import { useEffect, useState } from 'react'

import { createStudent, deleteStudent, getStudents } from '../api/studentApi'

const emptyStudent = {
  id: '',
  name: '',
  course: '',
}

function StudentManager() {
  const [students, setStudents] = useState([])
  const [newStudent, setNewStudent] = useState(emptyStudent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
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

    loadStudents()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewStudent((currentStudent) => ({
      ...currentStudent,
      [name]: value,
    }))
  }

  const handleAddStudent = async () => {
    const trimmedStudent = {
      id: newStudent.id.trim(),
      name: newStudent.name.trim(),
      course: newStudent.course.trim(),
    }

    if (!trimmedStudent.id || !trimmedStudent.name || !trimmedStudent.course) {
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const response = await createStudent(trimmedStudent)
      setStudents((currentStudents) => [...currentStudents, response.data])
      setNewStudent(emptyStudent)
    } catch {
      setErrorMessage('Unable to add the student. Check the backend connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStudent = async (studentId) => {
    try {
      setErrorMessage('')
      await deleteStudent(studentId)
      setStudents((currentStudents) =>
        currentStudents.filter((student) => student.id !== studentId),
      )
    } catch {
      setErrorMessage('Unable to delete the student. Check the backend connection.')
    }
  }

  return (
    <section className="student-manager">
      <div className="student-manager__header">
        <h1>Student Manager</h1>
        <p>Add, view, and remove students from a simple class list.</p>
      </div>

      {errorMessage ? <p className="empty-state">{errorMessage}</p> : null}

      <div className="student-form">
        <input
          type="text"
          name="id"
          placeholder="Enter student ID"
          value={newStudent.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={newStudent.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Enter course name"
          value={newStudent.course}
          onChange={handleChange}
        />
        <button
          type="button"
          className="add-button"
          onClick={handleAddStudent}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Student'}
        </button>
      </div>

      {isLoading ? (
        <p className="empty-state">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="empty-state">No students available</p>
      ) : (
        <div className="student-table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default StudentManager