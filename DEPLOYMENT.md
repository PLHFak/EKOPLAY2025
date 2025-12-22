# 🚀 Guide de Déploiement EKOPLAY sur GitHub Pages

## 📋 Prérequis

- ✅ Compte GitHub
- ✅ Git installé sur votre ordinateur
- ✅ Terminal/Ligne de commande

---

## 🎯 Méthode Rapide (Recommandée)

### Étape 1 : Créer le repository sur GitHub

1. Allez sur **https://github.com/new**
2. Nom du repository : `ekoplay-demo` (ou un nom de votre choix)
3. Description : `EKOPLAY - Synchronized Slow-Motion Audio Demo`
4. **IMPORTANT** : Laissez **DÉCOCHÉ** :
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
5. Cliquez sur **"Create repository"**
6. **Copiez l'URL** du repository (exemple : `https://github.com/votre-username/ekoplay-demo.git`)

### Étape 2 : Déployer avec le script automatique

Ouvrez un terminal dans le dossier EKOPLAY et exécutez :

```bash
./deploy.sh
```

Le script va :
- ✅ Initialiser Git
- ✅ Ajouter tous les fichiers
- ✅ Créer un commit
- ✅ Vous demander l'URL de votre repository
- ✅ Pousser le code sur GitHub

### Étape 3 : Activer GitHub Pages

1. Allez sur votre repository GitHub
2. Cliquez sur **"Settings"** (⚙️ en haut à droite)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"** :
   - Branch : Sélectionnez **"main"**
   - Folder : Laissez **"/ (root)"**
5. Cliquez sur **"Save"**
6. ⏳ **Attendez 1-2 minutes**

### Étape 4 : Accéder à votre site

Votre site sera disponible à :
```
https://[votre-username].github.io/ekoplay-demo/
```

GitHub affichera l'URL exacte en haut de la page Settings → Pages.

---

## 🔄 Mettre à jour le site

Après avoir fait des modifications :

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

Le site sera automatiquement mis à jour en 1-2 minutes ! ✨

---

## 🔒 Pour plus de confidentialité

### Option 1 : URL obscure (Recommandé)

Utilisez un nom de repository difficile à deviner :
```
ekoplay-x7k9p2m-demo
```

URL finale :
```
https://votre-username.github.io/ekoplay-x7k9p2m-demo/
```

### Option 2 : Repository privé (GitHub Pro requis)

Si vous avez GitHub Pro :
1. Rendez le repository privé
2. GitHub Pages fonctionnera quand même
3. Seules les personnes avec l'URL pourront accéder

---

## 🆘 Dépannage

### Problème : "Permission denied"
```bash
chmod +x deploy.sh
./deploy.sh
```

### Problème : "fatal: not a git repository"
Le script s'en occupe automatiquement !

### Problème : Le site ne s'affiche pas
1. Vérifiez que GitHub Pages est activé (Settings → Pages)
2. Attendez 2-3 minutes après le push
3. Videz le cache du navigateur (Cmd+Shift+R sur Mac)

### Problème : Erreur 404
Vérifiez que l'URL est correcte :
```
https://[username].github.io/[repo-name]/
```
(Notez le `/` à la fin)

---

## 📝 Commandes Git Manuelles (Alternative)

Si vous préférez faire manuellement :

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Créer le premier commit
git commit -m "Initial commit - EKOPLAY demo"

# 4. Renommer la branche en 'main'
git branch -M main

# 5. Ajouter le remote (remplacez l'URL)
git remote add origin https://github.com/votre-username/ekoplay-demo.git

# 6. Pousser sur GitHub
git push -u origin main
```

---

## ✅ Checklist de déploiement

- [ ] Repository GitHub créé
- [ ] Script `deploy.sh` exécuté avec succès
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé dans Settings
- [ ] Site accessible à l'URL GitHub Pages
- [ ] Toutes les démos fonctionnent
- [ ] URL partagée avec les 3 utilisateurs

---

## 🎉 C'est fait !

Votre site EKOPLAY est maintenant en ligne et accessible 24/7 !

Pour toute question, consultez la [documentation GitHub Pages](https://docs.github.com/en/pages).
