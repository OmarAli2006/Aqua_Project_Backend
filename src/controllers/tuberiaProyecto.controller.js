const pool = require("../database/databaseConexion");
const uuid = require("uuid");

const seleccionarTuberiaProyecto = async (req, res) => {
  const idProyecto = uuid.parse(req.params.idProyecto);
  const buscarProyecto = await pool.query(
    "SELECT * FROM proyecto WHERE id_proyecto = $1",
    [
      idProyecto
    ]
  )
  const tuberia = buscarProyecto.rows[0].id_tuberia
  const buscarTuberia = await pool.query(
    "SELECT tuberia.tuberia_id, materiales.name_material, materiales.elasticidad_corto, materiales.elasticidad_largo, materiales.origen, clases.name_clase, clases.uso, tuberia.diametro_nominal, tuberia.unidad_dn, tuberia.diametro_interno, tuberia.diametro_externo, tuberia.espesor_pared, tuberia.peso, tuberia.inercia, tuberia.area, tuberia.tipo_pared, tuberia.sdr FROM materiales INNER JOIN clases ON materiales.material_id = clases.material_id INNER JOIN tuberia ON tuberia.clase_id = clases.clase_id WHERE tuberia.tuberia_id = $1",
    [
      tuberia
    ]
  )
  res.status(200).json(buscarTuberia.rows);
}

const insertarTuberiaProyecto = async (req, res) => {
  const idProyecto = uuid.parse(req.params.idProyecto);
  const idTuberia = uuid.parse(req.params.idTuberia);
  try {
    const consulta =
      "UPDATE proyecto SET id_tuberia = $1 WHERE id_proyecto = $2";
    await pool.query(
      consulta,
      [idTuberia, idProyecto],
      (error, results) => {
        if (error) {
          console.log(error)
          return res.status(403).json({
            mensaje: "Error al ingresar la tuberia",
            error,
          });
        } else {
          console.log("tuberia guardada");
          return res.status(201).json({
            mensaje: "La Tuberia ha sido agregado con exito",
            data: results,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error en el servidor",
    });
  }
};

module.exports = {
  insertarTuberiaProyecto,
  seleccionarTuberiaProyecto,
};
