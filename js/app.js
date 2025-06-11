//---------------------------------------------------------SELECTING:
const todoForm = document.querySelector(".todo-form");
const addItemInput = document.querySelector(".addItem__input");
const taskList = document.querySelector(".container__task-list");

const selectFilter = document.querySelector(".select__filter");
const progress =document.querySelector(".status__complete-progress");

//-------------------------------------------------------------EVENT:
todoForm.addEventListener("submit", addTodoTask);
selectFilter.addEventListener("change", filterTodos);
progress.addEventListener("change",completeTodo)

//-----------------------------------------------------------FUNCTION:
let todos = [];

//add new todo:
function addTodoTask(e) {
  e.preventDefault();
  if (!addItemInput.value) return null;

  const newTodo = {
    id: Date.now(),
    title: addItemInput.value,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };
  todos.push(newTodo);
  createTodo(todos);
  // console.log(newTodo);
}

//create todos (slice of newTodo function for clean code):
function createTodo(todos) {
  //create todo on dom:
  let result = "";
  todos.forEach((todo) => {
    result += `
        <li class="container__input">

          <div class="input__action">

            <div class="input__checkbox">

              <label class="checkbox__container">
                <input type="checkbox" class="checkBox__complete ${
                  todo.isCompleted && "completeCheckBox"
                }"   data-todo-id=${todo.id}>

                <span class="checkmark"></span>
               </label>
                  
              <div class="input__text">
                <p class="todo__title  ${todo.isCompleted && "completed"} ">${
      todo.title
    }</p>
                <span class="input-createAt">${new Date(
                  todo.createdAt
                ).toLocaleDateString("en-US")}</span>
              </div>
            </div>

            <div class="input__trashEdit">
              <button class="todo__edit" data-todo-id=${todo.id}>
              <i class="fa-solid fa-pen-to-square edit"></i>
              </button>
             
              <button class="todo__remove" data-todo-id=${todo.id}>
               <i class="fa-solid fa-trash trash"></i>
              </button>
            </div>
          </div>
        </li>
      `;
  });
  taskList.innerHTML = result;
  addItemInput.value = "";

  const todoRemove = [...document.querySelectorAll(".todo__remove")];
  todoRemove.forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });

  const completedTod = [...document.querySelectorAll(".checkBox__complete")];
  completedTod.forEach((checkbox) => {
    checkbox.addEventListener("change", completeTodo);
  });
}

//filter todos:
function filterTodos(e) {
  const filter = e.target.value;
  switch (filter) {
    case "all": {
      createTodo(todos);
      break;
    }
    case "completed": {
      const filteredTodo = todos.filter((t) => t.isCompleted);
      createTodo(filteredTodo);
      break;
    }
    case "uncompleted": {
      const filteredTodo = todos.filter((t) => !t.isCompleted);
      createTodo(filteredTodo);
      break;
    }
    default:
      createTodo(todos);
  }
}

//delete:
function deleteTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => {
    return t.id !== todoId;
  });
  createTodo(todos);
}

//complete:
function completeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const findTodo = todos.find((t) => {
    return t.id === todoId;
  });
  findTodo.isCompleted = !findTodo.isCompleted;
  console.log(todos);
  createTodo(todos);
}
