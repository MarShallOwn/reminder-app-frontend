const getAPIURL = (endpoint: string) : string => `${process.env.NEXT_API_URL}${endpoint}`

export default getAPIURL