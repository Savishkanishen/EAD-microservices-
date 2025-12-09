import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

import FeesPage from './pages/FeesPage';
import PaymentsPage from './pages/PaymentsPage';
import StudentFeesPage from './pages/StudentFeesPage';
import StudentsByGradePage from './pages/UserPages';
import LoginPage from './pages/LoginPage';
import AttendancePage from './pages/AttendancePage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  // Navbar shown only if logged in
  const Navigation = () => (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">School Fee Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <>
              <Nav className="me-auto">
                {user.role.toLowerCase() === 'admin' && (
                  <>
                    <Nav.Link as={Link} to="/fees">Fees</Nav.Link>
                    <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
                    <Nav.Link as={Link} to="/student-fees">Student Fees</Nav.Link>
                    <Nav.Link as={Link} to="/students-by-grade">Users</Nav.Link>
                    <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
                  </>
                )}
                {user.role.toLowerCase() === 'student' && (
                  <Nav.Link as={Link} to="/student-info">My Info</Nav.Link>
                )}
              </Nav>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Navigation />

      <Container className="flex-grow-1 mt-4">
        <Routes>
          {!user && (
            <Route path="/*" element={<LoginPage onLoginSuccess={setUser} />} />
          )}

          {user && user.role.toLowerCase() === 'admin' && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/fees" element={<FeesPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/student-fees" element={<StudentFeesPage />} />
              <Route path="/students-by-grade" element={<StudentsByGradePage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {user && user.role.toLowerCase() === 'student' && (
            <>
              <Route path="/" element={<StudentUnderDevelopment />} />
              <Route path="/student-info" element={<StudentUnderDevelopment />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Container>

      <Footer />
    </div>
  </Router>
);
}
function Home() {
  return (
    <div className="container">
      <h2 className="text-center mb-4">Welcome to the School Fee Management</h2>
      <p style={{ textAlign: "justify" }}><center>
        Welcome to our School Fee Management System, a simple and efficient solution designed to streamline school payment management by making it easier to record fees, track payments, and reduce administrative workload. Built with Java (Spring Boot) for the backend, React for the frontend, and MySQL for secure data storage, our system ensures a smooth and modern user experience for schools and parents alike. Developed by our dedicated team:
        <br /><br />
        <span className="d-block text-center">COHNDSE251F-003 : M. I. Rushdee</span>
        <span className="d-block text-center">COHNDSE251F-096 : S.R.D.Dahanayake</span>
        <span className="d-block text-center">COHNDSE251F-067 : M. F. M. Rizni</span>
        <span className="d-block text-center">COHNDSE251F-062 : H. M. Nishen</span>
        <span className="d-block text-center">COHNDSE251F-091 : R. S. Jedidiah</span>
        <br /><br />
        This project reflects our commitment to creating practical tools that make school operations more organized and hassle-free.
      </center>
      </p>
    </div>
  );
}

function StudentUnderDevelopment() {
  return (
    <div className="text-center">
      <h3>Student Portal</h3>
      <p>This page is under development for students.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <div className="container text-center">
        © 2025 School Fee Management System. All rights reserved.
      </div>
    </footer>
  );
}

export default App;
