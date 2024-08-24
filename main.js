const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
let tasks = [];
let editingIndex = null;

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);
      li.classList.toggle('editing', index === editingIndex);
      li.innerHTML = `
        ${index === editingIndex
          ? `<input type="text" value="${task.text}" onblur="updateTask(${index})"/>`
          : `<span>${task.text}</span>`}
        <span class="edit-btn" onclick="editTask(${index})">&#9998;</span>
        <span class="delete-btn" onclick="deleteTask(${index})">&#x2718;</span>
      `;
      taskList.appendChild(li);
    });
  }
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = '';
      renderTasks();
    }
  }


  function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }


  function editTask(index) {
    editingIndex = index;
    renderTasks();
  }
  function updateTask(index) {
    const newText = document.querySelector(`#task-list li:nth-child(${index + 1}) input`).value.trim();
    if (newText) {
      tasks[index].text = newText;
    }
    editingIndex = null;
    renderTasks();
  }
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  renderTasks();