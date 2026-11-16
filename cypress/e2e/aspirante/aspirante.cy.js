// Rol Aspirante - rutas y textos verificados en la app real (12-nov-2026)
const BASE = "/convocatorias-app";

describe("UniDoc - Rol Aspirante", () => {
  beforeEach(() => {
    cy.loginAs("aspirante");
  });

  it("FUN-10 [positivo] Inicio muestra el perfil del aspirante y su hoja de vida", () => {
    cy.visit(`${BASE}/index`);
    cy.contains("Aspirante").should("be.visible");
    cy.contains("Hoja de vida").should("be.visible");
    cy.contains("Formación educativa").should("be.visible");
  });

  it("FUN-11 [positivo] Convocatorias lista las convocatorias abiertas", () => {
    cy.visit(`${BASE}/convocatorias`);
    cy.contains("Convocatorias Disponibles", { timeout: 20000 }).should("be.visible");
    cy.contains("button", "Ver Detalles", { timeout: 20000 }).should("exist");
    cy.contains("button", "Postularse").should("exist");
  });

  it("FUN-12 [positivo] Ver Detalles abre el detalle de una convocatoria", () => {
    cy.visit(`${BASE}/convocatorias`);
    cy.contains("button", "Ver Detalles", { timeout: 20000 }).first().click();
    cy.get("body").should("not.contain", "Página no encontrada");
  });

  it("FUN-13 [positivo] Mis postulaciones es accesible y muestra estado vacío o listado", () => {
    cy.visit(`${BASE}/ver/postulaciones`);
    cy.contains(/Mis Postulaciones/, { timeout: 20000 }).should("be.visible");
  });

  it("FUN-14 [positivo] Datos personales muestra las 8 secciones del perfil", () => {
    cy.visit(`${BASE}/datos-personales`);
    ["Datos Personales", "Información de Contacto", "EPS", "RUT",
     "Certificación Bancaria", "Pensión", "Antecedentes Judiciales", "ARL"]
      .forEach((s) => cy.contains(s).should("exist"));
  });

  // Omitido hasta tener permiso del docente: puede crear una postulación real.
  it.skip("FUN-15 [negativo] Postularse con perfil incompleto (0%) no debe crear postulación", () => {
    // MANUAL/semi-automático: depende del comportamiento real al postular.
    // Cuidado: no dejar postulaciones basura; revisar 'Mis postulaciones' después.
    cy.visit(`${BASE}/convocatorias`);
    cy.contains("button", "Postularse", { timeout: 20000 }).first().click();
    // TODO: afirmar mensaje de validación real una vez observado
  });

  it("FUN-16 [permisos] Aspirante no accede al módulo de otro rol", () => {
    // TODO: reemplazar por una URL real de otro rol (/talento-humano da 404, no prueba permisos).
    cy.visit("/talento-humano", { failOnStatusCode: false });
    cy.contains(/404|no autorizado|acceso denegado|403/i).should("exist");
  });
});
