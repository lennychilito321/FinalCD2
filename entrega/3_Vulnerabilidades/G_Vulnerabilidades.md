# Informe 3 – Vulnerabilidades (OpenVAS) · UniDoc · Aspirante

> **Confidencial: se entrega solo al docente.** Este archivo en el repositorio es solo la estructura. Los hallazgos reales y el reporte de OpenVAS **no se publican en Git**; viven en el PDF entregado y en `seguridad/reportes/` (excluida por `.gitignore`).

## 1. Portada y control de versiones
Ver `../1_Funcionales/00_Portada_y_severidad.md`. Grupo: sin número asignado; integrantes en la portada.

## 2. Resumen ejecutivo
_[Riesgo general, hallazgos por severidad y 3 acciones urgentes: completar con el reporte real.]_

## 3. Autorización y reglas de enfrentamiento
- **Objetivo autorizado:** `nova.uniautonoma.edu.co` (resuelve a `utm.uniautonoma.edu.co`, 179.1.113.103). Solo ese host; ningún otro sistema.
- **Autorización:** el enunciado del trabajo final, publicado el 9 de noviembre de 2026 por el docente Jefferson Andrés Muñoz, asigna la plataforma Nova como sistema bajo prueba y establece que el docente actúa como propietario del sistema para este ejercicio. No se dispuso de una autorización adicional por escrito con ventana horaria específica; el grupo la tomó como el periodo del trabajo.
- **Ventana de ejecución:** 16–17 de noviembre de 2026 (periodo de entrega del trabajo).
- **Restricciones:** sin explotación de vulnerabilidades, sin denegación de servicio, sin acceso a datos fuera del rol, escaneo sin credenciales y con el perfil estándar de Greenbone, que no incluye pruebas destructivas.
- **Confidencialidad:** el informe y el reporte se entregan solo al docente (Ley 1273 de 2009).

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
