const todos = document.querySelectorAll(".todo");
const task_status = document.querySelectorAll(".status");
const btn_modal = document.querySelectorAll("[data-target-modal]");
const close_modal = document.querySelectorAll(".close-modal");
const close_btns = document.querySelectorAll(".close");
const overlay = document.getElementById("overlay");
const todo_submit = document.getElementById("todo-submit");
let draggableTodo = null;

const Status = {
  Backlog: 0,
  ToDo: 1,
  InProgress: 2,
  Done: 3,
};

let task = {
  name: "",
  description: "",
  status: Status.Backlog,
};
todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

task_status.forEach((s) => {
  s.addEventListener("dragover", dragOver);
  s.addEventListener("dragenter", dragEnter);
  s.addEventListener("dragleave", dragLeave);
  s.addEventListener("drop", dragDrop);
});

btn_modal.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modal.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});
close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const name_value = document.getElementById("todo-input-name").value;
  const description_value = document.getElementById(
    "todo-input-description"
  ).value;
  document.getElementById("todo-input-name").value = "";
  document.getElementById("todo-input-description").value = "";
  if (name_value != "") {
    const txt = document.createTextNode(name_value);
    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
    const span = document.createElement("span");
    const span_text = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_text);
    todo_div.appendChild(span);
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);
    span.addEventListener("click", () => {
      span.parentElement.style.display = "none";
    });
    backlog_status.appendChild(todo_div);

    todo_form.classList.remove("active");
    overlay.classList.remove("active");
    const localStorageContent = localStorage.getItem("tasks");
    let tasks;

    if (localStorageContent === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorageContent);
    }
    let task = {
      name: name_value,
      description: description_value,
      status: Status.Backlog,
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    alert("Enter the name of the task, please");
  }
}

function dragStart() {
  draggableTodo = this;
}

function dragEnd() {
  draggableTodo = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
}

function dragLeave() {
  this.style.border = "none";
}

function dragDrop() {
  this.appendChild(draggableTodo);
  this.style.border = "none";
  //   if (this.id == todo_status.id) {
  //     task.status = Status.ToDo;
  //   } else if (this.id == backlog_status.id) {
  //     task.status = Status.Backlog;
  //   }
  //   var item = JSON.parse(localStorage.getItem("tasks"));
  //   for (var i = 0; i < item.length; i++) {
  //     item[i].status = task.status;
  //     task.name = item[i].name;
  //     task.description = item[i].description;
  //     task.status = item[i].status;
  //     localStorage.setItem("tasks", JSON.stringify(task));
  //   }
}

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

(() => {
  if (JSON.parse(localStorage.getItem("tasks") != null)) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks.length);
    for (var i = 0; i < tasks.length; i++) {
      console.log(tasks[i]);
      const todo_div = document.createElement("div");
      const txt = document.createTextNode(tasks[i].name);
      todo_div.appendChild(txt);
      todo_div.classList.add("todo");
      todo_div.setAttribute("draggable", "true");
      const span = document.createElement("span");
      const span_text = document.createTextNode("\u00D7");
      span.classList.add("close");
      span.appendChild(span_text);
      todo_div.appendChild(span);
      todo_div.addEventListener("dragstart", dragStart);
      todo_div.addEventListener("dragend", dragEnd);
      span.addEventListener("click", () => {
        span.parentElement.style.display = "none";
      });
      if (tasks[i].status == Status.Backlog) {
        backlog_status.appendChild(todo_div);
      } else if (tasks[i].status == Status.ToDo) {
        todo_status.appendChild(todo_div);
      }
    }
  }
})();
