const sel = require("./selectors");

// UniDoc (Convocatorias) tiene su PROPIO login, distinto al de Nova (/login).
const LOGIN_PATHS = {
  aspirante: "/convocatorias-app/inicio-sesion",
  docencia: "/login", // la cuenta Docencia no entró por el login de UniDoc; se prueba el de Nova
};
const loginPath = (rol) => LOGIN_PATHS[rol] || "/login";

// Login con sesión cacheada. Credenciales desde Cypress.env()
// (cypress.env.json excluido de Git, o variables CYPRESS_*).
Cypress.Commands.add("loginAs", (rol) => {
  const prefix = rol.toUpperCase();
  const user = Cypress.env(`${prefix}_USER`);
  const pass = Cypress.env(`${prefix}_PASS`);
  if (!user || !pass) {
    throw new Error(`Faltan ${prefix}_USER / ${prefix}_PASS (ver README)`);
  }
  cy.session(
    [rol, user],
    () => {
      cy.visit(loginPath(rol));
      cy.get(sel.login.user).first().type(user, { log: false });
      cy.get(sel.login.pass).first().type(pass, { log: false });
      cy.get(sel.login.submit).first().click();
      cy.location("pathname", { timeout: 20000 }).should("not.include", "inicio-sesion").and("not.eq", "/login");
    },
    { cacheAcrossSpecs: true }
  );
});

// Intento de login manual (para casos negativos)
Cypress.Commands.add("tryLogin", (user, pass, rol = "aspirante") => {
  cy.visit(loginPath(rol));
  if (user) cy.get(sel.login.user).first().type(user, { log: false });
  if (pass) cy.get(sel.login.pass).first().type(pass, { log: false });
  cy.get(sel.login.submit).first().click();
});
