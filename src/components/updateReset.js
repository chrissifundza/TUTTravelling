import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function UpdatePassword() {
	
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
    const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [Inputs, setInputs] = useState({email:location.state.email,otp:0,newpassword:"",confirmpassword:""});
	const navigate = useNavigate()
	const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
   }
   const otp = location.state.otp

   console.log(otp)
   const handleSubmit = async e =>{
       e.preventDefault()
   
      
       console.log(otp, " ",parseInt(Inputs.otp))
       if(otp!==parseInt(Inputs.otp)) return alert("OTP is wrong")
          if (Inputs.confirmpassword!==Inputs.newpassword) return alert("Password does'nt match!")
           try {
               const res = await axios.post("https://traveladvisor.herokuapp.com/api/auth/updatepassword", Inputs)
               console.log(res)
              
               if (res.data==="User has been updated.") {
                setLoading(false)
               alert(res.data)
               }
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
							<Form.Label>OTP</Form.Label>
							<Form.Control
								type="number"
								name="otp"
								required
								onChange={handleChange}
							/>
						</Form.Group>
                        <Form.Group id="email">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="newpassword"
								required
								onChange={handleChange}
							/>
						</Form.Group>
                        <Form.Group id="email">
							<Form.Label>ConfirmPassword</Form.Label>
							<Form.Control
								type="password"
								name="confirmpassword"
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
							Update Password
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
