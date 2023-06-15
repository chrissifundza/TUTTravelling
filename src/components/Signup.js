import React, {  useState } from "react";

import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import homeImage from "../assets/bg.mp4";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";
export default function Signup() {
	
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [Inputs, setInputs] = useState({name:"",email:"",gender:"",password:"",confirmpassword:"",image:"/img/user.png" });
	const navigate = useNavigate();
	const handleChange = e =>{
		setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
   }
   console.log(Inputs)
	async function handleSubmit(e) {
		e.preventDefault();
		if(Inputs.name==""){
			swal("Error","Enter Name!","error")
			return false
		}
		if(Inputs.email==""){
			swal("Error","Enter Email!","error")
			return false
		}
		let test = await TestEmail()
		if (test==false){
		 swal("Error","Email is invalid!","error")
		}
	  function TestEmail(){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Inputs.email)){
			return (true)
		}else{
		   
			return (false)
		} 
	  }
	
		if(Inputs.gender==""){
			swal("Error","Select gender!","error")
			return false
		}
		var password =Inputs.password
		if(password==""){
			swal("Error", "Password is empty!", "error")
			return false
		}
		var strength = 0;
		if (password.match(/[a-z]+/)) {
		  strength += 1;
		}
		else{
			swal("Error", "Password should include a Lower case", "error")
			return false
		}
		if (password.match(/[A-Z]+/)) {
		  strength += 1;
		}else{
			swal("Error", "Password should include a Capital letter", "error")
			return false
		}
		if (password.match(/[0-9]+/)) {
		  strength += 1;
		}else{
			swal("Error", "Password should include a number", "error")
			return false
		}
		if (password.match(/[$@#&!]+/)) {
		  strength += 1;
	  
		}else{
			swal("Error", "Password should include a symbol !@#$%_^", "error")
			return false
		}
	  
		if (password.length < 6) {
			swal("Error", "Password should be more than six characters", "error")
			return false
		}
	  
		if (password.length > 12) {
			swal("Error", "Password should not exceed 12 characters", "error")
			return false
		}
	
		
		if (Inputs.password !== Inputs.confirmpassword) {
			return setError("Password do not match");
		}
		try {
			setError("");
			setLoading(true);
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/auth/register", Inputs)
            console.log(Inputs)
			navigate("/login");
		} catch (error){
			setError(error.response.data);
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
									<Form.Label>Name & Surname</Form.Label>
									<Form.Control
										type="text"
										name="name"
										required
										onChange={handleChange}
										
									/>
								</Form.Group>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										name="email"
										required
										onChange={handleChange}
									/>
								</Form.Group>
								<select 	onChange={handleChange} name="gender" class="form-select  mb-3 mt-3" aria-label=".form-select-lg example">
								<option selected>Select</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								</select>
								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										onChange={handleChange}
										required
										name="password"
									/>
								</Form.Group>
								<Form.Group id="passoword-confirm">
									<Form.Label>
										Password Confirmation
									</Form.Label>
									<Form.Control
										type="password"
										name="confirmpassword"
										required
										onChange={handleChange}
									/>
								</Form.Group>
								<Button
									disabled={loading}
									className="w-100 mt-4"
									type="submit"
								>
									Sign Up
								</Button>

							</Form>
							<div className="w-100 text-center mt-3">
								<Link to="/">
									Home page
								</Link>
							</div>
						</Card.Body>
					</Card>
					<div style={{color:"white"}} className="w-100 text-center mt-2">
						Already have an account? <Link to="/login">Log In</Link>
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
