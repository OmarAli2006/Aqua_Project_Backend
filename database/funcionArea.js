// calcular el area de un tubo

areaTubo = (di, de, ep) => {
  return (
    ((pi / 4) * (Math.pow(di + ep, 2) - Math.pow(di, 2))) / (di * 10) +
    (pi / 4) * ((Math.pow(de, 2) - Math.pow(de - ep, 2)) / (de * 10))
  );
};

//
