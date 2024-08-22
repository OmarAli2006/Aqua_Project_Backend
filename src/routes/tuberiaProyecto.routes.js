const { Router } = require('express');
const {
    insertarTuberiaProyecto,
    seleccionarTuberiaProyecto
} = require("../controllers/tuberiaProyecto.controller");
const router = Router();

router.post('/insertarTuberiaProyecto/:idProyecto/:idTuberia', insertarTuberiaProyecto)
router.get('/seleccionarTuberiaProyecto/:idProyecto', seleccionarTuberiaProyecto)

module.exports = router;