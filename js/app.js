
 //---------------------------------------------------------SELECTING:
 const todoForm = document.querySelector(".todo-form");
 const addItemInput = document.querySelector(".addItem__input");
 const taskList = document.querySelector(".container__task-list");

 
 //-------------------------------------------------------------EVENT:
 todoForm.addEventListener("submit",addTodoTask);
 

 let todos= [];

 //-----------------------------------------------------------FUNCTION:

 //add new todo:
 function addTodoTask(e){
    e.preventDefault();
  if(!addItemInput.value) return null;

    const newTodo ={
      id: Date.now(),
      title: addItemInput.value,
      createdAt: new Date().toISOString(),
      isCompleted: false, 
    }
    todos.push(newTodo);

    //add todo on dom:
    let result = "";
    todos.forEach((todo)=>{
      result += `
        <li class="container__input">

          <div class="input__action">

            <div class="input__checkbox">
              <form action="#">
                <input type="checkbox" />
              </form>
                  
              <div class="input__text">
                <p class="todo__title">${todo.title}</p>
                <span class="input-createAt">${new Date(todo.createdAt).toLocaleDateString("en-US")}</span>
              </div>
            </div>

            <div class="input__trashEdit">
              <i class="fa-solid fa-pen-to-square edit" data-todo-id=${todo.id}></i>
              <i class="fa-solid fa-trash trash" data-todo-id=${todo.id}></i>
            </div>
          </div>
        </li>
      `
      taskList.innerHTML= result;
      addItemInput.value = "";
    })

 }

 //filter todos:(isCompleted:false=== uncompleted && iscompleted:true === completed && all === completed && uncompleted)
