import React, { useState } from 'react';
import FeeList from '../components/FeeList';
import AddFeeForm from '../components/AddFeeForm';

export default function FeesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshFees = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Fees Management</h1>
      <FeeList key={refreshKey} />
      <AddFeeForm onFeeAdded={refreshFees} />
    </div>
  );
}
