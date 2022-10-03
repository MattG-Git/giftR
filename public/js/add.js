//event handler for the user to update one of their existing blog posts from the update.handlebars view
const addButtonHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#name').value.trim();
    const budget = document.querySelector('#budget').value.trim();
    const giftName = document.querySelector('#gift-name').value.trim();
    const price = document.querySelector('#price').value.trim();
   const location = document.querySelector('#location').value.trim();


    if (event.target.hasAttribute('data-id')) {

        const response = await fetch(`/api/people,`, {
            method: 'POST',
            body: JSON.stringify({ name, budget, giftName, price, location }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/all');
        }else {
            alert ('Cannot Add The Person')
        }
    }
};

document
.querySelector('.add-person-form')
.addEventListener('submit', addButtonHandler);