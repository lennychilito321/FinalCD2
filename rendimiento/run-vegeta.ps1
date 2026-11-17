<#
  Pruebas de carga y estres con Vegeta - flujos publicos del Aspirante (solo GET).
  NO EJECUTAR sin: (1) ventana de tiempo autorizada y (2) limite maximo de carga fijado por el docente.
  Uso:  .\run-vegeta.ps1 -Modo carga   -MaxRps <limite>
        .\run-vegeta.ps1 -Modo estres  -MaxRps <limite>
  Requiere vegeta en el PATH (o en .\bin).
#>
param(
  [ValidateSet('carga','estres')] [string]$Modo = 'carga',
  [Parameter(Mandatory=$true)] [int]$MaxRps,
  [int]$DuracionNivel = 60
)
$ErrorActionPreference = 'Stop'
$bd = Join-Path $PSScriptRoot "bin"
if (Test-Path $bd) { $env:PATH += ";$bd" }
$targets = Join-Path $PSScriptRoot 'targets-aspirante.txt'
$out = Join-Path $PSScriptRoot ('resultados\' + $Modo + '_' + (Get-Date -Format 'yyyyMMdd_HHmm'))
New-Item -ItemType Directory -Force $out | Out-Null

$niveles = if ($Modo -eq 'carga') { @(1,2,3,5) } else { @(2,5,10,15,20,40,80) }
$niveles = $niveles | Where-Object { $_ -le $MaxRps }
if ($niveles.Count -lt 4) { Write-Warning "Menos de 4 niveles dentro del tope ($MaxRps rps)." }

function Atacar($rps, $dur, $nombre) {
  $bin = Join-Path $out "$nombre.bin"
  $txt = Join-Path $out "$nombre.txt"
  $hst = Join-Path $out "${nombre}_hist.txt"
  # cmd /c evita que PowerShell 5.1 recodifique la salida binaria de vegeta
  cmd /c "vegeta attack -targets ""$targets"" -rate $rps/1s -duration ${dur}s -timeout 30s > ""$bin"""
  cmd /c "vegeta report ""$bin"" > ""$txt"""
  cmd /c "vegeta report -type=hist[0,100ms,250ms,500ms,1s,2s,5s] ""$bin"" > ""$hst"""
  Get-Content $txt
}

foreach ($rps in $niveles) {
  Write-Host "== Nivel $rps req/s durante $DuracionNivel s =="
  Atacar $rps $DuracionNivel "nivel_${rps}rps"
  Start-Sleep -Seconds 20
}
if ($Modo -eq 'estres') {
  Write-Host "== Recuperacion a 1 req/s =="
  Atacar 1 30 "recuperacion_1rps"
}
Write-Host "Salidas en $out"
