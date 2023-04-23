export const handleAPICatch = (err: unknown) => {
    if (err instanceof Error) {
        const message = err.message;

        return message
      } else {
        return `Unexpected Error: ${err}`
      }
}