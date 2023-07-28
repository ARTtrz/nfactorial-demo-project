import { axiosClassic } from "api_helper/interceptor"

export const InspectorService = {

	async pdd(input:string) {
		return axiosClassic.post<string>('/inpector/pdd', input, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})


	
		
		
	}
}