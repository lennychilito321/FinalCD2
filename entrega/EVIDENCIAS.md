# Cómo se obtienen las evidencias

| Prueba | Evidencia | De dónde sale | Qué incluir en el informe |
|---|---|---|---|
| Funcionales (Cypress) | Videos `.mp4` y capturas de fallos | Se generan solos con `npx cypress run`: `cypress/videos/` y `cypress/screenshots/` | Copiar los videos a `entrega/1_Funcionales/evidencia/` y citar el nombre en la tabla de resultados |
| Funcionales (salida) | Tabla de resultados de la terminal | Copiar la tabla final de `npx cypress run` (Tests / Passing / Failing) | Pegarla como captura o texto en la sección 9 |
| Rendimiento (Vegeta) | Reportes `.txt` e histogramas | `rendimiento/resultados/<fecha>/` los crea `run-vegeta.ps1` | Ya están en el repo; citar la carpeta y copiar la tabla de latencias |
| Rendimiento (gráfica) | Gráfica de latencias | `vegeta plot nivel_20rps.bin > grafica.html` y captura de pantalla | Opcional, pero suma en "gráficas de apoyo" |
| Vulnerabilidades | Reporte PDF/CSV de OpenVAS | `seguridad/escanear.sh` lo exporta a `seguridad/reportes/`; o desde la interfaz web en `http://127.0.0.1:9392` (Reports → Download) | Anexo del informe 3 |
| Entorno | Versiones | `node -v`, `npx cypress -v`, `vegeta -version`, versión del feed de Greenbone | Sección "Entorno de pruebas" |

Regla: la evidencia es la salida original de cada herramienta, sin editar. Si algo no se pudo probar, se declara como limitación.
