/** @format */

import moment from "moment";
import { useEffect, useRef } from "react";
import useAllStationReport from "../../../hooks/useAllStationReport";
import OperatorReport from "./operatorReport";
import useAuth from "../../../hooks/useAuth";

const Report = () => {
	const {reportDate,  setReportDate } = useAuth();
	const dateValue = useRef();
	const handelDate = () => {
		const date = dateValue.current.value;

		const todayDate = moment(new Date()).format("YYYY-MM-DD");
		const reportDate = moment(date).format("YYYY-MM-DD");

		if (todayDate < reportDate) {
			alert("you cant select Future Date");
		} else {
			setReportDate(moment(date).format("YYYY-MM-DD"));
		}
	};

	const { workStation, isLoading, refetch } = useAllStationReport();

	return (
		<div className='p-10'>
			<div className='mb-[20px] flex items-center gap-5'>
				<div className='w-1/3  rounded-[5px] relative overflow-hidden  border border-border-color'>
					<div className='h-[50px] px-3 rounded-[5px] bg-white'>
						<input
							ref={dateValue}
							type='date'
							placeholder={`Search_`}
							className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-primary-color pr-20'
						/>
					</div>

					<button
						onClick={handelDate}
						className=' bg-[#151A3D] h-full absolute top-0 right-0 flex items-center px-2 text-white'
					>
						Search
					</button>
				</div>
			</div>

			<div>
				{workStation.map((station, index) => {
					const {
						active,
						jailWarder,
						lockup,
						operator,
						workStationName,
						_id,
					} = station;

					const operatorTotalEntry = operator.reduce(
						(value, currentValue) => {
							return currentValue?.entry?.[0]?.reportDate ===
								moment(new Date()).format("YYYY-MM-DD")
								? currentValue.entry[0].entry + value
								: 0 + value;
						},
						0
					);

					const operatorTotalRelease = operator.reduce(
						(value, currentValue) => {
							return currentValue?.release?.[0]?.reportDate ===
								moment(new Date()).format("YYYY-MM-DD")
								? currentValue.release[0].release + value
								: 0 + value;
						},
						0
					);

					return (
						<div
							key={_id}
							className='mb-2'
						>
							<h1 className='text-white'>
								{/* sl number and station name  */}
								<span>{`${
									index + 1
								}. ${workStationName} :`}</span>

								{/* entry complete or not  */}
								<span>{"  Entry Completed, "}</span>

								{/* todays locup  */}
								<span>
									{`Pri : ${
										lockup?.[0]?.reportDate ===
										moment(new Date()).format("YYYY-MM-DD")
											? lockup?.[0]?.number
											: 0
									}`}
								</span>

								{/* todays total entry  */}
								<span>{` Today's Entry : ${
									jailWarder.entry?.[0]?.reportDate ===
									moment().format("YYYY-MM-DD")
										? jailWarder.entry[0].number +
										  operatorTotalEntry
										: 0 + operatorTotalEntry
								} `}</span>

								{/* todays total release  */}
								<span>{` Today's Release : ${
									jailWarder.release?.[0]?.reportDate ===
									moment().format("YYYY-MM-DD")
										? jailWarder.release[0].number +
										  operatorTotalRelease
										: 0 + operatorTotalRelease
								}`}</span>

								{/* todays total active  */}
								<span>{` Active Pri: ${
									active?.[0]?.reportDate ===
									moment(new Date()).format("YYYY-MM-DD")
										? active?.[0]?.number
										: 0
								} `}</span>
							</h1>

							<div className='ml-2'>
								{operator.map((operator, index) => {
									return (
										<OperatorReport
											key={operator.id}
											operator={operator}
											index={index}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Report;
