import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import AttendanceList from '../components/AttendanceList';

const AttendancePage = () => {
  const [key, setKey] = useState('take');

  return (
    <Container className="mt-4">
      <h2>Attendance Management</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="take" title="Take Attendance">
          <AttendanceList mode="take" />
        </Tab>
        <Tab eventKey="view" title="View All Records">
          <AttendanceList mode="view" />
        </Tab>
        <Tab eventKey="search" title="Search Attendance">
          <AttendanceList mode="search" />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AttendancePage;
