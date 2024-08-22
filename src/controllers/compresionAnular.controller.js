const pool = require("../database/databaseConexion");
const uuid = require("uuid");

const insertarCompresionAnular = async (req, res) => {
  let { pm, pt, ra, sigma_c, de, a_secc, m, fs, sigma, sigma_adm, a_req } =
    req.body;
  const idProyecto = uuid.parse(req.params.idProyecto);
  ra = parseFloat(ra);
  sigma_c = parseFloat(sigma_c);
  m = parseFloat(m);
  fs = parseFloat(fs);
  sigma = parseFloat(sigma);
  sigma_adm = parseFloat(sigma_adm);
  a_req = parseFloat(a_req);
  try {
    let result = await pool.query(
      `INSERT INTO compresion_anular (pm,pt,ra,sigma_c,de,a_secc,m, 
            fs,sigma,sigma_adm,a_req,id_proyecto) VALUES ($1,$2,$3,$4,$5
                ,$6,$7,$8,$9,$10,$11,$12)`,
      [
        pm,
        pt,
        ra,
        sigma_c,
        de,
        a_secc,
        m,
        fs,
        sigma,
        sigma_adm,
        a_req,
        idProyecto,
      ]
    );
    if (!result[0]) {
      return res.status(404).json({
        message: "No se ha podido guardar la informacion",
      });
    } else {
      return res.status(200).json({
        message: "Se guardo correctamente",
      });
    }
  } catch (error) {
    console.log("Error al guardar en comprensión anulada", error);
    return res.status(500).json({
      message: "Ocurrio un error al guardar",
    });
  }
};
const seleccionarCompresionAnular = async (req, res) => {
  const idProyecto = uuid.parse(req.params.idProyecto);
  const consulta = await pool.query(
    "SELECT * FROM compresion_anular WHERE id_proyecto = $1",
    [idProyecto]
  );
  if (!consulta.rows[0]) {
    return res.status(404).send("No se encontraron resultados");
  } else {
    return res.status(200).json(consulta.rows);
  }
};
module.exports = {
  insertarCompresionAnular,
  seleccionarCompresionAnular,
};
