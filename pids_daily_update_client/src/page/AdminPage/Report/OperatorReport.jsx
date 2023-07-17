/** @format */

import moment from "moment";

const OperatorReport = ({ operator, index }) => {
	
	const { entry, name, release } = operator;

	// entry 
	const entryReport = [];
	if (entry.length === 0 || entry?.[0].reportDate !== moment(new Date()).format("YYYY-MM-DD")) { 
		entryReport.push(0)
	}
	entryReport.push(...entry.map(entry => entry.entry));
	
	const entryVluae = entryReport.map((entry, index) => {
		return (
			<p key={index}>
				{index < entryReport.length - 1 ? `${entry}+` : entry}
			</p>
		);
	});
    

	// release 
	const releaseReport = [];
	if (release.length === 0 || release?.[0].reportDate !== moment(new Date()).format('YYYY-MM-DD')) {
		releaseReport.push(0);
	}
	releaseReport.push(...release.map((release) => release.release))
	const releaseVlaue = releaseReport.map((release, index) => {
		return (
			<p key={index}> { index < releaseReport.length -1 ? `${release} + ` : release}</p>
		)
	})

	
		return (
			<div className='text-light-gray flex '>
				<div>
					{/* serial  */}
					<span>{`(${String.fromCharCode(96 + index + 1)}) `}</span>

					{/* name  */}
					<span>{`${name} : `}</span>
				</div>
				<div>
					<div>
						<div className=' flex items-center'>
							<span>Total Entry : (</span>
							<span className='flex items-center'>
								{entryVluae}
							</span>
							<span>)</span>
						</div>
					</div>

					<div className="flex items-center">
						<span>Total Release : (</span>
						<span className="flex items-center">{releaseVlaue}</span>
						<span>)</span>
					</div>
				</div>
			</div>
		);
};

export default OperatorReport;

{
	/* <span className='flex items-center gap-1'> */
}

{
	/* </span> */
}
