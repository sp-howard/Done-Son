function ToDoList() {

  this.toDoListModule = '';
  var toDoListModule = '';

  this.list = '';
  var list = '';

  this.inputBox = '';
  var inputBox = '';

  this.addBtn = '';
  var addBtn = '';

  this.doneList = '';
  var doneList = '';

  this.newList = function() {
    var container = document.getElementById('container');

    var createToDoListModule = document.createElement('div');
    createToDoListModule.setAttribute('class', 'toDoListModule');

    var createInputWrapper = document.createElement('div');
    createInputWrapper.setAttribute('class', 'inputWrapper');

    var createListWrapper = document.createElement('div');
    createListWrapper.setAttribute('class', 'listWrapper');

    var createList = document.createElement('ul');
    createList.setAttribute('class', 'list')

    var createDoneList = document.createElement('ul');
    createDoneList.setAttribute('class', 'doneList');

    var createUserInput = document.createElement('input');
    createUserInput.setAttribute('class', 'input');
    createUserInput.setAttribute('type', 'text');
    createUserInput.setAttribute('onkeydown', "if (event.keyCode == 13)             document.querySelector('.addBtn').click()");

    var createAddBtn = document.createElement('button');
    createAddBtn.setAttribute('class', 'addBtn');
    createAddBtn.innerHTML = '+';

    container.appendChild(createToDoListModule);
    createToDoListModule.appendChild(createInputWrapper);
    createToDoListModule.appendChild(createListWrapper);
    createInputWrapper.appendChild(createUserInput);
    createInputWrapper.appendChild(createAddBtn);
    createListWrapper.appendChild(createList);
    createListWrapper.appendChild(createDoneList);

    this.toDoListModule = document.querySelector('.toDoListModule');
    // toDoListModule = this.toDoListModule;

    this.list = document.querySelector('.list');
    list = this.list;

    this.doneList = document.querySelector('.doneList');
    doneList = this.doneList;

    this.inputBox = document.querySelector('.input');
    // inputBox = this.inputBox;

    this.addBtn = document.querySelector('.addBtn');
    // addBtn = this.addBtn;
  };

  this.addToList = function() {
    if (this.inputBox.value.length !== 0) {
      var newLi = document.createElement('li')
      newLi.innerHTML = '<input type="checkbox" class="unchecked">' + '<span class = "toDoItem">' + this.inputBox.value + '</span>';
      this.list.appendChild(newLi);
      this.addCheckBoxListener();
      this.inputBox.value = '';
    }
  }.bind(this);

  this.addCheckBoxListener = function() {
    var checkBox = document.querySelectorAll('input[type=checkbox]');
    var toDoItem = document.querySelectorAll('.toDoItem');
    for (var i = 0; i < checkBox.length; i++) {
      if (checkBox[i].classList.contains('unchecked')) {
        checkBox[i].addEventListener('change', this.completed);
        toDoItem[i].addEventListener('click', this.edit);
      } else {
        checkBox[i].addEventListener('change', this.undo);
      }
    }
  }.bind(this);

  this.completed = function() {
    this.classList.remove('unchecked');
    this.classList.add('checked');
    var completedItem = this.parentNode.cloneNode(true);
    completedItem.classList.add('muted');
    console.log(this);
    list.removeChild(this.parentNode);
    doneList.appendChild(completedItem);

    ToDoList.addCheckBoxListener().call(ToDoList); ///LEFT OFF HERE ///
  };

  this.undo = function() {
    this.classList.remove('checked');
    this.classList.add('unchecked');
    var undoItem = this.parentNode.cloneNode(true);
    undoItem.classList.remove('muted');
    doneList.removeChild(this.parentNode);
    this.list.appendChild(undoItem);
    this.addCheckBoxListener();
  }.bind(this);

  this.edit = function() {
    var item = this;
    var itemValue = this.innerHTML;
    var newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('value', itemValue);
    newInput.setAttribute('class', 'editInput');

    this.parentNode.appendChild(newInput);

    // Sets focus, then removes value, and re-adds it so that the cursor appears at the end of the value and not the beginning.
    newInput.focus();
    newInput.value = '';
    newInput.value = itemValue;

    this.style.display = 'none';

    // Set new value for the list item if the enter button is pressed
    newInput.onkeydown = function() {
      if (event.keyCode == 13) {
        itemValue = newInput.value;
        item.innerHTML = itemValue;
        this.parentNode.removeChild(newInput);
        this.item.style.display = 'block';
        }
      }
    // If the input box loses focus, the value is untouched and the input box is removed
    newInput.addEventListener('blur', function() {
      this.parentNode.removeChild(newInput);
      this.item.style.display = 'block';
    });
  }.bind(this);
}

var list1 = new ToDoList();

list1.newList();

list1.addBtn.onclick = list1.addToList;
