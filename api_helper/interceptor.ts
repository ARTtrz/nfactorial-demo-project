import axios, { AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'


import { API_SERVER_URL, API_URL } from '../config/api.config'

import { errorCatch } from './api.helpers'


const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken)
		(config.headers as AxiosHeaders).set(
			'Authorization',
			`Bearer ${accessToken}`
		)
	return config
})

// instance.interceptors.response.use(
// 	(config) => config,
// 	async (error) => {
// 		const originalRequest = error.config // спецаильно написали чтобы занова прописать как параметр

// 		if (
// 			(error.response.status === 401 ||
// 				errorCatch(error) === 'jwt expired' ||
// 				errorCatch(error) === 'jwt must be provided') &&
// 			error.config &&
// 			!error.config._isRetry
// 		) {
// 			originalRequest._isRetry = true
// 			try {
// 				await AuthService.getNewTokens()

// 				return instance.request(originalRequest)
// 			} catch (e) {
// 				if (errorCatch(e) === 'jwt expired') removeTokenStorage()
// 			}
// 		}

// 		throw error
// 	}
// )

export default instance
// do not forget about api_server_url
export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})