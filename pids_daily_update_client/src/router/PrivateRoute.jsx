/** @format */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../page/LoadingPage/LoadingPage";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();

	const location = useLocation();
	if (loading) {
		return <LoadingPage />;
	}

	if (user) {
		
		return children;
	}
	return (
		<Navigate
			to={"/"}
			state={{ from: location }}
			replace
		/>
	);
};

export default PrivateRoute;
