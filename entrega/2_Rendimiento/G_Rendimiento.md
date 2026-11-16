# Informe 2 – Pruebas de rendimiento (carga y estrés)

> Mínimo: 2–3 flujos/endpoints del rol, 1 prueba de carga + 1 de estrés progresiva, ≥4 niveles de carga. Respetar límites y ventana fijados por el docente.

1. Portada y control de versiones
2. Resumen ejecutivo: cuánta carga soporta, dónde degrada, qué se recomienda
3. Objetivos y alcance
4. Sistema bajo prueba y escenarios (flujos elegidos y por qué son representativos)
5. Entorno: cliente (CPU, RAM, red), servidor, herramienta+versión, fechas/horas
6. Criterios de aceptación (definidos ANTES de ejecutar)

| Métrica | Umbral | Justificación |
|---|---|---|
| p95 | < ___ ms | |
| Tasa de error | < ___ % | |

7. Diseño de pruebas

| Prueba | Usuarios/RPS | Rampa | Duración por escalón | Think time |
|---|---|---|---|---|
| Carga | | | | |
| Estrés (≥4 niveles) | | | | |

8. Ejecución: comandos / plan .jmx tal como se ejecutó; incidentes
9. Resultados por nivel

| Nivel | Peticiones | p50 | p95 | p99 | Máx | Req/s | % error (códigos) |
|---|---|---|---|---|---|---|---|

10. Análisis: vs criterios, inicio de degradación, punto de ruptura, cuellos de botella (hipótesis), recuperación
11. Conclusiones y recomendaciones priorizadas
12. Riesgos y limitaciones (cliente como cuello de botella, red, servidor compartido)
13. Anexos (.jmx / targets Vegeta, salidas completas, reportes)
