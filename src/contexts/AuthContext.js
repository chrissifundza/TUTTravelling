import React, { useContext, useEffect, useState} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [Hotels, setHotels] = useState([]);
	const [Res, setRes] = useState([]);
	const [Other, setOther] = useState([]);
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
	const login = async (inputs)=>{
	   try {
		const res = await axios.post("https://traveladvisor.herokuapp.com/api/auth/login", inputs)
		console.log(res.data);
        setCurrentUser(res.data)
	if(res.data !="User not found")navigate("/dashboard");
       console.log(res.data)
	   } catch (error) {
		navigate("/login")
		swal("Login Error",error.response.data,"error")
	   }

    }

    const logout = async (inputs)=>{
        const res = await axios.post("https://traveladvisor.herokuapp.com/api/auth/logout")
		navigate("/")
        setCurrentUser(null)
	
    }
	
	const getPlaces = async ()=>{
		try {
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getallhotels", currentUser)
		   console.log(res.data)
		   setHotels(res.data)
		  } catch (error) {
			console.log(error.response.data)
		  }

	}
	const getRes = async ()=>{
		try {
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getallres", currentUser)
		   console.log(res.data)
		   setRes(res.data)
		  } catch (error) {
			console.log(error.response.data)
		  }
	}
	const getOther = async ()=>{
		try {
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getallother", currentUser)
		   console.log(res.data)
		   setOther(res.data)
		  } catch (error) {
			console.log(error.response.data)
		  }
	}

	const getPlaces2 = async ()=>{
		try {
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getallhotels", currentUser)
		   console.log(res.data)
		   setHotels(res.data)
		  } catch (error) {
			console.log(error.response.data)
		  }

	}
	const getRes2 = async ()=>{
		try {
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getallres", currentUser)
		   console.log(res.data)
		   setRes(res.data)
		  } catch (error) {
			console.log(error.response.data)
		  }
	}
	const getOther2 = async ()=>{
		try {
			const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getallother", currentUser)
		   console.log(res.data)
		   setOther(res.data)
		  } catch (error) {
			console.log(error.response.data)
		  }
	}
	useEffect(()=>{
		localStorage.setItem("user", JSON.stringify(currentUser))
		if (currentUser==null) navigate("/")
		},[currentUser])
	const value = {
		getPlaces2,
		getOther2,
		getRes2 ,
		currentUser, 
		setCurrentUser,
		login,
		logout,
		getPlaces,
		Hotels,
		setHotels,
		Res,
		setRes,
		Other,
		setOther,
		getOther,
		getRes 
	};

	return (
		<AuthContext.Provider value={value}>
			{ children}
		</AuthContext.Provider>
	);
}
