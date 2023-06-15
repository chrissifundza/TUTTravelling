import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import swal from 'sweetalert';
export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser,setCurrentUser } = useAuth();
	const [error, setError] = useState("");
	const [Inputs, setInputs] = useState({name:currentUser.name,email:currentUser.email,password:"",confirmpassword:"",image:currentUser.image,iduser:currentUser.iduser });
	const [loading, setLoading] = useState(false);
	const [imageUpload, setImageUpload] = useState(null);
    const [selectedImage, setselectedImage] = useState('');
	const navigate = useNavigate();
	const handleChange = e =>{
		setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
   }
   console.log(Inputs)
	const previewImage = () => {
		console.log("running")
		var input = document.createElement("input");
		input.type = "file";
		input.onchange = (event) => {
		  const imageFiles = event.target.files;
		  setImageUpload(event.target.files[0])
		  const imageFilesLength = imageFiles.length;
	  
		  if (imageFilesLength > 0) {
			  const imageSrc = URL.createObjectURL(imageFiles[0]);
			 // const imagePreviewElement = document.querySelector("#preview-selected-image");
			 // imagePreviewElement.src = imageSrc;
			 setselectedImage(imageSrc)
			 // imagePreviewElement.style.display = "block";
		  }
		};
		input.click();
	   
	};
async function handleSubmit(e) {
		e.preventDefault();
		if(imageUpload==null){
			try {
				setError("");
			setLoading(true);
			  const res = await axios.put(`https://traveladvisor.herokuapp.com/api/auth/updateuser/${currentUser.iduser}`,Inputs)
			  console.log(res.data)
			  setCurrentUser(Inputs)
			  setLoading(false);
			  swal("Success",res.data,"success")
		  } catch (error) {
			setLoading(false);
			setError(error.response.data);
		  }
		  }else{
		
		  
			const imageRef = ref(storage, `Profiles/${imageUpload.name }`);
		  
		  uploadBytes(imageRef, imageUpload).then((snapshot1) => {
			getDownloadURL(snapshot1.ref).then( async (url1) =>  {
			  Inputs.image=url1
			  try {
				setError("");
			setLoading(true);
				const res = await axios.put(`https://traveladvisor.herokuapp.com/api/auth/updateuser/${currentUser.iduser}`,Inputs)
				console.log(res.data)
				setLoading(false);
				swal("Success",res.data,"success")
				setCurrentUser(Inputs)
				
			} catch (error) {
				setLoading(false);
				setError(error.response.data);
			}
			setLoading(false);
			})
		
		  })
		
	}
	
	}

	const deleteAccount=async ()=>{
		swal({
		  title: "Are you sure?",
		  text: "Once deleted, you will not be able to recover your Account!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete)  => {
		  if (willDelete) {
		   
			  axios.delete(`https://traveladvisor.herokuapp.com/api/auth/deleteaccount/${currentUser.iduser}`).then((res)=>{
				console.log(res.data)
				swal(" Your Account has been deleted!", {
				  icon: "success",
				});
				navigate("/login")
			  }).catch((error)=>{
				console.log(error.response.data)
			  })
			 
		  } else {
			swal("Your Account is safe!");
		  }
		});
	  }
	return (
		<>
			<Card style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",width:"100%"}}>
			<h2 className="text-center mb-4">Update Profile</h2>
			<div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",width:"100%", height:"fit-content",}}>
			<div className="Image-Profile">
						<img onClick={previewImage} src= {selectedImage !==''?selectedImage:currentUser?.image} alt=""/>
					</div>
			</div>
			
				<Card.Body style={{width:"50%",border:"1px solid #14213d", borderRadius:"5px"}}>
					
					{error && <Alert variant="danger">{error}</Alert>}
					
					<Form onSubmit={handleSubmit} >
					
					<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								name="name"
								required
								defaultValue={currentUser.name}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								disabled
								required
								onChange={handleChange}
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								onChange={handleChange}
								placeholder="Leave blank to keep the same"
							/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type="password"
								name="confirmpassword"
								onChange={handleChange}
								placeholder="Leave blank to keep the same"
							/>
						</Form.Group>
						<br />
						<Button
							disabled={loading}
							className="w-100"
							type="submit"
						>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/profile">Cancel</Link>
				<br/>
				<br/>
				<Button  style={{backgroundColor:"#d41313"}} onClick={deleteAccount} >Delete Account</Button>
			</div>
		</>
	);
}
