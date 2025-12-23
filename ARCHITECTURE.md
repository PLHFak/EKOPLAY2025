# 🏗️ EKOPLAY - Architecture et Guide d'Ajout de Sport

## 📊 Architecture Actuelle

### Problème Identifié
Les waveforms affichées ne correspondent PAS aux vidéos Vimeo chargées. Les images de waveforms sont des **placeholders générés par IA** et ne reflètent pas le vrai contenu audio.

### Structure des Fichiers

```
EKOPLAY/
├── index.html              # Page principale (structure HTML statique)
├── demo-gallery.html       # Galerie des démos
├── app.js                  # Logique de l'application
├── demo-library.js         # Configuration des démos
├── style.css               # Styles
└── assets/
    ├── thumbnails/         # Images de preview pour la galerie
    │   ├── boxing.jpg
    │   ├── basketball.jpg
    │   ├── cricket.jpg
    │   ├── football.jpg
    │   ├── jump.jpg
    │   ├── tennis.jpg
    │   └── ufc.jpg
    └── waveforms/          # ⚠️ PROBLÈME: Waveforms génériques non synchronisées
        ├── waveform1.png (boxing - OK, original)
        ├── waveform2.png (boxing - OK, original)
        ├── waveform3.png (boxing - OK, original)
        ├── waveform_jump1.png (❌ Généré par IA, pas réel)
        ├── waveform_jump2.png (❌ Généré par IA, pas réel)
        ├── waveform_jump3.png (❌ Généré par IA, pas réel)
        └── ... (tous les autres sont des placeholders)
```

---

## ✅ Solution : 2 Options

### Option 1: Waveforms Réels (Recommandé pour production)

**Avantages:**
- Représentation exacte de l'audio
- Professionnel et précis
- Aide à la synchronisation visuelle

**Inconvénients:**
- Nécessite d'extraire l'audio des vidéos Vimeo
- Processus manuel pour chaque vidéo

**Process:**
1. Télécharger les 3 vidéos Vimeo du sport
2. Extraire l'audio avec `ffmpeg`
3. Générer les waveforms avec un outil audio
4. Placer dans `assets/waveforms/`

### Option 2: Waveforms Génériques Stylisés (Rapide)

**Avantages:**
- Rapide à mettre en place
- Cohérence visuelle
- Pas besoin d'accès aux vidéos

**Inconvénients:**
- Ne représente pas le vrai audio
- Purement décoratif

**Process:**
- Utiliser les waveforms générés par IA (déjà fait)
- Accepter qu'ils sont décoratifs
- Documenter clairement que c'est visuel uniquement

---

## 🔧 Architecture Recommandée

### Principe: Un Sport = Un Package Complet

Chaque sport doit avoir:

```javascript
{
    sportName: {
        // Métadonnées
        title: "Nom du Sport Demo",
        subtitle: "Description courte",
        
        // Vidéos Vimeo (3 obligatoires)
        vimeoIds: [
            'ID_VIDEO_1',  // Real-Time (1×)
            'ID_VIDEO_2',  // Slow-Motion Standard (3×)
            'ID_VIDEO_3'   // Slow-Motion EKO (3×)
        ],
        
        // Waveforms (3 obligatoires, doivent correspondre aux vidéos)
        waveforms: [
            'assets/waveforms/waveform_SPORT1.png',
            'assets/waveforms/waveform_SPORT2.png',
            'assets/waveforms/waveform_SPORT3.png'
        ],
        
        // Thumbnail pour la galerie
        thumbnail: 'assets/thumbnails/SPORT.jpg',
        
        // Descriptions des vidéos
        videos: [
            {
                title: "Video 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Description...",
                speed: "1×"
            },
            // ... 2 autres vidéos
        ]
    }
}
```

---

## 📝 Guide: Ajouter un Nouveau Sport

### Étape 1: Préparer les Assets

1. **Thumbnail** (700x400px, JPEG)
   - Placer dans: `assets/thumbnails/SPORT.jpg`
   - Action shot du sport

2. **Waveforms** (3 fichiers PNG)
   - **Option A (Réel):** Extraire des vidéos Vimeo
   - **Option B (Générique):** Générer avec IA ou réutiliser un template
   - Placer dans: `assets/waveforms/waveform_SPORT1.png` (×3)

### Étape 2: Obtenir les IDs Vimeo

Pour chaque vidéo Vimeo, noter l'ID:
- URL: `https://vimeo.com/1148517510`
- ID: `1148517510`

Vous avez besoin de 3 IDs:
- Vidéo 1: Real-Time (vitesse normale)
- Vidéo 2: Slow-Motion Standard
- Vidéo 3: Slow-Motion avec EKO

### Étape 3: Ajouter dans demo-library.js

```javascript
// Dans DEMO_LIBRARY, ajouter:
nouveauSport: {
    title: "Nouveau Sport Demo",
    subtitle: "Description du sport",
    vimeoIds: [
        'ID_VIDEO_1',
        'ID_VIDEO_2',
        'ID_VIDEO_3'
    ],
    waveforms: [
        'assets/waveforms/waveform_nouveauSport1.png',
        'assets/waveforms/waveform_nouveauSport2.png',
        'assets/waveforms/waveform_nouveauSport3.png'
    ],
    videos: [
        {
            title: "Video 1 — Real-Time (Reference)",
            badge: "LIVE 1×",
            description: "Original camera audio at native speed",
            speed: "1×"
        },
        {
            title: "Video 2 — Slow-Motion (Standard)",
            badge: "REPLAY 3×",
            description: "Ambient audio with slow-motion video",
            speed: "3×"
        },
        {
            title: "Video 3 — Slow-Motion (EKO Synthetic)",
            badge: "REPLAY 3×",
            description: "EKO synthetic audio maintains natural pitch",
            speed: "3×"
        }
    ]
}
```

### Étape 4: Ajouter dans demo-gallery.html

```html
<!-- Nouveau Sport Demo -->
<a href="index.html?demo=nouveauSport" class="demo-card">
    <img src="assets/thumbnails/nouveauSport.jpg" alt="Nouveau Sport Demo" class="demo-thumbnail">
    <div class="demo-info">
        <h3 class="demo-title">🏆 Nouveau Sport</h3>
        <div class="demo-meta">
            <span class="demo-duration">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                20 sec
            </span>
            <span class="demo-badge">AVAILABLE</span>
        </div>
    </div>
</a>
```

### Étape 5: Tester

1. Lancer le serveur local: `python3 -m http.server 8000`
2. Ouvrir: `http://localhost:8000/demo-gallery.html`
3. Cliquer sur le nouveau sport
4. Vérifier:
   - ✅ Les 3 vidéos se chargent
   - ✅ Les waveforms s'affichent (même si génériques)
   - ✅ L'audio fonctionne
   - ✅ Le changement de démo ne cumule pas les sons

### Étape 6: Déployer

```bash
git add .
git commit -m "Add: Nouveau Sport demo"
git push
```

---

## ⚠️ État Actuel des Waveforms

### Waveforms Réels (Synchronisés):
- ✅ **Boxing** (waveform1.png, waveform2.png, waveform3.png)

### Waveforms Génériques (Placeholders IA):
- ❌ **Jump** - Ne correspond PAS aux vraies vidéos
- ❌ **Tennis** - Ne correspond PAS aux vraies vidéos
- ❌ **Basketball** - Ne correspond PAS aux vraies vidéos
- ❌ **Football** - Ne correspond PAS aux vraies vidéos
- ❌ **Cricket** - Ne correspond PAS aux vraies vidéos
- ❌ **UFC** - Ne correspond PAS aux vraies vidéos

---

## 🎯 Recommandation

### Pour la Démo (Court Terme):
- Garder les waveforms génériques
- Ajouter une note dans l'interface: "Waveforms are visual representations"
- Fonctionne parfaitement pour la démonstration

### Pour la Production (Long Terme):
- Extraire les vrais waveforms des vidéos Vimeo
- Remplacer les placeholders
- Garantir la synchronisation visuelle exacte

---

## 📞 Support

Pour toute question sur l'ajout d'un nouveau sport, référez-vous à ce guide ou consultez les exemples existants dans `demo-library.js`.
