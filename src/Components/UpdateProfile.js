import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../Contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navi = useNavigate();

    async function handleSubmit(e)
    {
        e.preventDefault()

        //validation for password
        if(passwordRef.current.value === passwordConfirmRef.current.value)
        {
            return setError('Passwords do not match');
        }

        //create some promises and validation for updating details
        const promises = [];

        //initalise loading and errors
        setLoading(true);
        setError("");


        //email validation
        if(emailRef.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value));
        }
        //password validation
        if(passwordRef.current.value)
        {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => 
        {
            navi.push("/")
        }).catch(() => 
        {
            setError("Failed to update account");
        }).finally(() =>
        {
            setLoading(false);
        })


    }

  return (
    <div>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={ handleSubmit }>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required 
                    defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} 
                    placeholder="Leave blank to keep the same"/>
                </Form.Group>
                <Form.Group id="passwordConfirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} 
                    placeholder="Leave blank to keep the same"/>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Update</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
        <Link to="/Dashboard">Cancel</Link>
        </div>

    </div>
  )
}
