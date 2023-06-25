import express from "express";
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'


const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/api',taskRoutes)

export default app;


//Models: Son los esquemas para guandar la informacion en la base de datos.
//Controllers: crea las funciones que se ejecutan cuando llaman a la url .
//routes: Son las rutas que se pueden llamar .
//Middlewares: Son una capa de proteccion para los usuarios.
//schemas: se usa para validar datos cuando llegan al servidor
// libs: se crean funciones que se van a reutilizar varias veces

//Con la libreria morgan se ven las peticiones que van llegando al backEnd