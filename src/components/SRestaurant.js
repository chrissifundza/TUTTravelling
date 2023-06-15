import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PSingleSaved from "./SavedTravel";
import { useEffect } from "react";
import axios from "axios";
import ResSaved from "./Res";

export default function SaveRes() {
	const [error, setError] = useState("");
	const { currentUser, Res, logout, getRes  } = useAuth();
    
	const navigate = useNavigate();
useEffect(()=>{

getRes()
},[])
	async function handleLogout() {
		setError("");

		try {
			await logout();
			navigate("/");
		} catch {
			setError("Failed to log out");
		}
	}
	console.log(currentUser)
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
	return (
		<>
		<div className="w-100 text-center ">
				
				<div class="btn-group mr-2" style={{width:"100%",height:"50px"}} role="group" aria-label="Second group">
				<button type="button" class="btn btn-primary" onClick={viewDash }>VIEW DASHBOARD</button>
					<button type="button" class="btn btn-primary" onClick={viewSaved}>VIEW HOTEL</button>
					<button type="button" class="btn btn-primary"onClick={viewSavedRes}>VIEW RESTUARENT</button>
					<button type="button" class="btn btn-primary" onClick={viewSavedOther}>VIEW OTHER ATTRACTION</button>
					<button type="button" class="btn btn-primary"  onClick={handleLogout}>LOGOUT</button>
				</div>
			</div>
			<br/>
			<Card style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Link to="/profile">Back to Profile</Link>
				<Card.Body style={{width:"50%",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",  borderRadius:"5px"}} > 
					<h3>Saved Restuarant</h3>
					<br></br>
                    {Res&&Res.map((place)=><ResSaved place={place}/>)}
				</Card.Body>
			</Card>

			
		</>
	);
}
