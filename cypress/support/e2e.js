import "./commands";

// Evita que errores JS propios de la aplicación aborten la prueba;
// se registran para el reporte de defectos.
Cypress.on("uncaught:exception", (err) => {
  // eslint-disable-next-line no-console
  console.warn("Excepción de la app (registrar como posible defecto):", err.message);
  return false;
});
