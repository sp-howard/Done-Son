function newList() {

  var container = document.getElementById('container')

  var toDoListModule = document.createElement('div');
  toDoListModule.setAttribute('id', 'toDoListModule');

  var inputWrapper = document.createElement('div');
  inputWrapper.setAttribute('id', 'inputWrapper');

  var listWrapper = document.createElement('div');
  listWrapper.setAttribute('id', 'listWrapper');

  var list = document.createElement('ul');
  list.setAttribute('id', 'list')

  var doneList = document.createElement('ul');
  doneList.setAttribute('id', 'doneList');

  var userInput = document.createElement('input');
  userInput.setAttribute('id', 'input');
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('onkeydown', "if (event.keyCode == 13)             document.getElementById('addBtn').click()");

  var addBtn = document.createElement('button');
  addBtn.setAttribute('id', 'addBtn');
  addBtn.innerHTML = '+';

  container.appendChild(toDoListModule);
  toDoListModule.appendChild(inputWrapper);
  toDoListModule.appendChild(listWrapper);
  inputWrapper.appendChild(userInput);
  inputWrapper.appendChild(addBtn);
  listWrapper.appendChild(list);
  listWrapper.appendChild(doneList);
}

function addToList() {
  if (input.value.length !== 0) {
    newLi = document.createElement('li')
    newLi.innerHTML = '<input type="checkbox" class="unchecked">' + '<span class = "toDoItem">' + input.value + '</span>';
    list.appendChild(newLi);
    addCheckBoxListener();
    input.value = '';
  }
}

function addCheckBoxListener() {
  var checkBox = document.querySelectorAll('input[type=checkbox]');
  var toDoItem = document.querySelectorAll('.toDoItem');
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].classList.contains('unchecked')) {
      checkBox[i].addEventListener('change', completed);
      toDoItem[i].addEventListener('click', edit);
    } else {
      checkBox[i].addEventListener('change', undo);

    }
  }
}

function completed() {
  this.classList.remove('unchecked');
  this.classList.add('checked');
  var completedItem = this.parentNode.cloneNode(true);
  completedItem.classList.add('muted');
  list.removeChild(this.parentNode);
  doneList.appendChild(completedItem);
  addCheckBoxListener();
}

function undo() {
  this.classList.remove('checked');
  this.classList.add('unchecked');
  var undoItem = this.parentNode.cloneNode(true);
  undoItem.classList.remove('muted');
  doneList.removeChild(this.parentNode);
  list.appendChild(undoItem);
  addCheckBoxListener();
}

function edit() {

  var item = this;
  var itemValue = this.innerHTML;
  var newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('value', itemValue);
  newInput.setAttribute('class', 'editInput');

  this.parentNode.appendChild(newInput);
  newInput.focus();
  newInput.value = '';
  newInput.value = itemValue;
  this.style.display = 'none';

  newInput.onkeydown = function() {
    if (event.keyCode == 13) {
      itemValue = newInput.value;
      item.innerHTML = itemValue;
      this.parentNode.removeChild(newInput);
      item.style.display = 'block';
    }
  }

  newInput.addEventListener('blur', function() {
    this.parentNode.removeChild(newInput);
    item.style.display = 'block';
  });

}

newList();

var list = document.getElementById('list'),
  input = document.getElementById('input'),
  addBtn = document.querySelector('#addBtn'),
  checkBox = '',
  newLi = '';

addBtn.onclick = addToList;
