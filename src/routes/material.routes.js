const { Router } = require('express');

//importar los controladores de las rutas
const { 
    getMaterial,
    nuevoMaterial,
    testing, 
    getNombre
} = require('../controllers/materiales.controller');

const router = Router();
//ruta para mostrar todos los materiales
router.get('/listarMateriales', getMaterial);
//ruta para insertar nuevo material
router.post('/nuevoMaterial', nuevoMaterial);
//ruta para editar datsos de maerial existente
//router.put('/editarMaterial/:material_id', editarMaterial);
//ruta para eliminar material
//router.delete('/eliminarMaterial/:material_id', eliminarMaterial);
//rutas de pruebas
router.post('/testing', testing)

router.post('/getNombre/:material_id', getNombre)

module.exports = router;