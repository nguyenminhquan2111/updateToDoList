import Task from "./models/task.js";
let listTask = [];
let listCompletedTask = [];

const getEle = (id) => document.getElementById(id);
const findIndexById = (id, list) => {
  return list.findIndex((item) => item.id === id);
};

const renderHTML = () => {
  const content = `<div class="card">
    <div class="card__header">
      <img src="../public/assets/img/X2oObC4.png" />
    </div>
    <!-- <h2>hello!</h2> -->
    <div class="card__body">
      <div class="filter-btn">
        <a id="one" href="#"><i class="fa fa-check-circle"></i></a>
        <a id="two" href="#" onclick="sortASC()"
          ><i class="fa fa-sort-alpha-down"></i
        ></a>
        <a id="three" href="#" onclick="sortDES()"
          ><i class="fa fa-sort-alpha-up"></i
        ></a>
        <a id="all" href="#"><i class="fa fa-clock"></i></a>
        <span class="toggle-btn">
          <i class="fa fa-filter"></i>
          <i class="fa fa-times"></i>
        </span>
      </div>
      <div class="card__content">
        <div class="card__title">
          <h2>My Tasks</h2>
          <p>September 9,2020</p>
        </div>
        <div class="card__add">
          <input
            id="newTask"
            type="text"
            placeholder="Enter an activity..."
          />
          <button id="addItem">
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="card__todo">
          <!-- Uncompleted tasks -->
          <ul class="todo" id="todo"></ul>
          <!-- Completed tasks -->
          <ul class="todo" id="completed"></ul>
        </div>
      </div>
    </div>
  </div>`;

  getEle("root").innerHTML = content;
};
renderHTML();

getEle("addItem").addEventListener("click", () => {
  let nameTask = getEle("newTask").value;
  let id = listTask.length;

  const newTask = new Task(id, nameTask, "todo");

  listTask.push(newTask);

  //   console.log(listTask);

  createList(listTask);

  //   createListCompleted(listCompletedTask);
});

const createList = (list) => {
  let content = "";
  for (let i in list) {
    content += `
    <li>
        ${list[i].name}
        <div class="buttons">
            <button class="remove" onclick="handleDeleteTask(${list[i].id})"><i class="far fa-trash-alt"></i></button>
            <button class="complete" onclick="handleCompleteTask(${list[i].id})"><i class="far fa-check-circle"></i></button>
        </div>
    </li>
    `;
  }
  getEle("todo").innerHTML = content;
  getEle("newTask").value = "";
};

const createListCompleted = (list) => {
  let listCompletedTaskHTML = "";
  for (let i in list) {
    list[i].check = "completed";
    listCompletedTaskHTML += `<li>${list[i].name}
                <div class="buttons">
                    <button class="remove" onclick="handleDeleteCompletedTask(${list[i].id})"><i class="far fa-trash-alt"></i></button>
                    <button class="complete" onclick="handleUncompleteTask(${list[i].id})"><i class="fas fa-check-circle"></i></button>
                </div>
              </li>`;
  }

  getEle("completed").innerHTML = listCompletedTaskHTML;
};

const handleDeleteTask = (id) => {
  const foundedIndex = findIndexById(id, listTask);
  if (foundedIndex === -1) alert("Task does not exist");

  listTask.splice(foundedIndex, 1);
  createList(listTask);

  console.log(listTask);
  console.log(listCompletedTask);
};

const handleCompleteTask = (id) => {
  const foundedIndex = findIndexById(id, listTask);
  if (foundedIndex === -1) return alert("Task doesn't exist");

  listCompletedTask.push(listTask[foundedIndex]);
  createListCompleted(listCompletedTask);

  listTask.splice(foundedIndex, 1);
  createList(listTask);
};

const handleDeleteCompletedTask = (id) => {
  const foundedIndex = findIndexById(id, listCompletedTask);
  if (foundedIndex === -1) alert("Task does not exist");

  listCompletedTask.splice(foundedIndex, 1);
  createListCompleted(listCompletedTask);

  console.log(listTask);
  console.log(listCompletedTask);
};

const handleUncompleteTask = (id) => {
  const foundedIndex = findIndexById(id, listCompletedTask);
  if (foundedIndex === -1) return alert("Task doesn't exist");

  listTask.push(listCompletedTask[foundedIndex]);
  createList(listTask);

  listCompletedTask.splice(foundedIndex, 1);
  createListCompleted(listCompletedTask);
};

const sortASC = () => {
  listTask.sort((item1, item2) =>
    item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
  );
  listCompletedTask.sort((item1, item2) =>
    item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
  );
  createList(listTask);
  createListCompleted(listCompletedTask);
};

const sortDES = () => {
  listTask
    .sort((item1, item2) =>
      item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
    )
    .reverse();
  listCompletedTask
    .sort((item1, item2) =>
      item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
    )
    .reverse();
  createList(listTask);
  createListCompleted(listCompletedTask);
};

window.handleDeleteTask = handleDeleteTask;
window.handleCompleteTask = handleCompleteTask;
window.handleDeleteCompletedTask = handleDeleteCompletedTask;
window.handleUncompleteTask = handleUncompleteTask;
window.sortASC = sortASC;
window.sortDES = sortDES;
