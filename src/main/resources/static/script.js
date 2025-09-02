document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('list');
    const inputBox = document.getElementById('inputBox');

    function loadTodos() {
        fetch("/api/todos")
            .then(response => response.json())
            .then(data => renderTodos(data))
            .catch(err => console.error("Error loading todos:", err));
    }
    loadTodos();
    function renderTodos(todos) {
        console.log(todos);

        list.innerHTML = ""; // clear old items
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

    addBtn.addEventListener('click', () => {
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
    });
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delBtn')) {
            const id = e.target.getAttribute("data-id");
            console.log(e.target.getAttribute("data-id"));
            

            fetch(`/api/todos/${id}`, {
                method: "DELETE"
            })
                .then(() => loadTodos())
                .catch(err => console.error("Error deleting todo:", err));
        }
    });
     list.addEventListener('click', (e) => {
            const id=e.target.getAttribute("data-id");

            fetch(`/api/todos/check/${id}`,{
             method: "put"
                        })
                            .then(() => loadTodos())
                            .catch(err => console.error("Error deleting todo:", err));
                    })
     });
});


