import { useState, useEffect } from 'react'

function AddStudent({ onAdd, onUpdate, editingStudent, setEditingStudent }) {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
  })

  useEffect(() => {
    if (editingStudent) {
      setStudent({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
      })
    } else {
      setStudent({
        name: '',
        email: '',
        course: '',
      })
    }
  }, [editingStudent])

  const handleChange = (event) => {
    const { name, value } = event.target
    setStudent((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    const trimmed = {
      name: student.name.trim(),
      email: student.email.trim(),
      course: student.course.trim(),
    }

    if (!trimmed.name || !trimmed.email || !trimmed.course) {
      return
    }

    if (editingStudent) {
      await onUpdate(editingStudent.id, trimmed)
      setEditingStudent(null)
    } else {
      await onAdd(trimmed)
    }

    setStudent({
      name: '',
      email: '',
      course: '',
    })
  }

  const handleCancel = () => {
    setEditingStudent(null)
    setStudent({
      name: '',
      email: '',
      course: '',
    })
  }

  return (
    <div className="student-form">
      <input
        type="text"
        name="name"
        placeholder="Enter student name"
        value={student.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter student email"
        value={student.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="course"
        placeholder="Enter course name"
        value={student.course}
        onChange={handleChange}
      />
      <button
        type="button"
        className="add-button"
        onClick={handleSubmit}
      >
        {editingStudent ? 'Update Student' : 'Add Student'}
      </button>
      {editingStudent && (
        <button
          type="button"
          className="cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </div>
  )
}

export default AddStudent