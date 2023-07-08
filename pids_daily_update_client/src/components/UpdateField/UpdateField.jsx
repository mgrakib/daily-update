/** @format */

import { useForm } from "react-hook-form";

const UpdateField = ({ workStation }) => {
	const {
		register,reset ,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = data => {
		data.stationName = workStation?.stationKey;

		const newData = workStation.operator.map(ope => {
			console.log(ope)
			return {
				// serviceId: ope.id,
				email: ope.email,
				entry: parseInt(data[`Entry_${ope.id}`]),
				release: parseInt(data[`Release_${ope.id}`]),
			};
		});

		const {
			active,
			jailWarderEntry,
			jailWarderRelease,
			lockup,
			stationName,
		} = data;

		const allData = {
			active,
			jailWarderEntry,
			jailWarderRelease,
			lockup,
			stationName,
			newData,
		};

		fetch("http://localhost:5000/updateDailyValue", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(allData),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				reset();
			});
		
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mt-[24px] h-[430px] bg-secondary-color px-[20px] py-[15px] overflow-y-auto'>
					<div className=''>
						<h5 className='text-[24px] text-white mb-[16px]'>
							Daily Report_
						</h5>

						{/* operator  */}
						<div>
							{workStation?.operator?.map((operato, index) => {
								return (
									<div
										key={index}
										className='flex items-center gap-[25px] mt-[15px]'
									>
										{/*operator Entry */}
										<div className='w-1/2'>
											<label
												htmlFor=''
												className='text-[12px] text-light-gray'
											>
												{`${operato.name}'s Entry_`}
											</label>
											<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
												<input
													type='number'
													{...register(
														`Entry_${operato.id}`
													)}
													placeholder={`${operato.name}'s Entry_`}
													className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
												/>
											</div>
										</div>
										{/* Operator release */}
										<div className='w-1/2'>
											<label
												htmlFor=''
												className='text-[12px] text-light-gray'
											>
												{`${operato.name}'s Release_`}
											</label>
											<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
												<input
													type='number'
													{...register(
														`Release_${operato.id}`
													)}
													placeholder={`${operato.name}'s Release`}
													className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{/* jailWarder  */}
						<div className='flex items-center gap-[25px] mt-[15px]'>
							{/* Entry */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									Jail Worder’s Entry_
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='number'
										{...register("jailWarderEntry")}
										placeholder='Jail Worder’s Entry_'
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>
							{/* release */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									Jail Warder’s Release_
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='number'
										{...register("jailWarderRelease")}
										placeholder='Jail Warder’s Release_'
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>
						</div>

						<h5 className='text-[24px] text-white my-[16px]'>
							Daily Active_
						</h5>
						<div className='flex items-center gap-[25px]'>
							{/* Active */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									Active
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='number'
										{...register("active")}
										placeholder='Active'
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>
							{/* lockup */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									lockup
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='number'
										{...register("lockup")}
										placeholder='lockup'
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
				</div>
			</form>
		</>
	);
};

export default UpdateField;
