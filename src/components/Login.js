import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import homeImage from "../assets/bg.mp4";
import styled from "styled-components";
export default function Login() {
	
	const [InputsLogin, setInputsLogin] = useState({email1:"",password1:"" });
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = e =>{
		setInputsLogin(prev=>({...prev, [e.target.name]:e.target.value}))
   }
   console.log(InputsLogin)
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(InputsLogin);
			
		} catch {
			setError("Failed to log in");
		}
		setLoading(false);
	}
	return (
		<>
			 <Section id="hero">
					<div className="background">
						<video src={homeImage} control={true}  autoPlay loop={true} muted={true} />
					</div>
				<div className="w-100" style={{ maxWidth: "400px", position:"absolute", zIndex:2 }}>
					<Card>
						<Card.Body>
							<h2 className="text-center mb-4">
								Travel Advisor 
							</h2>

							{error && <Alert varient="danger">{error}</Alert>}
							<Form onSubmit={handleSubmit}>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										name="email1"
										required
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										name="password1"
										required
										onChange={handleChange}
									/>
								</Form.Group>

								<Button
									disabled={loading}
									className="w-100 mt-4"
									type="submit"
								>
									Log In
								</Button>
							</Form>
							<div className="w-100 text-center mt-3">
								<Link to="/forgot-password">
									Forgot Password?
								</Link>
							</div>
							<div className="w-100 text-center mt-3">
								<Link to="/">
									Home page
								</Link>
							</div>
						</Card.Body>
					</Card>
					<div style={{color:"white"}} className="w-100 text-center mt-2">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</div>
			</Section>
		</>
	);
}


const Section = styled.section`
position: relative;
display:flex;
justify-content:center;
align-items:center;
width: 100%;
height:100vh;


.background {
	height: 100%;
	width:100vw;
	video {
	position:relative;
	width: 100%;
	height:100%;
	object-fit:cover;
	filter: brightness(60%);
	}
}
`;
