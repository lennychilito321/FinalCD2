# Informe 1 – Pruebas funcionales (Cypress)

> Mínimo: 12 casos diseñados, ≥8 automatizados, ≥3 negativos, ≥2 de permisos (por conjunto de roles).

1. Portada y control de versiones (ver 00_Portada_y_severidad.md)
2. Resumen ejecutivo (½ página, lector no técnico): qué se probó, casos ejecutados/fallidos, defectos más graves, recomendación
3. Objetivo y alcance (dentro / fuera, con justificación)
4. Descripción de la aplicación y de los roles (Docencia, Aspirante); datos de prueba (sin credenciales reales)
5. Entorno de pruebas: URL, navegador+versión, SO, Node.js, Cypress
6. Estrategia: qué se automatizó y por qué, qué fue manual, criterios de entrada/salida, criterio de prioridad
7. Matriz de trazabilidad

| Funcionalidad | Rol | Casos |
|---|---|---|
| Inicio de sesión | Ambos | FUN-01..04 |
| | | |

8. Casos de prueba

| ID | Funcionalidad | Descripción | Precondiciones | Pasos | Datos | Resultado esperado | Prioridad | Tipo | Automatizado |
|---|---|---|---|---|---|---|---|---|---|
| FUN-01 | Login | Docencia con credenciales válidas | Usuario activo | 1. Abrir login 2. Ingresar datos 3. Enviar | usuario de prueba | Acceso al panel | Alta | Positivo | Sí |
| FUN-02 | Login | Contraseña incorrecta | | | | Mensaje de error | Alta | Negativo | Sí |
| FUN-03 | Login | Campos vacíos | | | | Validación | Media | Negativo | Sí |
| FUN-04 | Permisos | Ruta protegida sin sesión | | | | Redirige a login | Alta | Permisos | Sí |
| FUN-05..09 | Docencia | (ver specs) | | | | | | | |
| FUN-10..13 | Aspirante | (ver specs) | | | | | | | |

9. Resultados de ejecución (por caso: aprobado/fallido/bloqueado, fecha, evidencia; total y % aprobación)
10. Reporte de defectos

| ID | Título | Caso | Pasos | Esperado | Obtenido | Severidad | Prioridad | Evidencia |
|---|---|---|---|---|---|---|---|---|

11. Análisis de resultados (módulos estables/frágiles, patrones, riesgos de negocio, limitaciones)
12. Conclusiones y recomendaciones (¿listo para uso? sí / con reservas / no)
13. Anexos (evidencias, enlace al repositorio)
