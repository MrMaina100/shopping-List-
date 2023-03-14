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

 const li =  document.createElement('li');
 li.appendChild(document.createTextNode(newValue.value));
//  console.log(li);

const button = createButton('remove-item btn-link text-red');
li.appendChild(button);
item.appendChild(li);
clearUI();
const icon = createIcon('fa-solid fa-xmark');
button.appendChild(icon);
item.value = '';

 
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

    checkUI()


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



form.addEventListener('submit', addItems);
item.addEventListener('click', removeItems);
clearBtn.addEventListener('click', clearAll);

clearUI()