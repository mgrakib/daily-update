/** @format */

import { createBrowserRouter } from "react-router-dom";
import DailyUpdate from "../page/DailyUpdate/DailyUpdate";
import App from "../App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: '/',
				element: <DailyUpdate />
			}
		]
	},
]);


export default router;