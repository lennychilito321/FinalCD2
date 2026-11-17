# Informe 3 – Vulnerabilidades (OpenVAS) · UniDoc · Aspirante

> **Confidencial: se entrega solo al docente.** Este archivo en el repositorio es solo la estructura. Los hallazgos reales y el reporte de OpenVAS **no se publican en Git**; viven en el PDF entregado y en `seguridad/reportes/` (excluida por `.gitignore`).

## 1. Portada y control de versiones
Ver `../1_Funcionales/00_Portada_y_severidad.md`. Grupo: sin número asignado; integrantes en la portada.

## 2. Resumen ejecutivo
_[Riesgo general, hallazgos por severidad y 3 acciones urgentes: completar con el reporte real.]_

## 3. Autorización y reglas de enfrentamiento
Objetivo: `nova.uniautonoma.edu.co`. Ventana: _[COMPLETAR con la indicada por el docente]_. Sin explotación y sin denegación de servicio. Autorización del docente como propietario del sistema: _[COMPLETAR evidencia]_.

## 4. Alcance y metodología
Greenbone Community Edition (OpenVAS) en Docker (`seguridad/greenbone/docker-compose.yml`), perfil **Full and fast**, escaneo **sin credenciales**, lanzado con `seguridad/escanear.sh`. Fecha/hora y versión del feed: _[COMPLETAR del reporte]_.

## 5. Resultados generales
Conteo por severidad (crítica, alta, media, baja, informativa) y puertos/servicios detectados: _[COMPLETAR]_.

## 6. Tabla de hallazgos
| ID | Nombre | CVE | CVSS | Severidad | Host:puerto | Estado |
|---|---|---|---|---|---|---|
| VUL-01 | _[…]_ | | | | | |

## 7. Análisis detallado (≥5 hallazgos, o todos si hay menos)
Por cada VUL-xx: descripción, impacto en el negocio, relación con el rol Aspirante (datos personales de postulantes, hojas de vida, Ley 1581 de 2012), evidencia y recomendación.

## 8. Falsos positivos y limitaciones
El escaneo no detecta fallos de lógica ni de autorización por rol; el servidor es compartido (`utm.uniautonoma.edu.co`).

## 9. Matriz de riesgo
Probabilidad × impacto: _[COMPLETAR]_.

## 10. Plan de remediación
Crítica: 7 días · Alta: 30 · Media: 90 · Baja: siguiente ciclo. Responsable sugerido: Tecnología/Infraestructura de la universidad.

## 11. Conclusiones
Estado de seguridad y relación con la característica *Seguridad* de ISO/IEC 25010 (confidencialidad, integridad, no repudio, responsabilidad, autenticidad): _[COMPLETAR]_.

## 12. Anexos
Reporte exportado de OpenVAS (PDF/CSV), solo en la entrega privada.
