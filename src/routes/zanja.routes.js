const { Router } = require('express');
const {
    insertarZanjaInstalacion,
    seleccionarZanja
} = require("../controllers/zanja.controller");

const router = Router();

router.post('/insertarZanjaInstalacion/:idProyecto', insertarZanjaInstalacion);
router.get("/seleccionarZanja/:idProyecto", seleccionarZanja);

module.exports = router;