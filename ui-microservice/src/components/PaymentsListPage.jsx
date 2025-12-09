import React, { useEffect, useState } from 'react';
import { getAllPayments, getPaymentByStudentId, getPaymentByDate, updatePayment, deletePayment } from '../api/paymentsApi';
import { Table, Form, Button, Row, Col, Alert } from 'react-bootstrap';

export default function PaymentsListPage({ refreshKey }) {
  const [payments, setPayments] = useState([]);
  const [searchType, setSearchType] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAllPayments();
  }, [refreshKey]);

  const loadAllPayments = async () => {
    try {
      const res = await getAllPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Error loading payments.');
    }
  };

  const handleSearch = async () => {
    try {
      if (searchType === 'All') {
        loadAllPayments();
      } else if (searchType === 'Student ID') {
        const res = await getPaymentByStudentId(searchValue);
        setPayments(res.data);
      } else if (searchType === 'Date') {
        const res = await getPaymentByDate(searchValue);
        setPayments(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage('No results found or error searching.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment?')) {
      await deletePayment(id);
      setMessage('Payment deleted.');
      loadAllPayments();
    }
  };

  const handleEditClick = (payment) => {
    setEditId(payment.paymentId);
    setEditData({ ...payment });
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      if (!editData || !editData.paymentId) {
        setMessage('Error: payment ID is missing. Cannot update payment.');
        return;
      }

      await updatePayment(editData);
      setMessage('Payment updated successfully.');
      setEditId(null);
      loadAllPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
      setMessage('Error updating payment. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  return (
    <div className="container mt-4">
      <h2>Payments Management</h2>
      {message && <Alert variant="info">{message}</Alert>}

      {/* Search Bar */}
      <Form className="mb-4">
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="All">All</option>
              <option value="Student ID">By Student ID</option>
              <option value="Date">By Date (YYYY-MM-DD)</option>
            </Form.Select>
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder={`Enter ${searchType}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={() => { setSearchValue(''); loadAllPayments(); }}>Reset</Button>
          </Col>
        </Row>
      </Form>

      {/* Payments Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>StudentFee ID</th>
            <th>Amount (Rs)</th>
            <th>Date</th>
            <th>Method</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.paymentId}>
              {editId === p.paymentId ? (
                <>
                  <td>{p.paymentId}</td>
                  <td>{p.studentFeeId}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={editData.paidAmount}
                      onChange={(e) => handleEditChange('paidAmount', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={editData.paymentDate}
                      onChange={(e) => handleEditChange('paymentDate', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={editData.paymentMethod}
                      onChange={(e) => handleEditChange('paymentMethod', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={editData.extraNote}
                      onChange={(e) => handleEditChange('extraNote', e.target.value)}
                    />
                  </td>
                  <td>
                    <Button size="sm" variant="success" onClick={handleUpdate}>Save</Button>{' '}
                    <Button size="sm" variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.paymentId}</td>
                  <td>{p.studentFeeId}</td>
                  <td>{p.paidAmount}</td>
                  <td>{p.paymentDate}</td>
                  <td>{p.paymentMethod}</td>
                  <td>{p.extraNote}</td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => handleEditClick(p)}>Edit</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(p.paymentId)}>Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
