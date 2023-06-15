import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Distance from "./Distance";
import UpdateProfile from "./UpdateProfile";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import HomePage from "../pages/Home";
import UpdatePassword from "./updateReset";
import SaveTrip from "./Saved";
import SaveRes from "./SRestaurant";
import SaveOther from "./Other";
import VisitedPlaces from "./VisitedPlaces";
import Details from "./Details";
function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
				<Route
						exact
						path="/"
						element={<HomePage />}
					/>
					<Route
						exact
						path="/dashboard"
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						exact
						path="/distance"
						element={<PrivateRoute component={Distance} />}
					/>
					<Route
						exact
						path="/profile"
						element={<PrivateRoute component={Profile} />}
					/>
					<Route exact path="/savedtravel" element={<PrivateRoute component={SaveTrip} />}/>
					<Route exact path="/savedrestuarent" element={<PrivateRoute component={SaveRes} />}/>
					<Route exact path="/vistedplaces" element={<PrivateRoute component={VisitedPlaces}/>}/>
					<Route exact path="/savedother" element={<PrivateRoute component={SaveOther} />}/>
					<Route exact path="/details" element={<PrivateRoute component={Details} />}/>
					<Route
						exact
						path="/update-profile"
						element={<PrivateRoute component={UpdateProfile} />}
					/>
					<Route exact path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/passwordupdate"
						element={<UpdatePassword/>}
					/>
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
