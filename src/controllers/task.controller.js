import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong" })

    }
}

export const createTask = async (req, res) => {


    try {

        const { title, description, date } = req.body;

        const nwTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        });

        const savedTask = await nwTask.save();

        res.json(savedTask)
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong" })

    }
}

export const getTask = async (req, res) => {

    try {
        const tareaEncontrada = await Task.findById(req.params.id).populate('user')
        if (!tareaEncontrada) return res.status(404).json({ message: 'Task not Found' })
        res.json(tareaEncontrada)

    } catch (error) {
        return res.status(404).json({ message: "task not found" })
    }

}

export const deleteTask = async (req, res) => {
    try {

        const tareaEncontrada = await Task.findByIdAndDelete(req.params.id)
        if (!tareaEncontrada) return res.status(404).json({ message: 'Task not Found' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "task not found" })

    }
}

export const updateTask = async (req, res) => {

    try {
        const tareaEncontrada = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!tareaEncontrada) return res.status(404).json({ message: 'Task not Found' })
        res.json(tareaEncontrada)

    } catch (error) {
        return res.status(404).json({ message: "task not found" })
    }

}