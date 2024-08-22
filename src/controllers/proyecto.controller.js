const pool = require("../database/databaseConexion");

const { v4: uuidv4 } = require("uuid");

const listProyectos= async (req, res) => {
    const consulta = await pool.query("SELECT * FROM proyecto");
    //console.log(consulta);
    if (!consulta) {
      return res.status(400).send({message: 'Error al realizar la petición'});
      } else
      return res.status(200).send(consulta.rows);
}

const postProyecto = async (req, res) => {
  const {
    nombre,
    solicitante,
    lugar,
    encargado,
    departamento,
    municipio,
    fecha,
    funcionalidad
  } = req.body;
  const id_proyecto = uuidv4();
  const verificacion = "SELECT * FROM proyecto WHERE nombre = $1";
  let consultaVerificarNombre = await pool.query(verificacion, [nombre]);
  if (!consultaVerificarNombre.rows[0]) {
    try {
      const consulta =
        "INSERT INTO proyecto (id_proyecto, nombre, solicitante, lugar, autor, departamento, municipio, fecha, funcionalidad) VALUES ($1, $2, $3, $4, $5, $6, $7, to_date($8, 'YYYY-MM-DD'), $9)";
      await pool.query(
        consulta,
        [
          id_proyecto,
          nombre,
          solicitante,
          lugar,
          encargado,
          departamento,
          municipio,
          fecha,
          funcionalidad,
        ],
        (error, resultado) => {
          if (error) {
            console.log(error)
            console.log(error)
            return res.status(500).json({
              ok: false,
              mensaje: "Error al crear el proyecto",
            });
          } else {
            return res.status(201).json({
              ok: true,
              mensaje: "El proyecto se ha creado correctamente",
              proyectoId: id_proyecto,
            });
          }
        }
      );
    } catch(Error) {
      return res.status(500).json({
        ok: false,
        mensaje: "No se pudo insertar en la base de datos",
      });
    }
  } else {
    return res.status(409).json({
      ok: false,
      mensaje: "Este proyecto ya existe",
    });
  }
};

const getProyectos = async (req, res) => {
  const id_proyecto = req.params.idProyecto;
  let query = await pool.query(
    `SELECT * FROM proyecto WHERE id_proyecto = $1`,
    [
      id_proyecto
    ]
  );
  if (!query.rows[0]){
    return res.status(404).json({
      ok: false,
      mensaje: 'No hay un proyecto con ese ID',
      })
      }else{
        return res.status(200).json(query.rows) }


};
module.exports = {
  postProyecto,
  getProyectos,
  listProyectos,
};
