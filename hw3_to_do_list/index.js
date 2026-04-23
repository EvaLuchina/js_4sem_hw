const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

const allBtn = document.getElementById('allBtn');
const inProgressBtn = document.getElementById('inProgressBtn');
const finishedBtn = document.getElementById('finishedBtn');

const taskList = document.getElementById('taskList');

const searchBar = document.getElementById('searchBar');

let countTasks = 0;

const addTask = (text, completed = false) => {
    const taskText = text || taskInput.value.trim();
    if(!taskText) {
        return;
    };
    
    const li = document.createElement('li');
    countTasks++;

    li.innerHTML = `
    <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
    <span>${taskText}</span>
    <div class="priority-btns">
        <input type="radio" class="priority" name="priority${countTasks}" id="radio1${countTasks}" >
        <label for="radio1${countTasks}" class="radio-label"><i class="fa-solid fa-caret-up"></i></label>
        <input type="radio" class="priority" name="priority${countTasks}" id="radio2${countTasks}" checked>
        <label for="radio2${countTasks}" class="radio-label"><i class="fa-regular fa-circle-dot"></i></label>
        <input type="radio" class="priority" name="priority${countTasks}" id="radio3${countTasks}" >
        <label for="radio3${countTasks}" class="radio-label"><i class="fa-solid fa-caret-down"></i></label>
    </div>
    <div class="task-btns">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-delete-left"></i></button>
    </div>
    `;

    taskList.append(li);
    saveTaskToLocalStorage();
    taskInput.value = '';

    const checkbox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    const priorityInput = li.querySelectorAll('input.priority');
    
    const disablePriority = () => {
        let len = priorityInput.length;
        if (checkbox.checked){
            for(let i=0; i<len; i++){
                priorityInput[i].disabled = true;
            };
        }
        else {
            for(let i=0; i<len; i++){
                priorityInput[i].disabled = false;
            };
        };
    }

    if (!checkbox.checked) {
        priorityInput.forEach(priority => {
            priority.addEventListener('click', () => {
                li.classList.toggle('first-priority', priorityInput[0].checked);
                li.classList.toggle('second-priority', priorityInput[1].checked);
                li.classList.toggle('third-priority', priorityInput[2].checked); 
            });
        });
    }

    if (checkbox.checked){
        li.querySelector('span').classList.add('completed');
        li.classList.add('done');
        disablePriority();
    };

    checkbox.addEventListener('change', () => {
        li.querySelector('span').classList.toggle('completed');
        li.classList.toggle('done', checkbox.checked);

        disablePriority();
        saveTaskToLocalStorage();
    });

    editBtn.addEventListener('click', () => {
        if (!checkbox.checked){
            taskInput.value = li.querySelector('span').textContent;
            li.remove();
            saveTaskToLocalStorage();
        }
    });

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTaskToLocalStorage();
    });

    allBtn.addEventListener('click', () => {
        li.classList.remove('hide');
    });

    inProgressBtn.addEventListener('click', () => {
        li.classList.toggle('hide', checkbox.checked);
    });

    finishedBtn.addEventListener('click', () => {
        li.classList.toggle('hide', !checkbox.checked);
    });

    searchBar.addEventListener('input', () =>{
        const searchInput = searchBar.value.toLowerCase();
        const includesInput = li.querySelector('span').textContent.toLowerCase().includes(searchInput);
        li.classList.toggle('hide', !includesInput);
    });
};

const saveTaskToLocalStorage = () => {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStoradge = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(({ text, completed }) => addTask(text, completed));
};

addBtn.addEventListener('click', () => addTask());

loadTasksFromLocalStoradge();


