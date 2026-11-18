# Instrucciones para el grupo – Trabajo final Calidad de Software II

Repositorio: https://github.com/lennychilito321/FinalCD2
Cada integrante debe dejar **al menos un commit propio con aportes reales**. Cada uno trabaja en su computador y con su propio usuario de Git.

## Pasos comunes (todos)
1. Aceptar la invitación de colaborador que llega al correo de GitHub.
2. Instalar Node.js (LTS) y Git.
3. Clonar y configurar su identidad (usar el correo de su cuenta de GitHub):
```bash
git clone https://github.com/lennychilito321/FinalCD2.git
cd FinalCD2
git config user.name "Su Nombre Real"
git config user.email "correo-de-su-cuenta-de-github"
npm install
```
4. Probar que todo funciona sin credenciales: `npm run cy:publico` (deben pasar 3 de 3).
5. Para subir su aporte:
```bash
git add .
git commit -m "Qué hizo, en una frase"
git pull --rebase origin main
git push origin main
```
6. **Nunca** subir contraseñas, `cypress.env.json`, videos grandes ni reportes de OpenVAS.

Reglas: probar solo `nova.uniautonoma.edu.co`, solo el rol Aspirante, sin explotar vulnerabilidades y sin superar **20 peticiones por segundo**.

---

## Miguel Llantén – Pruebas funcionales (Cypress, rol Aspirante)
**Qué hacer**
1. Crear su `cypress.env.json` (copiar `cypress.env.example.json`) con su cuenta propia de UniDoc. Sin subirlo.
2. Ejecutar `npx cypress run` y anotar el resultado y la fecha.
3. Explorar UniDoc a mano y agregar **un caso nuevo** en `cypress/e2e/aspirante/aspirante.cy.js` con ID `FUN-20`. Debe usar textos y rutas que haya visto en la app real, no inventados.
4. En `entrega/1_Funcionales/G_Funcionales.md`: agregar FUN-20 a la tabla de casos y a la matriz de trazabilidad, y anotar su ejecución en la sección 9.

**Su commit:** `FUN-20 y resultado de ejecución propia`.
**Listo cuando:** `npx cypress run` pasa en su equipo y el caso nuevo está en el informe.

## Calet Ibarra – Rendimiento (Vegeta)
**Qué hacer**
1. Descargar Vegeta v12.12.0 para Windows (https://github.com/tsenart/vegeta/releases) y dejar `vegeta.exe` en `rendimiento/bin/`.
2. Ejecutar, desde su red y en este orden:
```powershell
.\rendimiento\run-vegeta.ps1 -Modo carga  -MaxRps 5
.\rendimiento\run-vegeta.ps1 -Modo estres -MaxRps 20
```
3. Los resultados quedan en `rendimiento/resultados/`; subir solo los `.txt`.
4. En `entrega/2_Rendimiento/G_Rendimiento.md`: agregar una sección "Segunda ejecución desde otra red" con su tabla (p50, p95, p99, errores) y compararla con la primera: ¿cambió la latencia?

**Su commit:** `Segunda ejecución de rendimiento y comparación`.
**Listo cuando:** sus resultados están en el repo y el informe 2 tiene la comparación escrita con sus palabras.

## Luis Ramos Sanjuan – Vulnerabilidades (OpenVAS)
**No repetir el escaneo.** Ya se hizo y repetirlo sin autorización sería salirse de la ventana.

**Qué hacer**
1. Pedir a Lenny la carpeta `ENTREGA_FINAL` (el informe 3 y el reporte son confidenciales, no están en GitHub).
2. Abrir `Anexo_Reporte_OpenVAS.csv` y comprobar que los números del informe 3 coinciden: 50 resultados, 0 críticos, 0 altos, 2 medios, 1 bajo, 47 informativos.
3. Crear `seguridad/resumen_csv.py`: un script que lea el CSV y muestre el conteo por severidad y la lista de hallazgos con CVSS mayor que 0. No debe incluir datos del reporte, solo el código.
4. Revisar el plan de remediación y la matriz de riesgo del informe 3 y mandar a Lenny sus correcciones o mejoras por escrito.

**Su commit:** `Script de resumen del reporte OpenVAS`.
**Listo cuando:** el script corre con `python seguridad/resumen_csv.py ruta/al/reporte.csv` y sus conteos coinciden con el informe.

## Lenny Chilito – Coordinación y entrega
1. Dar acceso al repo a los tres compañeros y confirmar que cada uno hizo su commit (GitHub → Insights → Contributors).
2. Pedir al docente la confirmación escrita de la autorización del escaneo y el límite de carga.
3. Cambiar su contraseña de UniDoc/Nova.
4. Incorporar los aportes de los compañeros a los informes y regenerar los PDF con `python entrega/generar_pdf.py`.
5. Entregar los 3 PDF y el enlace al repo antes del cierre del 17 de noviembre.
