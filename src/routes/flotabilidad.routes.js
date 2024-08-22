const { Router } = require('express');
const {
    insertarFlotabilidad,
    seleccionarFlotabilidad
} = require("../controllers/flotabilidad.controller");
const router = Router();

router.post('/insertarFlotabilidad/:idProyecto', insertarFlotabilidad);
router.get('/seleccionarFlotabilidad/:idProyecto', seleccionarFlotabilidad);

module.exports = router;