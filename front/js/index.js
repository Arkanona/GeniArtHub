async function chargerImage() {
   try {
      const req = await fetch('http://localhost:3000/api/products')
        
      if (!req.ok) {
        throw new Error(`Erreur HTTP : ${req.status}`)
        
      }
      // Permet d'afficher chaque tableau avec son titre
      const datas = await req.json()
      datas.forEach(product => {
        const newItem = document.createElement('article')
        newItem.innerHTML = `
                                <img src="${product.image}" alt="Titre produit">
                                <a href="product.html?id=${product._id}">Buy ${product.shorttitle}</a>
                            `
        document.querySelector('.products').append(newItem)
        });
   } catch (e) {
      console.error("Une erreur s'est produite :", e)
   }
}
chargerImage()
