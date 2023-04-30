import mongoose from 'mongoose'

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        requires: true
    },
    descripcion: {
        type: String,
        trim: true,
        requires: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true,
        requires: true
    },
    tareas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tarea'
        }
    ],
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
        }
    ]
}, {timestamps: true})

const Proyecto = mongoose.model('Proyecto', proyectoSchema)
export default Proyecto