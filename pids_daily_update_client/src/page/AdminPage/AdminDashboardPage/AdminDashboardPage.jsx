/** @format */

import { useEffect, useState } from "react";
import useAllUser from "../../../hooks/useAllUser";
import useTotalUser from "../../../hooks/useTotalUser";
import axios from "axios";

const AdminDashboardPage = () => {
	const [allUser, setAllUser] = useState([]);
	const [pageLimite, setPageLimite] = useState(10);
	const { totalUser } = useTotalUser();
	const totalPage = Math.ceil(totalUser / pageLimite);
	const pageBtn = [...Array(totalPage || 0).keys()];
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		axios(
			`http://localhost:5000/get-all-users/?skip=${currentPage * pageLimite}&limit=${pageLimite}`
		).then(result => setAllUser(result.data));
	}, [pageLimite, currentPage]);

	const [isIncressDisable, setIsIncressDisable] = useState(false);
	const [isDecressDisable, setIsDecressDisable] = useState(true);

	const numberIncress = () => {
		setIsDecressDisable(false);
		if (pageBtn[pageBtn.length - 1] === currentPage + 1) {
			setIsIncressDisable(true);
		}
		setCurrentPage(currentPage + 1);
	};
	
	const numberDecress = () => {
		setIsIncressDisable(false);
		if (pageBtn[0] === currentPage - 1) {
			setIsDecressDisable(true);
		}
		console.log(pageBtn[0] === currentPage);
		setCurrentPage(currentPage - 1);
	};


	
	return (
		<div className=' mx-auto p-5 bg-secondary-color'>
			<div className='mb-[20px] flex items-center gap-5'>
				<div className='w-1/3  rounded-[5px] relative overflow-hidden  border border-border-color'>
					<div className='h-[50px] px-3 rounded-[5px] bg-white'>
						<input
							type='text'
							placeholder={`Search_`}
							className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-primary-color pr-20'
						/>
					</div>

					<button className=' bg-[#151A3D] h-full absolute top-0 right-0 flex items-center px-2 text-white'>
						Search
					</button>
				</div>

				<div className=' rounded-[5px] relative overflow-hidden  border border-border-color'>
					<div className='h-[50px] bg-white flex items-center'>
						<div className='px-[10px]'>Result Rows Per Page</div>
						<select
							onChange={event => {
								setPageLimite(parseInt(event.target.value));
							}}
							name=''
							id=''
							className='bg-secondary-color text-white h-full outline-none px-2'
						>
							<option value='10'>10</option>
							<option value='20'>20</option>
							<option value='30'>30</option>
						</select>
					</div>
				</div>
			</div>

			<div>
				<table className='w-full'>
					<thead
						style={{ marginBottom: "20px" }}
						className='pb-[10px]'
					>
						<tr className='text-left text-white'>
							<th className=' w-[10%] py-4'>sl</th>
							<th className=' w-[10%] py-4'>_id</th>
							<th className=' w-[30%] py-4'>name_</th>
							<th className=' w-[30%] py-4'>work station_</th>
							<th className=' w-[30%] py-4'>user id_</th>
						</tr>
					</thead>

					<tbody>
						{allUser.map((user, index) => (
							<tr
								key={user?._id}
								className='text-light-gray'
							>
								<td className='pb-2'>{index +1}</td>
								<td className='pb-2'>{user?.servicId}</td>
								<td className='pb-2'>{user?.name}</td>
								<td className='pb-2'>
									{user?.workStationName}
								</td>
								<td className='pb-2'>{user?.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* pagination  */}
			<div className='mt-[40px] flex items-center justify-center gap-1'>
				<div>
					<button
						onClick={numberDecress}
						disabled={isDecressDisable}
						className={`w-[30px] h-[30px] bg-dark-gray rounded-full cursor-pointer flex items-center justify-center text-white ${
							isDecressDisable && "cursor-not-allowed"
						}`}
					></button>
				</div>
				<div>
					<div className='w-[30px] h-[30px] bg-action-color rounded-full flex items-center justify-center text-white '>
						{currentPage + 1}
					</div>
				</div>
				<div>
					<button
						disabled={isIncressDisable}
						onClick={numberIncress}
						className='w-[30px] h-[30px] bg-dark-gray rounded-full cursor-pointer flex items-center justify-center text-white'
					></button>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboardPage;
