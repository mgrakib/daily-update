/** @format */

import logo from "../../assets/logo_hd.png";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useRole from "../../hooks/useRole";
const Login = () => {
	const { loading, userLogin, user } = useAuth();
	const { role} = useRole();
	const navigate = useNavigate();
	const handelSingIn = event => {
		event.preventDefault();
		const form = event.target;
		const userName = form.userName.value;
		const password = form.password.value;
		console.log(userName, password);
		userLogin(userName, password)
			.then(result => {
				axios(
					`http://localhost:5000/single-user/?email=${userName}`
				).then(res => {
					if (res?.data?.role === "admin") {
						navigate("/admin/dashboard");
					} else {
						navigate("/dashboard");
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	console.log(role)
	
	useEffect(() => {
		
		if (role?.role === "admin") {
			navigate("/admin/dashboard");
		} else if ( role) {
			navigate("/dashboard");
		}
	}, [user, navigate, role]);
	return (
		<div className='min-h-[calc(100vh-20px)] flex items-center justify-center'>
			<div className='p-10 bg-secondary-color w-full md:w-2/3'>
				<h1 className='text-[24px] md:text-[36px] font-bold text-white mb-6 md:mb-10 text-center'>
					NTMC DAILY REPORT LOGIN_
				</h1>

				<div className='flex flex-col md:flex-row items-center gap-6 md:gap-10'>
					<div className='w-full md:w-1/2'>
						<img
							src={logo}
							alt=''
							className='w-[40%] md:w-[75%] mx-auto'
						/>
					</div>

					<div className='w-full md:w-1/2 '>
						<form onSubmit={handelSingIn}>
							<div className='flex items-center flex-wrap justify-between gap-2'>
								{/* username  */}
								<div className='w-full'>
									<label
										htmlFor=''
										className='text-[12px] text-light-gray'
									>
										{`User Name`}
									</label>
									<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
										<input
											type='name'
											name='userName'
											placeholder={`User Name_`}
											className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
										/>
									</div>
								</div>

								{/*password  */}
								<div className='w-full'>
									<label
										htmlFor=''
										className='text-[12px] text-light-gray'
									>
										{`Password`}
									</label>
									<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
										<input
											type='text'
											name='password'
											placeholder={`Password_`}
											className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
										/>
									</div>
								</div>
							</div>
							<div>
								<button
									disabled={loading}
									type='submit'
									className='w-full bg-action-color mt-[25px] py-3 rounded text-white font-bold flex items-center justify-center'
								>
									{loading ? (
										<TbFidgetSpinner className='text-[23px] animate-spin' />
									) : (
										"Login"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
