/** @format */

import moment from "moment/moment";
import Container from "../../components/Container/Container";
import { useEffect, useState } from "react";
import image from "../../assets/image 2.png";
import logo from "../../assets/logo.png";
import { useQuery } from "react-query";
import UpdateField from "../../components/UpdateField/UpdateField";
import useAxiosSecure from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import UserSummary from "../../components/UsersComponent/UserSummary/UserSummary";

const DailyUpdate = () => {
	const date = new Date().toString();
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000); // Update every second

		return () => {
			clearInterval(timer);
		};
	}, []);

	const { user, logOut } = useAuth();

	const { axiosSEcure } = useAxiosSecure();
	const [workStation, setWorkStation] = useState({});
	const { data, isLoading } = useQuery({
		queryKey: ["work-station"],
		queryFn: async () => {
			fetch(`http://localhost:5000/workstation/?email=${user?.email}`)
				.then(res => res.json())
				.then(data => setWorkStation(data));
		},
	});


	const [showLogout, setShowLogout] = useState(false);
	const handelLogout = () => {
		logOut()
			.then(res => {})
			.catch(err => {
				
			});
	};

	const handelShowLogOut = event => {
		event.stopPropagation();
		console.log('first')
		setShowLogout(!showLogout);
	};
	return (
		<div onClick={() => setShowLogout(false)}>
			<Container>
				<div className='bg-gray px-[16px] text-white flex items-center justify-between py-[8px]'>
					<div className='flex items-center gap-[22px] min-w-[180px] '>
						<div className='text-[12px]'>
							{moment(date).format("MM-DD-YYYY")}
						</div>
						<div className='text-[12px]'>
							{moment(time).format("h:mm:ss a")}
						</div>
					</div>

					<div>
						<h1 className='text-[24px]'>
							Welcome To Daily Report Portal
						</h1>
					</div>

					<div className='relative min-w-[150px] flex items-center justify-end '>
						<div
							onClick={handelShowLogOut}
							className='flex items-center gap-3 cursor-pointer '
						>
							<div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
								<img
									src={user?.photoURL}
									alt=''
								/>
							</div>
							<div className='cursor-pointer'>
								{user?.displayName}
							</div>
						</div>
						<div
							className={`py-4 px-5 bg-[#090D2B] absolute duration-300 ${
								showLogout
									? "top-[120%]  opacity-100 max-h-[100px]"
									: "top-[160%] opacity-0 max-h-0"
							} shadow-[0_4px_4px_0_rgba(0,0,0,.25)] rounded`}
						>
							<button onClick={handelLogout}>Log Out</button>
						</div>
					</div>
				</div>

				{/* dashboard  */}
				<div className='mt-[12px]'>
					<div className='flex items-start justify-between gap-[20px]'>
						{/* summary section  */}
						<div className='w-1/2 '>
							<div className='flex items-start gap-[28px] justify-between'>
								<div className='w-[73px] h-[73px]'>
									<img
										src={logo}
										alt=''
										className='w-full'
									/>
								</div>
								<h1 className='text-[24px] font-bold text-white leading-[28px]  flex-1 '>
									National Telecommunication_ Monitoring
									Center
								</h1>
							</div>

							{/* summary  */}
							<UserSummary />
						</div>

						{/* Work station  */}
						<div className='w-1/2 pl-10 '>
							{/* display work station  */}
							<div>
								<h1 className='text-[24px] font-bold text-white'>
									{workStation?.workStationName}
								</h1>
								<p className='text-[18px] text-light-gray'>
									{user?.displayName}
								</p>
							</div>

							<UpdateField workStation={workStation} />
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default DailyUpdate;
