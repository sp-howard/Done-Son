function newList() {

  var container = document.getElementById('container')

  var toDoListModule = document.createElement('div');
  toDoListModule.setAttribute('id', 'toDoListModule');

  var inputWrapper = document.createElement('div');
  inputWrapper.setAttribute('id', 'inputWrapper');

  var title = document.createElement('div');
  title.setAttribute('id', 'title');
  title.textContent = 'Title';

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
  inputWrapper.appendChild(title);
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
    this.classList.add('pressed');
    setTimeout(function() {
      this.classList.remove('pressed');
    }.bind(this), 180);
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
      item.style.display = 'inline-block';
    }
  }

  newInput.addEventListener('blur', function() {
    this.parentNode.removeChild(newInput);
    item.style.display = 'inline-block';
  });
}

function editTitle() {

  var item = this;
  var itemValue = this.innerHTML;
  var newInput = document.createElement('input');
  var mainInput = document.getElementById('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('value', itemValue);
  newInput.setAttribute('class', 'titleEditInput');

  this.parentNode.insertBefore(newInput, mainInput);
  newInput.focus();
  newInput.value = '';
  newInput.value = itemValue;
  this.style.display = 'none';

  newInput.onkeydown = function() {
    if (event.keyCode == 13) {
      itemValue = newInput.value;
      item.innerHTML = itemValue;
      item.style.opacity = '1';
      this.parentNode.removeChild(newInput);
      item.style.display = 'inline-block';
    }
  }

  newInput.addEventListener('blur', function() {
    this.parentNode.removeChild(newInput);
    item.style.display = 'inline-block';
  });
}

function changeColorScheme() {
  var toolbarColor = this.querySelector('.toolbar-color'),
    listColor = this.querySelector('.list-color'),
    accentColor = this.querySelector('.accent-color'),
    toolbarColorValue = window.getComputedStyle(toolbarColor).backgroundColor,
    listColorValue = window.getComputedStyle(listColor).backgroundColor,
    accentColorValue = window.getComputedStyle(accentColor).backgroundColor;

  var toolbar = document.getElementById('toolbar'),
    list = document.getElementById('inputWrapper'),
    addBtn = document.getElementById('addBtn');

  toolbar.style.backgroundColor = toolbarColorValue;
  list.style.backgroundColor = listColorValue;
  addBtn.style.backgroundColor = accentColorValue;

}

newList();

var list = document.getElementById('list'),
  input = document.getElementById('input'),
  addBtn = document.querySelector('#addBtn'),
  checkBox = '',
  newLi = '',
  title = document.getElementById('title'),
  sheme1 = document.getElementById('scheme1'),
  sheme2 = document.getElementById('scheme2'),
  sheme3 = document.getElementById('scheme3'),
  sheme4 = document.getElementById('scheme4');

addBtn.onclick = addToList;
title.onclick = editTitle;

console.log(scheme4);

scheme1.onclick = changeColorScheme;
scheme2.onclick = changeColorScheme;
scheme3.onclick = changeColorScheme;
scheme4.onclick = changeColorScheme;
