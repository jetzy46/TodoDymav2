import "./style.css";

const ul = document.querySelector(".listToDo");
const form = document.querySelector(".formToDo");
const input = document.querySelector(".input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // on récupere la valeur de l'input lors de la soumission
  const value = input.value;
  // on reset sa valeur
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "Travailler",
    done: true,
  },
  {
    text: "Manger",
    done: false,
  },
  {
    text: "Dormir",
    done: false,
  },
  {
    text: "Jouer",
    done: false,
  },
];

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
  // on créer l'élément li qui va être la base de chaque todo
  const li = document.createElement("li");

  // on créer l'élément span qui servira pour le dot de complétion
  const dot = document.createElement("span");
  dot.classList.add("todo");
  todo.done ? dot.classList.add("done") : null;

  // on créer l'élément qui contiendra le text de la todo
  const para = document.createElement("p");
  para.innerText = todo.text;

  // on creer les boutons de chaque todo
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.innerHTML = "Editer";
  deleteButton.innerHTML = "Supprimer";

  // on ajouter l'event listener du bouton supprimer
  deleteButton.addEventListener("click", (e) => {
    // on ajoute cette fonction pour eviter un bug lors de la suppression
    // la todo suivante de la supprimé change de status
    // l'event click se propage, il faut donc le stopper
    e.stopPropagation();
    deleteTodo(i);
  });

  // on ajouter l'event listener du bouton edit
  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    editTodo(i, todo);
  });

  // on creer le container des boutons
  const btnContainer = document.createElement("div");

  dot.addEventListener("click", (e) => {
    toggleTodo(i);
  });

  li.append(dot, para);
  // on ajoute le container des boutons, ainsi que les boutons
  li.appendChild(btnContainer);
  btnContainer.append(editButton, deleteButton);

  // le done sert à changer la couleur du dot si la todo est faite
  //on pense a ajouter les classe  pour le style
  li.classList.add("singleToDo");
  btnContainer.classList.add("btnToDo");
  editButton.classList.add("editBtn");
  deleteButton.classList.add("delBtn");

  return li;
};

// on push une nouvelle todo dans le tableau, avec la value dans l'input
const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  //   on pense a réinvoquer la fonction pour rafraichir l'affichage des todos
  displayTodo();
};

// on creer la function pour delete une todo
const deleteTodo = (i) => {
  // on lui donne l'index de départ, et le nombre que l'on veux enlever
  todos.splice(i, 1);
  displayTodo();
};

// on creer la function pour edit une todo
const editTodo = (i, todo) => {
  // on récupère le texte de la todo
  const text = todo.text;
  //   on affiche un prompt avec la valeur à changer
  const newText = window.prompt("Une modification à éffectuer ?", text);
  //   on remplace la valeur text initiale par la nouvelle valeur
  todos[i].text = newText;
  displayTodo();
};

// on creer une fonction pour toggle une todo (fait / pas fait)
const toggleTodo = (i) => {
  todos[i].done = !todos[i].done;
  displayTodo();
};

displayTodo();
