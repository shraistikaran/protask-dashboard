let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const list = document.getElementById("taskList");
const total = document.getElementById("total");
const done = document.getElementById("done");
const pending = document.getElementById("pending");

const themeBtn = document.getElementById("themeBtn");

/* Date */

document.getElementById("date").textContent =
  new Date().toDateString();

/* Theme */

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

/* Tasks */

function addTask() {

  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return alert("Enter task!");

  tasks.push({
    text,
    done: false
  });

  input.value = "";

  save();
  render();
}

/* Render */

function render() {

  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, i) => {

    const li = document.createElement("li");

    if (task.done) {
      li.classList.add("done");
      completed++;
    }

    li.innerHTML = `

      <span>${task.text}</span>

      <div class="actions">

        <button onclick="toggle(${i})">✓</button>

        <button onclick="removeTask(${i})">X</button>

      </div>

    `;

    list.appendChild(li);

  });

  updateStats(completed);
}

/* Actions */

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  save();
  render();
}

function removeTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

/* Stats */

function updateStats(doneCount) {

  total.textContent = tasks.length;
  done.textContent = doneCount;
  pending.textContent = tasks.length - doneCount;

}

/* Storage */

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

render();