# Bitácora del proceso – Auditoría de calidad de UniDoc

Calidad de Software II · Trabajo final · entrega 17 de noviembre de 2026.

## Cronología
| Fecha | Qué se hizo | Resultado |
|---|---|---|
| 11 nov | Lectura del enunciado; roles asignados: Docencia y Aspirante (UniDoc) | Plan de trabajo y plantillas de los 3 informes |
| 11 nov | Proyecto Cypress base (config, comandos, selectores, README, `.gitignore`) y `npm install` | Cypress 13.17.0 verificado |
| 12 nov | Exploración del rol Aspirante en el navegador integrado (solo lectura) | Rutas y textos reales de UniDoc |
| 12 nov | Primer intento de login con Cypress | Falló: la cuenta era de Google, sin contraseña |
| 12–16 nov | Se descubre que Nova (`/login`) y UniDoc (`/convocatorias-app/inicio-sesion`) tienen logins separados | `commands.js` apunta al login de UniDoc |
| 16 nov | Contraseña de UniDoc creada; ejecución de auth + aspirante | 10 de 11 aprobados, FUN-15 omitido |
| 16 nov | Captura de mensajes reales del login (clave falsa y campos vacíos) | FUN-02 y FUN-03 con aserciones reales |
| 16 nov | Intento con la cuenta de Docencia (Luis) | No entró por formulario (cuenta de Google); al entrar por Google a UniDoc aparece como Aspirante |
| 16 nov | Informe de estado para los compañeros (página) | Publicado, privado |
| 16 nov | Borrador del informe de funcionales (Aspirante), planes de rendimiento y OpenVAS, carpeta `entrega/` | Sin credenciales en los archivos |

## Resultados de pruebas ejecutadas (Cypress, 16 nov)
- `auth/login.cy.js`: 4 de 4 aprobados.
- `aspirante/aspirante.cy.js`: 6 aprobados, 1 omitido (FUN-15).
- `docencia/docencia.cy.js`: 0 de 5; el login falló antes de empezar (cuenta sin contraseña de formulario y sin rol Docencia).

## Decisiones y por qué
- **FUN-15 omitido:** puede crear una postulación real en un sistema compartido; requiere permiso del docente.
- **Sin pruebas de carga ni escaneo:** el enunciado exige ventana, límites y autorización del docente. Probar sin eso es falta ética grave y puede ser delito (Ley 1273 de 2009).
- **Credenciales fuera de Git:** solo en `cypress.env.json`, excluido por `.gitignore`.
- **FUN-16 débil:** acepta un 404; no es evidencia de permisos hasta tener una URL real de otro rol.

## Hallazgos del sistema
- Nova reúne Planes de aula, UniDoc y Tickets; cada una con su propia sesión.
- Login de UniDoc: mensajes "Credenciales incorrectas", "Correo no valido", "Contraseña muy corta". Valida con su propio código, no con el del navegador.
- Un aspirante sin sesión ve las convocatorias públicas; la API pública es `/convocatorias-app/api/publico/convocatorias`.
- El rol de Nova (Estudiante/Docente) no coincide con el rol de UniDoc (Aspirante).

## Pendiente (depende del docente)
1. Confirmar la asignación real de aplicación y roles.
2. Asignar rol Docencia a una cuenta de prueba con correo y contraseña.
3. Ventana de ejecución, límites de carga y autorización del objetivo.
4. Permiso para FUN-15 y una URL real de otro rol para FUN-16.
5. Entorno para OpenVAS (Docker o Linux) y herramienta de rendimiento (Vegeta o JMeter).

## Seguridad
Se compartió en el chat de trabajo la contraseña de un compañero: debe cambiarla al terminar. Las contraseñas nunca se escriben en los informes ni en el repositorio.
