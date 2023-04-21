export const serviceProvider = (endpoint: string, options = {}) => {
    return fetch(`${process.env.NEXT_API_URL}${endpoint}`, options)
}