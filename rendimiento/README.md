# Rendimiento – Vegeta

1. Descargar Vegeta v12.12.0 (Windows amd64) de https://github.com/tsenart/vegeta/releases y dejar `vegeta.exe` en `rendimiento/bin/`.
2. Solo dentro de la ventana y el tope autorizados:
```powershell
.\rendimiento\run-vegeta.ps1 -Modo carga  -MaxRps 5
.\rendimiento\run-vegeta.ps1 -Modo estres -MaxRps 20
```
Los resultados (.txt e histogramas) quedan en `rendimiento/resultados/`.
