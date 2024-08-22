const pool = require("../database/databaseConexion");

const uuid = require("uuid");

const getClase = async (req, res) => {
  const material_id = uuid.parse(req.params.material_id);
  if (material_id == []) {
    return res
      .status(401)
      .send({ message: "No se ha recibido el id del material" });
  }
  const response = await pool.query(
    "SELECT * FROM clases WHERE material_id = $1",
    [material_id]
  );
  res.status(200).json(response.rows);
};

const insertarClase = async (req, res) => {
  const material_id = uuid.parse(req.params.material_id);
  console.log(material_id);
  const { name_clase, uso } = req.body;

  try {
    const consulta = await pool.query(
      "SELECT * FROM clases WHERE name_clase = $1 AND material_id = $2",
      [name_clase, material_id]
    );
    if (consulta.rowCount > 0) {
      return res
        .status(500)
        .send({ message: "La clase ya existe para este material." });
    } else {
      const response = await pool.query(
        "INSERT INTO clases (name_clase, uso, material_id) VALUES ($1, $2, $3)",
        [name_clase, uso, material_id]
      );
      res.status(200).send({ message: "Clase agregada exitosamente" });
    }
  } catch (error) {
    return res.status(403).send({ error: 'Error al crear la clase' });
  }
};

module.exports = {
  getClase,
  insertarClase,
};
