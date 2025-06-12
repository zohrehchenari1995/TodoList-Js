//---------------------------------------------------------SELECTING:
//add todo
const todoForm = document.querySelector(".todo-form");
const addItemInput = document.querySelector(".addItem__input");
const taskList = document.querySelector(".container__task-list");
//filter
const selectFilter = document.querySelector(".select__filter");
//status
const progress = document.querySelector(".status__complete-progress");
const containerCircle = document.querySelector(".container-circle");

//-------------------------------------------------------------EVENT:
todoForm.addEventListener("submit", addTodoTask);
selectFilter.addEventListener("change", filterTodos);
progress.addEventListener("change", completeTodo);

selectFilter.addEventListener("change", (e) => {
  currentFilter = e.target.value;  // مقدار فیلتر را ذخیره کن
  filterTodos(e);                  // فیلتر کردن تودوها
  updateProgressAndCircle();       // به‌روزرسانی نوار پیشرفت و عدد
});


//-----------------------------------------------------------FUNCTION:
let todos = [];
let currentFilter = "all"; // مقدار پیش‌فرض


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
   updateProgressAndCircle();
 
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

  //edit
  // const todoEdit = [...document.querySelectorAll(".todo__edit")];
  // todoEdit.forEach((editBtn) => {});

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
  updateProgressAndCircle();
 
}

//delete:
function deleteTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => {
    return t.id !== todoId;
  });
  createTodo(todos);
   updateProgressAndCircle();
}

//complete:
function completeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const findTodo = todos.find((t) => {
    return t.id === todoId;
  });
  findTodo.isCompleted = !findTodo.isCompleted;
  createTodo(todos);
   updateProgressAndCircle();
    createConfetti();
}

//sort:




//edit:




//update status(progressBar):
//تابع به روز رسانی
function updateProgressAndCircle() { 
  const totalTodo = todos.length; // طول یا تعداد کل تودو هایی که دارم
  const completeTodos = todos.filter((t) => t.isCompleted).length; // از بین همه تودوها فقط اونایی که تیک خوردن و کامل شدن

  if (totalTodo === 0) {// اگر هیج تودویی اضافه نشده به لیست
    progress.style.width = "0%"; // عرض نوار پیشرفت بشه صفر
    containerCircle.textContent = "0 / 0";
    return;
  } 
  else if (currentFilter === "uncompleted"){
    progress.style.width = "0%";
    containerCircle.textContent = `0 / ${totalTodo}`;
  }
  else {
    const step = 100 / totalTodo; // هر تودو یک گام از نوار پیشرفت بشه
    progress.style.width = `${step * completeTodos}%`; // اما اگر تودویی اضافه شده باشه عرض نوار پیشرفت بشه هر گاهی که داریم ضربدر موارد کامل شده
    containerCircle.textContent = `${completeTodos}  /  ${totalTodo}`;
  }
 
}


  function createConfetti() {
    const colors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590'];
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.width = confetti.style.height = (Math.random() * 7 + 5) + 'px';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      document.body.appendChild(confetti);

      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    }
  }

/* فرض کنید این تابع وقتی همه تودولیست کامل شد فراخوانی می‌شود */
  // function onAllTasksCompleted() {
  //   createConfetti();
  // }
















