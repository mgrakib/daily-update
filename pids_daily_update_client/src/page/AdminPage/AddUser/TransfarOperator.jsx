import axios from "axios";
import { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/modal/Modal";

const TransfarOperator = () => {
    const { setIsOpen } = useAuth();
    const operatorEmail = useRef()
    const [btnDisable, setBtnDisable] = useState(true)
    const [operator, setOperator] = useState({});
    const handelFindUserId = () => {
        const email = operatorEmail?.current?.value;
        axios(`http://localhost:5000/user-summary/?email=${email}`).then(res =>
        { 
            if (res.data.length === 0) {
                setIsOpen(true);
            } else {
                setOperator(res?.data[0]?.operator[0]);
                setBtnDisable(false);
            }
        }
		);
    }

    console.log(operator);

    const handelTransfer = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = operatorEmail?.current?.value;
        const newStaionName = form.newWorkStationName.value;
        const newStaionKey = form.newStationKey.value;
        const operatorId = operator?.id;
        const transferData = { email, newStaionName, newStaionKey, operatorId };

        
        axios.put(`http://localhost:5000/transfer-operator`, transferData).then(res => console.log(res))

        console.log(transferData);
    }
    return (
		<div className='w-[75%] mx-auto p-5 bg-secondary-color'>
			<div>
				<div className='mb-[20px]'>
					<div className='w-1/3  rounded-[5px] relative overflow-hidden  border border-border-color'>
						<div className='h-[50px] px-3 rounded-[5px] bg-white'>
							<input
								ref={operatorEmail}
								type='email'
								placeholder={`Service Id_`}
								className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-primary-color pr-20'
							/>
						</div>

						<button
							onClick={handelFindUserId}
							className=' bg-[#151A3D] h-full absolute top-0 right-0 flex items-center px-2 text-white'
						>
							Search
						</button>
					</div>
				</div>

				<form onSubmit={handelTransfer}>
					<div>
						{/* service id and name  */}
						<div className='flex items-center justify-between gap-10'>
							{/* service id  */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									{`Service Id_`}
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										value={operator?.id}
										type='name'
										placeholder={`Service Id_`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>

							{/*name   */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									{`Operator Name_`}
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										value={operator?.name}
										type='text'
										placeholder={`Operator Name_`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>
						</div>
						{/* email and currnet station  */}
						<div className='flex items-center justify-between gap-10'>
							{/* email  */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									{`Email_`}
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='email'
										value={operator?.email}
										placeholder={`Email_`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>

							{/*Current Work Station_  */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									{`Current Work Station_`}
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										value={operator?.workStationName}
										type='text'
										placeholder={`Current Work Station_`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>
						</div>
						{/* new work station name and key  */}
						<div className='flex items-center justify-between gap-10 mt-5'>
							{/* new work station full name  */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									{`New Work Station_`}
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='text'
										name='newWorkStationName'
										placeholder={`New Work Station_`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>

							{/*New Work Station key_  */}
							<div className='w-1/2'>
								<label
									htmlFor=''
									className='text-[12px] text-light-gray'
								>
									{`New Work Station key_`}
								</label>
								<div className='h-[50px] px-3 border border-border-color rounded-[5px] '>
									<input
										type='text'
										name='newStationKey'
										placeholder={`New Work Station key_`}
										className='w-full h-full bg-transparent outline-none placeholder:text-dark-gray text-white'
									/>
								</div>
							</div>
						</div>
						<div>
							<button
								disabled={btnDisable}
								type='submit'
								className={`w-full bg-action-color mt-[25px] py-3 rounded text-white font-bold ${
									btnDisable && "cursor-not-allowed"
								}`}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
				<div className='mt-[20px] text-white text-[12px]'>
					<p>
						If the Operator transfer then His/Her Entry or Release
						History will be stored. It’s not dependent on work
						station.
					</p>

					<p>
						Viz. if the operator has worked in Kashimpur - 1 for a
						long time now if he is transferred to Barisal then
						his/her total Entry, release will be counted with the
						previous workstation Entry and release and current
						workstation entry and release.
					</p>
				</div>
			</div>
			<Modal email={operatorEmail?.current?.value} />
		</div>
	);
};

export default TransfarOperator;