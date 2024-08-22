const { Router } = require('express');
const {
    insertarCompresionAnular,
    seleccionarCompresionAnular
} = require("../controllers/compresionAnular.controller");
const router = Router();

router.post('/insertarCompresionAnular/:idProyecto', insertarCompresionAnular);
router.get('/seleccionarCompresionAnular/:idProyecto', seleccionarCompresionAnular);

module.exports = router;