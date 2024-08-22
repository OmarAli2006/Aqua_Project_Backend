const pool = require("../database/databaseConexion");
const uuid = require("uuid");

const insertarPandeo = async (req, res) => {
  let { n, b, hd, fs, i_req, kf, qa } = req.body;
  const idProyecto = uuid.parse(req.params.idProyecto);
  n = parseFloat(n);
  b = parseFloat(b);
  hd = parseFloat(hd);
  i_req = parseFloat(i_req);
  qa = parseFloat(qa);
  const consulta = await pool.query(
    "INSERT INTO pandeo (id_proyecto, n, b, hd, fs, i_req, kf, qa) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
    [idProyecto, n, b, hd, fs, i_req, kf, qa]
  );
  if (!consulta) {
    return res.status(409).json({
      ok: false,
      err: {
        message: "Error al crear el pandeo",
      },
    });
  } else {
    return res.status(200).json({
      ok: true,
      msg: "pandeo creado correctamente",
      data: consulta.rows[0],
    });
  }
};
const seleccionarPandeo = async (req, res) => {
  const id_proyecto = uuid.parse(req.params.idProyecto);
  const consulta = await pool.query(
    "SELECT * FROM pandeo WHERE id_proyecto=$1",
    [id_proyecto]
  );
  if (!consulta) {
    return res.status(404).json({
      ok: false,
      err: {
        message: "No se encontraron resultados",
      },
    });
  } else {
    return res.status(200).json(consulta.rows);
  }
};
module.exports = {
  insertarPandeo,
  seleccionarPandeo,
};
