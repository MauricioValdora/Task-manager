import { createContext, useContext, useState } from 'react'
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks'

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTasks must be used within a task provider')
    }
    return context
}


export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            let response = await getTasksRequest();
            setTasks(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    const createTasks = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res)

    };

    const deleteTask = async (id) => {

        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))

        } catch (error) {

        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data

        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {

        try {
            await updateTaskRequest(id, task)
        } catch (error) {
            console.error(error)
        }

    }


    return (
        <TaskContext.Provider value={{
            tasks,
            createTasks,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}