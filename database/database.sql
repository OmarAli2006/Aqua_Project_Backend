CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* crear la tabla material */
CREATE TABLE material(
    material_id uuid DEFAULT uuid_generate_v4(),
    name_material VARCHAR (50) UNIQUE not null,
    resistencia float NOT NULL,
    origen VARCHAR (50) NOT NULL,
    PRIMARY KEY (material_id)
);

/* insersion de datos a la tabla material */
INSERT INTO material(name) VALUES('HDPE_ESTRUCTURADO');

/* crear la tabla clase realacionada a material */
CREATE TABLE clase(
    clase_id uuid DEFAULT uuid_generate_v4(),
    name_clase VARCHAR (10) UNIQUE NOT NULL,
    uso VARCHAR(50),
    material_id uuid,
    PRIMARY KEY (clase_id),
    FOREIGN KEY (material_id) REFERENCES material(material_id)
);

37b12788-4d06-4e0b-a0fa-060e9c4f6724
/* insersion de datos a la tabla material */
INSERT INTO clase(name_clase, uso, material_id) VALUES('SN_1', 'Drenaje Pluvial', '37b12788-4d06-4e0b-a0fa-060e9c4f6724');

/* crear la tabla tuberia relacionada a material y clase */
 CREATE TABLE tuberia(
    tuberia_id uuid DEFAULT uuid_generate_v4(),
    material_id uuid NOT NULL,
    clase_id uuid NOT NULL,
    diametro_nominal int NOT NULL,
    unidad_dn VARCHAR(4) NOT NULL,
    diametro_interno float NOT NULL,
    diamentro_externo float NOT NULL,
    espesor_pared float NOT NULL,
    peso float NOT NULL,
    inercia float NOT NULL,
    area float NOT NULL,
    tipo_pared VARCHAR(50),
    SDR float,
    PRIMARY KEY (tuberia_id),
    FOREIGN KEY (material_id) REFERENCES material(material_id),
    FOREIGN KEY (clase_id) REFERENCES clase(clase_id)
);
/* insersion de datos a la tabla tuberia */
/* 36fde79d-0481-4179-a048-fb7330347f62 material
2908454d-ce4a-410c-96d2-7f4fb290a11d clase sn35
a0086d2c-cfdb-4c0b-87cd-59acb825906d clase sn45*/

INSERT INTO tuberia(material_id, clase_id, diametro_nominal, unidad_dn, diametro_interno, diamentro_externo, espesor_pared, peso, inercia, area, tipo_pared)
VALUES(
        '36fde79d-0481-4179-a048-fb7330347f62',
        '2908454d-ce4a-410c-96d2-7f4fb290a11d',
        '10',
        'in',
        '252',
        '252.49',
        '0.24',
        '0',
        '0',
        '0.008',
        'Solido'
);
INSERT INTO clase(name, material_id) VALUES('SN_2', 'e97205ef-0c0d-4dc9-80e8-7cfa2a60f4ae');

INSERT INTO tuberia(material_id, clase_id, diametro_nominal, unidad_dn, diametro_interno, diamentro_externo, espesor_pared, peso, inercia)
VALUES(
        'e97205ef-0c0d-4dc9-80e8-7cfa2a60f4ae',
        '6e1cb9df-c3cc-4859-9a8a-2c2bc40b598a',
        '600',
        'mm',
        '600',
        '644',
        '2.15',
        '12.44',
        '15950.4'
);
ALTER TABLE tuberia
ALTER COLUMN inercia
TYPE numeric(10,4);

/* listar tubos segun el material*/
SELECT
  material.name_material,
  clase.name_clase,
  tuberia.diametro_nominal
FROM
  material
INNER JOIN
  clase
ON
  material.material_id = clase.material_id
INNER JOIN
  tuberia
ON
  tuberia.clase_id = clase.clase_id
WHERE
  material.name = 'HDPE_ESTRUCTURADO' AND clase.name = 'SN_2';

SELECT
  tuberia.tuberia_id,
  material.name_material,
  material.resistencia,
  material.origen,
  clase.name_clase,
  clase.uso,
  tuberia.diametro_nominal,
  tuberia.unidad_dn,
  tuberia.diametro_interno,
  tuberia.diamentro_externo,
  tuberia.espesor_pared,
  tuberia.peso,
  tuberia.inercia,
  tuberia.area,
  tuberia.tipo_pared,
  tuberia.sdr
FROM
  material
INNER JOIN
  clase
ON
  material.material_id = clase.material_id
INNER JOIN
  tuberia
ON
  tuberia.clase_id = clase.clase_id
WHERE
  tuberia.tuberia_id = $1;


ALTER TABLE tuberia
RENAME COLUMN diamentro_externo TO diametro_externo;
  

/*crear la tabla proyecto*/
CREATE TABLE proyecto (
  id_proyecto uuid DEFAULT uuid_generate_v4(),
  nombre VARCHAR(128),
  solicitante VARCHAR(128),
  lugar VARCHAR(128),
  autor VARCHAR(128),
  departamento VARCHAR(25),
  municipio VARCHAR(50),
  fecha DATE,
  PRIMARY KEY(id_proyecto)
); 

INSERT INTO proyecto
(nombre, solicitante, lugar, autor, departamento, municipio)
VALUES
(
  'MEJ. SISTEMA DE ALCANTARILLADO SANITARIO CASCO VIEJO - ORURO',
  'CONSORCIO HIDROSANIT - EMC',
  'CIUDAD DE ORURO - CASCO VIEJO',
  'ING. VICTOR V. ALI FUERTES',
  'Oruro',
  'Oruro'
);

/*crear la tabla tuberia_proyecto*/
CREATE TABLE tuberia_proyecto (
  id_tuberia_proyecto uuid DEFAULT uuid_generate_v4(),
  id_proyecto uuid,
  id_tuberia uuid,
  tension float,
  funcionalidad VARCHAR(100),
  PRIMARY KEY(id_tuberia_proyecto),
  FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto),
  FOREIGN KEY (id_tuberia) REFERENCES tuberia(tuberia_id)
);

CREATE TABLE zanja_instalacion (
      id_zanja uuid,
      id_proyecto uuid,
      altura_total float,
      altura_nf float,
      ancho_zanja float,
      espesor_lateral float,
      ancho_recomendado float,
      altura_encamado float,
      altura_relleno float,
      relleno_saturado float,
      material_relleno varchar(100),
      clase_suelo varchar(4),
      grado_compactacion varchar (10),
      proctor varchar(150),
      peso_relleno float,
      elasticidad_relleno float,
      norma varchar(15),
      tipo_vehiculo varchar(50),
      pv float,
      PRIMARY KEY (id_zanja),
      FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);

INSERT INTO zanja_instalacion (
      id_zanja,
      id_proyecto,
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
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
) ;

CREATE TABLE deflexion (
  id_deflexion uuid DEFAULT uuid_generate_v4(),
  id_proyecto uuid,
  Ya float,
  pm1 float,
  pm2 float,
  pt1 float,
  pt2 float,
  phi float,
  R float,
  de float,
  angulo varchar(15),
  k float,
  delta_Admisible_Corto float,
  delta_Admisible_Largo float,
  delta_Calculada_Corto float,
  delta_Calculada_Largo float,
  delta_DAdmisible_Corto float,
  delta_DAdmisible_Largo float,
  delta_DCalculada_Corto float,
  delta_DCalculada_Largo float,
  PRIMARY KEY (id_deflexion),
  FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);
INSERT INTO deflexion (
  id_deflexion,
  id_proyecto,
  Ya,
  pm1,
  pm2,
  pt1,
  pt2,
  phi,
  R,
  de,
  angulo,
  k,
  delta_Admisible_Corto,
  delta_Admisible_Largo,
  delta_Calculada_Corto,
  delta_Calculada_Largo,
  deltaD_Admisible_Corto,
  deltaD_Admisible_Largo,
  deltaD_Calculada_Corto,
  deltaD_Calculada_Largo, 
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);

CREATE TABLE flotabilidad (
  id_flotabilidad uuid DEFAULT uuid_generate_v4(),
  id_proyecto uuid NOT NULL,
  Yw float,
  Ysuelo float,
  De float,
  h float,
  hw float,
  Wp float,
  Wli float,
  Yn float,
  Yliquido float,
  F_up float,
  Wd float,
  Wf float,
  F_down float,
  PRIMARY KEY (id_flotabilidad),
  FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);
CREATE TABLE compresion_anular (
  id_compresion_anular uuid DEFAULT uuid_generate_v4(),
  id_proyecto uuid NOT NULL,
  Pm float,
  Pt float,
  Ra float,
  sigma_c float,
  De float,
  A_secc float,
  M float,
  FS float,
  sigma float,
  sigma_adm float,
  A_req float,
  PRIMARY KEY (id_compresion_anular),
  FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);
CREATE TABLE pandeo (
  id_pandeo uuid DEFAULT uuid_generate_v4(),
  id_proyecto uuid NOT NULL,
  N float,
  B float,
  HD float,
  FS float,
  I_req float,
  Kf float,
  qa float,
  PRIMARY KEY (id_pandeo),
  FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);