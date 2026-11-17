# Informe 1 – Pruebas funcionales · UniDoc (Nova) · Rol Aspirante

## 1. Portada y control de versiones
Portada común, integrantes y escala de severidad: ver sección "Portada" de este documento. Grupo sin número asignado.

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 0.1 | 2026-11-16 | Grupo | Primera suite (login, aspirante) y borrador |
| 1.0 | 2026-11-17 | Lenny Chilito | Zona pública (FUN-17 a FUN-19), corrida completa del 17-nov, evidencia y consolidación del repositorio |

## 2. Resumen ejecutivo
Se probó el rol **Aspirante** de UniDoc, el módulo de convocatorias de la plataforma Nova. Se diseñaron **14 casos** (inicio de sesión, zona pública, perfil, convocatorias, postulaciones, datos personales y permisos). Se ejecutaron **13 casos automatizados con Cypress y los 13 fueron aprobados**; 0 fallaron. Un caso (FUN-15, postular con el perfil incompleto) no se ejecutó a propósito, porque podría crear una postulación real en un sistema compartido.

No se encontraron defectos funcionales en los flujos probados. El mayor riesgo identificado no es un defecto sino una **limitación de la prueba**: el control de permisos entre roles (FUN-16) solo se verificó contra una ruta inexistente que devuelve 404, por lo que no demuestra que un aspirante no pueda entrar a funciones de otros roles.

**Recomendación general:** el rol Aspirante está **apto con reservas** para su uso. Antes de darlo por aprobado conviene probar la postulación real con permiso del docente y repetir el control de permisos con una URL real de otro rol.

## 3. Objetivo y alcance
**Objetivo:** verificar que las funciones a las que accede el Aspirante se comportan según lo esperado, que los datos inválidos se rechazan y que el acceso está protegido.

**Dentro del alcance:** registro (primer paso), inicio de sesión de UniDoc, zona pública de convocatorias, Inicio del aspirante (hoja de vida), listado y detalle de convocatorias, Mis postulaciones, Datos personales (8 secciones) y control de acceso sin sesión.

**Fuera del alcance (con justificación):**
- Rol Docencia: ninguna cuenta del grupo tiene ese rol asignado. La suite existe pero está desactivada por defecto.
- Postulación real (FUN-15), carga de documentos y edición de la hoja de vida: modifican datos reales en un sistema compartido y requieren permiso del docente.
- Inicio de sesión con Google: es un servicio de terceros que bloquea la automatización.
- Recepción con IA, Normativas y notificaciones: no pertenecen a los flujos mínimos del rol.

## 4. Descripción de la aplicación y del rol
UniDoc es el módulo de convocatorias, avales y contratación docente de Nova (Núcleo de Operaciones Virtuales Académicas, Uniautónoma del Cauca). Vive en `/convocatorias-app` y tiene su propio inicio de sesión, independiente del de Nova.

El **Aspirante** consulta convocatorias abiertas (públicas, sin sesión), se registra en cinco pasos (nombre, documento, datos, ubicación, cuenta), mantiene su hoja de vida (formación, experiencia, idiomas, aptitudes), completa ocho secciones de datos personales (datos personales, contacto, EPS, RUT, certificación bancaria, pensión, antecedentes judiciales, ARL), se postula y consulta sus postulaciones.

**Datos de prueba:** cuenta propia de un integrante del grupo, con perfil incompleto. Las credenciales se leen de `cypress.env.json` (excluido de Git) y no aparecen en este documento.

## 5. Entorno de pruebas
| Elemento | Valor |
|---|---|
| URL | https://nova.uniautonoma.edu.co/convocatorias-app |
| Navegador | Electron 118 (incluido en Cypress, modo headless) |
| Sistema operativo | Windows 11 Pro |
| Node.js | v24.20.0 |
| Cypress | 13.17.0 |
| Fechas de ejecución | 2026-11-16 y 2026-11-17 |

## 6. Estrategia de pruebas
- **Automatizado:** casos de lectura, validaciones de formulario y acceso sin sesión. Son estables, repetibles y no alteran datos. La sesión se reutiliza con `cy.session`.
- **Manual / omitido:** FUN-15 (postulación con perfil incompleto), por riesgo de crear datos reales; carga de documentos.
- **Criterio de entrada:** cuenta con correo y contraseña en UniDoc, servidor accesible y autorización del docente para probar Nova.
- **Criterio de salida:** todos los casos de prioridad Alta ejecutados y sin defectos críticos abiertos.
- **Prioridad:** Alta = acceso, seguridad y función principal; Media = validaciones y consulta secundaria; Baja = contenido informativo.

## 7. Matriz de trazabilidad
| Funcionalidad del rol | Casos |
|---|---|
| Inicio de sesión | FUN-01, FUN-02, FUN-03 |
| Control de acceso | FUN-04, FUN-16 |
| Zona pública de convocatorias | FUN-17, FUN-19 |
| Registro de aspirante | FUN-18 |
| Inicio del aspirante / hoja de vida | FUN-10 |
| Listado de convocatorias | FUN-11 |
| Detalle de convocatoria | FUN-12 |
| Mis postulaciones | FUN-13 |
| Datos personales | FUN-14 |
| Postulación | FUN-15 (no ejecutado) |

## 8. Casos de prueba
| ID | Funcionalidad | Descripción | Precondiciones | Pasos | Datos de entrada | Resultado esperado | Prior. | Tipo | Auto |
|---|---|---|---|---|---|---|---|---|---|
| FUN-01 | Login | Iniciar sesión con credenciales válidas | Cuenta de prueba activa | 1. Abrir `/convocatorias-app/inicio-sesion` 2. Escribir correo y clave 3. Pulsar "Iniciar Sesión" 4. Abrir `/index` | Cuenta del grupo | Se ve "Hoja de vida" | Alta | Positivo | Sí |
| FUN-02 | Login | Rechazar credenciales inválidas | Ninguna | 1. Abrir el login 2. Escribir correo inexistente y clave falsa 3. Enviar | `qa.prueba.invalida@example.com` / clave falsa | Mensaje "Credenciales incorrectas"; permanece en el login | Alta | Negativo | Sí |
| FUN-03 | Login | Rechazar campos vacíos | Ninguna | 1. Abrir el login 2. Enviar sin datos | Vacío | Mensajes "Correo no valido" y "Contraseña muy corta"; permanece en el login | Media | Negativo | Sí |
| FUN-04 | Permisos | Ruta protegida sin sesión | Sesión cerrada, sin cookies | 1. Borrar cookies y almacenamiento 2. Abrir `/convocatorias-app/index` | — | No se muestra "Hoja de vida" | Alta | Permisos | Sí |
| FUN-10 | Inicio | Ver perfil y hoja de vida | Sesión de aspirante | 1. Abrir `/index` | — | Se ven "Aspirante", "Hoja de vida" y "Formación educativa" | Alta | Positivo | Sí |
| FUN-11 | Convocatorias | Listado de convocatorias abiertas | Sesión de aspirante | 1. Abrir `/convocatorias` | — | "Convocatorias Disponibles" con botones "Ver Detalles" y "Postularse" | Alta | Positivo | Sí |
| FUN-12 | Convocatorias | Abrir el detalle | Sesión; existe una convocatoria | 1. Abrir `/convocatorias` 2. Pulsar el primer "Ver Detalles" | — | El detalle abre sin "Página no encontrada" | Media | Positivo | Sí |
| FUN-13 | Postulaciones | Ver Mis postulaciones | Sesión de aspirante | 1. Abrir `/ver/postulaciones` | — | Pantalla "Mis Postulaciones" (vacía o con listado) | Media | Positivo | Sí |
| FUN-14 | Datos personales | Ver las 8 secciones | Sesión de aspirante | 1. Abrir `/datos-personales` | — | Se listan las 8 secciones | Media | Positivo | Sí |
| FUN-15 | Postulación | Postular con perfil incompleto | Sesión; perfil al 0 % | 1. Abrir convocatorias 2. Pulsar "Postularse" | — | Rechazo con mensaje de validación | Alta | Negativo | No (omitido) |
| FUN-16 | Permisos | Acceso a módulo de otro rol | Sesión de aspirante | 1. Abrir `/talento-humano` | Ruta de ejemplo (sin URL real de otro rol) | Acceso denegado o 404 | Alta | Permisos | Sí (débil) |
| FUN-17 | Convocatorias | Listado público sin sesión | Sin sesión | 1. Abrir `/convocatorias-publicas` | — | Listado con botón "Ver Detalles" | Alta | Positivo | Sí |
| FUN-18 | Registro | Paso 1 sin nombre ni apellido | Sin sesión | 1. Abrir `/registro` 2. Pulsar "Siguiente" sin datos | Vacío | Permanece en "Paso 1 de 5" | Media | Negativo | Sí |
| FUN-19 | Convocatorias | Convocatoria cerrada | Existe una convocatoria cerrada | 1. Abrir `/convocatorias-publicas` 2. Localizar "Convocatoria cerrada" | — | El botón está deshabilitado | Media | Negativo | Sí |

**Cumplimiento de mínimos:** 14 casos (mínimo 12); 13 automatizados (mínimo 8); negativos FUN-02, 03, 15, 18, 19 (mínimo 3); permisos FUN-04 y FUN-16 (mínimo 2).

## 9. Resultados de ejecución
Se ejecutó dos veces: (A) la suite del grupo el 2026-11-16, registrada en `PROCESO.md`; (B) la **corrida completa del 2026-11-17** con `npx cypress run` desde este repositorio (4 specs, 19 tests): **13 aprobados, 0 fallidos, 6 omitidos** (FUN-15 y los 5 casos de Docencia, que están desactivados). Los videos de la evidencia son de la corrida B.

| ID | Resultado | Fecha | Evidencia |
|---|---|---|---|
| FUN-01 a FUN-04 | Aprobado (4/4) | 2026-11-17 | `evidencia/login.cy.js.mp4` |
| FUN-10 a FUN-14, FUN-16 | Aprobado (6/6) | 2026-11-17 | `evidencia/aspirante.cy.js.mp4` |
| FUN-17 a FUN-19 | Aprobado (3/3) | 2026-11-17 | `evidencia/publico.cy.js.mp4` |
| FUN-15 | No ejecutado | — | Omitido a propósito (riesgo de datos reales) |

**Resumen numérico:** 14 casos diseñados · 13 ejecutados · 13 aprobados · 0 fallidos · 1 no ejecutado. Aprobación sobre ejecutados: **100 %**; sobre el total diseñado: **93 %**.

## 10. Reporte de defectos
No se registraron defectos en los flujos ejecutados (DEF-xx: ninguno). Observaciones, que no son defectos confirmados:

| ID | Observación | Severidad | Prioridad | Evidencia |
|---|---|---|---|---|
| OBS-01 | El login de UniDoc valida con código propio (mensajes "Credenciales incorrectas", "Correo no valido", "Contraseña muy corta") y no con la validación nativa del navegador. Es un comportamiento aceptable, pero los mensajes son poco claros ("Correo no valido" sin tilde ni indicación del formato). | Baja | Baja | `evidencia/login.cy.js.mp4` |
| OBS-02 | Nova y UniDoc tienen sesiones y logins independientes; el rol que muestra Nova (Estudiante o Docente) no coincide con el de UniDoc (Aspirante). Puede confundir al usuario. | Informativa | Baja | Exploración manual |
| OBS-03 | FUN-16 aprobó porque `/talento-humano` devuelve 404, no porque exista un control de permisos demostrado. | Media (riesgo de la prueba) | Alta | `evidencia/aspirante.cy.js.mp4` |

## 11. Análisis de resultados
- **Más estables:** la zona pública (listado, registro, convocatorias cerradas), el inicio de sesión y las pantallas de lectura del aspirante: todas cargaron y mostraron el contenido esperado en las dos ejecuciones.
- **Más frágiles / no demostrados:** el control de permisos entre roles, la postulación y la carga de documentos. No hay fallos, pero tampoco evidencia; es donde está el riesgo.
- **Patrones:** no hay fallos que agrupar. Las validaciones de formulario rechazan correctamente datos vacíos e inválidos, y la app no muestra datos de usuario sin sesión.
- **Riesgos para el negocio:** si un aspirante pudiera acceder a funciones de Talento Humano se expondrían datos personales de otros candidatos (hojas de vida, documentos de identidad, datos bancarios), con implicaciones de la Ley 1581 de 2012. Una postulación que no valide perfil incompleto produciría procesos de selección con información insuficiente.
- **Limitaciones:** un solo rol y una sola cuenta; sin pruebas de postulación ni carga de archivos; el inicio de sesión con Google no es automatizable; los textos y selectores dependen del contenido actual de la app y pueden cambiar.

## 12. Conclusiones y recomendaciones
**Valoración:** el rol Aspirante está **listo con reservas**. Los 13 casos ejecutados pasaron y no hay defectos abiertos, pero la prueba no cubre la postulación ni el control de permisos con evidencia sólida.

**Acciones recomendadas, por prioridad:**
1. (Alta) Ejecutar FUN-16 con una URL real de otro rol, para demostrar que se deniega el acceso.
2. (Alta) Ejecutar FUN-15 con autorización del docente y una cuenta de prueba, y revisar "Mis postulaciones" después para no dejar datos basura.
3. (Media) Asignar el rol Docencia a una cuenta de prueba y activar la suite `docencia` (`DOCENCIA_HABILITADO: true`).
4. (Baja) Mejorar los mensajes de validación del login.

## 13. Anexos
- Repositorio: https://github.com/lennychilito321/FinalCD2
- Videos: `entrega/1_Funcionales/evidencia/` (`login.cy.js.mp4`, `aspirante.cy.js.mp4`, `publico.cy.js.mp4`).
- Comando de reproducción: `npm install` y `npx cypress run`; sin credenciales, `npm run cy:publico`.
