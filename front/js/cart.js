
// PAS FINI

const regex = /^[a-zA-Z0-9àâäéèêëïîôùûüÿæœçÀÂÄÉÈÊËÏÎÔÙÛÜŸÆŒÇ\s_-]+$/;
const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Verication
    
function formulaire (){
    const input = document.querySelector('.inpa')
    input.addEventListener('input', function () {
        document.querySelector('.error').innerText = ""
        // On récupère ce qu'il y a sur le champ input
        
        const p = document.querySelector('.error')
        
        const inputVal = input.value
        console.log(input.value)
        if (!regex.test(firstname) || !regex.test(lastname) || !regex.test(adress) || !regex.test(city)) {
            p.innerText = "Veuillez retirer les caractères spéciaux."
            
        } else {
            p.innerText = ""
        }
        if (!regexMail.test(email)) {
            // p.innerText = "Veuillez renseigné un mail valide."
            
        }
        // S'il n'y a rien, on affiche un message d'erreur
        if(inputVal.length <= 2){
            p.innerText = "Le champ ne doit pas être vide"
        }

    })
}
formulaire()