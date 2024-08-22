const pool = require("../database/databaseConexion");
const { v4: uuidv4 } = require("uuid");
const uuid = require("uuid");

const insertarZanjaInstalacion = async (req, res) => {
  let {
    altura_total,
    altura_nf,
    ancho_zanja,
    espesor_lateral,
    ancho_recomendado,
    altura_encamado,
    altura_relleno,
    relleno_saturado,
    material_relleno,
    clase_suelo,
    grado_compactacion,
    proctor,
    peso_relleno,
    elasticidad_relleno,
    norma,
    tipo_vehiculo,
    pv,
  } = req.body;
  const idZanja = uuidv4();
  const idProyecto = uuid.parse(req.params.idProyecto);
  altura_total = parseFloat(altura_total);
  altura_nf = parseFloat(altura_nf);
  ancho_zanja = parseFloat(ancho_zanja);
  espesor_lateral = parseFloat(espesor_lateral);
  ancho_recomendado = parseFloat(ancho_recomendado);
  altura_encamado = parseFloat(altura_encamado);
  altura_relleno = parseFloat(altura_relleno);
  relleno_saturado = parseFloat(relleno_saturado);
  peso_relleno = parseFloat(peso_relleno);
  try {
    const verificacion = await pool.query(
      "SELECT * FROM zanja_instalacion WHERE id_proyecto = $1",
      [idProyecto]
    );
    if (verificacion.rowCount > 0) {
      return res.status(202).send({
        message: "Ya se ha realizado una instalación de zanja en este proyecto",
      });
    } else {
      const consulta =
        "INSERT INTO zanja_instalacion (id_zanja, id_proyecto, altura_total, altura_nf, ancho_zanja, espesor_lateral, ancho_recomendado, altura_encamado, altura_relleno, relleno_saturado, material_relleno, clase_suelo, grado_compactacion, proctor, peso_relleno, elasticidad_relleno, norma, tipo_vehiculo, pv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) ;";

      await pool.query(
        consulta,
        [
          idZanja,
          idProyecto,
          altura_total,
          altura_nf,
          ancho_zanja,
          espesor_lateral,
          ancho_recomendado,
          altura_encamado,
          altura_relleno,
          relleno_saturado,
          material_relleno,
          clase_suelo,
          grado_compactacion,
          proctor,
          peso_relleno,
          elasticidad_relleno,
          norma,
          tipo_vehiculo,
          pv,
        ],
        (err, result) => {
          if (err) {
            console.log("Error al insertar la zanja", err);
            return res.status(500).send({ message: "Error al guardar" });
          } else {
            return res.status(200).send({ message: "Guardado con exito" });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
const seleccionarZanja = async (req, res) => {
  const idProyecto = uuid.parse(req.params.idProyecto);
  try {
    let verificacion;
    verificacion = await pool.query(
      "SELECT * FROM zanja_instalacion WHERE Id_proyecto=$1",
      [idProyecto]
    );
    if(verificacion.rowCount === 0) {
        return res.status(403).json({message:'No se encontraron registros'})
    } else {
        return res.status(200).json(verificacion.rows);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  insertarZanjaInstalacion,
  seleccionarZanja,
};
