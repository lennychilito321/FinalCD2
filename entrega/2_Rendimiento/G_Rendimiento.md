# Informe 2 – Rendimiento (carga y estrés) · Nova / UniDoc · Aspirante

## 1. Portada y control de versiones
Grupo: sin número asignado · Integrantes: ver `../1_Funcionales/00_Portada_y_severidad.md` · Aplicación: UniDoc – Aspirante · Fecha: 2026-11-16 · v1.0 · Autor: Lenny Chilito

## 2. Resumen ejecutivo
Los flujos públicos que usa un aspirante (inicio de UniDoc, listado de convocatorias, pantalla de inicio de sesión) respondieron **sin ningún error en 4 440 peticiones** (1 – 20 peticiones por segundo). La mediana fue ≈33 ms y el p95 nunca superó 53 ms, muy por debajo del umbral de 2 s. **No se encontró punto de degradación ni de ruptura dentro del tope probado (20 req/s)**; la capacidad real por encima de ese valor es desconocida porque el tope fue autoimpuesto. Recomendación: repetir el estrés con el límite que fije el docente y probar flujos autenticados.

## 3. Objetivos y alcance
Probados (solo GET): `/convocatorias-app/`, `/convocatorias-app/convocatorias-publicas`, `/convocatorias-app/inicio-sesion`. Fuera de alcance: inicio de sesión con Google, postulación, carga de documentos y cualquier escritura.

## 4. Sistema bajo prueba y escenarios
Son las tres primeras pantallas del recorrido del aspirante (descubrir convocatorias e ingresar). Las peticiones rotan por las 3 URL en partes iguales.

## 5. Entorno de pruebas
Cliente: PC Windows 11, 12 CPU lógicas, 16 GB RAM, red externa a la universidad. Servidor: `nova.uniautonoma.edu.co` (resuelve como alias de `utm.uniautonoma.edu.co`, 179.1.113.103; **servidor compartido con otras aplicaciones**). Herramienta: Vegeta v12.12.0. Fecha: 16-nov-2026, 23:23–23:36 (hora local), ventana indicada por el estudiante.

## 6. Criterios de aceptación (definidos antes de ejecutar)
p95 < 2 s; p99 < 5 s; errores < 1 %; sin respuestas 5xx. Justificación: tiempos habituales de percepción de "respuesta aceptable" en páginas de consulta.

## 7. Diseño de las pruebas
- **PER-01 – Carga (uso esperado):** 1, 2, 3 y 5 req/s, 60 s por escalón, 20 s de pausa.
- **PER-02 – Estrés (progresivo):** 2, 5, 10, 15 y 20 req/s, 60 s por escalón, 20 s de pausa, más recuperación a 1 req/s durante 30 s.
- **Tope:** 20 req/s, definido por el grupo de forma conservadora al no haber un límite escrito del docente. Sin tiempos de espera entre peticiones (tasa constante), timeout 30 s.

## 8. Ejecución
```
.\rendimiento\run-vegeta.ps1 -Modo carga  -MaxRps 5  -DuracionNivel 60
.\rendimiento\run-vegeta.ps1 -Modo estres -MaxRps 20 -DuracionNivel 60
```
Incidente: la primera corrida de carga se descartó porque PowerShell 5.1 corrompía la salida binaria de Vegeta; se corrigió el script (`cmd /c`) y se repitió completa. Los resultados de abajo son de la corrida válida (carpetas `rendimiento/resultados/carga_20261116_2323` y `rendimiento/resultados/estres_20261116_2329`).

## 9. Resultados (todos con 100 % de éxito, código 200)
**Carga**
| req/s | Peticiones | p50 | p95 | p99 | Máx | Throughput | Errores |
|---|---|---|---|---|---|---|---|
| 1 | 60 | 32,7 ms | 36,8 ms | 136,5 ms | 146,1 ms | 1,02 | 0 % (200:60) |
| 2 | 120 | 33,0 ms | 52,6 ms | 80,6 ms | 104,0 ms | 2,02 | 0 % (200:120) |
| 3 | 180 | 33,6 ms | 47,1 ms | 59,7 ms | 120,8 ms | 3,01 | 0 % (200:180) |
| 5 | 300 | 33,5 ms | 39,4 ms | 54,9 ms | 108,5 ms | 5,01 | 0 % (200:300) |

**Estrés**
| req/s | Peticiones | p50 | p95 | p99 | Máx | Throughput | Errores |
|---|---|---|---|---|---|---|---|
| 2 | 120 | 32,6 ms | 49,6 ms | 115,0 ms | 221,5 ms | 2,02 | 0 % |
| 5 | 300 | 33,2 ms | 50,1 ms | 58,6 ms | 99,9 ms | 5,01 | 0 % |
| 10 | 600 | 33,0 ms | 49,4 ms | 59,5 ms | 102,4 ms | 10,01 | 0 % |
| 15 | 900 | 32,7 ms | 43,3 ms | 55,4 ms | 104,3 ms | 15,00 | 0 % |
| 20 | 1 200 | 32,3 ms | 46,4 ms | 64,5 ms | 175,6 ms | 20,01 | 0 % |
| Recuperación 1 | 30 | 34,6 ms | 56,8 ms | 106,4 ms | 106,4 ms | 1,03 | 0 % |

Histogramas y salidas completas en `rendimiento/resultados/`.

## 10. Análisis de resultados
- Todos los escalones cumplen los cuatro criterios; el p95 máximo fue 56,8 ms (≈35 veces por debajo del umbral).
- La latencia es plana entre 1 y 20 req/s: no hay degradación visible en el rango probado. La recuperación a 1 req/s es igual a la del inicio, por lo que no se observó efecto residual.
- La latencia estable de ~33 ms sugiere que estas páginas son contenido estático o con caché (hipótesis, no verificada): por eso miden poco la capacidad del backend.
- Punto de degradación y de ruptura: **no alcanzados**.

## 11. Conclusiones y recomendaciones
Cumple los criterios en el rango probado. Capacidad estimada: ≥20 req/s sostenidas en estos tres flujos. Mejoras priorizadas: (1) repetir el estrés con el límite del docente hasta hallar degradación; (2) medir flujos autenticados y dinámicos (listado desde API, detalle de convocatoria) bajo carga; (3) monitorear CPU/memoria del servidor durante la prueba.

## 12. Riesgos y limitaciones
Un solo cliente y una sola IP; red de origen externa; tope bajo autoimpuesto; servidor compartido con otras aplicaciones; posible caché/CDN que oculta el costo del backend; no se probó ningún flujo con sesión (login por Google fuera de alcance).

## 13. Anexos
`rendimiento/targets-aspirante.txt`, `rendimiento/run-vegeta.ps1`, `rendimiento/resultados/**` (.txt y _hist.txt; los .bin no se versionan).
