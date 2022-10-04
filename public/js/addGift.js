//event handler for the user to update one of their existing blog posts from the update.handlebars view
const addGiftButtonHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#gift-name').value.trim();
    const price = document.querySelector('#price').value.trim();
    const location = document.querySelector('#location').value.trim();
    const people_id = document.querySelector('.add-gift-form').getAttribute('data-id');


    if (event.target.hasAttribute('data-id')) {

        const response = await fetch(`/api/gift`, { 
            method: 'POST', 
            body: JSON.stringify({ name, people_id, price, location }),
            headers: {
                'Content-Type': 'application/json'
            }
        });   

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert ('Cannot Add The Gift')
        }
    }; 
};

document
.querySelector('.add-gift-form')
.addEventListener('submit', addGiftButtonHandler);