const sel = require("../../support/selectors");

// Login real de Nova: /login (correo + contraseña + "Iniciar Sesión")
describe("Autenticación (Nova / UniDoc)", () => {
  it("FUN-01 [positivo] Aspirante inicia sesión con credenciales válidas", () => {
    cy.loginAs("aspirante");
    cy.visit("/convocatorias-app/index");
    cy.contains("Hoja de vida", { timeout: 20000 }).should("be.visible");
  });

  it("FUN-02 [negativo] Rechaza contraseña incorrecta", () => {
    cy.tryLogin("qa.prueba.invalida@example.com", "ClaveIncorrecta#123");
    cy.contains("Credenciales incorrectas").should("be.visible");
    cy.location("pathname").should("include", "/convocatorias-app/inicio-sesion");
  });

  it("FUN-03 [negativo] Rechaza campos vacíos", () => {
    cy.tryLogin("", "");
    cy.contains("Correo no valido").should("be.visible");
    cy.contains("Contraseña muy corta").should("be.visible");
    cy.location("pathname").should("include", "/convocatorias-app/inicio-sesion");
  });

  it("FUN-04 [permisos] Ruta protegida sin sesión no muestra contenido de usuario", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/convocatorias-app/index", { failOnStatusCode: false });
    cy.contains("Hoja de vida").should("not.exist");
  });
});
