async function init(){
    const datas = await getDatas()
    showProducts(datas)
}
init()

async function getDatas(){
    const req = await fetch('https://geniarthub.onrender.com/api/products')
    return await req.json()
}

function showProducts(products){
    products.forEach(el => {
        const product = `<article>
                            <img src="${el.image}" alt="${el.titre}">
                            <a href="product.html?id=${el._id}">Buy ${el.shorttitle}</a>
                        </article>`
        document.querySelector('.products').insertAdjacentHTML('beforeend', product)
    })
}