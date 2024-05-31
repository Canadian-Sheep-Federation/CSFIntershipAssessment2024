import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import '../css/Signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function Signup({setAuth}: any) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username:''
    });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setShowAlert(false)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log('Form Data:', formData);
        }
        setValidated(true);
    };

    function sendData() {
        
        // axios.post()    
        axios.post(`http://localhost:3000/${formData.username}`, formData).then(function (response) {
            setAuth(response.data)
            console.log(response.data)
            navigate('/')
          })
          .catch(function (error) {
            if (error.response) {
                setShowAlert(true)
            }
            console.log(error);
          });
    }

    return (
        <div>
        <Navigation />
        <Container data-bs-theme="dark" className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                <h2 className="mb-4 text-center">Sign Up</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col sm="6">
                            <Form.Group controlId="formFirstName">
                                <Form.Control
                                    name="firstName"
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    />
                                <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm="6">
                            <Form.Group controlId="formLastName">
                                <Form.Control
                                    name="lastName"
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    />
                                <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formEmail">
                        <Col sm="10">
                            <Form.Control
                                name="email"
                                required
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                />
                            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPassword">
                        <Col sm="10">
                            <Form.Control
                                name="password"
                                required
                                minLength={6}
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                />
                            <Form.Control.Feedback type="invalid">Your password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formUsername">
                        <Col sm="10">
                            <Form.Control
                                name="username"
                                required
                                type="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                />
                            <Alert
                            show={showAlert}
                            variant="warning">
                                {`sadly the username '${formData.username}' is already taken, please try another username!`}
                            </Alert>
                        </Col>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={sendData} type="submit">Sign Up</Button>
                    </div>
                </Form>
            </div>
        </Container>
        </div>
    );
}

export default Signup;
