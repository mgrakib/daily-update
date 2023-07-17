import axios from "axios";
import { useQuery } from "react-query";


const useTotalUser = () => {
    const {data: totalUser=0, isLoading, refetch: totalUserRefetch } = useQuery({
        queryKey: ['totalUser'],
        queryFn: async () => {
            const totalUserResult = await axios(
				`http://localhost:5000/get-total-user-number`
            )

            return totalUserResult?.data?.totalUser
        }
    });

    return { totalUserRefetch, totalUser };
};

export default useTotalUser;