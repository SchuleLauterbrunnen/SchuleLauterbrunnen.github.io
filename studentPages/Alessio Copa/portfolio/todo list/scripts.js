function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Bitte eine Aufgabe eingeben.');
        return;
    }

    const todoList = document.getElementById('todo-list');

    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
    });

    todoList.appendChild(listItem);

    taskInput.value = '';
}
