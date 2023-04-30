import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
const app = express()
app.use(express.json())
dotenv.config()
conectarDB()
mongoose.set('strictQuery', false);
// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true)
        } else {
            // No esta permitido
            callback(new Error('Error de Cors'))
        }
    }
}

// Routing
app.use(cors(corsOptions))
app.use('/api/usuarios', cors(corsOptions), usuarioRoutes)
app.use('/api/proyectos', cors(corsOptions), proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
    console.log(`Iniciando App...`)
})

// Socket IO
import { Server } from 'socket.io'
const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

io.on('connection', (socket) => {
    console.log('conectado a socket.io')

    // Definir los eventos de socket.io
    socket.on('Abrir Proyecto', (proyecto) => {
        socket.join(proyecto)
    })
    socket.on('nueva tarea', (tarea) => {
        socket.to(tarea.proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', tarea => {
        socket.to(tarea.proyecto._id).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado', tarea => {
        socket.to(tarea.proyecto._id).emit('nuevo estado', tarea)
    })
})