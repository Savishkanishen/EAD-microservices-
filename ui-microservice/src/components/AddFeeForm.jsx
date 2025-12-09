import React, { useState } from 'react';
import { addFee } from '../api/feesApi';
import { Form, Button, Alert } from 'react-bootstrap';

const AddFeeForm = ({ onFeeAdded }) => {
  const [feeName, setFeeName] = useState('');
  const [feeGrade, setFeeGrade] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const grades = Array.from({ length: 10 }, (_, i) => `Grade ${(i + 1).toString().padStart(2, '0')}`);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const fee = {
      feeName,
      feeGrade,
      feeAmount: parseFloat(feeAmount)
    };

    try {
      await addFee(fee);
      setSuccessMsg('Fee added successfully!');
      setFeeName('');
      setFeeGrade('');
      setFeeAmount('');
      onFeeAdded(); // Refresh fee list
    } catch (err) {
      console.error('Failed to add fee:', err);
    }
  };

  return (
    <div className="mt-4">
      <h4>Add New Fee</h4>
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feeName" className="mb-3">
          <Form.Label>Fee Name</Form.Label>
          <Form.Control
            type="text"
            value={feeName}
            onChange={(e) => setFeeName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="feeGrade" className="mb-3">
          <Form.Label>Grade</Form.Label>
          <Form.Select
            value={feeGrade}
            onChange={(e) => setFeeGrade(e.target.value)}
            required
          >
            <option value="">Select Grade</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Form.Select>
        </Form.Group>




        <Form.Group controlId="feeAmount" className="mb-3">
          <Form.Label>Amount (Rs)</Form.Label>
          <Form.Control
            type="number"
            value={feeAmount}
            onChange={(e) => setFeeAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Fee
        </Button>
      </Form>
    </div>
  );
};

export default AddFeeForm;
