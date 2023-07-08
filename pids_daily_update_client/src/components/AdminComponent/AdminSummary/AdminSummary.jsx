import moment from "moment";
import { useEffect, useState } from "react";

const AdminSummary = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
             clearInterval(timer);
        }
    },[])
    return (
		<div className='grid grid-cols-3 gap-[30px]'>
			<div className='px-3 py-6 rounded bg-[#090D2B] shadow-[0px_4px_4px_0_rgba(0,0,0,.25)] text-center'>
				<p className='text-ternary-gray text-[32px] tracking-[4px]'>
					{moment(time).format("MM-DD-YYYY")}
				</p>
				<p className='text-ternary-gray text-[22px] tracking-[8px]'>
					{moment(time).format("h:mm:ss a")}
				</p>
			</div>
			<div className='px-3 py-6 rounded bg-[#090D2B] shadow-[0px_4px_4px_0_rgba(0,0,0,.25)] text-center'>
				<p className='text-ternary-gray text-[18px] tracking-[2px]'>
					Today’s Total Entry
				</p>
				<p className='text-ternary-gray text-[42px] tracking-[5px]'>
					600
				</p>
			</div>
			<div className='px-3 py-6 rounded bg-[#090D2B] shadow-[0px_4px_4px_0_rgba(0,0,0,.25)] text-center'>
				<p className='text-ternary-gray text-[18px] tracking-[2px]'>
					Today’s Total Release
				</p>
				<p className='text-ternary-gray text-[42px] tracking-[5px]'>
					600
				</p>
			</div>
		</div>
	);
};

export default AdminSummary;