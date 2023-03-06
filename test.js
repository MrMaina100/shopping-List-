const theForm = document.getElementById('item-form');
const theInput = document.getElementById('item-input');
const thelist = document.getElementById('item-list');


const submitted = (e)=>{
   e.preventDefault();

   const newItem = theInput.value;

   if(newItem === ''){
      alert('please add an item');
      return;
   }

   const li = document.createElement('li');
   li.appendChild(document.createTextNode(newItem));
  

   const button = document.createElement('button');
   button.className= 'remove-item btn-link text-red';
  

   const icon = document.createElement('i');
   icon.className = 'fa-solid fa-xmark';
   button.appendChild(icon);
   li.appendChild(button);

   document.getElementById(itemList).appendChild(li);

   

}

theForm.addEventListener('sumbit', submitted);


