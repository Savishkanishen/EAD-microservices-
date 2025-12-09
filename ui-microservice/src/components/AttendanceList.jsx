import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import {
  getAllAttendance,
  addAttendance,
  updateAttendance,
  getAttendanceByDate,
  getAttendanceByGrade,
  deleteAttendance,
  getAttendanceByGradeAndDate,
  checkAttendanceExists
} from '../api/attendanceApi';
import { getStudentsByGrade, getAllGrades } from '../api/userApi';

const AttendanceList = ({ mode }) => {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [grade, setGrade] = useState('');
  const [grades, setGrades] = useState([]);
  const [attendanceExists, setAttendanceExists] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Refresh flag to trigger reloading attendance in "view" mode
  const [refreshFlag, setRefreshFlag] = useState(0);

  // ---------- Loaders ----------

  const loadAllAttendance = async () => {
    try {
      const res = await getAllAttendance();
      setRecords(res.data);
      setError('');
    } catch (err) {
      setError('Error loading attendance records.');
      console.error(err);
    }
  };

  const loadGrades = async () => {
    try {
      const res = await getAllGrades();
      setGrades(res.data);
      setError('');
    } catch (err) {
      setError('Error loading grades.');
      console.error(err);
    }
  };

  const loadStudentsForGrade = async () => {
    if (!grade) {
      setError('Please select a grade.');
      return;
    }
    setError('');
    setMessage('');
    try {
      const res = await getStudentsByGrade(grade);
      setStudents(res.data);
      const initialMap = {};
      res.data.forEach(id => {
        initialMap[id] = 'present';
      });
      setAttendanceMap(initialMap);
    } catch (err) {
      setError('Error loading students.');
      console.error(err);
    }
  };

  const handleSearch = async () => {
    setError('');
    setMessage('');

    try {
      let res;

      if (grade && date) {
        // Both grade and date
        res = await getAttendanceByGradeAndDate(grade, date);
      } else if (grade) {
        // Only grade
        res = await getAttendanceByGrade(grade);
      } else if (date) {
        // Only date
        res = await getAttendanceByDate(date);
      } else {
        // Neither → get all
        res = await getAllAttendance();
      }

      setRecords(res.data);
    } catch (err) {
      setError('Error searching attendance. Please check your inputs.');
      console.error(err);
    }
  };



  const checkIfAttendanceExists = async () => {
    if (!grade || !date) return;
    try {
      const res = await checkAttendanceExists(grade, date);
      setAttendanceExists(res.data);
      if (res.data) {
      } else {
        setMessage('');
      }
    } catch (err) {
      setError('Error checking existing attendance.');
      console.error(err);
    }
  };

  useEffect(() => {
    checkIfAttendanceExists();
  }, [grade, date]);

  // ---------- Actions ----------

  const handleAttendanceChange = (id, status) => {
    setAttendanceMap(prev => ({ ...prev, [id]: status }));
  };

  const handleSaveBatch = async () => {
    if (!grade) {
      setError('Please select a grade before saving attendance.');
      return;
    }
    if (attendanceExists) {
      setError('Attendance already exists for this grade and date.');
      return;
    }
    setError('');
    setMessage('');
    const payload = students.map(id => ({
      studentId: id,
      date,
      status: attendanceMap[id],
      grade
    }));
    try {
      await addAttendance(payload);
      setMessage('Attendance saved successfully!');
      setStudents([]);
      setAttendanceMap({});
      setGrade('');

      // Trigger reload of all attendance records (view mode)
      setRefreshFlag(prev => prev + 1);
    } catch (err) {
      setError('Error saving attendance.');
      console.error(err);
    }
  };

  const startEditing = (rec) => {
    setEditingId(rec.id);
    setEditForm({ ...rec });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateAttendance(editForm.id, editForm);
      setMessage('Attendance updated!');
      setEditingId(null);
      loadAllAttendance();
    } catch (err) {
      setError('Error updating attendance.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this attendance record?')) return;
    try {
      await deleteAttendance(id);
      setMessage('Attendance record deleted.');
      loadAllAttendance();
    } catch (err) {
      setError('Error deleting attendance record.');
      console.error(err);
    }
  };

  // ---------- Effects ----------

  useEffect(() => {
    if (mode === 'take' || mode === 'search') {
      loadGrades();
      setStudents([]);
      setAttendanceMap({});
      setGrade('');
    }
    if (mode === 'view') {
      loadAllAttendance();
    }
  }, [mode]);

  // Reload when refreshFlag changes (only in view mode)
  useEffect(() => {
    if (mode === 'view') {
      loadAllAttendance();
    }
  }, [refreshFlag, mode]);

  // ---------- UI ----------

  return (
    <div>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {mode === 'take' && (
        <>
          <h4>Take Attendance</h4>
          <Form className="mb-3">
            <Row className="align-items-center">
              <Col md={3}>
                <Form.Select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">Select Grade</option>
                  {grades.map((g, idx) => (
                    <option key={idx} value={g}>{g}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button onClick={loadStudentsForGrade}>Load Students</Button>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
            </Row>
          </Form>

          {attendanceExists && (
            <Alert variant="warning">
              Attendance has already been recorded for this grade and date!
            </Alert>
          )}

          {students.length > 0 && (
            <>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(id => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>
                        <Form.Select
                          value={attendanceMap[id]}
                          onChange={(e) => handleAttendanceChange(id, e.target.value)}
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button onClick={handleSaveBatch} disabled={attendanceExists}>
                Save Attendance
              </Button>
            </>
          )}
        </>
      )}

      {mode === 'view' && (
        <>
          <h4>All Attendance Records</h4>
          {records.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map(rec => (
                  <tr key={rec.id}>
                    {editingId === rec.id ? (
                      <>
                        <td>{rec.id}</td>
                        <td>{rec.studentId}</td>
                        <td>
                          <Form.Control
                            type="date"
                            name="date"
                            value={editForm.date}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td>
                          <Form.Select
                            name="status"
                            value={editForm.status}
                            onChange={handleEditChange}
                          >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </Form.Select>
                        </td>
                        <td>{rec.grade}</td>
                        <td>
                          <Button size="sm" variant="success" onClick={handleUpdate}>
                            Save
                          </Button>{' '}
                          <Button size="sm" variant="secondary" onClick={cancelEditing}>
                            Cancel
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{rec.id}</td>
                        <td>{rec.studentId}</td>
                        <td>{rec.date}</td>
                        <td>{rec.status}</td>
                        <td>{rec.grade}</td>
                        <td>
                          <Button size="sm" variant="secondary" onClick={() => startEditing(rec)}>
                            Edit
                          </Button>{' '}
                          <Button size="sm" variant="danger" onClick={() => handleDelete(rec.id)}>
                            Delete
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}

      {mode === 'search' && (
        <>
          <h4>Search Attendance</h4>
          <Form className="mb-3">
            <Row>
              <Col md={3}>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">Select Grade (optional)</option>
                  {grades.map((g, idx) => (
                    <option key={idx} value={g}>{g}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button onClick={handleSearch}>Search</Button>
              </Col>
            </Row>
          </Form>

          {records.length > 0 && (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {records.map(rec => (
                  <tr key={rec.id}>
                    <td>{rec.id}</td>
                    <td>{rec.studentId}</td>
                    <td>{rec.date}</td>
                    <td>{rec.status}</td>
                    <td>{rec.grade}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceList;
