const pool = require("../database/databaseConexion");

//Listar materiales
const getMaterial = async (req, res) => {
  const response = await pool.query("SELECT * FROM materiales");
  res.status(200).json(response.rows);
};

const getNombre = async (req, res) => {
  const response = await pool.query(
    "SELECT name_material FROM materiales WHERE material_id = $1",
    [material_id]
  );
  res.status(200).json(response.rows);
};

//Insertar nuevo material
const nuevoMaterial = async (req, res) => {
  console.log(req.body);
  const { name_material, origen, elasticidad_corto, elasticidad_largo } =
    req.body;
  newElasticidad_corto = Number(elasticidad_corto);
  newElasticidad_largo = Number(elasticidad_largo);
  try {
    let consulta = await pool.query(
      "SELECT * FROM materiales WHERE name_material = $1",
      [name_material]
    );
    if (consulta.rowCount > 0) {
      res.send({ message: "El material ya existe" });
    } else {
      let queryResult = await pool.query(
        "INSERT INTO materiales (name_material, elasticidad_corto, elasticidad_largo, origen) VALUES ($1,$2,$3,$4)",
        [name_material, newElasticidad_corto, newElasticidad_largo, origen]
      );
      console.log(queryResulnewResistenciat.rowCount);
      res.send({ message: "Nuevo material creado con exito" });
    }
  } catch (error) {
    console.log("Error al insertar el registro", error);
  }
};

//Editar datos de un material existente
const editarMaterial = async (req, res) => {
  console.log(req.body);
};
//Eliminar material
const eliminarMaterial = async (req, res) => {
  res.console("eliminar material");
};

const testing = async (req, res) => {
  console.log(req.body);
  diametro_interno = parseFloat(req.body.diametro_interno);
  console.log(diametro_interno)
};

module.exports = {
  getMaterial,
  nuevoMaterial,
  editarMaterial,
  eliminarMaterial,
  testing,
  getNombre,
};
