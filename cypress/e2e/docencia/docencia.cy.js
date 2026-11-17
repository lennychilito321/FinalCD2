const sel = require("../../support/selectors");

// Opcional: ninguna cuenta del grupo tiene el rol Docencia. Activar con DOCENCIA_HABILITADO=true en cypress.env.json.
(Cypress.env("DOCENCIA_HABILITADO") ? describe : describe.skip)("UniDoc - Rol Docencia", () => {
  beforeEach(() => {
    cy.loginAs("docencia");
    cy.visit("/");
  });

  it("FUN-05 [positivo] Muestra el menú propio del rol Docencia", () => {
    cy.get(sel.nav.menu).should("be.visible");
    // TODO: afirmar las opciones de menú reales del rol
  });

  it("FUN-06 [positivo] Consulta de información de la sección principal del rol", () => {
    // TODO: navegar a la funcionalidad principal y verificar contenido
    cy.get(sel.nav.menu).should("exist");
  });

  it("FUN-07 [negativo] Formulario del rol con datos inválidos muestra validación", () => {
    // TODO: abrir formulario real, enviar con datos inválidos y verificar mensaje
    cy.log("Pendiente de completar tras explorar la aplicación");
  });

  it("FUN-08 [permisos] Docencia NO accede a módulos de otros roles (p. ej. Talento humano)", () => {
    // TODO: reemplazar por una URL real de otro rol
    cy.visit("/talento-humano", { failOnStatusCode: false });
    cy.contains(/no autorizado|acceso denegado|403|sin permisos/i).should("exist");
  });

  it("FUN-09 [positivo] Cierra sesión correctamente", () => {
    cy.get(sel.nav.logout).first().click({ force: true });
    cy.get(sel.login.pass).should("exist");
  });
});
