# 🏗️ EkoPlayer - Architecture Améliorée

## 📊 Problèmes Actuels

### 1. Gestion des Instances
- ❌ Plusieurs instances peuvent coexister
- ❌ Les anciens players ne sont pas toujours détruits
- ❌ Accumulation possible de sons lors du changement de démo

### 2. Gestion des Événements
- ❌ Event listeners non nettoyés
- ❌ Références circulaires possibles
- ❌ Memory leaks potentiels

### 3. Gestion de l'État
- ❌ État dispersé dans plusieurs variables
- ❌ Pas de source unique de vérité
- ❌ Difficile à déboguer

---

## ✅ Architecture Proposée

### Principe : Singleton Pattern + State Management

```javascript
class EkoPlayer {
    // Instance unique
    static instance = null;
    
    // État centralisé
    state = {
        demo: null,
        players: [],
        playersReady: 0,
        isPlaying: false,
        activeAudioIndex: 0,
        hasPlayedOnce: false
    };
    
    // Nettoyage complet
    async destroy() {
        // 1. Arrêter tous les players
        // 2. Détruire les instances Vimeo
        // 3. Supprimer les event listeners
        // 4. Nettoyer les références
        // 5. Réinitialiser l'état
    }
    
    // Factory method
    static async create(demoConfig) {
        // Si instance existe, la détruire d'abord
        if (EkoPlayer.instance) {
            await EkoPlayer.instance.destroy();
        }
        
        // Créer nouvelle instance
        EkoPlayer.instance = new EkoPlayer(demoConfig);
        return EkoPlayer.instance;
    }
}
```

---

## 🔧 Améliorations Proposées

### 1. Singleton Pattern
- ✅ Une seule instance à la fois
- ✅ Destruction automatique de l'ancienne
- ✅ Pas d'accumulation

### 2. State Management
- ✅ État centralisé dans `this.state`
- ✅ Méthodes pour modifier l'état
- ✅ Facile à déboguer

### 3. Lifecycle Management
```javascript
// Cycle de vie clair
constructor() → init() → ready() → play() → destroy()
```

### 4. Event Cleanup
```javascript
// Stocker les listeners pour nettoyage
this.eventListeners = [];

addListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
}

removeAllListeners() {
    this.eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
}
```

### 5. Player Management
```javascript
async destroyPlayers() {
    // Arrêter
    await Promise.all(this.state.players.map(p => p.pause()));
    
    // Muter
    await Promise.all(this.state.players.map(p => p.setMuted(true)));
    
    // Volume à 0
    await Promise.all(this.state.players.map(p => p.setVolume(0)));
    
    // Détruire
    await Promise.all(this.state.players.map(p => p.destroy()));
    
    // Nettoyer
    this.state.players = [];
}
```

---

## 📝 Plan d'Implémentation

### Phase 1 : Refactoring de Base
1. ✅ Ajouter Singleton pattern
2. ✅ Centraliser l'état
3. ✅ Améliorer destroy()

### Phase 2 : Event Management
1. ✅ Système de tracking des listeners
2. ✅ Cleanup automatique
3. ✅ Prévention des fuites mémoire

### Phase 3 : Player Lifecycle
1. ✅ Méthodes de cycle de vie claires
2. ✅ Transitions d'état gérées
3. ✅ Logging amélioré

### Phase 4 : Tests
1. ✅ Test de changement de démo
2. ✅ Test de memory leaks
3. ✅ Test de performance

---

## 🎯 Résultat Attendu

### Avant
```javascript
// Problème : plusieurs instances
window.ekoPlayer = new EkoPlayer(); // Instance 1
// Changement de démo
window.ekoPlayer = new EkoPlayer(); // Instance 2 (1 pas détruite!)
// → Sons qui s'additionnent
```

### Après
```javascript
// Solution : instance unique
await EkoPlayer.create(config); // Instance 1
// Changement de démo
await EkoPlayer.create(config); // Instance 1 détruite, Instance 2 créée
// → Pas d'accumulation
```

---

## 📊 Métriques de Succès

- ✅ Pas d'accumulation de sons
- ✅ Pas de memory leaks
- ✅ Changement de démo fluide
- ✅ Performance stable
- ✅ Code maintenable

---

## 🚀 Prochaines Étapes

1. Implémenter Singleton pattern
2. Refactorer destroy()
3. Ajouter event tracking
4. Tester changements de démo
5. Déployer et valider
