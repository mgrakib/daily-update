import axios from "axios";
import { useEffect } from "react";

 const axiosSEcure = axios.create({
		baseURL: "https://some-domain.com/api/",
 });

const useAxiosSecure = () => {
	useEffect(() => {
		axiosSEcure.interceptors.request.use(config => {
			const token = localStorage.getItem("access-token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		});

		axiosSEcure.interceptors.response.use(
			response => response,
			async error => {
				if (
					error?.response &&
					(error?.response?.status === 401 ||
						error?.response?.status === 403)
				) {
					console.log("erro");
				}
			}
		);
	}, []);

	return [axiosSEcure];
};
export default useAxiosSecure;