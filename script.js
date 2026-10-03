const list = document.querySelector("#taskList");
const input = document.querySelector("#taskInput");
const count = document.querySelector("#count");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render() {
  list.innerHTML = "";
  const visible = tasks.filter(t => filter === "all" || (filter === "done" ? t.done : !t.done));
  visible.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");
    li.innerHTML = `<input type="checkbox" ${task.done ? "checked" : ""}>
      <span></span><button class="delete">Eliminar</button>`;
    li.querySelector("span").textContent = task.text;
    li.querySelector("input").onchange = () => {
      task.done = !task.done; save(); render();
    };
    li.querySelector(".delete").onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id); save(); render();
    };
    list.appendChild(li);
  });
  count.textContent = `${tasks.filter(t => !t.done).length} pendientes`;
}
document.querySelector("#taskForm").onsubmit = e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({id: Date.now(), text, done:false});
  input.value = ""; save(); render();
};
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.onclick = () => { filter = btn.dataset.filter; render(); };
});
render();
