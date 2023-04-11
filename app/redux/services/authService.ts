import getAPIURL from "@/app/utils/getAPIURL";

const login = async (email: string, password: string) => {
    console.log("Login: ", {email, password})

    try {
        console.log("Login: ", {email, password})
        const res = await fetch(getAPIURL("/auth/signin"), {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({email, password})
        })
        console.log("Login: ", {email, password})

        return res;
    }
    catch (err: unknown) {
        throw err;
      }
}

const logout = async () => {
    console.log("Logout: ")
}

const authService = {
    login,
    logout
}

export default authService;