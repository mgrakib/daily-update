/** @format */

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
const AddUser = () => {
	const { createUser,  updateUserNamePhoto } = useAuth();


	const [imageName, setImageName] = useState("No file chosen");
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = (data, evetn) => {
		
		const {
			confirmPassword,
			emali,
			name,
			password,
			servicId,
			stationKey,
			workStationName,
		} = data;
		const image = evetn.target.photo.files[0];
		const formData = new FormData();
		formData.append("image", image);

		axios
			.post(
				`https://api.imgbb.com/1/upload?key=905fa03856a3b3ef4c7407c67e906831`,
				formData
			)
			.then(res => {
				const imgURL = res?.data?.data?.display_url;
				createUser(emali, password)
					.then(user => {
						updateUserNamePhoto(name, imgURL)
							.then(res => {
								axios
									.post(
										`http://localhost:5000/add-user`,
										data
									)
									.then(res => {
										reset();
										console.log(res)
									});
							})
							.catch(err => {
								console.log(err.message);
							});	
					})
					.catch(error => {
						const errorMessage = error.message;
						console.log(errorMessage);
						// ..
					});
			});
	};

	const handleImageChange = e => {
		const image = e.target.files[0];
		setImageName(image.name);
	};

	const hanelGoogle = () => {
		googleLogin()
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div className='w-[75%] mx-auto p-5 bg-secondary-color'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-5'>
					{/* name and email  */}
					<div className='flex items-center justify-between gap-10'>
						{/* full name  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Full Name`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='name'
									{...register(`name`)}
									placeholder={`Full Name`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>

						{/* email  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Email`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='email'
									{...register(`emali`)}
									placeholder={`Email`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>
					</div>

					{/* photo and service id  */}
					<div className='flex items-center justify-between gap-10'>
						{/* Photo  */}
						<div className='w-1/2'>
							<label
								htmlFor='photo'
								className='text-[12px] text-light-gray'
							>
								{"photo"}
								<div className='h-[50px] px-3 py-2 cursor-pointer border border-border-color rounded-[5px] flex items-center gap-5 text-[14px]'>
									<input
										onChange={handleImageChange}
										id='photo'
										type='file'
										name='photo'
										placeholder={`Photo`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white hidden'
									/>
									<div className='h-full bg-action-color flex items-center px-2 rounded text-primary-color font-bold gap-2'>
										<BiUpload /> Upload File
									</div>

									<div>{imageName}</div>
								</div>
							</label>
						</div>
						{/* Service Id  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Service Id`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='name'
									{...register(`servicId`)}
									placeholder={`Service Id`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>
					</div>

					{/* work staion name and key  */}
					<div className='flex items-center justify-between gap-10'>
						{/* work station full name  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Work Station Name`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='name'
									{...register(`workStationName`)}
									placeholder={`Work Station Name`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>

						{/*work statoin stationKey  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Work Station Key`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='text'
									{...register(`stationKey`)}
									placeholder={`Work Station Key`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>
					</div>

					{/* password and confirm pass  */}
					<div className='flex items-center justify-between gap-10'>
						{/* password  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Password`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='password'
									{...register(`password`)}
									placeholder={`Password`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>
						{/* Confirm Password  */}
						<div className='w-1/2'>
							<label
								htmlFor=''
								className='text-[12px] text-light-gray'
							>
								{`Confirm Password`}
							</label>
							<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
								<input
									type='password'
									{...register(`confirmPassword`)}
									placeholder={`Confirm Password`}
									className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
								/>
							</div>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='w-full bg-action-color mt-[25px] py-3 rounded text-white font-bold'
						>
							Submit
						</button>
					</div>
				</div>
			</form>

			<div>
				<button onClick={hanelGoogle}>Google </button>
			</div>
		</div>
	);
};

export default AddUser;
