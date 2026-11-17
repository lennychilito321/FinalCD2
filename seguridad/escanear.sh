#!/usr/bin/env bash
# Crea el objetivo autorizado, lanza el escaneo "Full and fast" (sin credenciales, sin DoS) y exporta el reporte.
# Uso: bash openvas/escanear.sh nova.uniautonoma.edu.co
set -u
export MSYS_NO_PATHCONV=1
HOST="${1:-nova.uniautonoma.edu.co}"
cd "$(dirname "$0")/greenbone"
P=$(cat ../.gvm-admin-pass.txt)
OUT="../reportes"; mkdir -p "$OUT"
g() { docker compose -p greenbone-community-edition run --rm -T gvm-tools gvm-cli --gmp-username admin --gmp-password "$P" socket --socketpath /run/gvmd/gvmd.sock --xml "$1" 2>&1 | grep -v "Container"; }
attr() { grep -oE "$1=\"[^\"]+\"" | head -1 | cut -d'"' -f2; }

CFG=daba56c8-73ec-11df-a475-002264764cea   # Full and fast
PL=33d0cd82-57c6-11e1-8ed1-406186ea4fc5    # All IANA assigned TCP
SC=08b69003-5fc2-4037-a479-93b440211c73    # OpenVAS Default

echo "Esperando perfil Full and fast..."
until g "<get_configs config_id=\"$CFG\"/>" | grep -q "Full and fast"; do sleep 60; done
echo "Perfil disponible $(date)"

T=$(g "<create_target><name>Nova-$HOST-$(date +%s)</name><hosts>$HOST</hosts><port_list id=\"$PL\"/><alive_tests>Consider Alive</alive_tests></create_target>" | attr id)
echo "target=$T"
K=$(g "<create_task><name>Escaneo-Nova-Aspirante-$(date +%Y%m%d)</name><config id=\"$CFG\"/><target id=\"$T\"/><scanner id=\"$SC\"/></create_task>" | attr id)
echo "task=$K"
R=$(g "<start_task task_id=\"$K\"/>" | grep -oE '<report_id>[^<]+' | cut -d'>' -f2)
echo "report=$R inicio=$(date)"

while true; do
  S=$(g "<get_tasks task_id=\"$K\"/>" | grep -oE '<status>[^<]+</status>|<progress>[^<]+</progress>' | head -2 | tr '\n' ' ')
  echo "$(date +%H:%M) $S"
  echo "$S" | grep -qE "Done|Stopped|Interrupted" && break
  sleep 120
done

# Exportar PDF y CSV
g "<get_reports report_id=\"$R\" format_id=\"c402cc3e-b531-11e1-9163-406186ea4fc5\" details=\"1\" ignore_pagination=\"1\"/>" > "$OUT/report_pdf.xml"
g "<get_reports report_id=\"$R\" format_id=\"c1645568-627a-11e3-a660-406186ea4fc5\" details=\"1\" ignore_pagination=\"1\"/>" > "$OUT/report_csv.xml"
python - "$OUT" <<'EOF'
import re,base64,sys
o=sys.argv[1]
for n,ext in (("report_pdf","pdf"),("report_csv","csv")):
    s=open(f"{o}/{n}.xml",encoding="utf8",errors="ignore").read()
    m=re.search(r"</report_format>(.*?)</report>",s,re.S)
    if m:
        b=m.group(1).strip()
        data=base64.b64decode(b)
        open(f"{o}/reporte_openvas.{ext}","wb").write(data)
        print("exportado",ext,len(data))
EOF
echo "FIN $(date)"
