const getAPIURL = (endpoint: string) : string => `${process.env.NEXT_API_URL ? process.env.NEXT_API_URL : "http://localhost:8000"}${endpoint}`

export default getAPIURL