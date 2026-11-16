# Informe 1 – Pruebas funcionales · UniDoc · Rol Aspirante (BORRADOR)

> Borrador con resultados reales de la ejecución de Cypress. Pendiente: rol Docencia, FUN-15 y FUN-16 completos. Todo dato marcado **[COMPLETAR]** debe llenarlo el grupo.

## 1. Portada y control de versiones
Ver `00_Portada_y_severidad.md`. Grupo: **[COMPLETAR G__]**.

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 0.1 | 2026-11-16 | [COMPLETAR] | Borrador con resultados del rol Aspirante |

## 2. Resumen ejecutivo
Se probó el rol **Aspirante** de UniDoc (módulo de convocatorias de la plataforma Nova). Se diseñaron 15 casos para el rol Aspirante y el inicio de sesión, de los cuales se ejecutaron 10 automatizados con Cypress y los 10 fueron aprobados (100 %). Un caso (FUN-15) se omitió a propósito porque puede crear una postulación real y requiere permiso del docente. El rol **Docencia no se evaluó** porque ninguna cuenta del grupo tiene ese rol asignado. No se encontraron defectos funcionales en los flujos de lectura probados. Recomendación: el rol Aspirante queda **apto con reservas**, pendiente de probar la postulación y los permisos entre roles.

## 3. Objetivo y alcance
**Dentro:** inicio de sesión de UniDoc, Inicio del aspirante, listado y detalle de convocatorias, Mis postulaciones, Datos personales.
**Fuera:** rol Docencia (sin cuenta con ese rol), postulación real a una convocatoria (FUN-15, sin permiso), carga de documentos y hoja de vida, Recepción con IA, Normativas, notificaciones. Justificación: cada uno requiere permiso del docente o puede crear datos reales en un sistema compartido.

## 4. Descripción de la aplicación y del rol
UniDoc es el módulo de convocatorias, avales y contratación docente de Nova. El Aspirante ve su hoja de vida (Formación, Experiencia, Idiomas, Aptitudes), completa 8 secciones de datos personales (datos personales, contacto, EPS, RUT, certificación bancaria, pensión, antecedentes judiciales, ARL), consulta convocatorias abiertas y se postula. Datos de prueba: cuenta propia de un integrante del grupo (sin credenciales en este documento).

## 5. Entorno de pruebas
| Elemento | Valor |
|---|---|
| URL | https://nova.uniautonoma.edu.co/convocatorias-app |
| Navegador | Electron 118 (incluido en Cypress) |
| Sistema operativo | Windows 11 Pro |
| Node.js | v24.20.0 |
| Cypress | 13.17.0 |
| Fecha de ejecución | 2026-11-16 |

## 6. Estrategia
- **Automatizado:** casos de lectura y de login (estables y repetibles). Sesión por `cy.session`, credenciales desde `cypress.env.json` (fuera de Git).
- **Manual / omitido:** FUN-15 (postulación con perfil incompleto), por riesgo de crear datos reales.
- **Entrada:** cuenta con correo y contraseña en UniDoc y servidor accesible. **Salida:** todos los casos de prioridad Alta ejecutados.
- **Prioridad:** Alta = acceso y funciones principales; Media = validaciones; Baja = contenido informativo.

## 7. Matriz de trazabilidad
| Funcionalidad | Casos |
|---|---|
| Inicio de sesión | FUN-01, FUN-02, FUN-03 |
| Acceso protegido | FUN-04, FUN-16 |
| Inicio del aspirante / hoja de vida | FUN-10 |
| Listado de convocatorias | FUN-11 |
| Detalle de convocatoria | FUN-12 |
| Mis postulaciones | FUN-13 |
| Datos personales | FUN-14 |
| Postulación | FUN-15 (omitido) |

## 8. Casos de prueba
| ID | Funcionalidad | Descripción | Datos | Resultado esperado | Prioridad | Tipo | Auto. |
|---|---|---|---|---|---|---|---|
| FUN-01 | Login | Iniciar sesión con credenciales válidas | Cuenta del grupo | Acceso a Inicio con "Hoja de vida" | Alta | Positivo | Sí |
| FUN-02 | Login | Correo y clave inválidos | correo inexistente + clave falsa | Mensaje "Credenciales incorrectas"; permanece en el login | Alta | Negativo | Sí |
| FUN-03 | Login | Campos vacíos | — | "Correo no valido" y "Contraseña muy corta" | Media | Negativo | Sí |
| FUN-04 | Permisos | Ruta protegida sin sesión | Sin sesión | No se muestra la hoja de vida | Alta | Permisos | Sí |
| FUN-10 | Inicio | Ver perfil y hoja de vida | — | Se ve "Aspirante", "Hoja de vida", "Formación educativa" | Alta | Positivo | Sí |
| FUN-11 | Convocatorias | Listado de convocatorias abiertas | — | "Convocatorias Disponibles" con botones Ver Detalles y Postularse | Alta | Positivo | Sí |
| FUN-12 | Convocatorias | Abrir detalle | — | Se abre sin error | Media | Positivo | Sí |
| FUN-13 | Postulaciones | Ver Mis postulaciones | — | Pantalla "Mis Postulaciones" | Media | Positivo | Sí |
| FUN-14 | Datos personales | Ver las 8 secciones | — | 8 secciones listadas | Media | Positivo | Sí |
| FUN-15 | Postulación | Postular con perfil incompleto | — | Rechazo con validación | Alta | Negativo | **Omitido** |
| FUN-16 | Permisos | Acceso a módulo de otro rol | URL real de otro rol **[COMPLETAR]** | Acceso denegado | Alta | Permisos | Parcial |

## 9. Resultados de ejecución (2026-11-16)
| ID | Resultado | Evidencia |
|---|---|---|
| FUN-01..04 | Aprobado (4/4) | `cypress/videos/auth/login.cy.js.mp4` |
| FUN-10..14, FUN-16 | Aprobado (6/6)* | `cypress/videos/aspirante/aspirante.cy.js.mp4` |
| FUN-15 | Omitido | — |

Resumen: 11 ejecutables, **10 aprobados (100 % de los ejecutados)**, 0 fallidos, 1 omitido.
\* FUN-16 aprobó aceptando un 404, por lo que **no es evidencia de control de permisos** hasta usar una URL real de otro rol.

## 10. Reporte de defectos
No se registraron defectos en los flujos ejecutados.
Observaciones (no defectos confirmados), **[COMPLETAR/validar]**:
- OBS-01: el login de UniDoc valida con su propio código (mensajes propios) y no con validación nativa del navegador.
- OBS-02: Nova y UniDoc tienen sesiones y logins independientes; el rol que muestra Nova ("Estudiante" o "Docente") no coincide con el de UniDoc ("Aspirante").

## 11. Análisis de resultados
Los flujos de lectura del Aspirante son estables: las pantallas cargan y muestran el contenido esperado. El punto más frágil a verificar es el control de permisos entre módulos y roles, que no se pudo probar con evidencia sólida. Riesgo de negocio: si un aspirante pudiera acceder a funciones de Talento humano, expondría datos de otros candidatos. Limitaciones: un solo rol, sin pruebas de postulación ni carga de archivos, login de Google no automatizable.

## 12. Conclusiones y recomendaciones
Rol Aspirante: **apto con reservas**. Recomendaciones: (1) probar FUN-15 con permiso del docente, (2) completar FUN-16 con una URL real de otro rol, (3) asignar el rol Docencia a una cuenta de prueba y repetir este informe para ese rol.

## 13. Anexos
Repositorio: **[COMPLETAR enlace]**. Videos y capturas: carpeta `cypress/videos` y `cypress/screenshots`.
