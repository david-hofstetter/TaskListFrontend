let items = [];

function valuesFromBackend() {
  fetch("http://localhost:3000/auth/cookie/tasks",{
    credentials: "include"
  }).then((response) => {
    response.json().then((data) => {
      items = data;
      renderList(data);
      console.log(data);
    });
  });
}
valuesFromBackend();

function renderList(list) {
  const listElement = document.getElementById("list");
  listElement.innerText = "";

  items.forEach(function (list, i) {
    const userValue = document.createElement("li");
    userValue.innerText = list.title ?? list;
    userValue.setAttribute("id", "text");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete");
    deleteButton.innerText = "🗑️";

    const editButton = document.createElement("button");
    editButton.setAttribute("id", "edit");
    editButton.innerText = "✏️";

    listElement.append(userValue);
    userValue.append(editButton);
    userValue.append(deleteButton);

    deleteButton.addEventListener("click", function (event) {
      fetch("http://localhost:3000/auth/cookie/task/" + list.id, {
        credentials:"include",
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          valuesFromBackend();
          renderList(items);
        } else {
          return
        }
        valuesFromBackend()
      });
    });
    editButton.addEventListener("click", function (event) {
      items[i] = prompt("enter your new Task");
      fetch("http://localhost:3000/auth/cookie/tasks", {
        credentials:"include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({title : items [i], id : list.id})
        
      }).then((response) => {
        if (response.ok) {
          valuesFromBackend();
          renderList(items);
        } else {
          alert("Failed");
        }
        valuesFromBackend()
      });
      
    });
  });
}

renderList();
//braucht sehr lange
document.forms[0]
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const newItemInputElement = document.forms[0].userValue;
    const itemText = newItemInputElement.value;
    if (itemText == "") return alert("Error: Can't be empty");
    valuesFromBackend()
    fetch("http://localhost:3000/auth/cookie/tasks", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: itemText }),
     
    })
    .then((response) => {
        if (response.ok) {
          valuesFromBackend();
        //  renderList(items);
        } else {
          alert("Failed");
        }
  })
  

    newItemInputElement.value = "";
  });


// nach title id: id""
