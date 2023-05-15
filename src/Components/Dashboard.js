import React, { useState } from 'react';
import { Card, Button, Alert, CardGroup } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [ error, setError ] = useState("");
  const { currentUser, logout } = useAuth();
  const navi = useNavigate();

  async function handleLogout()
  {
    //clear any error messages
    setError('');

    try
    {
      await logout();
      navi.push("/login")
    }
    catch
    {
      setError("Failed to log out");
    }
  }

  return (
    <>
    <div>
      <h1>Welcome to your Classroom Management System!</h1>
    </div>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email: </strong>{currentUser.email}
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3"> 
        Edit Credentials</Link>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log out</Button>
    </div>

    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Class Documents</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3"> 
        Access Class Documents</Link>
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3"> 
        Upload Documents</Link>
      </Card.Body>
    </Card>

    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Registration</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3"> 
        Class Registration</Link>
      </Card.Body>
      </Card>

    </>
  )
}
