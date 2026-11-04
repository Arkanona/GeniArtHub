/*
    Récupérer le cart dans le local storage
    s'il y a des éléments enregistrés dedans,
    récupérer la quantité et l'afficher dans un span qu'il faut insérer dans #carticon
*/
const span = '<span>0</span>'
const carticon = document.querySelector('#carticon');
carticon.insertAdjacentHTML('beforeend', span);

function numberItem(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        const quantity = cart.reduce((acc, el) => acc + el.quantity, 0);
        document.querySelector('#carticon span').textContent = quantity;
        document.querySelector('#carticon span').style.display = 'flex';
        return
    }
    document.querySelector('#carticon span').style.display = 'none';

    
}
numberItem()