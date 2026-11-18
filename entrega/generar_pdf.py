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
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
for name, path in informes.items():
    md = portada + "\n\n<div class='pb'></div>\n\n" + path.read_text(encoding="utf8")
    # Markdown exige una línea en blanco antes de una tabla; se inserta si falta.
    fixed = []
    for l in md.split("\n"):
        if l.startswith("|") and fixed and fixed[-1].strip() and not fixed[-1].startswith("|"):
            fixed.append("")
        fixed.append(l)
    md = "\n".join(fixed)
    html = markdown.markdown(md, extensions=["tables", "fenced_code", "md_in_html"])
    h = out / f"{name}.html"
    h.write_text(f"<!doctype html><meta charset='utf-8'><style>{CSS}</style>{html}", encoding="utf8")
    subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={out / (name + '.pdf')}", h.as_uri()], check=True)
    h.unlink()
    print("generado", out / f"{name}.pdf")
