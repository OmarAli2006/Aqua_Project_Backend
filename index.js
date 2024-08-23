const express = require('express');
const cors = require('cors');

const materialRoutes = require('./routes/material.routes.js');
const claseRoutes = require('./routes/clase.routes.js');
const tubosRoutes = require('./routes/tuberia.routes.js');
const proyectosRoutes = require('./routes/proyectos.routes.js');
const tuberiaProyectoRoutes = require('./routes/tuberiaProyecto.routes.js');
const zanjaInstalacionRoutes = require('./routes/zanja.routes.js');
const deflexionRoutes = require('./routes/deflexion.routes.js');
const flotabilidadRoutes = require('./routes/flotabilidad.routes.js');
const compresionAnularRoutes = require('./routes/compresionAnular.routes.js');
const pandeoRoutes = require('./routes/pandeo.routes.js');
//Importar las rutas de materiales

//Importar las rutas de clases

//importar las rutas de tuberias

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())


//routes
app.use('/api', materialRoutes);
app.use('/api', claseRoutes);
app.use('/api', tubosRoutes);
app.use('/api', proyectosRoutes);
app.use('/api', tuberiaProyectoRoutes);
app.use('/api', zanjaInstalacionRoutes);
app.use('/api', deflexionRoutes);
app.use('/api', flotabilidadRoutes);
app.use('/api', compresionAnularRoutes);
app.use('/api', pandeoRoutes);

app.use(express.static(__dirname + '/public/'));

app.listen('4000', function() {
    console.log('servidor web en puerto 4000');
});