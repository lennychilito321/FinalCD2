// Selectores centralizados. TODO: ajustar con el DOM real de Nova/UniDoc
// (inspeccionar con F12 y preferir data-cy / id / name sobre clases CSS).
module.exports = {
  login: {
    user: 'input[type="email"], input[name="email"], input[name="username"]',
    pass: 'input[type="password"]',
    submit: 'button[type="submit"]',
    error: '.alert-danger, .error, [role="alert"]',
  },
  nav: {
    menu: "nav, .sidebar, .navbar",
    logout: 'a:contains("Salir"), button:contains("Salir")', // "Salir" confirmado en /dashboard
  },
  // TODO: completar al explorar la aplicación con cada rol
  docencia: { section: "TODO", form: "TODO" },
  aspirante: { convocatorias: "TODO", postular: "TODO" },
};
