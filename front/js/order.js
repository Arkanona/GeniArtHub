const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    
    // On test les champs du formulaire
    // Prénom minimum 2 caractères et pas de caractères spéciaux
    if(data.get('prenom').length < 2 || !/^[a-zA-Z0-9\sàâäéèêëïîôöùûüç\-]+$/.test(data.get('prenom'))) {
        alert('Le prénom est incorrect')
        return
    }

    // Nom minimum 2 caractères et pas de caractères spéciaux
    if(data.get('nom').length < 2 || !/^[a-zA-Z0-9\sàâäéèêëïîôöùûüç\-]+$/.test(data.get('nom'))) {
        alert('Le nom est incorrect')
        return
    }

    // Adresse minimum 10 caractères, pas de caractères spéciaux à part les accents et les tirets
    if(data.get('adresse').length < 10 || !/^[a-zA-Z0-9\sàâäéèêëïîôöùûüç\-]+$/.test(data.get('adresse'))) {
        alert('L\'adresse est incorrecte')
        return
    }

    // Ville minimum 3 caractères et pas de caractères spéciaux, pas de chiffres
    if(data.get('ville').length < 3 || !/^[a-zA-Z\sàâäéèêëïîôöùûüç\-]+$/.test(data.get('ville'))) {
        alert('La ville est incorrecte')
        return
    }

    // Email valide
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}$/.test(data.get('mail'))) {
        alert('L\'email est incorrect')
        return
    }

    
    const contact = {
        firstName: data.get('prenom'),
        lastName: data.get('nom'),
        address: data.get('adresse'),
        city: data.get('ville'),
        email: data.get('mail')
    }

    const products = []
    // On parcours le panier et on récupère l'id
    panier.forEach(el => {
        products.push(el.id)
    })

    // On envoie le formulaire
    sendForm(contact, products)
})

// Une fonction asynchrone qui permet d'envoyer le formulaire
async function sendForm(contact, products) {
    const response = await fetch('https://geniarthub.onrender.com/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact, products})
    })
    const data = await response.json()
    
    // On récupère l'order id et on l'affiche avec la modale
    showModal(`Votre commande est validée, votre numéro de commande est le : ${data.orderId}`, "Félicitations")

    // On vide le panier
    localStorage.removeItem('cart')
    document.querySelector('#panier').innerHTML = ""
    updateTotal()
    document.querySelector('#panier').innerText = "Votre panier est vide. Veuillez ajouter au moins un article à votre panier"
    // Reset formulaire
    document.querySelector('form').reset()
    numberItem()
    
}