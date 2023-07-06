import moment from "moment/moment";
import Container from "../../components/Container/Container";
import { useEffect, useState } from "react";
import image from '../../assets/image 2.png'
import logo from '../../assets/logo.png'
import { useQuery } from "react-query";
import UpdateField from "../../components/UpdateField/UpdateField";
import useAxiosSecure from "../../hooks/useAxiosInstance";


const DailyUpdate = () => {
    const date = new Date().toString()
    const [time, setTime] = useState(new Date());

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setTime(new Date());
	// 	}, 1000); // Update every second

	// 	return () => {
	// 		clearInterval(timer);
	// 	};
    // }, []);
    

    const { axiosSEcure } = useAxiosSecure();
    const [workStation, setWorkStation] = useState({})
    const {data, isLoading } = useQuery(
        {
            queryKey: ['work-station'],
            queryFn: async () => {
                fetch("http://localhost:5000/workstation")
					.then(res => res.json())
					.then(data => setWorkStation(data));
            }
        }
    )

    // console.log(workStation);

    return (
		<div>
			<Container>
				<div className='bg-gray px-[16px] text-white flex items-center justify-between py-[8px]'>
					<div className='flex items-center gap-[22px]'>
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

					<div className='flex items-center gap-3'>
						<div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
							<img
								src={image}
								alt=''
							/>
						</div>
						<div>MG Rakib</div>
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
											<p className='text-light-gray'>
												Entry:
											</p>
											<p className='text-white'>30</p>
										</div>
										<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
											<p className='text-light-gray'>
												Release:
											</p>
											<p className='text-white'>30</p>
										</div>
									</div>

									<div className='mt-[15px]'>
										<h6 className='text-[18px] text-ternary-gray pb-[5px] border-b border-border-color'>
											Last 30 Days’ Report_
										</h6>

										<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
											<p className='text-light-gray'>
												Entry:
											</p>
											<p className='text-white'>30</p>
										</div>
										<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
											<p className='text-light-gray'>
												Release:
											</p>
											<p className='text-white'>30</p>
										</div>
									</div>
									<div className='mt-[15px]'>
										<h6 className='text-[18px] text-ternary-gray pb-[5px] border-b border-border-color'>
											Average_
										</h6>

										<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
											<p className='text-light-gray'>
												Entry:
											</p>
											<p className='text-white'>30</p>
										</div>
										<div className='py-[5px] border-b border-border-color flex items-center justify-between'>
											<p className='text-light-gray'>
												Release:
											</p>
											<p className='text-white'>30</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Work station  */}
						<div className='w-1/2 pl-10 '>
							{/* display work station  */}
							<div>
								<h1 className='text-[24px] font-bold text-white'>
									{workStation?.stationName}
								</h1>
								<p className='text-[18px] text-light-gray'>
									Md. Golam Rakib_
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