import axios from "axios";
import { useQuery } from "react-query";
import useAuth from "./useAuth";


const useRole = () => {
	const { user, loading } = useAuth();

    const {
		data: role = null,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["role"],
		enabled: !loading,
		queryFn: async() => {
			const result =await axios(
				`http://localhost:5000/single-user/?email=${user?.email}`
			);
			return result.data;
		},
	});
    
    return { role };

   
};

export default useRole;