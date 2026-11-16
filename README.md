# UniDoc QA – Pruebas funcionales con Cypress

Trabajo final de Calidad de Software II. Aplicación: **UniDoc** (plataforma Nova). Roles: **Docencia** y **Aspirante**.

## Requisitos
- Node.js 18+ y npm
- Google Chrome o Electron (incluido con Cypress)

## Instalación
```bash
npm install
```

## Credenciales (nunca en Git)
Copiar `cypress.env.example.json` a `cypress.env.json` (está en `.gitignore`) y rellenarlo.
Alternativa, variables de entorno: `CYPRESS_DOCENCIA_USER`, `CYPRESS_DOCENCIA_PASS`, `CYPRESS_ASPIRANTE_USER`, `CYPRESS_ASPIRANTE_PASS`.

## Ejecución
```bash
npx cypress run                 # todo
npx cypress run --spec "cypress/e2e/docencia/**"
npx cypress open                # modo interactivo
```
Videos y capturas quedan en `cypress/videos` y `cypress/screenshots` (evidencia para el informe).

## Estructura
```
cypress/e2e/auth/       login (positivo, negativos, ruta protegida)
cypress/e2e/docencia/   casos del rol Docencia
cypress/e2e/aspirante/  casos del rol Aspirante
cypress/support/        comandos (loginAs), selectores centralizados
```
Los IDs `FUN-xx` de cada `it()` coinciden con la tabla de casos del informe.

## Reglas
Solo contra el servidor y ventana autorizados por el docente. Sin explotar vulnerabilidades ni salir del alcance del rol.
Cada integrante hace commits con su propio usuario de Git.
