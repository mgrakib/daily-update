import { RotatingLines } from "react-loader-spinner";


const LoadingPage = () => {
    return (
		<div className='w-full h-[calc(100vh-20px)] flex items-center justify-center'>
			<RotatingLines
				strokeColor='grey'
				strokeWidth='3'
				animationDuration='0.75'
				width='96'
				visible={true}
			/>
		</div>
	);
};

export default LoadingPage;