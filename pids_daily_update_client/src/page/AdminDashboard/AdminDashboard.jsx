import { Outlet } from "react-router-dom";
import AdminSummary from "../../components/AdminComponent/AdminSummary/AdminSummary";
import SidBar from "../../components/AdminComponent/SidBar/SidBar";

const AdminDashboard = () => {
    return (
		<div className='w-full h-[100vh] grid grid-cols-5'>
			<div className='col-span-1 bg-secondary-color py-[20px] px-[20px] shadow-[0px_4px_4px_0_rgba(0,0,0,.25)]'>
				<SidBar />
			</div>
			<div className='col-span-4 pt-[20px] px-[20px]'>
				<AdminSummary />

				<div className='mt-[20px] bg-secondary-color h-[calc(100vh-200px)] overflow-x-auto'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;