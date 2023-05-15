import { Container } from "react-bootstrap";
import React from "react";
//import pages
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";

import AuthProvider from "../Contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
      <Container className="d-flex align-items-center
      justify-content-center"
      style={{ minHeight: "100vh"}}>
        <div className="w-100" style={ { maxWidth: "400px"}}>
          <Router>
          <AuthProvider>
            <Routes>
              <PrivateRoute exact path ="/" component={Dashboard} />
              <PrivateRoute path ="/update-profile" component={UpdateProfile} />
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </AuthProvider>
          </Router>
        <Signup/>
        </div>
      </Container>
    
  )
}

export default App;
