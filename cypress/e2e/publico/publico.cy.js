// Zona pública de UniDoc, visible para un aspirante antes de iniciar sesión.
// No requiere credenciales ni modifica datos (solo lectura y validaciones de formulario).
const BASE = "/convocatorias-app";

describe("UniDoc - Zona pública del aspirante", () => {
  it("FUN-17 [positivo] Muestra el listado de convocatorias sin iniciar sesión", () => {
    cy.visit(`${BASE}/convocatorias-publicas`);
    cy.contains(/convocatorias/i).should("be.visible");
    cy.contains("button", "Ver Detalles").should("exist");
  });

  it("FUN-18 [negativo] Registro: no avanza del paso 1 sin nombre y apellido", () => {
    cy.visit(`${BASE}/registro`);
    cy.contains("Paso 1 de 5").should("be.visible");
    cy.contains("button", "Siguiente").click();
    cy.contains("Paso 1 de 5").should("be.visible");
  });

  it("FUN-19 [negativo] Una convocatoria cerrada no permite postularse", () => {
    cy.visit(`${BASE}/convocatorias-publicas`);
    cy.get("body").then(($b) => {
      if ($b.text().includes("Convocatoria cerrada")) {
        cy.contains("button", "Convocatoria cerrada").should("be.disabled");
      } else {
        cy.log("No hay convocatorias cerradas ahora: caso BLOQUEADO por datos");
      }
    });
  });
});
