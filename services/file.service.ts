import { axiosClassic } from "api_helper/interceptor"

export const FileService = {

	async upload(file: FormData) {
		let filename = ''
		return axiosClassic.post<string>('/file', file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => {
			
			filename = res.data
		
			return filename
		})


	
		
		
	}
}