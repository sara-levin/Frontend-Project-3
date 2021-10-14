let todoItems = [];
var checkedItems = [];

function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  updateCounter();
  
  const item = document.querySelector("[data-key='"+todo.id+"']");
  const list = document.querySelector('.js-todo-list');

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return
  }

   const listEntry = document.createElement("li");
    listEntry.id = todo.id + "x";
    listEntry.className = "checkbox";
    const isChecked = todo.checked ? 'done': '';
    const HTMLstring = "<input type=checkbox id=" + todo.id + "></input>" +  
    "<span class= span>" + todo.text + "</span>" +
    "<button class= delete-todo js-delete-todo >" +
    "❌" +
    "</button>";  
  
  listEntry.setAttribute('class', "todo-item" + isChecked);
  listEntry.setAttribute('data-key', todo.id);
  listEntry.innerHTML = HTMLstring

  if (item) {
    list.replaceChild(listEntry, item);
  } else {
    list.append(listEntry);
  }
}

//#region Adds a to-do note
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}
//#endregion

//#region Delete DONE
function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}
//#endregion

//#region Clear conpleted DONE
function clearCompleted()
{
  checkedItems.forEach(element => 
    {
        deleteTodo(element)
    })
    checkedItems = []
    updateCounter();
}
//#endregion

//#region Takes what's written and makes it into a string
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});
//#endregion

//#region Check / un-check boxes
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.localName == "input") {
    const itemKey = event.target.parentElement.dataset.key;

    if (document.getElementById(itemKey).checked){
    const itemKey = event.target.parentElement.dataset.key;
    //document.getElementById(itemKey).checked = false;
    pushCheckedItems(itemKey.toString()) 
    }

    else {
        const itemKey = event.target.parentElement.dataset.key;
        //document.getElementById(itemKey).checked = true;
            if(checkedItems.includes(itemKey)){
                const keyIndex = checkedItems.indexOf(itemKey)
                checkedItems.splice(keyIndex,1)}
        }
        
    }
//#endregion

//#region Trigger delete function with click
  else if (event.target.localName == "button") {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }

  updateCounter();
});
//#endregion

//#region Task counter
function updateCounter()
{
var count = document.getElementById("taskcounter")
  var tasksRemaining = todoItems.length - checkedItems.length

    count.innerHTML = tasksRemaining + " items left";
}
//#endregion

//#region Push checked items in to array
function pushCheckedItems(itemKey){
    if (checkedItems.includes(itemKey) == true){
        
    }
    else{checkedItems.push(itemKey)}
}
//#endregion

//#region Select all button
function toggleAll()
{
    if(checkedItems.length==todoItems.length)
    {todoItems.forEach(element =>
      {
        const itemKey = element.id
        document.getElementById(itemKey).checked=false;
        const keyIndex = checkedItems.indexOf(itemKey)
                checkedItems.splice(keyIndex,1)
                updateCounter()
      })}
      else
      {
        todoItems.forEach(element =>
          {
            const itemKey = element.id
            document.getElementById(itemKey).checked=true;
           pushCheckedItems(itemKey.toString())
          })
          updateCounter()
      }
}
//#endregion

function showCompleted(){
    todoItems.forEach(element=>
        {
          const htmlpath = element.id+"x"
    
          if(checkedItems.includes(element.id.toString()))
          {
            document.getElementById(htmlpath).style.display ="flex";
            document.getElementById(htmlpath).style.alignItems ="center";
            document.getElementById(htmlpath).style.justifyContent ="space-between";
          }
          else
          {
            document.getElementById(htmlpath).style.display = "none";
          }
    
        })
}
    
function showRemaining(){
    todoItems.forEach(element=>
        {
            const htmlpath = element.id+"x"
    
            if(checkedItems.includes(element.id.toString()))
              {
                document.getElementById(htmlpath).style.display = "none";
              }
              else
              {
                document.getElementById(htmlpath).style.display ="flex";
                document.getElementById(htmlpath).style.alignItems ="center";
                document.getElementById(htmlpath).style.justifyContent ="space-between";
              }
    
            })
}
    
    
function showAll()
    {
            todoItems.forEach(element=>
            {
                const htmlpath = element.id+"x"
                document.getElementById(htmlpath).style.display ="flex";
                document.getElementById(htmlpath).style.alignItems ="center";
                document.getElementById(htmlpath).style.justifyContent ="space-between";
                })
}

//#region Local storage / reload save
document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});
//#endregion

