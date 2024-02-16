
var inputTextbox = document.getElementById('input-textbox');
var list = document.querySelector('.todo-list__list');
var showError = document.querySelector('.todo-list__show-error');
var btnAdd = document.querySelector('.btn-add');

inputTextbox.addEventListener('input', function () {
    if (inputTextbox.value.length > 0) {
        showError.style.display = 'none';
    }
});

inputTextbox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        btnAdd.click();
    }
});

btnAdd.addEventListener('click', function () {
    if (inputTextbox.value.trim() !== '') {
        var taskId = Date.now();

        var li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" name="" id="input-checkbox-${taskId}">
            <label class="text-label" for="input-checkbox-${taskId}">${inputTextbox.value}</label>
            <i class='bx bx-edit edit'></i>
            <i class='bx bx-trash delete'></i>
        `;
        list.appendChild(li);
        saveData();

        inputTextbox.value = '';
        changeStatus()
    } else {
        showError.style.display = 'block';
    }
});
function changeStatus() {

    var deleteButtons = list.querySelectorAll('.delete');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var li = button.parentElement;
            li.remove();
            saveData();
        });
    });

    var editButtons = list.querySelectorAll('.edit');
    editButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            showError.style.display = 'none';
            var target = e.target;
            if (e.target.className == 'edit') {
                target = e.target.parentElement;
            }
            inputTextbox.value = target.previousElementSibling.innerText;
            target.parentNode.remove();
            saveData();
        });
    });
    var checkboxes = list.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var li = checkbox.parentElement;
            li.classList.toggle('completed', checkbox.checked);
            checkbox.classList.toggle('checked', checkbox.checked);
            saveData();
        });
    });
}
function saveData() {
    localStorage.setItem('tasks', list.innerHTML);
}
function showTasks() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        list.innerHTML = savedTasks;
        changeStatus();
    }
}

showTasks();

