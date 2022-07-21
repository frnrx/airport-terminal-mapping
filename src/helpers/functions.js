export const getCenterPoint = (coordinates) => {
  let x = [];
  let y = [];

  coordinates.forEach((c) => {
    x.push(c[1]);
    y.push(c[0]);
  });

  x = x.reduce((partialSum, a) => partialSum + a, 0) / x.length;
  y = y.reduce((partialSum, a) => partialSum + a, 0) / y.length;

  return [x, y];
};

export const getTerminals = (features) =>
  features.filter(
    (feature) =>
      feature.properties.aeroway === "terminal" && feature.properties.name
  );

export const inputValidation = (value) => {
  const input = `${[...value.split(",").map((v) => v.trim())]}`;
  const regex =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?),[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  return regex.test(input);
};
