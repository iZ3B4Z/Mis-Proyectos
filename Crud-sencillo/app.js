let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentEditIndex = null;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();

    if (taskText !== "") {
        tasks.push({ text: taskText, description: descriptionText, completed: false });
        taskInput.value = "";
        descriptionInput.value = "";
        saveTasks();
        renderTasks();
    }
}


document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        addTask(); 
    }
});

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-gray-100 p-2 rounded mb-2";

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.className = `mr-2 ${task.completed ? 'line-through text-gray-500' : ''}`;

        const descriptionText = document.createElement('p');
        descriptionText.textContent = task.description ? `Descripción: ${task.description}` : "Sin descripción";
        descriptionText.className = "text-sm text-gray-600";

        const buttonContainer = document.createElement('div');
        buttonContainer.className = "flex space-x-1";

        const doneButton = document.createElement('button');
        doneButton.textContent = task.completed ? "Deshacer" : "Vendido";
        doneButton.className = `p-1 ${task.completed ? 'bg-gray-400' : 'bg-green-500'} text-white rounded`;
        doneButton.onclick = () => toggleTaskCompletion(index);

        const editButton = document.createElement('button');
        editButton.textContent = "Editar";
        editButton.className = "p-1 bg-yellow-500 text-white rounded";
        editButton.onclick = () => openEditModal(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "p-1 bg-red-500 text-white rounded";
        deleteButton.onclick = () => deleteTask(index);

        buttonContainer.appendChild(doneButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(descriptionText);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function openEditModal(index) {
    currentEditIndex = index;
    const editTaskInput = document.getElementById('editTaskInput');
    const editDescriptionInput = document.getElementById('editDescriptionInput');
    editTaskInput.value = tasks[index].text;
    editDescriptionInput.value = tasks[index].description;
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

function saveEdit() {
    const editTaskInput = document.getElementById('editTaskInput');
    const editDescriptionInput = document.getElementById('editDescriptionInput');
    tasks[currentEditIndex].text = editTaskInput.value.trim();
    tasks[currentEditIndex].description = editDescriptionInput.value.trim();
    saveTasks();
    closeEditModal();
    renderTasks();
}

renderTasks();
