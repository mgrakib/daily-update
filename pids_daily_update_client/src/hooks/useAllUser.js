import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";


const useAllUser = () => {
	const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(2)
    
	const {
		data: allUser = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["alluser"],
		queryFn: async () => {


			const result = await axios(
				`http://localhost:5000/get-all-users/?skip=${skip}&limit=${limit}`
			);
			return result.data;
		},
	});

	return { allUser, isLoading, refetch, skip, setSkip, limit, setLimit };
};

export default useAllUser;