const items = []

        function renderList(list){
            const listElement = document.getElementById("list")
            listElement.innerText = ""

            items.forEach(function(listItem, i){
            const userValue = document.createElement("li")
                userValue.innerText = listItem
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


        document.forms[0].addEventListener('submit', function(event){
            event.preventDefault()
            const newItemInputElement = document.forms[0].userValue
            const itemText = newItemInputElement.value
            if (itemText == "") return alert("Can't be empty")
            
            items.push(itemText)
           
            renderList(items)
            newItemInputElement.value = ""

            

            

        })
console.log(items)
// Delete Tasks
//userValue = document.remove("li")
