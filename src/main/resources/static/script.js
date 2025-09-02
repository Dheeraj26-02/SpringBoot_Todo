document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('list');
    const inputBox = document.getElementById('inputBox');


    const listItems = document.querySelectorAll("li");

    list.addEventListener('mouseover', (e) => {
    const li = e.target.closest('li');
    if (!li || !list.contains(li)) return;
    li.classList.add('active');
  });

  list.addEventListener('mouseout', (e) => {
    const li = e.target.closest('li');
    if (!li || !list.contains(li)) return;
    const to = e.relatedTarget;
    if (to && li.contains(to)) return;
    li.classList.remove('active');
  });


    function loadTodos() {
        fetch("/api/todos")
            .then(response => response.json())
            .then(data => renderTodos(data))
            .catch(err => console.error("Error loading todos:", err));
    }
    loadTodos();
    function renderTodos(todos) {
        list.innerHTML = "";
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.classList.add(
                "list-group-item",
                "d-flex",
                "justify-content-between",
                "align-items-center"
            );

            li.innerHTML = `
          <p class="mb-0 ${todo.checked ? "text-decoration-line-through" : ""}" data-id="${todo.id}">
            ${todo.title}
          </p>
          <button type="button" class="btn btn-danger btn-sm delBtn" data-id="${todo.id}">
            Delete
          </button>
        `;

            list.appendChild(li);
        });
    }

    function addTodo() {
        if (inputBox.value.trim() !== "") {
            fetch("/api/todos/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: inputBox.value, checked: false })
            })
                .then(() => {
                    inputBox.value = "";
                    loadTodos();
                })
                .catch(err => console.error("Error adding todo:", err));
        }
    };
    addBtn.addEventListener('click', addTodo);
    inputBox.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delBtn')) {
            const id = e.target.getAttribute("data-id");
            fetch(`/api/todos/${id}`, {
                method: "DELETE"
            })
                .then(() => loadTodos())
                .catch(err => console.error("Error deleting todo:", err));
        }
    });
    list.addEventListener('click', (e) => {
        const id = e.target.getAttribute("data-id");
        fetch(`/api/todos/check/${id}`, {
            method: "put"
        })
            .then(() => loadTodos())
            .catch(err => console.error("Error deleting todo:", err));
    })
});
