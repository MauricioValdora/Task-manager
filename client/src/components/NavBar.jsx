import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function NavBar() {

    const { isAuthenticated, logOut, user } = useAuth()


    return (

        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={
                isAuthenticated ? "/tasks" : "/"
            }>
                <h1 className="text-2xl font-bold ">Task Manager</h1>
            </Link>
            <ul className="flex gap-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li >
                            <Link to='/add-task'
                                className='bg-indigo-500 px-4 py-1 rounded-sm'

                            >Add Task</Link>
                        </li>
                        <li >
                            <Link to='/' onClick={logOut}>LogOut</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login"
                                className='bg-indigo-500 px-4 py-1 rounded-sm'

                            >Login</Link>
                        </li>
                        <li >
                            <Link to='/register'
                                className='bg-indigo-500 px-4 py-1 rounded-sm'

                            >Register</Link>
                        </li>
                    </>

                )
                }

            </ul >
        </nav >

    )
}

export default NavBar