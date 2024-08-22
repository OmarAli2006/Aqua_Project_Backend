const pool = require("../database/databaseConexion");
const uuid = require("uuid");

const insertarDeflexion = async (req, res) => {
  let {
    Ya,
    pm1,
    pm2,
    phi,
    R,
    pt1,
    pt2,
    de,
    angulo,
    k,
    deltaCalculadaCorto,
    deltaDCalculadaCorto,
    deltaAdmisibleCorto,
    deltaDAdmisibleCorto,
    deltaCalculadaLargo,
    deltaDCalculadaLargo,
    deltaAdmisibleLargo,
    deltaDAdmisibleLargo,
  } = req.body;
  const idProyecto = uuid.parse(req.params.idProyecto);
  Ya = parseFloat(Ya);
  pm1 = parseFloat(pm1);
  pm2 = parseFloat(pm2);
  phi = parseFloat(phi);
  R = parseFloat(R);
  pt1 = parseFloat(pt1);
  pt2 = parseFloat(pt2);
  de = parseFloat(de);
  k = parseFloat(k);
  deltaCalculadaCorto = parseFloat(deltaCalculadaCorto);
  deltaDCalculadaCorto = parseFloat(deltaDCalculadaCorto);
  deltaAdmisibleCorto = parseFloat(deltaAdmisibleCorto);
  deltaDAdmisibleCorto = parseFloat(deltaDAdmisibleCorto);
  deltaCalculadaLargo = parseFloat(deltaCalculadaLargo);
  deltaDCalculadaLargo = parseFloat(deltaDCalculadaLargo);
  deltaAdmisibleLargo = parseFloat(deltaAdmisibleLargo);
  deltaDAdmisibleLargo = parseFloat(deltaDAdmisibleLargo);
  const consulta =
    "INSERT INTO deflexion (id_proyecto, Ya, pm1, pm2, phi, R, pt1, pt2, de, angulo, k, delta_Calculada_Corto, delta_DCalculada_Corto, delta_Admisible_Corto, delta_DAdmisible_Corto, delta_Calculada_Largo, delta_DCalculada_Largo, delta_Admisible_Largo, delta_DAdmisible_Largo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);";
  const guardar = await pool.query(
    consulta,
    [
      idProyecto,
      Ya,
      pm1,
      pm2,
      phi,
      R,
      pt1,
      pt2,
      de,
      angulo,
      k,
      deltaCalculadaCorto,
      deltaDCalculadaCorto,
      deltaAdmisibleCorto,
      deltaDAdmisibleCorto,
      deltaCalculadaLargo,
      deltaDCalculadaLargo,
      deltaAdmisibleLargo,
      deltaDAdmisibleLargo,
    ],
    (err) => {
      if (err) {
        console.log("error en la consulta");
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      } else {
        //console.log("se guardo");
        return res.status(200).json({
          message: "Se ha actualizado el registro",
        });
      }
    }
  );
};
const seleccionarDeflexion = async (req, res) => {
  let idProyecto = uuid.parse(req.params.idProyecto);
  const consulta = await pool.query(
    "SELECT * FROM DEFLEXION WHERE id_proyecto = $1",
    [idProyecto]
  );
  return res.status(200).json(consulta.rows);
};
module.exports = {
  insertarDeflexion,
  seleccionarDeflexion,
};
