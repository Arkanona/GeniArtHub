// Récupérer l'id de l'url
const url = new URL(window.location.href)
const id = url.searchParams.get('id')

// Récupérer les données de l'api
async function init(){
    const datas = await getDatas()
    showProduct(datas)
}
init()

async function getDatas(){
    const req = await fetch(`https://geniarthub.onrender.com/api/products/${id}`)
    return await req.json()
}

function showProduct(product){
    // Changer le title
    document.title = `${product.titre} - GeniArtHub`
    // Changer l'image
    document.querySelector('.detailoeuvre img').src = product.image
    // Changer le Alt de l'image
    document.querySelector('.detailoeuvre img').alt = product.titre
    // Changer le titre
    document.querySelector('h1').textContent = product.titre
    // Changer le contenu de la description courte (prendre la description et la tronquer à 200 caractères)
    document.querySelector('article > div > p').textContent = `${product.description.substring(0, 200)}...`

    // Changer le prix en prenant le prix de la première déclinaison
    document.querySelector('.showprice').textContent = `${product.declinaisons[0].prix}€`

    // Changer le contenu du bouton en affichant "Buy + shorttitle"
    document.querySelector('.button-buy').textContent = `Buy ${product.shorttitle}`

    // Changer le contenu du h2 en affichant "Description de l'oeuvre : + titre"
    document.querySelector('h2').textContent = `Description de l'oeuvre : ${product.titre}`

    // Changer le contenu de la description longue (aside > p)
    document.querySelector('aside > p').textContent = product.description.replace(/'/g, '"')

    // Récupérer le champ select #format, parcourir les déclinaisons et remplir le champ avec les options
    const select = document.querySelector('#format')
    product.declinaisons.forEach((el, index) => {
        const option = `<option data-id="${index}" value="${el.taille}">Format : ${el.taille}</option>`
        select.insertAdjacentHTML('beforeend', option)
    })

    // Au changement du select, changer le prixn en récupérant le data-id de l'option sélectionnée et en récupérant le prix de la déclinaison correspondante
    select.addEventListener('change', () => {
        const id = select.options[select.selectedIndex].dataset.id
        document.querySelector('.showprice').textContent = `${product.declinaisons[id].prix}€`
    })
}

// Au clic sur le bouton, ajouter le produit au panier
const button = document.querySelector('.button-buy')
button.addEventListener('click', () => {
    const quantityInput = document.querySelector('#quantity');
    const formatInput = document.querySelector('#format');

    const quantity = parseInt(quantityInput.value);
    const format = formatInput.value;

    if (quantity < 1) {       
        // Créer une modale dans le dom qui affiche la "La quantité doit être d'au moins 1" et qui se ferme au bout de 3 secondes
        showModal("La quantité doit être d'au moins 1")
        return;
    }

    const panier = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = panier.findIndex(el => el.id === id && el.format === format);

    if (existingProductIndex !== -1) {
        const newQuantity = panier[existingProductIndex].quantity + quantity;
        if (newQuantity > 100) {

            showModal("Vous ne pouvez pas commander plus de 100 exemplaires d'une même œuvre");
            return
        } 
        panier[existingProductIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(panier));
        numberItem()
        showModal("Produit ajouté au panier");

        return;
    } 

    panier.push({
        id,
        quantity,
        format,
    });
    showModal("Produit ajouté au panier");
    localStorage.setItem('cart', JSON.stringify(panier));
    numberItem()
})
