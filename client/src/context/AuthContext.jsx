import { createContext, useState, useContext, useEffect } from 'react'
import { registeerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!AuthContext) {
        throw new Error('useAuth must be used within an auth provider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (values) => {
        try {
            const res = await registeerRequest(values)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setError(error.response.data)

        }
    }

    const signin = async (user) => {

        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true)
            setUser(res.data)

            console.log("login", res);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setError(error.response.data)
            }
            setError([error.response.data.message])
        }

    }

    const logOut = () => {
        Cookies.remove("token");
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (error.length > 0) {
            const timer = setTimeout(() => {
                setError([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [error])



    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {

                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)

            }

        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signup, user, isAuthenticated
            , error, signin, loading,logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}