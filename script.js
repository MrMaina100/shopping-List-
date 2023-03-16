const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const item = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filterBtn = document.getElementById('filter')





function addItems (e){
  e.preventDefault();

  const newValue = input;
  if(newValue.value === ''){
    alert('Please add an item');
   
    
  }

  addItemsToDom(newValue);
  addItemsToLocalStorage(newValue);

  input.value = '';
 
 clearUI();

}


function addItemsToDom(items){
 
 const li =  document.createElement('li');
 li.appendChild(document.createTextNode(items.value));
 //  console.log(li);

 const button = createButton('remove-item btn-link text-red');
 li.appendChild(button);
 item.appendChild(li);
 const icon = createIcon('fa-solid fa-xmark');
 button.appendChild(icon);

}

function addItemsToLocalStorage(itm){
  let itemsFromStorage;

  if(localStorage.getItem('items') === null){
    itemsFromStorage = [];
  }else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  itemsFromStorage.push(itm);

  // JSON.stringify(itemsFromStorage);
  //convert to JSON string and set to local storage 
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  

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

function removeItems (e){
  if(e.target.parentElement.classList.contains('remove-item')){
    e.target.parentElement.parentElement.remove();

    clearUI()


  }

}

function clearAll(){
  item.innerHTML = '';

  clearUI()
}


function clearUI (){

  const theItems = item.querySelectorAll('li');

  if(theItems.length === 0){

    filterBtn.style.display = 'none';
    clearBtn.style.display = 'none';

  }else{
    filterBtn.style.display = 'block';
    clearBtn.style.display = 'block';
  }


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
item.addEventListener('click', removeItems);
clearBtn.addEventListener('click', clearAll);
filterBtn.addEventListener('input', filterItem);

clearUI()