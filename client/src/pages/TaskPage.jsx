
import { useTasks } from '../context/TaskContext'
import { useEffect } from 'react'
import TaskCard from '../components/TaskCard'


function TaskPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <div className='grid sm:grid-col-2  md:grid-cols-3 gap-2'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>

  )
}

export default TaskPage