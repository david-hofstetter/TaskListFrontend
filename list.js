let items = []

function valuesFromBackend(){
    fetch("http://localhost:3000/tasks")
    .then(response => {
         response.json().then(data => {
            items = data
            renderList(data)
            console.log(data)
         })
        })
}
valuesFromBackend()

/*function valuesIntoBackend(){
    fetch("http://localhost:3000/tasks")
    .then(response => {
         response.json().then(data => {
            items = data
            renderList(data)
            console.log(data)
         })
        })
}
valuesIntoBackend()*/

        function renderList(list){
            const listElement = document.getElementById("list")
            listElement.innerText = ""

            items.forEach(function(list, i){
            const userValue = document.createElement("li")
                userValue.innerText = list.title ?? list
                userValue.setAttribute("id","text")

                const deleteButton = document.createElement("button")
                deleteButton.setAttribute("id", "delete")
                deleteButton.innerText = "🗑️"
                

                const editButton = document.createElement("button")
                editButton.setAttribute("id","edit")
                editButton.innerText = "✏️"

                listElement.append(userValue)
                userValue.append(editButton)
                userValue.append(deleteButton)
              
                deleteButton.addEventListener("click", function(event){
                    userValue.remove()
                    items.splice(i, 1)
                    renderList(items)  
                }) 
                editButton.addEventListener("click", function(event){
                    items[i] = prompt("enter your new Task")
                    renderList(items)  
                })
                
            })
        }

renderList()
        document.forms[0].addEventListener('submit', function(event){
            event.preventDefault()
            const newItemInputElement = document.forms[0].userValue
            const itemText = newItemInputElement.value
            if (itemText == "") return alert("Error: Can't be empty")
            
            items.push(itemText)
           
            renderList(items)
            newItemInputElement.value = ""

            

            

        })

       /* function loadTasksFromBackend{
            fetch("http://localhost:3000/tasks).then(json => {
            items = json
            }
        }

//+const selection[{}] */