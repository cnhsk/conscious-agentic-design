#!/bin/zsh
# Wiro çıktısını cikti/ham/ altına indirir, isteğe bağlı olarak ölçekleyip kırpar.
# Kullanım: araclar/indir.sh <adres> <ham-dosya> [<cikti-dosya> <genişlik> <yükseklik>]
set -e
cd "${0:A:h}/.."
curl -sSfL -o "$2" "$1"
sips -g pixelWidth -g pixelHeight "$2" | tail -2 | awk '{printf "%s ", $2}'; echo
if [[ -n "$3" ]]; then
  araclar/node_modules/ffmpeg-static/ffmpeg -loglevel error -y -i "$2" \
    -vf "scale=$4:$5:force_original_aspect_ratio=increase:flags=lanczos,crop=$4:$5" "$3"
  echo "→ $3 ($4×$5)"
fi
