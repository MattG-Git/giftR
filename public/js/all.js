addBtnHandler = async (event) => {
    event.preventDefault(); 
  
    window.location.replace('/addperson');
  
  };
  
  editBtnHandler = async (event) => {
    event.preventDefault(); 
  
    window.location.replace('/editperson');
  
  };

document 
.querySelector('#addButton')
.addEventListener('click', addBtnHandler); 

document 
.querySelector('#editButton')
.addEventListener('click', editBtnHandler); 