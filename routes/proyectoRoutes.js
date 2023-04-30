import express from "express";
const router = express.Router()
import { obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    nuevosProyectos,
    obtenerProyectos,
    buscarColaborador
} from "../controllers/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

// Autenticacion, Registro, y Confirmacion de Usuarios
router.route('/').get(checkAuth, obtenerProyectos).post(checkAuth, nuevosProyectos)
router.route('/:id').get(checkAuth, obtenerProyecto).put(checkAuth, editarProyecto).delete(checkAuth, eliminarProyecto)
router.post('/colaboradores', checkAuth, buscarColaborador)
router.post('/colaboradores/:id', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)

export default router