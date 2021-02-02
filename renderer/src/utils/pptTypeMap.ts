export const pptTypeMap = (type: "dynamic" | "static") => {
  return type === "dynamic" ? "dynamicConvert" : "staticConvert";
};
