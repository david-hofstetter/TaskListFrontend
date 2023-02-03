document.getElementById("logInButton").addEventListener("click",function(){

    fetch("localhost:3000/task").then(function(response){
    console.log("bana") 
    })
    .catch(function(){
    alert("fehler")
    })
    })