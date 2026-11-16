# Plan de escaneo OpenVAS – UniDoc (BORRADOR, NO EJECUTADO)

> **No escanear sin autorización escrita del docente** indicando objetivo y ventana. Sin explotación ni denegación de servicio. Probar sin autorización puede ser delito informático (Ley 1273 de 2009).

## Datos a confirmar con el docente
- Objetivo autorizado (propuesto: `nova.uniautonoma.edu.co`). Nota: es un servidor institucional, posiblemente compartido; confirmar que el docente es quien autoriza.
- Ventana de tiempo y rango de puertos permitido.
- Con o sin credenciales (propuesto: **sin credenciales**).

## Entorno (propuesta)
OpenVAS/Greenbone corre en Linux. En Windows, lo más simple es Docker Desktop con la imagen oficial de Greenbone Community Edition (docker compose), o una máquina virtual Linux.

## Configuración propuesta
| Parámetro | Valor |
|---|---|
| Perfil | "Base" o "Discovery" primero; "Full and fast" solo si el docente lo permite |
| Concurrencia | Baja (pocos hosts/NVTs a la vez) para no afectar el servidor |
| Exclusiones | Sin pruebas de denegación de servicio |
| Salida | Exportar PDF y XML del reporte como anexo |

## Plantilla de hallazgos
Usar la tabla del informe 3 (ID `VUL-xx`, CVE, CVSS, severidad, host:puerto, estado). Analizar al menos 5 hallazgos con descripción, impacto, relación con los roles Docencia/Aspirante, evidencia y recomendación.

## Pendiente
Instalar Docker/VM, obtener autorización, ejecutar y exportar el reporte.
