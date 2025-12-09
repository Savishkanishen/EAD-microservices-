import React, { useEffect, useState } from 'react';
import { getAllFees, deleteFee, getFeeByName, getFeeByGrade, getFeeById } from '../api/feesApi';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import UpdateFeeForm from './UpdateFeeForm';

const FeeList = () => {
  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // NEW state for search
  const [searchType, setSearchType] = useState('Name');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    try {
      const response = await getAllFees();
      setFees(response.data);
    } catch (error) {
      console.error('Error loading fees:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee?')) {
      await deleteFee(id);
      loadFees();
    }
  };

  const handleUpdateClick = (fee) => {
    setSelectedFee(fee);
    setShowModal(true);
  };
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      alert('Please enter a search term.');
      return;
    }

    try {
      if (searchType === 'Name') {
        const response = await getFeeByName(searchValue);
        setFees(response.data);
      } else if (searchType === 'Grade') {
        const response = await getFeeByGrade(searchValue);
        setFees(response.data);
      } else if (searchType === 'ID') {
        const response = await getFeeById(searchValue);
        // API returns a single object, so wrap it in an array
        setFees([response.data]);
      }
    } catch (error) {
      console.error('Error searching fees:', error);
      alert('No fee found or invalid input!');
    }
  };


  const handleReset = () => {
    setSearchValue('');
    loadFees();
  };

  return (
    <div className="container mt-4">
      <h2>Fee List</h2>

      {/* Search Section */}
      <Form className="mb-4">
        <Row className="align-items-center">
          <Col md="3">
            <Form.Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="Name">Search by Name</option>
              <option value="Grade">Search by Grade</option>
              <option value="ID">Search by ID</option>
            </Form.Select>

          </Col>
          <Col md="5">
            <Form.Control
              type="text"
              placeholder={`Enter ${searchType}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
          <Col md="2">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col md="2">
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Fees Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fee Name</th>
            <th>Grade</th>
            <th>Amount (Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.feeId}>
              <td>{fee.feeId}</td>
              <td>{fee.feeName}</td>
              <td>{fee.feeGrade}</td>
              <td>{fee.feeAmount}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpdateClick(fee)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(fee.feeId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UpdateFeeForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        fee={selectedFee}
        onFeeUpdated={loadFees}
      />
    </div>
  );
};

export default FeeList;
