function showModal(message, title = "") {
    const modal = document.createElement('dialog');
    
    // Créer un élément pour le titre si un titre est fourni
    if (title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        modal.appendChild(titleElement);
    }
    
    modal.appendChild(document.createTextNode(message));
    document.body.appendChild(modal);
    
    modal.showModal();
    
    setTimeout(() => {
        modal.close();
        // Détruire la modal
        modal.remove();
    }, 3000);
}

