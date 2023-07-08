/** @format */

import { createBrowserRouter } from "react-router-dom";
import DailyUpdate from "../page/DailyUpdate/DailyUpdate";
import App from "../App";
// import AdminDashboard from "../page/AdminDashboard/AdminDashboard";
import AddUser from "../page/AdminPage/AddUser/AddUser";
import Login from "../page/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRouter from "./AdminRouter";
import AdminDashboard from "../page/AdminDashboard/AdminDashboard";
import TransfarOperator from "../page/AdminPage/AddUser/TransfarOperator";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "/dashboard",
				element: (
					<PrivateRoute>
						<DailyUpdate />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "/admin/dashboard",
		element: (
			<AdminRouter>
				<AdminDashboard />
			</AdminRouter>
		),
		children: [
			{
				path: "/admin/dashboard/adduser",
				element: <AddUser />,
			},
			{
				path: "/admin/dashboard/transfer-operator",
				element: <TransfarOperator />,
			},
		],
	},
]);

export default router;
