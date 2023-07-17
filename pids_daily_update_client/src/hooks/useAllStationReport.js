import axios from "axios";
import { useQuery } from "react-query";

const useAllStationReport = () => {
    const {data: workStation = [], isLoading, refetch } = useQuery({
        queryKey: ['stationReport'],
        queryFn: async () => {
            const workStationResult = await axios(
				`http://localhost:5000/all-report-date`
            );
            return workStationResult.data
        }
    })

    return {workStation, isLoading, refetch}
};

export default useAllStationReport;