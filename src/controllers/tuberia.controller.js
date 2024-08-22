const pool = require("../database/databaseConexion");
const uuid = require("uuid");

//consulta para mostrar todos los tubos disponibles
const listarTubos = async (req, res) => {
  const response = await pool.query(
    "SELECT tuberia.tuberia_id, materiales.name_material, clases.name_clase, tuberia.diametro_nominal FROM materiales INNER JOIN clases ON materiales.material_id = clases.material_id INNER JOIN tuberia ON tuberia.clase_id = clases.clase_id"
  );
  res.status(200).json(response.rows);
};
//consulta para mostrar todos los tubos disponibles de un material en especifico
const listarTubosMaterial = async (req, res) => {
  console.log(req.params.material_id)
  const response = await pool.query(
    "SELECT tuberia.tuberia_id, material.name_material, clase.name_clase, tuberia.diametro_nominal FROM material INNER JOIN clase ON material.material_id = clase.material_id INNER JOIN tuberia ON tuberia.clase_id = clase.clase_id WHERE tuberia.material_id = $1",
    [uuid.parse(req.params.material_id)]
  );
  res.status(200).json(response.rows);
  console.log(req.params.material_id);
};

//consulta para mostrar todos los tubos disponibles de un material y clase en especificos
const listarTubosClase = async (req, res) => {
 console.log(req.parse.clase_id)
  const response = await pool.query(
    "SELECT tuberia.tuberia_id, materiales.name_material, clases.name_clase, tuberia.diametro_nominal FROM materiales INNER JOIN clases ON materiales.material_id = clases.material_id INNER JOIN tuberia ON tuberia.clase_id = clases.clase_id WHERE tuberia.clase_id = $1",
    [uuid.parse(req.params.clase_id)]
  );
  res.status(200).json(response.rows);
};

//consulta para mostrar una tuberia en especifico
const seleccionarTuberia = async (req, res) => {
  const response = await pool.query(
    "SELECT tuberia.tuberia_id, materiales.name_material, materiales.elasticidad_corto, materiales.elasticidad_largo, materiales.origen, clases.name_clase, clases.uso, tuberia.diametro_nominal, tuberia.unidad_dn, tuberia.diametro_interno, tuberia.diametro_externo, tuberia.espesor_pared, tuberia.peso, tuberia.inercia, tuberia.area, tuberia.tipo_pared, tuberia.sdr FROM materiales INNER JOIN clases ON materiales.material_id = clases.material_id INNER JOIN tuberia ON tuberia.clase_id = clases.clase_id WHERE tuberia.tuberia_id = $1",
    [uuid.parse(req.params.tuberia_id)]
  );
  res.status(200).json(response.rows);
};
const nuevaTuberia = async (req, res) => {
  let {
    material_id,
    clase_id,
    tipo_pared,
    diametro_nominal,
    unidad_dn,
    diametro_interno,
    diametro_externo,
    espesor_pared,
    peso,
    inercia,
    area,
    sdr,
  } = req.body;
  console.log(req.body);
  if (
    material_id === "" ||
    clase_id === "" ||
    tipo_pared === "" ||
    diametro_nominal === "" ||
    unidad_dn === "" ||
    diametro_interno === "" ||
    diametro_externo === "" ||
    espesor_pared === "" ||
    peso === "" ||
    inercia === "" ||
    area === "" ||
    sdr === "" 
    ) {
      return res.send("Faltan campos por llenar");
    }
  material_id = uuid.parse(material_id);
  clase_id = uuid.parse(clase_id);
  diametro_nominal = parseFloat(diametro_nominal);
  diametro_interno = parseFloat(diametro_interno);
  diametro_externo = parseFloat(diametro_externo);
  espesor_pared = parseFloat(espesor_pared);
  peso = parseFloat(peso);
  inercia = parseFloat(inercia);
  area = parseFloat(area);
  sdr = parseFloat(sdr);
  try {
    const consulta = await pool.query(
      "SELECT * FROM tuberia WHERE material_id = $1 AND clase_id = $2 AND diametro_nominal = $3",
      [material_id, clase_id, diametro_nominal]
    );
    if (consulta.rowCount > 0) {
      return res
        .status(409)
        .send({
          message: "Ya existe la tubería para el material y clase seleccionado",
        });
    } else {
      const response = await pool.query(
        "INSERT INTO tuberia (material_id, clase_id, tipo_pared, diametro_nominal, unidad_dn, diametro_interno, diametro_externo, espesor_pared, peso, inercia, area, sdr) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        [
          material_id,
          clase_id,
          tipo_pared,
          diametro_nominal,
          unidad_dn,
          diametro_interno,
          diametro_externo,
          espesor_pared,
          peso,
          inercia,
          area,
          sdr,
        ]
      );
      res.status(200).send({ message: "Tuberia agregada exitosamente" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send({ error: "Error al crear la tubería" });
  }
};
module.exports = {
  listarTubos,
  listarTubosMaterial,
  listarTubosClase,
  seleccionarTuberia,
  nuevaTuberia,
};
