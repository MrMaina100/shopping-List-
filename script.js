const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const item = document.getElementById('item-list');

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
item.appendChild(li)
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



form.addEventListener('submit', addItems);