const params = new URLSearchParams(window.location.search)
const artId = params.get('id')


async function chargerProduct() {
   try {
      const req = await fetch(`http://localhost:3000/api/products/${artId}`)
        
      if (!req.ok) {
        throw new Error(`Erreur HTTP : ${req.status}`)
        
      }

      const datas = await req.json()
      for(const data of Object.values(datas)){
        if(data == artId){
            // console.log(datas)
        const newItem = document.createElement('article')
        newItem.innerHTML = `<article>
            <figure>
                <img src="${datas.image}" alt="Titre de l'oeuvre">
            </figure>
            <div>
                <h1>${datas.titre}</h1>
                <p>Plongez dans l'univers mystique de 'Bird', une œuvre d'art captivante qui transcende les limites de la réalité. Réalisée dans le style éthéré et spectral, cette pièce évoque la présence d'un oiseau envoûtant qui semble flotter dans l'au-delà.</p>
                <div class="price">
                    <p>Acheter pour</p>
                    <span class="showprice">35.25€</span>
                </div>
                <div class="declinaison">
                    <input type="number" name="quantity" id="quantity" placeholder="1" value="1" min="1">
                    <select name="format" id="format">
                    </select>
                </div>
                <a class="button-buy" href="#">Buy ${datas.shorttitle}</a>
            </div>
        </article>
        
        <aside>
            <h2>Description de l’oeuvre :  Éclat Éthéré : Bird</h2>
        </aside>`
        document.querySelector('.detailoeuvre').append(newItem)
        };
        }
   } catch (e) {
      console.error("Une erreur s'est produite :", e)
   }
}
chargerProduct()

async function select() {
   try {
      const req = await fetch(`http://localhost:3000/api/products`)
        
      if (!req.ok) {
        throw new Error(`Erreur HTTP : ${req.status}`)
        
      }

      const datas = await req.json()
      
      datas.forEach(product => {

        const newItem = document.createElement('article')
        newItem.innerHTML = `<select name="format" id="format">${product.declinaisons}
                    </select>`
        document.querySelector('input').append(newItem) 
        console.log(product.declinaisons)
    });
    
   } catch (e) {
      console.error("Une erreur s'est produite :", e)
   }
}

select()