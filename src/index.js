import "./style.css";

const ul = document.querySelector(".listToDo");
const form = document.querySelector(".formToDo");
const input = document.querySelector(".input");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(async (resp) => {
    const grabbedTodos = await resp.json();
    // diviser le tableau en 10
    const length = grabbedTodos.length;
    const todos = grabbedTodos.slice(0, length / 10);

    // affichage des todos
    const displayTodo = () => {
      // on créer une node pour chaque todo
      const todosNode = todos.map((todo, i) => {
        return createTodoElement(todo, i);
      });
      ul.innerHTML = "";
      ul.append(...todosNode);
    };

    // on créer l'élément todo, avec ces balises HTML et on y inclus les éléments
    const createTodoElement = (todo, i) => {
      const li = document.createElement("li");
      const dot = document.createElement("span");
      dot.classList.add("todo");
      todo.completed ? dot.classList.add("done") : null;
      const para = document.createElement("p");
      para.innerText = todo.title;
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      editButton.innerHTML = "Editer";
      deleteButton.innerHTML = "Supprimer";

      deleteButton.addEventListener("click", (e) => {
        deleteTodo(i);
      });

      editButton.addEventListener("click", (e) => {
        editTodo(i, todo);
      });

      const btnContainer = document.createElement("div");

      dot.addEventListener("click", (e) => {
        toggleTodo(i);
      });

      li.append(dot, para);
      li.appendChild(btnContainer);
      btnContainer.append(editButton, deleteButton);

      li.classList.add("singleToDo");
      btnContainer.classList.add("btnToDo");
      editButton.classList.add("editBtn");
      deleteButton.classList.add("delBtn");

      return li;
    };

    // Ajout d'une nouvelle ToDo
    const addTodo = async (title) => {
      const newTodo = {
        title,
        completed: false,
      };
      // on POST la nouvelle todo vers la BDD
      await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((resp) => {
          console.log(
            resp.ok === true
              ? "Nouvelle todo parfaitement envoyée !"
              : "Erreur lors de l'envoi"
          );
        })
        .catch((err) => {
          console.log(err);
        });
      // je push la nouvelle todo sur le tableau local (pour l'afficher dans ce projet)
      todos.push(newTodo);
      displayTodo();
    };

    // Supprimer une ToDo
    const deleteTodo = async (i) => {
      const answer = confirm("Voulez-vous supprimer la To Do n°" + i + " ?");
      if (answer === true) {
        todos.splice(i, 1);
        await fetch("https://jsonplaceholder.typicode.com/todos" + "/" + i, {
          method: "DELETE",
        })
          .then((resp) => {
            console.log(resp);
            console.log(alert("ToDo n°" + i + " supprimée !"));
          })
          .catch((err) => {
            console.log(err);
          });
        displayTodo();
      } else {
        alert("Suppression annulée");
      }
    };

    // Editer une Todo
    const editTodo = async (i, todo) => {
      const title = todo.title;
      const newtitle = window.prompt("Une modification à éffectuer ?", title);
      todos[i].title = newtitle;
      todos[i].completed = false;
      await fetch("https://jsonplaceholder.typicode.com/todos" + "/" + i, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todos[i]),
      })
        .then((resp) => {
          alert(
            resp.ok === true
              ? "Modification éffectuée !"
              : "Erreur lors de l'envoi"
          );
        })
        .catch((err) => {
          console.log(err);
        });

      displayTodo();
    };

    // Toggle d'une ToDo
    const toggleTodo = async (i) => {
      todos[i].completed = !todos[i].completed;
      await fetch("https://jsonplaceholder.typicode.com/todos" + "/" + i, {
        method: "PATCH",
        body: JSON.stringify({
          completed: todos[i].completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((err) => {
        console.log(err);
      });
      displayTodo();
    };

    // fomulaire d'ajout d'une todo
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = input.value;
      input.value = "";
      addTodo(value);
    });

    displayTodo();
  })
  .catch((err) => {
    console.log(err);
  });
