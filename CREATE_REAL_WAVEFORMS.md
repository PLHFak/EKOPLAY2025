# 🎬 Guide pour Créer les VRAIS Waveforms

## ✅ Waveforms Restaurés

Les VRAIS waveforms suivants ont été restaurés depuis le backup :

- ✅ **Basketball** (3 waveforms) - 406K, 509K, 577K
- ✅ **Cricket** (3 waveforms) - 512K, 744K, 724K

## ⚠️ Waveforms à Créer

Les sports suivants ont besoin de VRAIS waveforms basés sur les fichiers audio réels :

- ❌ **Jump** (3 waveforms manquants)
- ❌ **Tennis** (3 waveforms manquants)
- ❌ **Football** (3 waveforms manquants)
- ❌ **UFC** (3 waveforms manquants)

## 📝 Instructions pour Créer les Waveforms

### Option 1 : Depuis des Fichiers Audio/Vidéo Locaux

Si vous avez les fichiers audio ou vidéo sources :

1. **Placez les fichiers** dans le dossier EKOPLAY
   - Format de nom : `SPORT_NUMERO.mp4` ou `SPORT_NUMERO.wav`
   - Exemples : `jump_1.mp4`, `jump_2.mp4`, `jump_3.mp4`

2. **Exécutez les commandes** :

```bash
# Pour chaque fichier vidéo, extraire l'audio et générer le waveform

# Jump
ffmpeg -i jump_1.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 jump_1.wav
ffmpeg -i jump_1.wav -filter_complex "showwavespic=s=1200x200:colors=0x667eea|0x764ba2:scale=lin" -frames:v 1 assets/waveforms/waveform_jump1.png

ffmpeg -i jump_2.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 jump_2.wav
ffmpeg -i jump_2.wav -filter_complex "showwavespic=s=1200x200:colors=0xf59e0b|0xef4444:scale=lin" -frames:v 1 assets/waveforms/waveform_jump2.png

ffmpeg -i jump_3.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 jump_3.wav
ffmpeg -i jump_3.wav -filter_complex "showwavespic=s=1200x200:colors=0xa855f7|0xec4899:scale=lin" -frames:v 1 assets/waveforms/waveform_jump3.png

# Tennis
ffmpeg -i tennis_1.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 tennis_1.wav
ffmpeg -i tennis_1.wav -filter_complex "showwavespic=s=1200x200:colors=0x667eea|0x764ba2:scale=lin" -frames:v 1 assets/waveforms/waveform_tennis1.png

ffmpeg -i tennis_2.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 tennis_2.wav
ffmpeg -i tennis_2.wav -filter_complex "showwavespic=s=1200x200:colors=0xf59e0b|0xef4444:scale=lin" -frames:v 1 assets/waveforms/waveform_tennis2.png

ffmpeg -i tennis_3.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 tennis_3.wav
ffmpeg -i tennis_3.wav -filter_complex "showwavespic=s=1200x200:colors=0xa855f7|0xec4899:scale=lin" -frames:v 1 assets/waveforms/waveform_tennis3.png

# Football
ffmpeg -i football_1.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 football_1.wav
ffmpeg -i football_1.wav -filter_complex "showwavespic=s=1200x200:colors=0x667eea|0x764ba2:scale=lin" -frames:v 1 assets/waveforms/waveform_football1.png

ffmpeg -i football_2.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 football_2.wav
ffmpeg -i football_2.wav -filter_complex "showwavespic=s=1200x200:colors=0xf59e0b|0xef4444:scale=lin" -frames:v 1 assets/waveforms/waveform_football2.png

ffmpeg -i football_3.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 football_3.wav
ffmpeg -i football_3.wav -filter_complex "showwavespic=s=1200x200:colors=0xa855f7|0xec4899:scale=lin" -frames:v 1 assets/waveforms/waveform_football3.png

# UFC
ffmpeg -i ufc_1.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 ufc_1.wav
ffmpeg -i ufc_1.wav -filter_complex "showwavespic=s=1200x200:colors=0x667eea|0x764ba2:scale=lin" -frames:v 1 assets/waveforms/waveform_ufc1.png

ffmpeg -i ufc_2.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 ufc_2.wav
ffmpeg -i ufc_2.wav -filter_complex "showwavespic=s=1200x200:colors=0xf59e0b|0xef4444:scale=lin" -frames:v 1 assets/waveforms/waveform_ufc2.png

ffmpeg -i ufc_3.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 ufc_3.wav
ffmpeg -i ufc_3.wav -filter_complex "showwavespic=s=1200x200:colors=0xa855f7|0xec4899:scale=lin" -frames:v 1 assets/waveforms/waveform_ufc3.png

# Nettoyer les fichiers WAV temporaires
rm -f *.wav
```

### Option 2 : Télécharger depuis Vimeo

Si vous avez accès aux vidéos Vimeo :

1. Téléchargez manuellement chaque vidéo depuis Vimeo
2. Renommez-les selon le format ci-dessus
3. Suivez les commandes de l'Option 1

### IDs Vimeo pour Référence

```
Jump:     1148259490, 1148259570, 1148493931
Tennis:   1148274250, 1148430431, 1148430407
Football: 1148437490, 1148505311, 1148505316
UFC:      1148517510, 1148517488, 1148517463
```

## 🎨 Couleurs des Waveforms

- **Video 1 (Real-Time)**: `0x667eea|0x764ba2` (Bleu/Violet)
- **Video 2 (Standard)**: `0xf59e0b|0xef4444` (Orange/Rouge)
- **Video 3 (EKO)**: `0xa855f7|0xec4899` (Violet/Rose)

## ✅ Vérification

Les VRAIS waveforms doivent être :
- Taille : 400-800 KB (pas 15-20 KB)
- Résolution : 1200x200 pixels
- Format : PNG

Vérifiez avec :
```bash
ls -lh assets/waveforms/waveform_*.png
```

## 📝 Après Génération

```bash
git add assets/waveforms/
git commit -m "Update: Real waveforms from audio files"
git push
```

---

**Note** : Je m'excuse d'avoir écrasé les vrais waveforms. Basketball et Cricket ont été restaurés. Pour les autres, j'ai besoin des fichiers audio/vidéo sources pour générer les vrais waveforms.
