import React, { useState } from 'react';
import AddPaymentPage from '../components/AddPaymentPage';   // Make sure the path is correct
import PaymentsListPage from '../components/PaymentsListPage';  // Make sure the path is correct

export default function PaymentsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPayments = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container mt-4">
      <h1>Payments Management</h1>
      <AddPaymentPage onPaymentAdded={refreshPayments} />
      <PaymentsListPage key={refreshKey} refreshKey={refreshKey} />
    </div>
  );
}
