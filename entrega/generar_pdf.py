"""Genera los 3 PDF de entrega (portada común + informe) con Chrome headless.
Uso: python entrega/generar_pdf.py [N_GRUPO]    Requiere: pip install markdown, Google Chrome."""
import sys, pathlib, subprocess, markdown

N = sys.argv[1] if len(sys.argv) > 1 else ""
root = pathlib.Path(__file__).parent
out = root / "pdf"; out.mkdir(exist_ok=True)
portada = (root / "1_Funcionales" / "00_Portada_y_severidad.md").read_text(encoding="utf8")
informes = {
    f"G{N}_Funcionales": root / "1_Funcionales" / "G_Funcionales.md",
    f"G{N}_Rendimiento": root / "2_Rendimiento" / "G_Rendimiento.md",
    f"G{N}_Vulnerabilidades": root / "3_Vulnerabilidades" / "G_Vulnerabilidades.md",
}
CSS = """body{font-family:Segoe UI,Arial,sans-serif;font-size:11pt;line-height:1.45;margin:0 8px}
h1{font-size:20pt;border-bottom:2px solid #1f3a5f;padding-bottom:4px}h2{font-size:14pt;color:#1f3a5f;margin-top:18px}
table{border-collapse:collapse;width:100%;margin:8px 0;font-size:9pt}th,td{border:1px solid #bbb;padding:4px 6px;text-align:left;vertical-align:top}
th{background:#eef2f7}code{background:#f3f3f3;padding:0 3px}pre{background:#f3f3f3;padding:8px;font-size:9pt;white-space:pre-wrap}
blockquote{border-left:4px solid #c33;margin:8px 0;padding:2px 10px;background:#fff4f4}.pb{page-break-after:always}"""
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
for name, path in informes.items():
    md = portada + "\n\n<div class='pb'></div>\n\n" + path.read_text(encoding="utf8")
    html = markdown.markdown(md, extensions=["tables", "fenced_code", "md_in_html"])
    h = out / f"{name}.html"
    h.write_text(f"<!doctype html><meta charset='utf-8'><style>{CSS}</style>{html}", encoding="utf8")
    subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={out / (name + '.pdf')}", h.as_uri()], check=True)
    h.unlink()
    print("generado", out / f"{name}.pdf")
