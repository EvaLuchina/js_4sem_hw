const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

const allBtn = document.getElementById('allBtn');
const inProgressBtn = document.getElementById('inProgressBtn');
const finishedBtn = document.getElementById('finishedBtn');

const taskList = document.getElementById('taskList')

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(!taskText) {
        return;
    }
    
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" class="checkbox">
    <span>${taskText}</span>
    <div class="task-btns">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-delete-left"></i></button>
    </div>
    `;

    taskList.append(li);
    taskInput.value = '';

    const checkbox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('click', () => {
        li.querySelector('span').classList.toggle('completed');
    });

    editBtn.addEventListener('click', () => {
        if (!checkbox.checked){
            taskInput.value = li.querySelector('span').textContent;
            li.remove();
        }
    });

    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    allBtn.addEventListener('click', () => {
        li.style.display = 'flex';
    });

    inProgressBtn.addEventListener('click', () => {
        if (checkbox.checked){
            li.style.display = 'none';
        }
        else {
            li.style.display = 'flex';
        }
    });

    finishedBtn.addEventListener('click', () => {
        if (checkbox.checked){
            li.style.display = 'flex';
        }
        else {
            li.style.display = 'none';
        }
    });
    
});

