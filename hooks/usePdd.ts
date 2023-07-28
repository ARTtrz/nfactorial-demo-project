
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { InspectorService } from 'services/inspector.service'



export const usePdd = () => {

	
	const { mutateAsync } = useMutation(
		'upload file',
		(input: string) => InspectorService.pdd(input)
	)
	
	const find_in_pdd = useCallback(
		async (input: string) => {
            return await mutateAsync(input)
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			find_in_pdd,
			
		}),
		[find_in_pdd]
	)
}