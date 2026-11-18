# Instrucciones detalladas para el grupo – Trabajo final Calidad de Software II

Repositorio: https://github.com/lennychilito321/FinalCD2
Fecha límite de entrega: **17 de noviembre de 2026**.

**Regla de oro:** cada integrante deja **al menos un commit propio con un aporte real**, hecho desde su computador y su cuenta de GitHub. No se copian commits ni se sube trabajo ajeno a nombre de otro: el docente puede ver el historial y la participación desigual baja la nota.

**Límites de las pruebas (obligatorios para los tres):**
- Solo se prueba `nova.uniautonoma.edu.co`, solo el rol **Aspirante**.
- No se explota ninguna vulnerabilidad ni se accede a datos fuera del rol.
- Nunca más de **20 peticiones por segundo**.
- Nunca subir contraseñas, `cypress.env.json`, reportes de OpenVAS ni videos grandes.

---

## 0. Preparación (los tres, ≈ 20 minutos)

**0.1 Acceso.** Lenny los invita desde GitHub (Settings → Collaborators). Acepten la invitación que llega por correo.

**0.2 Programas necesarios.**
- Node.js versión LTS: https://nodejs.org
- Git: https://git-scm.com
- Google Chrome (recomendado)

Comprueben en PowerShell: `node -v`, `npm -v` y `git --version`. Los tres deben mostrar una versión.

**0.3 Clonar el repo y poner su identidad.** El correo debe ser el de **su cuenta de GitHub**; si no, los commits no se les asignan.
```bash
git clone https://github.com/lennychilito321/FinalCD2.git
cd FinalCD2
git config user.name "Su Nombre Real"
git config user.email "correo-de-su-cuenta-de-github"
npm install
```
`npm install` descarga Cypress (~250 MB) y puede tardar varios minutos.

**0.4 Autenticarse con GitHub.** Al hacer `git push` la primera vez, Git abre una ventana del navegador para iniciar sesión. Si no, instalen GitHub Desktop o usen un *token* personal.

**0.5 Verificar que todo funciona** (no necesita contraseña):
```bash
npm run cy:publico
```
Resultado esperado: `3 passing` y `All specs passed`. Si falla, revisen que tengan Internet y que `nova.uniautonoma.edu.co` abra en el navegador.

**0.6 Cómo subir un aporte** (siempre en este orden):
```bash
git status                      # ver qué cambió
git add archivo1 archivo2       # agregar solo lo suyo
git commit -m "Qué hizo, en una frase"
git pull --rebase origin main   # traer cambios de los demás
git push origin main
```
Si `git pull --rebase` marca conflicto, avisen a Lenny antes de resolver nada. Comprueben el commit en https://github.com/lennychilito321/FinalCD2/commits/main.

---

## 1. Miguel Llantén – Pruebas funcionales (Cypress, rol Aspirante)
**Tiempo estimado:** 1,5 a 2 horas. **Archivos que toca:** `cypress/e2e/aspirante/aspirante.cy.js` y `entrega/1_Funcionales/G_Funcionales.md`.

**Paso 1 – Credenciales (solo en su computador).**
Copiar `cypress.env.example.json` a `cypress.env.json` (el archivo está en `.gitignore`, no se sube) y completar:
```json
{
  "ASPIRANTE_USER": "su correo de UniDoc",
  "ASPIRANTE_PASS": "su contraseña de UniDoc",
  "DOCENCIA_USER": "no-aplica",
  "DOCENCIA_PASS": "no-aplica"
}
```
Necesita una cuenta de **Aspirante** en UniDoc con correo y contraseña propios (no con Google). Si no la tiene, la crea en `https://nova.uniautonoma.edu.co/convocatorias-app/registro`.

**Paso 2 – Ejecutar la suite completa.**
```bash
npx cypress run
```
Debe terminar con `All specs passed` (13 aprobados, 6 omitidos). Anote **fecha, hora y resultado**. Los videos quedan en `cypress/videos/`.

**Paso 3 – Diseñar un caso nuevo con ID `FUN-20`.**
Explore UniDoc a mano con el navegador y elija **algo que haya visto en la app real**. Texto y rutas deben ser los que realmente aparecen, no inventados. Idea ya observada: sin sesión, en la lista de convocatorias abiertas aparece el botón **"Iniciar sesión para postularse"**; el caso comprobaría que lleva al inicio de sesión.

Plantilla para `cypress/e2e/publico/publico.cy.js` o `aspirante.cy.js`:
```js
it("FUN-20 [positivo] Sin sesión, 'Iniciar sesión para postularse' lleva al login", () => {
  cy.visit("/convocatorias-app/convocatorias-publicas");
  cy.contains("button", "Iniciar sesión para postularse").first().click();
  cy.location("pathname").should("include", "inicio-sesion");
});
```
Ajuste el selector y la afirmación a lo que **realmente** pase. Ejecute solo ese archivo hasta que pase:
```bash
npx cypress run --spec "cypress/e2e/publico/**"
```
Si el comportamiento real es distinto al esperado y es un error de la app, **no lo oculte**: regístrelo como defecto `DEF-01` en el informe.

**Paso 4 – Actualizar el informe** `entrega/1_Funcionales/G_Funcionales.md`:
- Sección 7 (matriz de trazabilidad): agregar la fila de FUN-20.
- Sección 8 (casos de prueba): agregar la fila con precondiciones, pasos, resultado esperado, prioridad, tipo y "Sí" en automatizado.
- Sección 9 (resultados): agregar su ejecución propia con fecha y resultado, y actualizar los totales (14 → 15 casos diseñados, etc.).

**Paso 5 – Commit.**
```bash
git add cypress/e2e entrega/1_Funcionales/G_Funcionales.md
git commit -m "FUN-20 y resultado de ejecución propia"
git pull --rebase origin main
git push origin main
```
**Listo cuando:** `npx cypress run` pasa en su equipo, FUN-20 está en el informe y su commit aparece en GitHub con su nombre.

---

## 2. Calet Ibarra – Rendimiento (Vegeta)
**Tiempo estimado:** 1 a 1,5 horas (la ejecución son ~15 minutos). **Archivos que toca:** `rendimiento/resultados/` y `entrega/2_Rendimiento/G_Rendimiento.md`.

**Paso 1 – Instalar Vegeta.**
Descargar `vegeta_12.12.0_windows_amd64.zip` de https://github.com/tsenart/vegeta/releases/tag/v12.12.0, extraer `vegeta.exe` y dejarlo en `rendimiento/bin/` (carpeta ignorada por Git). Comprobar:
```powershell
.\rendimiento\bin\vegeta.exe -version
```
Si PowerShell bloquea el script, ejecutar una vez: `Set-ExecutionPolicy -Scope Process Bypass`.

**Paso 2 – Antes de ejecutar.**
Anote **fecha y hora**, su tipo de conexión (wifi/cable, operador) y las especificaciones de su equipo (CPU y RAM). Cierre programas que usen Internet (descargas, videollamadas) para no distorsionar la medición.

**Paso 3 – Ejecutar las dos pruebas, en este orden.** Desde la raíz del repo:
```powershell
.\rendimiento\run-vegeta.ps1 -Modo carga  -MaxRps 5
.\rendimiento\run-vegeta.ps1 -Modo estres -MaxRps 20
```
- La carga dura ≈ 6 minutos (4 niveles: 1, 2, 3 y 5 req/s).
- El estrés dura ≈ 8 minutos (niveles 2, 5, 10, 15 y 20 req/s, más recuperación).
- No suba `-MaxRps` por encima de 20 y no corra las pruebas dos veces seguidas sin pausa.
- Los resultados quedan en `rendimiento/resultados/<modo>_<fecha>/` (archivos `.txt` y `_hist.txt`).

**Paso 4 – Escribir la comparación** en `entrega/2_Rendimiento/G_Rendimiento.md`, en una nueva sección **"Segunda ejecución desde otra red"**:
1. Tabla con p50, p95, p99, máximo, throughput y % de éxito de cada nivel (copiar de sus `.txt`).
2. Comparar con la primera ejecución (la del informe): ¿cambió la latencia? ¿Hubo errores? ¿Por qué podría variar (otra red, otra hora, distancia al servidor)?
3. Una conclusión de 3 a 5 líneas **con sus propias palabras**.

**Paso 5 – Commit.** Subir solo los `.txt` y el informe:
```bash
git add rendimiento/resultados entrega/2_Rendimiento/G_Rendimiento.md
git commit -m "Segunda ejecución de rendimiento y comparación"
git pull --rebase origin main
git push origin main
```
**Listo cuando:** sus resultados están en `rendimiento/resultados/`, el informe tiene la tabla y la comparación, y su commit aparece en GitHub.

**Si algo falla:** si hay errores o `success` menor a 100 %, **no los borre**: son un resultado real. Descríbalos en el informe.

---

## 3. Luis Ramos Sanjuan – Vulnerabilidades (OpenVAS)
**Tiempo estimado:** 1,5 a 2 horas. **Archivos que toca:** `seguridad/resumen_csv.py` (nuevo) y comentarios al informe 3.

**No repita el escaneo.** Ya se hizo (17-nov, 00:29–02:50) y repetirlo sin autorización excede la ventana permitida. Su trabajo es **verificar y documentar**.

**Paso 1 – Recibir el material confidencial.**
Pedir a Lenny la carpeta `ENTREGA_FINAL`. Del informe 3 y del reporte **no suba nada a GitHub**.

**Paso 2 – Revisar el reporte.**
Abrir `Anexo_Reporte_OpenVAS.csv` (con Excel o un editor de texto) y comprobar que coincide con el informe: **50 resultados, 0 críticos, 0 altos, 2 medios, 1 bajo y 47 informativos**. Columnas útiles: `IP`, `Port`, `CVSS`, `Severity`, `NVT Name`, `CVEs`.

**Paso 3 – Escribir `seguridad/resumen_csv.py`.** Especificación:
- Se ejecuta así: `python seguridad/resumen_csv.py ruta/al/reporte.csv`
- Lee el CSV con el módulo `csv` de Python (codificación UTF-8).
- Imprime el **conteo por severidad** (columna `Severity`: Critical/High/Medium/Low/Log) y el total.
- Imprime una tabla con los hallazgos de **CVSS mayor que 0**: nombre, puerto, CVSS y severidad.
- **No** debe contener datos del reporte dentro del código; solo lee el archivo que se le pase.
- Debe imprimir un mensaje claro si el archivo no existe.

Probarlo contra el CSV real: el resultado debe coincidir con el informe (0/0/2/1/47).

**Paso 4 – Revisar el informe 3.**
Lea las secciones 9 (matriz de riesgo) y 10 (plan de remediación) y mande a Lenny **por escrito** (no por GitHub): ¿están bien priorizados los hallazgos?, ¿faltan acciones?, ¿algún plazo es poco realista? Si propone cambios, Lenny los incorpora.

**Paso 5 – Commit.** Solo el script:
```bash
git add seguridad/resumen_csv.py
git commit -m "Script de resumen del reporte OpenVAS"
git pull --rebase origin main
git push origin main
```
**Listo cuando:** el script corre con el CSV real y sus conteos coinciden con el informe, y su revisión por escrito está enviada a Lenny.

---

## 4. Lenny Chilito – Coordinación y entrega
1. **Accesos:** invitar a Miguel, Calet y Luis al repo. Pasar `ENTREGA_FINAL` a Luis por un canal privado.
2. **Seguimiento:** revisar en GitHub → Insights → Contributors que los cuatro tengan commits.
3. **Docente:** pedir confirmación **por escrito** de (a) autorización del escaneo, (b) ventana, (c) límite de carga (se usó 20 req/s). Anotarlo en los informes 2 y 3.
4. **Integrar aportes:** incorporar la revisión de Luis; verificar que las secciones nuevas de Miguel y Calet no rompan los totales.
5. **PDF finales:** correr `python entrega/generar_pdf.py` y abrir los tres PDF para revisarlos.
6. **Seguridad:** cambiar su contraseña de UniDoc/Nova.
7. **Entregar:** los 3 PDF y el enlace al repo antes del cierre del 17 de noviembre.

---

## Cronograma sugerido
| Cuándo | Quién | Qué |
|---|---|---|
| Hoy, primera hora | Todos | Preparación (sección 0) |
| Hoy, hasta mediodía | Miguel, Calet, Luis | Sus tareas y commits |
| Antes de la entrega | Lenny | Integrar, regenerar PDF, revisar y entregar |

## Lista de verificación final
- [ ] Los cuatro tienen commits con su nombre en GitHub
- [ ] Nadie subió contraseñas ni reportes de OpenVAS
- [ ] `npm run cy:publico` pasa en al menos un equipo distinto al de Lenny
- [ ] Los 3 PDF abiertos y revisados
- [ ] Confirmación del docente guardada
