addBtnHandler = async (event) => {
    event.preventDefault(); 
  
    window.location.replace('/addperson');
  
  };
  
  addGiftBtnHandler = async (event) => {
    event.preventDefault(); 
  
  const people_id = event.target.getAttribute('data-id');

    window.location.replace(`/addgift/${people_id}`);
  
  };


  deleteBtnHandler = async (event) => {

    event.preventDefault(); 

    const people_id = event.target.getAttribute('data-id');
    console.log(people_id); 
    
    if (event.target.hasAttribute('data-id')) {

      const response = await fetch(`/api/people/${people_id}`, { 
          method: 'DELETE', 
      });   
      document.location.reload();
      if (response.ok) {
        console.log('successfully deleted the person')
          window.location.reload();
      } else {
         console.log('Cannot Delete The Person')
      }
  }; 


  };


document 
.querySelector('#addButton')
.addEventListener('click', addBtnHandler);  

let deleteButtons = document.querySelectorAll('.deletes')
deleteButtons.forEach((b) => {
  b.addEventListener('click', deleteBtnHandler); 
}); 

let addGiftButtons = document.querySelectorAll('.adds')
addGiftButtons.forEach((b) => {
  b.addEventListener('click', addGiftBtnHandler); 
});

