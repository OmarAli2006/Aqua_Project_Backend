const { Router } = require('express');

const {
    postProyecto,
    getProyectos,
    listProyectos
} = require('../controllers/proyecto.controller');
const router = Router();

router.post('/nuevoProyecto', postProyecto);
router.get("/seleccionarProyecto/:idProyecto", getProyectos);
router.get("/listarProyectos", listProyectos)


module.exports = router;
