const { Router } = require('express');
const {
    insertarDeflexion,
    seleccionarDeflexion
} = require("../controllers/deflexion.controller");
const router = Router();

router.post('/insertarDeflexion/:idProyecto', insertarDeflexion);
router.get('/seleccionarDeflexion/:idProyecto', seleccionarDeflexion);

module.exports = router;