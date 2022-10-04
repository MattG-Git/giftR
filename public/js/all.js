addBtnHandler = async (event) => {
    event.preventDefault(); 
  
    window.location.replace('/addperson');
  
  };
  
  editBtnHandler = async (event) => {
    event.preventDefault(); 
  
    window.location.replace('/editperson');
  
  };

  addGiftBtnHandler = async (event) => {
    event.preventDefault(); 
  
    window.location.replace('/addgift');
  
  };


  deleteBtnHandler = async (event) => {
    event.preventDefault(); 
  
// CODE GOES here
  
  };

 
document 
.querySelector('#addButton')
.addEventListener('click', addBtnHandler);  

let editButtons = document.querySelectorAll('.edits')
editButtons.forEach((b) => {
  b.addEventListener('click', editBtnHandler); 
});

let deleteButtons = document.querySelectorAll('.deletes')
deleteButtons.forEach((b) => {
  b.addEventListener('click', deleteBtnHandler); 
}); 

let addGiftButtons = document.querySelectorAll('.adds')
addGiftButtons.forEach((b) => {
  b.addEventListener('click', addGiftBtnHandler); 
});

