/** @format */

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const UserSummary = () => {
	const { user } = useAuth();
	const [userSummary, setUserSummary] = useState({});
	useEffect(() => {
		fetch(`http://localhost:5000/user-summary/?email=${user?.email}`)
			.then(res => res.json())
			.then(data => setUserSummary(data));
	}, [user]);


	

	
	// last 30 less than entry
	let allEntry = [];
	if (userSummary[0]?.operator[0]?.entry.length > 30) {
		allEntry = userSummary[0]?.operator[0]?.entry.slice(0, 30);
	} else {
		allEntry = userSummary[0]?.operator[0]?.entry;
	}
	const entrySum = allEntry?.reduce((value, currentValue) => {
	
		return value + currentValue.entry;
	}, 0);

	
	// last 30 days release
	let allRelease = [];
	if (userSummary[0]?.operator[0]?.release.length > 30) {
		allRelease = userSummary[0]?.operator[0]?.release.slice(0, 30);
	} else {
		allRelease = userSummary[0]?.operator[0]?.release;
	}
	const releaseSum = allRelease?.reduce((value, currentValue) => {
		
		return value + currentValue?.release;
	}, 0);


	return (
		<div className='mt-[24px]  bg-secondary-color w-[410px] mx-auto rounded-md'>
			<h6 className='px-[20px] py-[15px] text-[20px] text-ternary-gray font-bold border-b border-border-color'>
				Summary_
			</h6>

			<div className='px-[20px] py-[15px]'>
				<div>
					<h6 className='text-[18px] text-ternary-gray pb-[5px] border-b border-border-color'>
						Yesterday's Report_
					</h6>

					<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
						<p className='text-light-gray'>Entry:</p>
						<p className='text-white'>
							{userSummary[0]?.operator[0]?.entry[0]?.entry > 0
								? userSummary[0]?.operator[0]?.entry[0]?.entry
								: 0}
						</p>
					</div>
					<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
						<p className='text-light-gray'>Release:</p>
						<p className='text-white'>
							{userSummary[0]?.operator[0]?.release[0]?.release > 0
								? userSummary[0]?.operator[0]?.release[0]?.release
								: 0}
						</p>
					</div>
				</div>

				<div className='mt-[15px]'>
					<h6 className='text-[18px] text-ternary-gray pb-[5px] border-b border-border-color'>
						Last {allEntry?.length} Days’ Report_
					</h6>

					<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
						<p className='text-light-gray'>Entry:</p>
						<p className='text-white'>{entrySum}</p>
					</div>
					<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
						<p className='text-light-gray'>Release:</p>
						<p className='text-white'>{releaseSum}</p>
					</div>
				</div>
				<div className='mt-[15px]'>
					<h6 className='text-[18px] text-ternary-gray pb-[5px] border-b border-border-color'>
						Average_
					</h6>

					<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
						<p className='text-light-gray'>Entry:</p>
						<p className='text-white'>
							{(entrySum / allEntry?.length).toFixed(1) === "NaN"
								? 0
								: (entrySum / allEntry?.length).toFixed(1)}
						</p>
					</div>
					<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
						<p className='text-light-gray'>Release:</p>
						<p className='text-white'>
							{(releaseSum / allRelease?.length).toFixed(1) ===
							"NaN"
								? 0
								: (releaseSum / allRelease?.length).toFixed(1)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserSummary;
