import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function ForgotPassword() {
	
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [Inputs, setInputs] = useState({email:""});
	const navigate = useNavigate()
	const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
   }
   function Login(otp) {
    navigate('/passwordupdate',{ state: {
        otp:otp,
        email: Inputs.email
      }})
}
   const handleSubmit = async e =>{
       e.preventDefault()
   
      
       try {
		setError("");
           const res = await axios.post("https://traveladvisor.herokuapp.com/api/auth/reset", Inputs)
           console.log(res)
           
           if (res.data.user==="user found") Login(res.data.otp) 
       } catch (error) {
		setLoading(false)
		setError(error.response.data);
       }

   }

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								required
								onChange={handleChange}
							/>
						</Form.Group>
						<br />
						<Button
							disabled={loading}
							className="w-100"
							type="submit"
						>
							Reset Password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/">Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
}
