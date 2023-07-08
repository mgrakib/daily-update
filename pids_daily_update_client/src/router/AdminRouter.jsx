import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../page/LoadingPage/LoadingPage";


const AdminRouter = ({ children }) => {

	const location = useLocation();
    const { user, loading } = useAuth();
    if (loading) {
        return <LoadingPage></LoadingPage>
    }
    if (user) {
        return children
    }
    return (
		<Navigate
			to={"/"}
			state={{ from: location }}
			replace
		/>
	);
};

export default AdminRouter;