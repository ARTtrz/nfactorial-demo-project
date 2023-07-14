
import React from 'react'
import { FC, ReactNode } from 'react'
import { QueryClient } from 'react-query'
import { QueryClientProvider } from 'react-query'

// import ReduxToast from './ReduxToast'


export interface MainProviderProps {
	children: ReactNode
}
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<MainProviderProps> = ({ children }) => {
	return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
	)
}


export default MainProvider