import React from "react";

import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();

	return currentUser ? <Component /> : <Component />;
}
