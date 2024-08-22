const { Router } = require('express');
const {
    insertarPandeo,
    seleccionarPandeo
} = require("../controllers/pandeo.controller");
const router = Router();

router.post('/insertarPandeo/:idProyecto', insertarPandeo);
router.get('/seleccionarPandeo/:idProyecto', seleccionarPandeo);

module.exports = router;