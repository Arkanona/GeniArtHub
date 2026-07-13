// Récupération de l'id des tableaux
const params = new URLSearchParams(window.location.search)
const artId = params.get('id')

// Redirection vers la page ou on clique

async function chargerProduct() {
    try {
        const req = await fetch(`http://localhost:3000/api/products`)

        if (!req.ok) {
            throw new Error(`Erreur HTTP : ${req.status}`)
        }

        const datas = await req.json() 
        
        let produitCourant = null
        
        datas.forEach(product => {

            if (product._id == artId) {
           
                produitCourant = product
                const newItem = document.querySelector('.detailoeuvre')
                newItem.innerHTML = `<article>
                    <figure>
                        <img src="${product.image}" alt="Titre de l'oeuvre">
                    </figure>
                    <div>
                        <h1>${product.titre}</h1>
                        <p>Plongez dans l'univers mystique de 'Bird', une œuvre d'art captivante qui transcende les limites de la réalité. Réalisée dans le style éthéré et spectral, cette pièce évoque la présence d'un oiseau envoûtant qui semble flotter dans l'au-delà.</p>
                        <div class="price">
                            <p>Acheter pour</p>
                            <span class="showprice">${product.declinaisons[0].prix}€</span>
                        </div>
                        <div class="declinaison">
                            <input type="number" name="quantity" id="quantity" placeholder="1" value="1" min="1" max="100">
                            <select name="format" id="format"></select>
                        </div>
                        <a class="button-buy" href="cart.html">Buy ${product.shorttitle}</a>
                    </div>
                </article>
                <aside>
                    <h2>Description de l'oeuvre : ${product.description}</h2>
                </aside>`
            
                product.declinaisons.forEach(e => {
                    const option = document.createElement('option')
                    option.innerHTML = `${e.taille}`
                    document.querySelector('#format').append(option)
                })
            
                // Au changement de select le prix change aussi
                const select = document.querySelector('#format')
                select.addEventListener('change', function () {
                    const tailleSelect = select.value
                    const declinaisonSelect = produitCourant.declinaisons.find(e => e.taille == tailleSelect)

                    if (declinaisonSelect) {
                        document.querySelector('.showprice').textContent = `${declinaisonSelect.prix}€`
                    }
                
                })
                // Au changement de la quantité de tableaux le prix change et est enregistrer dans le local storage
                const quantityInput = document.querySelector('#quantity')
                quantityInput.addEventListener('input', function() {
                    const tailleSelect = select.value
                    const declinaisonPrice = produitCourant.declinaisons.find(e => e.taille == tailleSelect)
                    const result = declinaisonPrice.prix * quantityInput.value
                    
                    const final = localStorage.getItem('datas', JSON.stringify(result)) ?? result;
                    
                    if(declinaisonPrice){
                        
                        document.querySelector('.showprice').textContent = `${result}€` 
                        
                    }
                    localStorage.setItem('datas', JSON.parse(result))
                })
                
            }  
        })    

   } catch (e) {
      console.error("Une erreur s'est produite :", e)
   }
}
chargerProduct()

