const pool = require("../database/databaseConexion");
const uuid = require("uuid");

const insertarFlotabilidad = async (req, res) => {
  const idProyecto = uuid.parse(req.params.idProyecto);
  let { Yw, Ysuelo, De, h, hw, Wp, Wli, Yn, Y_liq, F_up, Wd, Wf, F_down } =
    req.body;
  Wli = parseFloat(Wli);
  Yn = parseFloat(Yn);
  Y_liq = parseFloat(Y_liq);
  F_up = parseFloat(F_up);
  Wd = parseFloat(Wd);
  Wf = parseFloat(Wf);
  F_down = parseFloat(F_down);
  const consulta = await pool
    .query(
      "INSERT INTO flotabilidad (id_proyecto, Yw, Ysuelo, De, h, hw, Wp, Wli, Yn, Yliquido, F_up, Wd, Wf, F_down) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      [
        idProyecto,
        Yw,
        Ysuelo,
        De,
        h,
        hw,
        Wp,
        Wli,
        Yn,
        Y_liq,
        F_up,
        Wd,
        Wf,
        F_down,
      ]
    )
    .then((respuesta) => {
      console.log(`Registro de flotabilidad exitoso`);
      return res.status(201).json({
        message: "Registro de flotabilidad exitoso",
        data: respuesta[0],
      });
    })
    .catch((err) => {
      console.error(`Error al registrar la flotabilidad`, err);
      return res.status(500).json({ message: "Error interno del servidor" });
    });
};
const seleccionarFlotabilidad = async (req, res) => {
  const idProyecto = uuid.parse(req.params.idProyecto);
  const consulta = await pool.query(
    "SELECT * FROM flotabilidad WHERE id_proyecto = $1", 
    [idProyecto]
  );
  if (!consulta.rows[0]) {
    return res.status(404).send("No se encontraron resultados");
    } else {
      return res.status(200).json(consulta.rows);
    }
};
module.exports = {
  insertarFlotabilidad,
  seleccionarFlotabilidad,
};
