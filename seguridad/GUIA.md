# Guía de escaneo con OpenVAS (Greenbone) – Nova

> Antes de escanear: confirmar por escrito con el docente (a) objetivo exacto (host/IP), (b) ventana de
> tiempo, (c) que está autorizado. Sin eso, **no escanear**. Sin explotación y sin DoS.

1. Levantar Greenbone Community (Docker):
   https://greenbone.github.io/docs/latest/22.4/container/index.html
2. En la interfaz web (GSA): Configuration → Targets → crear objetivo con el host autorizado
   (`nova.uniautonoma.edu.co` o la IP indicada). Sin credenciales (escaneo no autenticado) salvo indicación del docente.
3. Scans → Tasks → nueva tarea con perfil **Full and fast** (no usar perfiles que incluyan DoS).
4. Ejecutar en la ventana autorizada. Registrar fecha/hora, versión de GVM y perfil.
5. Exportar el reporte en PDF (anexo) y CSV (para la tabla de hallazgos).
6. Para cada hallazgo: CVE, CVSS, host:puerto, severidad, estado (confirmado / falso positivo probable).
7. Analizar ≥5 hallazgos: descripción, impacto, relación con el rol Aspirante (p. ej. exposición de datos
   personales de postulantes, Ley 1581), evidencia y recomendación.

Los resultados reales **no** están en este repositorio: se generan al ejecutar el escaneo.
