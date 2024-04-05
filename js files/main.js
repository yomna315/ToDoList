let input = document.querySelector(".form-control");
let submit = document.querySelector(".add")
let tasks = document.querySelector(".tasks");
let arrayTasks = [];

if (localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocal();

submit.onclick = function () {
    if (input.value !== "") {
        addTask(input.value);
        input.value = "";
    };
};

tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-outline-danger")) {
        deletWithId(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.remove();

    }
    if (e.target.classList.contains("btn-outline-success")) {
        toggelTaskWithId(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"))
        e.target.parentElement.parentElement.classList.toggle("done");
    }
})

function addTask(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayTasks.push(task);
    //addToPage
    addToPage(arrayTasks);
    addToLocalStorge(arrayTasks);
};

function addToPage(arrayTasks) {
    tasks.innerHTML = "";
    arrayTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task ";
        if (task.completed === true) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id);
        let div2 = document.createElement("div");
        div2.className="input-group mb-3"
        div.appendChild(div2);
        let div3= document.createElement("div");
        div3.className = "form-control"
        div3.appendChild(document.createTextNode(task.title));
        div2.appendChild(div3);
        let div4= document.createElement("div");
        div4.className = "input-group-append";
        div2.appendChild(div4);
        let btn = document.createElement("button");
        btn.className = "btn btn-outline-success";
        btn.type = "button"
        btn.appendChild(document.createTextNode("done"));
        div4.appendChild(btn);
        let btn1 = document.createElement("button");
        btn1.className = "btn btn-outline-danger";
        btn1.type = "button"
        btn1.appendChild(document.createTextNode("delete"));
        div4.appendChild(btn1);
        tasks.appendChild(div);
    });
}

function addToLocalStorge(arrayTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
}

function getDataFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addToPage(tasks);
    }
}

function deletWithId(taskId) {
    arrayTasks = arrayTasks.filter((task) => task.id != taskId);
    addToLocalStorge(arrayTasks)
}

function toggelTaskWithId(taskId) {
    for (let i = 0; i < arrayTasks.length; i++){
        if ( arrayTasks[i].id == taskId) {
                arrayTasks[i].completed == false ? (arrayTasks[i].completed = true) : (arrayTasks[i].completed = false);
            }
    }
    addToLocalStorge(arrayTasks)
}
let f2 = document.querySelector(".f2");
let body = document.querySelector("body");
let header = document.querySelector("header");
// let header = document.querySelector("header");
tasks
let container =document.querySelector(".container")
f2.onclick = function () {
    f2.classList.toggle("dark-btn");
    body.classList.toggle("dark-body");
    container.classList.toggle("dark-container");
    header.classList.toggle("dark-header");
    tasks.classList.toggle("tasks-dark");

}

