# GeniArtHub

GeniArtHub est un projet de site e-commerce consacré à des œuvres d'art réalisées avec l'intelligence artificielle. Il propose un catalogue d'œuvres, plusieurs formats pour chaque création et un parcours de commande allant de la sélection d'un produit jusqu'à l'affichage d'un numéro de confirmation.

Le projet repose sur un site en HTML, CSS et JavaScript et sur une API développée avec Node.js et Express. L'objectif est de mettre en pratique la récupération de données depuis une API, la manipulation du DOM et la gestion d'un panier côté navigateur.

## Fonctionnement du site

### Catalogue et fiches produits

La page d'accueil récupère les œuvres depuis l'API et les affiche sous forme de catalogue. Chaque œuvre possède sa propre fiche avec une image, un titre, une description et différents formats d'impression.

Sur la fiche produit, le prix se met à jour en fonction du format sélectionné. Le visiteur peut choisir une quantité et ajouter l'œuvre à son panier.

### Panier

Le panier est enregistré dans le `localStorage` du navigateur. Les produits sont distingués par leur identifiant et leur format, ce qui permet de regrouper les quantités lorsqu'une même déclinaison est ajoutée plusieurs fois.

Depuis la page panier, il est possible de modifier les quantités, de supprimer un article et de consulter le nombre total de produits ainsi que le montant de la commande. Les prix sont récupérés depuis l'API et ne sont pas stockés dans le `localStorage`.

### Validation de commande

Le formulaire demande un prénom, un nom, une adresse, une ville et une adresse e-mail. Des contrôles JavaScript vérifient les informations avant l'envoi à l'API.

En cas de réponse positive, le site affiche le numéro de commande dans une fenêtre de confirmation, vide le panier et réinitialise le formulaire. Il s'agit d'un **parcours de commande de démonstration** : aucun paiement en ligne n'est intégré et les commandes ne sont pas enregistrées durablement dans le backend.

## Technologies utilisées

| Partie | Technologies |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript (sans framework) |
| Backend | Node.js, Express 4 |
| Échanges | API REST, `fetch`, JSON |
| Stockage du panier | `localStorage` |
| Identifiants de commande | UUID |

Les données des huit œuvres sont définies directement dans `back/models/Product.js`. Le projet ne nécessite donc pas l'installation d'une base de données.

## Structure du projet

```text
GeniArtHub/
├── front/
│   ├── index.html             # Catalogue des œuvres
│   ├── product.html           # Détail et sélection d'une œuvre
│   ├── cart.html              # Panier et formulaire de commande
│   ├── css/                   # Feuilles de style
│   ├── img/                   # Images et éléments graphiques
│   └── js/                    # Catalogue, panier, commande et modales
├── back/
│   ├── server.js              # Démarrage du serveur HTTP
│   ├── app.js                 # Configuration d'Express
│   ├── routes/product.js      # Routes de l'API
│   ├── controllers/product.js # Traitement des requêtes
│   ├── models/Product.js      # Catalogue des produits
│   ├── images/                # Images servies par l'API
│   └── package.json          # Dépendances du backend
└── readme.md                  # Documentation initiale
```

## Installation et lancement

Il faut disposer de **Node.js et npm** pour démarrer l'API. Un navigateur moderne et un serveur local statique, comme l'extension Live Server de VS Code, suffisent pour le frontend.

Clonez le dépôt :

```bash
git clone https://github.com/Arkanona/GeniArtHub.git
cd GeniArtHub
```

Ouvrez ensuite un terminal dans le dossier `back`, installez les dépendances et démarrez le serveur :

```bash
cd back
npm install
node server.js
```

L'API est alors accessible à l'adresse `http://localhost:3000/api/products`.

Pour le frontend, ouvrez `front/index.html` avec Live Server, ou servez le dossier `front` avec un autre serveur HTTP statique.

**Attention aux adresses de l'API :** dans l'état actuel du dépôt, `front/js/index.js`, `front/js/cart.js` et `front/js/order.js` appellent le serveur hébergé sur `https://geniarthub.onrender.com`, tandis que `front/js/product.js` appelle `http://localhost:3000`. Pour utiliser entièrement l'API locale, remplacez l'adresse des appels `fetch` concernés par `http://localhost:3000/api/products` (en conservant les chemins spécifiques, comme `/:id` et `/order`).

## API

Les routes sont regroupées sous le préfixe `/api/products`.

| Méthode | Route | Utilisation |
| --- | --- | --- |
| `GET` | `/api/products` | Récupérer toutes les œuvres |
| `GET` | `/api/products/:id` | Récupérer une œuvre par son identifiant |
| `POST` | `/api/products/order` | Valider une commande de démonstration et obtenir un identifiant |

Le corps attendu pour une commande est de la forme :

```json
{
  "contact": {
    "firstName": "Camille",
    "lastName": "Martin",
    "address": "12 avenue des Arts",
    "city": "Lyon",
    "email": "camille@example.com"
  },
  "products": ["abc12345", "def67890"]
}
```

Dans cette version, l'API reçoit uniquement les identifiants des œuvres pour la commande, sans transmettre les formats ni les quantités sélectionnés dans le panier.

## À propos du projet

GeniArtHub a été réalisé comme exercice de développement web autour d'une boutique en ligne. Il permet de travailler l'affichage dynamique de données, la communication entre le navigateur et une API, la persistance temporaire d'un panier et la validation d'un formulaire.

Le dépôt contient le frontend ainsi que le serveur API nécessaire au fonctionnement du projet.

**Dépôt GitHub :** [Arkanona/GeniArtHub](https://github.com/Arkanona/GeniArtHub)
