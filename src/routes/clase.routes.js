const { Router } = require('express');

const {
    getClase,
    insertarClase
} = require('../controllers/clase.controller.js')
const router = Router();

//listar las clases con material_id como parametro
router.get('/listarClases/:material_id', getClase);
//insertar una nueva clase con el material_id como parametro
router.post('/nuevaClase/:material_id', insertarClase);
module.exports = router; 