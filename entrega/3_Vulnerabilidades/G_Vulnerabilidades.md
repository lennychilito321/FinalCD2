# Informe 3 – Pruebas de vulnerabilidades (OpenVAS) · UniDoc (Nova) · Rol Aspirante

> Informe con hallazgos reales de seguridad. El grupo decidió publicarlo en el repositorio.

## 1. Portada y control de versiones
Portada común, integrantes e identificadores: ver sección "Portada" de este documento. Grupo sin número asignado.

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-11-17 | Lenny Chilito | Primer escaneo completo y análisis de resultados |

## 2. Resumen ejecutivo
Se escaneó con Greenbone/OpenVAS el servidor que aloja la plataforma Nova (`nova.uniautonoma.edu.co`, IP 179.1.113.103), sin credenciales y sin explotar ninguna vulnerabilidad. El escaneo detectó **4 servicios web** (puertos 80, 443, 8088 y 10443) y produjo **50 resultados: 0 críticos, 0 altos, 2 medios, 1 bajo y 47 informativos**.

**Riesgo general: medio-bajo.** No se encontraron vulnerabilidades graves con CVE conocido, pero sí problemas de higiene de seguridad en la infraestructura. El más relevante es que el puerto **10443 responde como "OPNsense", un firewall, con su interfaz web accesible desde Internet y con el certificado TLS vencido desde el 12 de septiembre de 2026**. Para el rol Aspirante, que entrega datos personales y documentos (identidad, datos bancarios, antecedentes), esto aumenta la superficie de ataque del servidor que los aloja.

**Tres acciones más urgentes:**
1. Renovar el certificado TLS del puerto 10443 y, sobre todo, **restringir el acceso a la interfaz de administración del firewall** a redes internas o VPN.
2. Validar y retirar el archivo `wpad.dat` expuesto en el puerto 10443.
3. Activar **HSTS** y las cabeceras de seguridad (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) en el servidor web del puerto 443.

## 3. Autorización y reglas de enfrentamiento
- **Objetivo autorizado:** `nova.uniautonoma.edu.co` (IP 179.1.113.103, alias de `utm.uniautonoma.edu.co`). Solo ese host; ningún otro sistema.
- **Autorización:** el enunciado del trabajo final, publicado el 9 de noviembre de 2026 por el docente Jefferson Andrés Muñoz, asigna la plataforma Nova como sistema bajo prueba y establece al docente como propietario del sistema para este ejercicio. No se dispuso de una autorización adicional por escrito con ventana horaria específica; el grupo la tomó como el periodo del trabajo.
- **Ventana de ejecución:** 16–17 de noviembre de 2026 (periodo de entrega del trabajo). El escaneo se ejecutó el 17 de noviembre entre las 00:29 y las 02:50 (hora local; 05:29–07:50 UTC).
- **Restricciones respetadas:** sin explotación de vulnerabilidades, sin denegación de servicio, sin acceso a datos fuera del rol y escaneo sin credenciales con el perfil estándar de Greenbone, que no incluye pruebas destructivas. Tampoco se abrió ni se navegó por la interfaz del puerto 10443: solo se usaron los datos que reportó el escáner.
- **Confidencialidad:** el enunciado indica que los hallazgos se entregan solo al docente; por decisión del grupo el informe y el reporte también se publicaron en el repositorio del trabajo.

## 4. Alcance y metodología
| Elemento | Valor |
|---|---|
| Herramienta | Greenbone Community Edition (OpenVAS) en Docker, imágenes `stable` |
| Feed de pruebas (NVT) | Versión 202611160548 |
| Perfil de escaneo | **Full and fast** |
| Puertos | Lista "All IANA assigned TCP" |
| Autenticación | **Sin credenciales** (escaneo externo) |
| Origen | PC del estudiante a través de Internet (2 saltos hasta el objetivo) |
| Duración | ≈ 2 h 21 min |
| Automatización | `seguridad/escanear.sh` (crea objetivo y tarea, lanza y exporta) |

**Limitaciones de la configuración:** el reporte indica que el escaneo genérico de aplicaciones web está desactivado en el perfil usado, por lo que **no se probaron vulnerabilidades propias de la aplicación UniDoc** (inyección, XSS, control de acceso). Esto cubre infraestructura, TLS y servicios de red.

## 5. Resultados generales
| Severidad | Cantidad |
|---|---|
| Crítica (CVSS ≥ 9,0) | 0 |
| Alta (7,0 – 8,9) | 0 |
| Media (4,0 – 6,9) | 2 |
| Baja (0,1 – 3,9) | 1 |
| Informativa (0) | 47 |
| **Total** | **50** |

**Puertos y servicios detectados en 179.1.113.103:**
| Puerto | Servicio | Observación |
|---|---|---|
| 80/tcp | HTTP, nginx | Versión no identificable |
| 443/tcp | HTTPS, nginx | TLS 1.2 y 1.3; aquí vive la plataforma Nova |
| 8088/tcp | HTTP, nginx | Servicio web adicional |
| 10443/tcp | HTTPS, banner **OPNsense** | Interfaz web de un firewall; certificado vencido; sesiones PHP |

Otras detecciones: jQuery 3.5.1 en `/ui/js/` (puerto 10443), PHP (cookie `PHPSESSID`), sistema operativo no identificado.

## 6. Tabla de hallazgos
| ID | Nombre | CVE | CVSS | Severidad | Host:puerto | Estado |
|---|---|---|---|---|---|---|
| VUL-01 | Certificado SSL/TLS expirado | — | 5,0 | Media | 179.1.113.103:10443 | Confirmado (QoD 99) |
| VUL-02 | Divulgación de información por WPAD (`/wpad.dat`) | — | 4,3 | Media | 179.1.113.103:10443 | Por validar manualmente (QoD 70) |
| VUL-03 | Divulgación por marcas de tiempo TCP | — | 2,6 | Baja | 179.1.113.103 (host) | Confirmado (QoD 80) |
| VUL-04 | Interfaz de firewall OPNsense expuesta a Internet | — | 0,0 (OpenVAS) | Informativa en OpenVAS; **riesgo alto a juicio del grupo** | 179.1.113.103:10443 | Confirmado por banner (QoD 80) |
| VUL-05 | HSTS no configurado | — | 0,0 | Informativa | 179.1.113.103:443 | Confirmado |
| VUL-06 | Cabeceras de seguridad HTTP ausentes | — | 0,0 | Informativa | 179.1.113.103:443 | Confirmado |
| VUL-07 | Suites de cifrado de nivel medio (CBC/CAMELLIA) | — | 0,0 | Informativa | 179.1.113.103:443 | Confirmado |

El resto de los resultados informativos son detecciones de servicios, versiones TLS, certificados y métodos HTTP, que se consultan en el reporte anexo. Ninguno de los hallazgos tiene un CVE asociado.

## 7. Análisis detallado de hallazgos

### VUL-01 – Certificado TLS expirado (Media, CVSS 5,0)
- **Descripción:** el certificado del servicio del puerto 10443 expiró el 2026-09-12 23:59:59. Emisor: DigiCert Global G2 TLS RSA SHA256 2020 CA1; clave RSA de 4096 bits. Lleva 66 días vencido al momento del escaneo.
- **Impacto en el negocio:** los navegadores muestran advertencias de seguridad; los usuarios se acostumbran a aceptar errores de certificado, lo que facilita ataques de intermediario. Indica además un proceso de renovación de certificados que no está funcionando.
- **Relación con el rol Aspirante:** el aspirante no usa este puerto directamente, pero comparte servidor y organización. Un certificado vencido en infraestructura de la misma institución reduce la confianza y el cumplimiento de las medidas de seguridad exigidas por la Ley 1581 de 2012 para datos personales.
- **Evidencia:** reporte OpenVAS, "SSL/TLS: Certificate Expired", huella SHA-256 `FE74DAFC…AC8951`.
- **Recomendación:** renovar el certificado, automatizar la renovación (ACME o alertas a 30 días del vencimiento) y monitorear fechas de expiración.

### VUL-02 – Divulgación por WPAD (Media, CVSS 4,3)
- **Descripción:** el escáner encontró `https://nova.uniautonoma.edu.co:10443/wpad.dat` accesible. El protocolo WPAD permite que los clientes descubran la configuración del proxy; un archivo expuesto o mal configurado puede revelar la topología interna o facilitar el redireccionamiento del tráfico (ataque "badWPAD").
- **Impacto:** divulgación de información de red interna; en un escenario hostil, posible desvío de tráfico de clientes configurados con descubrimiento automático.
- **Relación con el rol Aspirante:** bajo en lo directo; el riesgo recae en equipos de la red institucional, no en el flujo del aspirante.
- **Evidencia:** reporte OpenVAS, "Web Proxy Auto-Discovery Protocol Information Disclosure (badWPAD, HTTP) – Active Check" (QoD 70, método de detección activo). Una calidad de detección de 70 % exige **validación manual**; el grupo no abrió la URL para respetar el alcance.
- **Recomendación:** si WPAD no se usa, retirar el archivo y bloquear su descubrimiento; si se usa, restringir su acceso a la red interna y servirlo solo por HTTPS.

### VUL-03 – Marcas de tiempo TCP (Baja, CVSS 2,6)
- **Descripción:** el host implementa las marcas de tiempo TCP (RFC 1323/7323), lo que permite estimar cuánto tiempo lleva encendido.
- **Impacto:** fuga menor de información; el tiempo de actividad ayuda a inferir qué parches se han aplicado tras reinicios.
- **Relación con el rol Aspirante:** ninguna directa.
- **Evidencia:** dos paquetes con valores 89913031 y 89915108 con un segundo de diferencia.
- **Recomendación:** desactivar las marcas de tiempo si la política de la institución lo permite (en Linux, `net.ipv4.tcp_timestamps = 0`). Prioridad baja: puede afectar el rendimiento de TCP en redes con pérdida.

### VUL-04 – Interfaz de firewall OPNsense expuesta (riesgo alto a juicio del grupo)
- **Descripción:** el puerto 10443 responde con el banner `Server: OPNsense` aunque el servidor intenta ocultar su identidad (OpenVAS lo descubrió con una petición especial). Sirve contenido bajo `/ui/js/` con jQuery 3.5.1 y usa sesiones PHP: es el patrón de la interfaz web de administración de un firewall.
- **Impacto:** una interfaz de administración de seguridad alcanzable desde Internet queda expuesta a ataques de fuerza bruta, a vulnerabilidades futuras de la aplicación y a credenciales filtradas. Si se compromete, el atacante controla las reglas de red de toda la institución. Combinada con VUL-01, un certificado vencido en esa misma interfaz sugiere que no recibe mantenimiento regular.
- **Relación con el rol Aspirante:** indirecta pero importante: ese equipo protege la red donde vive la base de datos con hojas de vida, documentos de identidad, datos bancarios y antecedentes de los aspirantes.
- **Evidencia:** reporte OpenVAS, "Hidden WWW Server Name (HTTP)" y "HTTP Server Banner Enumeration" en el puerto 10443; "Services" indica que el servicio es web sobre TLS. OpenVAS clasifica estos resultados como informativos (CVSS 0,0); la valoración de riesgo alto es del grupo, por la naturaleza del servicio expuesto. **No se abrió la interfaz ni se intentó autenticarse.**
- **Recomendación:** limitar el acceso a la interfaz de administración a la red interna o a una VPN con lista de IP permitidas; activar autenticación de doble factor; mantener el sistema actualizado; ocultar el banner del servidor.

### VUL-05 – HSTS ausente en el puerto 443 (Informativa)
- **Descripción:** el servidor no envía `Strict-Transport-Security`, que obliga al navegador a usar siempre HTTPS.
- **Impacto:** un atacante en la misma red (por ejemplo, wifi pública) podría forzar una degradación a HTTP y capturar sesiones o datos que el aspirante envía.
- **Relación con el rol Aspirante:** directa: es el servicio por el que el aspirante inicia sesión y carga sus documentos.
- **Evidencia:** reporte OpenVAS, "SSL/TLS: HTTP Strict Transport Security (HSTS) Missing" en 443/tcp.
- **Recomendación:** agregar `Strict-Transport-Security: max-age=31536000; includeSubDomains` en nginx tras verificar que todo el sitio funcione por HTTPS.

### VUL-06 – Cabeceras de seguridad HTTP ausentes (Informativa)
- **Descripción:** en el puerto 443 faltan, entre otras, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y las políticas Cross-Origin (COOP/COEP/CORP). OpenVAS listó 19 cabeceras recomendadas ausentes. Algunas (HPKP, Expect-CT, X-XSS-Protection, Feature-Policy) están obsoletas y no son necesarias.
- **Impacto:** sin CSP y `X-Frame-Options` hay mayor exposición a XSS y a *clickjacking* sobre formularios con datos personales; sin `X-Content-Type-Options`, los navegadores pueden interpretar archivos con un tipo distinto del declarado.
- **Relación con el rol Aspirante:** directa, por los formularios de registro, datos personales y carga de documentos.
- **Evidencia:** reporte OpenVAS, "HTTP Security Headers Detection" en 443/tcp.
- **Recomendación:** definir una política mínima de cabeceras en nginx (`add_header`) y probarla en un entorno de pruebas antes de producción, sobre todo la CSP.

### VUL-07 – Cifrados de nivel medio (Informativa)
- **Descripción:** el puerto 443 acepta suites TLS 1.2 con CBC y CAMELLIA además de las GCM modernas. No se aceptan protocolos obsoletos: solo TLS 1.2 y 1.3, lo cual es correcto.
- **Impacto:** bajo; los modos CBC son aceptables pero menos recomendados que AEAD (GCM/ChaCha20).
- **Recomendación:** limitar las suites a las de tipo AEAD con *forward secrecy*.

## 8. Falsos positivos y limitaciones
- **VUL-02 (WPAD)** tiene QoD 70 %: puede ser una respuesta genérica de la interfaz y debe validarse manualmente. Se marca como "por validar", no como falso positivo confirmado.
- **Se descartaron** como falsos positivos probables las alertas obsoletas HPKP, Expect-CT y X-XSS-Protection, porque los navegadores actuales ya no las usan.
- **Versiones no identificadas:** OpenVAS no pudo determinar la versión de nginx ni del sistema operativo, por lo que **la ausencia de CVE no demuestra que el software esté parchado**.
- El escaneo fue **externo y sin credenciales**: no ve parches del sistema operativo, configuración interna ni bases de datos.
- **No se evaluó la lógica de la aplicación** (control de acceso por rol, validación de entradas): el escaneo web genérico estaba desactivado.
- El servidor es compartido y puede estar detrás de un firewall o NAT; un hallazgo en el puerto 10443 puede pertenecer al equipo de red y no a la aplicación UniDoc.

## 9. Matriz de riesgo
| | Impacto bajo | Impacto medio | Impacto alto |
|---|---|---|---|
| **Probabilidad alta** | | VUL-01 (certificado ya vencido) | |
| **Probabilidad media** | VUL-02 | VUL-05, VUL-06 | VUL-04 |
| **Probabilidad baja** | VUL-03, VUL-07 | | |

Prioridad resultante: VUL-04 (alta) → VUL-01, VUL-05, VUL-06 (media) → VUL-02 (media, por validar) → VUL-03, VUL-07 (baja).

## 10. Plan de remediación
| Prioridad | Acción | Hallazgo | Responsable sugerido | Plazo |
|---|---|---|---|---|
| 1 | Restringir la interfaz de administración del firewall a red interna/VPN; activar MFA | VUL-04 | Infraestructura / Seguridad TI | 7 días (decisión de la institución por el riesgo) |
| 2 | Renovar el certificado del puerto 10443 y automatizar la renovación | VUL-01 | Infraestructura | 30 días |
| 3 | Activar HSTS y cabeceras de seguridad en nginx (443) | VUL-05, VUL-06 | Desarrollo / Infraestructura | 30 días |
| 4 | Validar y retirar `wpad.dat` | VUL-02 | Redes | 90 días |
| 5 | Limitar suites TLS a AEAD | VUL-07 | Infraestructura | 90 días |
| 6 | Evaluar desactivar marcas de tiempo TCP | VUL-03 | Infraestructura | Próximo ciclo |
| 7 | Repetir el escaneo con credenciales y escaneo web activado para cubrir la aplicación | Alcance | Grupo / docente | Próximo ciclo |

## 11. Conclusiones
Con lo evaluado, el estado de seguridad es **aceptable con observaciones**: no hay vulnerabilidades críticas ni altas con CVE conocido y el sitio principal (443) solo ofrece TLS 1.2 y 1.3. Los puntos débiles están en la **infraestructura y su mantenimiento**: un firewall con interfaz expuesta y certificado vencido, y la falta de HSTS y cabeceras de seguridad en el servicio que usa el aspirante.

**Relación con ISO/IEC 25010 – Seguridad:**
- **Confidencialidad:** afectada por la falta de HSTS y de cabeceras (VUL-05, VUL-06) y por la exposición de la interfaz de administración (VUL-04).
- **Integridad:** depende de CSP y de cabeceras anti-*clickjacking* ausentes (VUL-06).
- **Autenticidad:** debilitada por el certificado vencido (VUL-01).
- **No repudio y responsabilidad:** no evaluados con este tipo de escaneo.

Este resultado **no certifica** la seguridad de UniDoc: la lógica de la aplicación no fue evaluada.

## 12. Anexos
- Anexo A: reporte completo exportado de OpenVAS (`Anexo_Reporte_OpenVAS.pdf`) y CSV con los 50 resultados (`reporte_openvas.csv`), incluidos en `entrega/pdf/`.
- Script de ejecución: `seguridad/escanear.sh` y `seguridad/greenbone/docker-compose.yml` (en el repositorio).
