const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const item = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filterBtn = document.getElementById('filter');
const formBtn = form.querySelector('button')
let isEditMode = false;

function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
 itemsFromStorage.forEach((itm) => addItemsToDom(itm));


  clearUI()
}



function addItems (e){
  e.preventDefault();

  const newValue = input.value;
  if(newValue === ''){
    alert('Please add an item');
    return;
   
    
  }

  //checked editMode 
  if(isEditMode){
    const  itemToEdit = item.querySelector('.edit-mode')

    removeItemFromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();

    isEditMode = false
  }

  addItemsToDom(newValue);
  addItemsToLocalStorage(newValue);

  input.value = '';
 
  clearUI();

}


function addItemsToDom(items){
 
 const li =  document.createElement('li');
 li.appendChild(document.createTextNode(items));
 //  console.log(li);

 const button = createButton('remove-item btn-link text-red');
 li.appendChild(button);
 item.appendChild(li);
 const icon = createIcon('fa-solid fa-xmark');
 button.appendChild(icon);

}




function createButton (classes){
  const button = document.createElement('button');
  button.className = classes;
  return button;
}

function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon
}



function addItemsToLocalStorage(itm1){
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(itm1);
  //convert to JSON string and set to local storage 
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function getItemsFromStorage(){
   let itemsFromStorage;

  if(localStorage.getItem('items') === null){
    itemsFromStorage = [];
  }else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  
  return itemsFromStorage;

}


function onClickItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItems(e.target.parentElement.parentElement)
  }else{

    setItemToEdit(e.target)

  }

}

function setItemToEdit(item1){
  isEditMode = true;

  item.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'))
  item1.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> update item';
  formBtn.style.backgroundColor = '#228b22'
  input.value = item1.textContent;
}

function removeItems (itm){
 
  //removes items from the dom
  itm.remove();

  //remove item from storage 

  removeItemFromStorage(itm.textContent);

  clearUI();
  


 
}

function removeItemFromStorage (item){

  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i)=> i != item)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}

function clearAll(){
  item.innerHTML = '';

  localStorage.removeItem('items');

  clearUI()
}


function clearUI (){

  input.value = '';

  const theItems = item.querySelectorAll('li');

  if(theItems.length === 0){

    filterBtn.style.display = 'none';
    clearBtn.style.display = 'none';

  }else{
    filterBtn.style.display = 'block';
    clearBtn.style.display = 'block';
  }

 formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
 formBtn.style.backgroundColor = '#333';
  isEditMode = false

}

function filterItem (e){

  const texts = e.target.value.toLowerCase();

  const theItems = item.querySelectorAll('li');

  theItems.forEach((itm)=>{
    const item = itm.firstChild.textContent.toLowerCase();
    // console.log(item);
    if(item.indexOf(texts)!=-1){

      itm.style.display = 'flex';

    }else{
     itm.style.display = 'none';
    }


  });

  
}



form.addEventListener('submit', addItems);
item.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearAll);
filterBtn.addEventListener('input', filterItem);
document.addEventListener('DOMContentLoaded', displayItems);

clearUI()