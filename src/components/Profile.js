import React, { useState } from "react";
import {  Button, Alert, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		setError("");

		try {
			
			navigate("/");
		} catch {
			setError("Failed to log out");
		}
	}
	const viewSaved = ()=>{ 
		navigate("/savedtravel")
	}
	const viewSavedRes = ()=>{ 
		navigate("/savedrestuarent")
	}
	const viewDash = ()=>{ 
		navigate("/dashboard")
	}
	const viewSavedOther = ()=>{ 
		navigate("/savedother")
	}
	console.log(currentUser)

	return (
		<>
		
		<div className="w-100 text-center ">
				
				<div class="btn-group mr-2" style={{width:"100%", height:"50px"}} role="group" aria-label="Second group">
				<button type="button" class="btn btn-primary" onClick={viewDash }>VIEW DASHBOARD</button>
					<button type="button" class="btn btn-primary" onClick={viewSaved}>VIEW HOTEL</button>
					<button type="button" class="btn btn-primary"onClick={viewSavedRes}>VIEW RESTUARENT</button>
					<button type="button" class="btn btn-primary" onClick={viewSavedOther}>VIEW OTHER ATTRACTION</button>
					<button type="button" class="btn btn-primary"  onClick={handleLogout}>LOGOUT</button>
				</div>
			</div>
			<br/>
			
			<Card  style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
				
				<Card.Body className="CardP" style={{width:"50%",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"40px", borderRadius:"5px"}} > 
				
					<h2 className="text-center mb-4">
						Discover Tour Guide <br />
						Profile
					</h2>
					
					{error && <Alert variant="danger">{error}</Alert>}
					<div className="Image-Profile">
						<img src={currentUser?.image} alt=""/>
					</div>
					<Form.Group style={{width:"100%", textAlign:"center"}} id="email">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								name="name"
								
								width={"100%"}
								required
								defaultValue={currentUser.name}
								disabled
							/>
						</Form.Group>
						<Form.Group style={{width:"100%", textAlign:"center"}} id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								name="name"
								
								width={"100%"}
								required
								defaultValue={currentUser?.email}
								disabled
							/>
						</Form.Group>
						<Form.Group style={{width:"100%", textAlign:"center"}} id="email">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="text"
								name="name"
								
								width={"100%"}
								required
								defaultValue={"*******"}
								disabled
							/>
						</Form.Group>
					
					
					
					<Link
						to="/update-profile"
						className="btn btn-primary w-100 mt-3"
					>
						Update Profile
					</Link>
				</Card.Body>
			</Card>

			
		</>
	);
}
