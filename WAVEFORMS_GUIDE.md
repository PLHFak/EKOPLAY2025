# 🎬 EKOPLAY - Guide pour Générer de Vrais Waveforms

## ⚠️ Problème Actuel

Les waveforms affichés pour Jump, Tennis, Basketball, Football, Cricket et UFC sont des **placeholders générés par IA** et ne correspondent PAS aux vraies vidéos Vimeo.

Seul **Boxing** a de vrais waveforms synchronisés.

---

## ✅ Solution 1: Accepter les Waveforms Génériques (Rapide)

### Avantages
- Déjà fait
- Cohérence visuelle
- Fonctionne pour la démo

### Action
Ajouter une note dans l'interface pour clarifier que les waveforms sont des représentations visuelles stylisées.

---

## ✅ Solution 2: Générer de Vrais Waveforms (Professionnel)

### Prérequis
```bash
# Installer ffmpeg
brew install ffmpeg

# Installer yt-dlp (pour télécharger depuis Vimeo)
pip3 install yt-dlp
```

### Process pour un Sport

#### Étape 1: Télécharger les vidéos Vimeo
```bash
# Exemple pour Jump
yt-dlp -f "best[height<=720]" -o "jump1.mp4" "https://vimeo.com/1148259490"
yt-dlp -f "best[height<=720]" -o "jump2.mp4" "https://vimeo.com/1148259570"
yt-dlp -f "best[height<=720]" -o "jump3.mp4" "https://vimeo.com/1148493931"
```

#### Étape 2: Extraire l'audio
```bash
ffmpeg -i jump1.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 jump1.wav
ffmpeg -i jump2.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 jump2.wav
ffmpeg -i jump3.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 jump3.wav
```

#### Étape 3: Générer les waveforms
```bash
ffmpeg -i jump1.wav -filter_complex \
  "showwavespic=s=1200x200:colors=0x667eea|0x764ba2:scale=lin" \
  -frames:v 1 assets/waveforms/waveform_jump1.png

ffmpeg -i jump2.wav -filter_complex \
  "showwavespic=s=1200x200:colors=0xf59e0b|0xef4444:scale=lin" \
  -frames:v 1 assets/waveforms/waveform_jump2.png

ffmpeg -i jump3.wav -filter_complex \
  "showwavespic=s=1200x200:colors=0xa855f7|0xec4899:scale=lin" \
  -frames:v 1 assets/waveforms/waveform_jump3.png
```

#### Étape 4: Nettoyer
```bash
rm jump*.mp4 jump*.wav
```

### IDs Vimeo par Sport

```bash
# Jump
1148259490  # Real-Time
1148259570  # Slow-Motion Standard
1148493931  # Slow-Motion EKO

# Tennis
1148274250  # Real-Time
1148430431  # Slow-Motion Standard
1148430407  # Slow-Motion EKO

# Basketball
1148505678  # Real-Time
1148505678  # Slow-Motion Standard (même que Real-Time)
1148505838  # Slow-Motion EKO

# Football
1148437490  # Real-Time
1148505311  # Slow-Motion Standard
1148505316  # Slow-Motion EKO

# Cricket
1148513396  # Real-Time
1148513408  # Slow-Motion Standard
1148513430  # Slow-Motion EKO

# UFC
1148517510  # Real-Time
1148517488  # Slow-Motion Standard
1148517463  # Slow-Motion EKO
```

---

## 🎨 Couleurs des Waveforms

Pour cohérence visuelle:

- **Video 1 (Real-Time)**: Bleu/Violet (`0x667eea|0x764ba2`)
- **Video 2 (Standard)**: Orange/Rouge (`0xf59e0b|0xef4444`)
- **Video 3 (EKO)**: Violet/Rose (`0xa855f7|0xec4899`)

---

## 📝 Checklist

Pour chaque sport:
- [ ] Télécharger les 3 vidéos Vimeo
- [ ] Extraire l'audio en WAV
- [ ] Générer les 3 waveforms avec les bonnes couleurs
- [ ] Placer dans `assets/waveforms/`
- [ ] Tester dans l'application
- [ ] Commit et push

---

## ⏱️ Temps Estimé

- Par sport: ~15-20 minutes
- Tous les sports (6): ~2 heures

---

## 🚀 Déploiement

Après génération:
```bash
git add assets/waveforms/
git commit -m "Update: Real waveforms for all sports"
git push
```

---

## 💡 Alternative: Service en Ligne

Si vous ne voulez pas installer ffmpeg localement, utilisez:
- **Audacity** (gratuit) - Importer audio → Analyser → Exporter image
- **WavePad** - Outil en ligne
- **Online Audio Converter** - Convertir et visualiser

---

## 📞 Support

Pour toute question, consultez:
- Documentation ffmpeg: https://ffmpeg.org/documentation.html
- Documentation yt-dlp: https://github.com/yt-dlp/yt-dlp
