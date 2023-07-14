import { FileService } from '../../services/file.service'

import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

type TypeUpload = (onChange: (...event: any[]) => void) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = () => {
	
	const [isLoading, setIsLoading] = useState(false)
	const [filename, setFilename] = useState(' ')
	
	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => FileService.upload(data), {
			onSuccess(data) {
				
				
				
				
			}
		}
	)
	
	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('file', files[0])
				
				
				setFilename(await mutateAsync(formData))
				setTimeout(() => {
					setIsLoading(false)
					
				}, 1000)
			}
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadFile,
			isLoading,
			filename,
			
			
		}),
		[uploadFile, isLoading, filename]
	)
}