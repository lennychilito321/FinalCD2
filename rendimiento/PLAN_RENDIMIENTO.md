# Plan de rendimiento – UniDoc (BORRADOR, NO EJECUTADO)

> **No ejecutar sin** (1) ventana de ejecución, (2) límites máximos de carga y (3) autorización escrita del docente. Los valores de abajo son una propuesta y se ajustan a esos límites.

## Escenarios (solo lectura, sin crear datos)
| ID | Flujo | Endpoint / página | Justificación |
|---|---|---|---|
| PER-01 | Listado público de convocatorias | `GET /convocatorias-app/api/publico/convocatorias` | Es la llamada que usa el Aspirante para ver convocatorias |
| PER-02 | Página pública de convocatorias | `GET /convocatorias-app/convocatorias-publicas` | Primera pantalla que ve un aspirante |
| PER-03 | Pantalla de login | `GET /convocatorias-app/inicio-sesion` | Punto de entrada de los dos roles |

Fuera de alcance: login con credenciales bajo carga, postulaciones, carga de archivos (modifican datos o riesgo de bloqueo de cuentas).

## Criterios de aceptación (propuestos, definir ANTES de ejecutar)
| Métrica | Umbral | Justificación |
|---|---|---|
| p95 | < 1500 ms | Aceptable para navegación web |
| Tasa de error | < 1 % | Servicio académico de uso diario |
| Códigos 5xx | 0 | Cualquier 5xx indica falla del servidor |

## Diseño (con Vegeta; niveles a ajustar al límite del docente)
| Nivel | Prueba | Peticiones/s | Duración |
|---|---|---|---|
| 1 | Carga (uso esperado) | 5 | 60 s |
| 2 | Estrés | 10 | 60 s |
| 3 | Estrés | 20 | 60 s |
| 4 | Estrés | 40 | 60 s |
| (5) | Estrés, solo si el docente lo permite | 80 | 60 s |
Entre niveles, 30 s de pausa y una medición a 5 req/s para ver la recuperación.

## Comandos (tal como se ejecutarían)
```bash
# por cada nivel RATE en 5 10 20 40
vegeta attack -targets=rendimiento/targets.txt -rate=RATE -duration=60s -timeout=30s \
  | tee resultados/nivelRATE.bin | vegeta report -type=text > resultados/nivelRATE.txt
vegeta report -type='hist[0,200ms,500ms,1s,2s,5s]' resultados/nivelRATE.bin
vegeta plot resultados/nivelRATE.bin > resultados/nivelRATE.html
```
Vegeta: https://github.com/tsenart/vegeta/releases (binario para Windows). Registrar CPU, memoria y red del equipo cliente para el informe.

## Tabla de resultados (llenar con datos reales)
| Nivel | Peticiones | p50 | p95 | p99 | Máx | Req/s | % error (códigos) |
|---|---|---|---|---|---|---|---|

## Riesgos y limitaciones
El servidor puede ser compartido con otras aplicaciones; el cliente o la red podrían ser el cuello de botella; solo se miden endpoints de lectura.
