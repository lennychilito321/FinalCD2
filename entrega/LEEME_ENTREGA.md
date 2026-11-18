# Carpeta de entrega – Trabajo final Calidad de Software II (17 nov 2026)

Entregar al docente: 3 PDF + enlace al repositorio. Nombres: `G_Funcionales.pdf` (o `G{n}_...` si el docente asigna número), `G{n}_Rendimiento.pdf`, `G{n}_Vulnerabilidades.pdf`. Los PDF se generan con `python entrega/generar_pdf.py`.

| Carpeta | Contenido | Estado (rol Aspirante) |
|---|---|---|
| `1_Funcionales/` | Informe, portada común, videos de evidencia | **Completo**: 13/14 ejecutados y aprobados; FUN-15 omitido; falta Docencia |
| `2_Rendimiento/` | Informe con resultados de carga y estrés | **Completo**: 4 440 peticiones, 0 errores, hasta 20 req/s (tope autoimpuesto) |
| `3_Vulnerabilidades/` | Estructura pública del informe | **Escaneo completado (17-nov)**; informe completo con hallazgos (publicado a pedido del grupo) |

## Lista de control antes de entregar
- [ ] Docente: confirmar roles, ventana, límite de carga (se usó 20 req/s) y autorización del escaneo
- [ ] Completar **[COMPLETAR]** (ventana, evidencia de autorización)
- [ ] Cada integrante con commits propios (`git config user.name/email` de cada uno)
- [ ] Probar `npm install` y `npm run cy:publico` en OTRO equipo
- [x] Informe 3 con el reporte real de OpenVAS (anexo en `entrega/pdf/`)
- [ ] Repositorio en **privado** o sin datos personales; sin contraseñas en ningún archivo
