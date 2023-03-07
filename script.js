const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filterBtn = document.getElementById('filter');
const items = itemList.querySelectorAll('li');

function addItem(e){
   e.preventDefault();
 const newItem = itemInput.value;
   //validate input
   if(newItem === ''){
      alert('please add an item');
      return;
   }

   

   //create Listitem
  const li =  document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);

  clearUI();
  itemInput.value = '';


  function createButton (classes){
   const button = document.createElement('button');
   button.className = classes;
   const icon = createIcon('fa-solid fa-xmark');
   button.appendChild(icon);
   return button;
  }

  function createIcon (classes){
   const icon = document.createElement('i')
   icon.className = classes;
   return icon;  
  }

}

function deleteItem(e){
if(e.target.parentElement.classList.contains('remove-item')){
  e.target.parentElement.parentElement.remove()
}


}

function cleared (){
  // itemList.innerHTML =''

  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild)
  }
}


function filtered(e){
  // console.log(e.target.value);

  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  
  items.forEach((item)=>{
    const itemName = item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text)!==-1){
      item.style.display = 'flex'
      
    }else{
      item.style.display = 'none'
    }
  });

}

function clearUI (){
  const items = itemList.querySelectorAll('li');
  if(items.length === 0){
    clearBtn.style.display = 'none';
    filterBtn.style.display = 'none';
  }else{
     clearBtn.style.display = 'block';
    filterBtn.style.display = 'block';
  }
}



itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
clearBtn.addEventListener('click', cleared);
filterBtn.addEventListener('input', filtered);

clearUI()