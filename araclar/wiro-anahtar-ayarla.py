#!/usr/bin/env python3
"""Wiro MCP anahtarını ~/.claude.json içine yazar (API Key Only projeler için).

Anahtar gizli sorulur; ekrana, dosyaya ya da geçmişe basılmaz.
Önce ~/.claude.json yedeklenir.
"""
import getpass
import json
import os
import shutil
import sys
import tempfile

YOL = os.path.expanduser("~/.claude.json")

with open(YOL) as f:
    ayar = json.load(f)

wiro = ayar.get("mcpServers", {}).get("wiro")
if not wiro:
    sys.exit("~/.claude.json içinde mcpServers.wiro bulunamadı.")

anahtar = getpass.getpass("Wiro API Key (secret değil, yazarken görünmez): ").strip()
if not anahtar:
    sys.exit("Boş anahtar, hiçbir şey değişmedi.")
if ":" in anahtar or " " in anahtar:
    sys.exit("Anahtarda ':' ya da boşluk var. API Key Only için yalnız API Key'i gir.")

eski = wiro.get("headers", {}).get("Authorization", "")
yeni = "Bearer " + anahtar
print("Eski değerle", "AYNI." if eski == yeni else "FARKLI.", f"(yeni anahtar {len(anahtar)} karakter)")

shutil.copy2(YOL, YOL + ".bak-wiro")
wiro.setdefault("headers", {})["Authorization"] = yeni

fd, gecici = tempfile.mkstemp(dir=os.path.dirname(YOL))
with os.fdopen(fd, "w") as f:
    json.dump(ayar, f, indent=2, ensure_ascii=False)
shutil.copymode(YOL, gecici)
os.replace(gecici, YOL)
print("Yazıldı. Yedek: ~/.claude.json.bak-wiro — şimdi Claude uygulamasını yeniden başlat.")
