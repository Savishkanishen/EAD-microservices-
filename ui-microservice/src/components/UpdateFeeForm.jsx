import React, { useState, useEffect } from 'react';
import { updateFee } from '../api/feesApi';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateFeeForm = ({ show, handleClose, fee, onFeeUpdated }) => {
  const [feeName, setFeeName] = useState('');
  const [feeGrade, setFeeGrade] = useState('');
  const [feeAmount, setFeeAmount] = useState('');

  useEffect(() => {
    if (fee) {
      setFeeName(fee.feeName);
      setFeeGrade(fee.feeGrade);
      setFeeAmount(fee.feeAmount);
    }
  }, [fee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFee = {
      feeId: fee.feeId,
      feeName,
      feeGrade,
      feeAmount: parseFloat(feeAmount)
    };

    try {
      await updateFee(updatedFee);
      onFeeUpdated();
      handleClose();
    } catch (err) {
      console.error('Error updating fee:', err);
    }
  };

  if (!fee) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Fee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Fee Name</Form.Label>
            <Form.Control
              type="text"
              value={feeName}
              onChange={(e) => setFeeName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              value={feeGrade}
              onChange={(e) => setFeeGrade(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount (Rs)</Form.Label>
            <Form.Control
              type="number"
              value={feeAmount}
              onChange={(e) => setFeeAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateFeeForm;
