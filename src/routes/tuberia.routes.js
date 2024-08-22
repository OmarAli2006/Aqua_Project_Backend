const { Router } = require('express');

const {
    listarTubos,
    listarTubosMaterial,
    listarTubosClase,
    seleccionarTuberia,
    nuevaTuberia
} = require('../controllers/tuberia.controller.js');

const router = Router();

router.get('/listarTubos', listarTubos);
router.get('/listarTubosMaterial/:material_id', listarTubosMaterial);
router.get('/listarTubosClase/:clase_id', listarTubosClase);
router.get('/seleccionarTuberia/:tuberia_id', seleccionarTuberia);
//insertar nueva tuberia
router.post('/nuevaTuberia', nuevaTuberia)
module.exports = router;