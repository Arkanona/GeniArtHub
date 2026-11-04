// Récupérer le panier du localStorage
const panier = JSON.parse(localStorage.getItem('cart')) || [];

// Si le panier est vide, afficher le message : Votre panier est vide. Veuillez ajouter au moins un article à votre panier
if (panier.length === 0) {
    document.querySelector('#panier').innerText = "Votre panier est vide. Veuillez ajouter au moins un article à votre panier"
}

// On créer une fonction asynchrone qui va parcourir tous les éléments du panier et faire la correlation avec les id et les formats pour afficher les prix et les images
function displayCart() {
    panier.forEach(async el => {
        const req = await fetch(`https://geniarthub.onrender.com/api/products/${el.id}`)
        const datas = await req.json()

        // On parcours les données en récupérant : l'id, le format, la quantité, le prix et l'image
        // On fait un find pour trouver la déclinaison qui correspond à l'id et au format
        const declinaison = datas.declinaisons.find(item => item.taille === el.format)

        const article = `<article class="article">
                            <img src="${datas.image}" alt="${datas.titre}">
                            <h3>${datas.titre}</h3>
                            <p>Format : ${declinaison.taille}</p>
                            <p class="price">${declinaison.prix}€</p>
                            <div>
                                <p>Quantité :</p>
                                <input type="number" data-id="${datas._id}" data-format="${declinaison.taille}" value="${el.quantity}" min="1">
                            </div>
                            <a href="#">Supprimer</a>
                        </article>`
        document.querySelector('#panier').insertAdjacentHTML('beforeend', article)
        updateTotal()
        listenQuantity()
        listenDelete()
    })
}
displayCart()

// Une petite fonction qui va mettre à jour le prix total et le nombre total d'articles
function updateTotal() {
    const totalarticle = document.querySelector('#totalarticle')
    const montanttotal = document.querySelector('#montanttotal')

    let totalArticles = 0;
    let totalAmount = 0;

    // On fait le calcul du nombre d'articles et du montant total, pour cela on :
    // Récupère chaque des produits du panier qui se trouve sur le dom
    // On récupère le prix unitaire et la quantité
    const price = document.querySelectorAll('.price')
    price.forEach(el => {
        const quantity = el.parentNode.querySelector('input').value
        const unitPrice = parseFloat(el.textContent)
        totalArticles += parseInt(quantity)
        totalAmount += unitPrice * quantity
    })
    totalarticle.innerText = totalArticles
    montanttotal.innerText = totalAmount.toFixed(2)
    numberItem()
}

// Une fonction qui permet de lancer l'écoute du changement de quantité sur les champs input
function listenQuantity() {
    const quantityInput = document.querySelectorAll('input[type="number"]')
    quantityInput.forEach(el => {
        el.addEventListener('change', () => {
            const id = el.dataset.id
            const format = el.dataset.format
            const quantity = el.value

            // On récupère l'index du produit dans le panier
            const index = panier.findIndex(item => item.id === id && item.format === format)

            // On modifie la quantité du produit dans le panier
            panier[index].quantity = parseInt(quantity)

            // On met à jour le panier dans le localStorage
            localStorage.setItem('cart', JSON.stringify(panier))

            // On met à jour le prix total et le nombre total d'articles
            updateTotal()
        })
    })
}

// Une fonction qui permet d'écouter le clique sur les liens supprimer et qui supprime la ligne sur le DOM et dans le localstorage
function listenDelete() {
    const deleteLink = document.querySelectorAll('.article a')
    deleteLink.forEach(el => {
        el.addEventListener('click', () => {
            const id = el.previousElementSibling.querySelector('input').dataset.id
            const format = el.previousElementSibling.querySelector('input').dataset.format
            
            // On récupère l'index du produit dans le panier
            const index = panier.findIndex(item => item.id === id && item.format === format)

            if(index === -1) {
                return
            }

            // On supprime le produit du panier
            panier.splice(index, 1)

            // On met à jour le panier dans le localStorage
            localStorage.setItem('cart', JSON.stringify(panier))

            // On supprime la ligne du DOM
            el.parentNode.remove()

            // On met à jour le prix total et le nombre total d'articles
            updateTotal()
        })
    })
}