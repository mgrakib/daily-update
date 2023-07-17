import logo from '../../../assets/logo_hd.png'

import { BiSolidDashboard, BiTransferAlt } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiShutDownLine } from "react-icons/ri";

import {Link} from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';

const SidBar = () => {
	const { logOut } = useAuth();
	const handelLogOut = () => {
		logOut().then(res =>{}).catch(err => console.log(err))
	}

	const [activeLink, setActiveLink] = useState("dashboard");
    return (
		<div className='h-full flex flex-col'>
			<div className=' text-center '>
				<img
					src={logo}
					alt=''
					className='mx-auto w-[100px]'
				/>
			</div>

			<div className='py-[20px] '>
				<ul>
					<Link
						onClick={() => setActiveLink("dashboard")}
						to='/admin/dashboard'
					>
						<li
							className={` text-[#CBCACE] p-[9px] rounded-sm flex items-center gap-[9px] cursor-pointer ${
								activeLink === "dashboard" && "bg-[#151A3D]"
							}`}
						>
							<BiSolidDashboard /> Dashboard_
						</li>
					</Link>
					<Link
						onClick={() => setActiveLink("daily-report")}
						to='/admin/dashboard/daily-report'
					>
						<li
							className={` text-[#CBCACE] p-[9px] rounded-sm flex items-center gap-[9px] cursor-pointer ${
								activeLink === "daily-report" && "bg-[#151A3D]"
							}`}
						>
							<TbReportSearch /> Report_
						</li>
					</Link>
					<Link
						onClick={() => setActiveLink("transferOperator")}
						to='/admin/dashboard/transfer-operator'
					>
						<li
							className={` text-[#CBCACE] p-[9px] rounded-sm flex items-center gap-[9px] cursor-pointer ${
								activeLink === "transferOperator" &&
								"bg-[#151A3D]"
							}`}
						>
							<BiTransferAlt /> Transfer Operator_
						</li>
					</Link>
					<Link
						onClick={() => setActiveLink("addUser")}
						to='/admin/dashboard/adduser'
					>
						<li
							className={` text-[#CBCACE] p-[9px] rounded-sm flex items-center gap-[9px] cursor-pointer ${
								activeLink === "addUser" && "bg-[#151A3D]"
							}`}
						>
							<AiOutlineUserAdd /> Add User_
						</li>
					</Link>
				</ul>
			</div>

			<div className='mt-auto '>
				<button
					onClick={handelLogOut}
					className='flex items-center gap-3 bg-[#151A3D] py-1 px-3 mx-auto rounded-md text-white justify-center'
				>
					<RiShutDownLine className='text-red-500' /> Log Out
				</button>
			</div>
		</div>
	);
};

export default SidBar;