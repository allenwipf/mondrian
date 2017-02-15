window.addEventListener("load", function(){

    var colorList = document.getElementById("color_palette");
    colorList.addEventListener("click", changeColor);

    var boxes = document.getElementById("painting");
    boxes.addEventListener("click", changeBox);

    var save = document.getElementById("save_button");
    save.addEventListener("click", saveImage);

});

 var currentColor = 'white'

function changeColor(){
 
    if (event.target.id == "red"){
        currentColor = "#cc0000"

    } else if (event.target.id == "yellow"){
        currentColor = "#ffec00"

    } else if (event.target.id == "blue"){
        currentColor = "#0000cc"

    } else if (event.target.id == "white")
        currentColor = "white"
}

function changeBox(){
  
    event.target.style.background = currentColor
}


function getColors(e){
  
    var boxArray = []
    var boxes = document.getElementsByClassName("row") 
    for (x=0; x <= boxes.length-1; x++){

        if (boxes[x].style.background == ''){

            boxes[x].style.background = "rgb(255,255,255)"
        }

       boxArray.push(boxes[x].style.background)
       var boxString = boxArray.join()
    }   
    return boxString
}




function saveImage(e){

    e.preventDefault()

    sendData = getColors(e)


    var ourRequest = new XMLHttpRequest();
    var params = "game=" + sendData

    ourRequest.open('POST', '/', true);

    ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ourRequest.send(params);

    alert("Game Saved!")
}


// function profileView(e){
  
//     var findTime = ((e.timeStamp-pageLoad)/1000).toFixed(1);
//     document.getElementById("find-time").innerHTML = ("You found him in " + findTime + " seconds!");

//     document.getElementById('myModal').style.display = "block";

// }


// function closeModal(e){

//     if (e.target == this) {
//         document.getElementById('myModal').style.display = "none";
//     } else if (e.target == this.getElementsByClassName("close")[0]) {
//         document.getElementById('myModal').style.display = "none";
//     }

// }

// function highScores(e){

//     var getRequest = new XMLHttpRequest();
//     getRequest.open('GET', 'http://localhost:4567/data');

//     getRequest.onload = function() {
     
//     var ourData = getRequest.responseText;
  
//     // myData = getRequest.responseText

//     alert(ourData)
//     // var ourData = JSON.parse(getRequest.responseText);

//     };

    
//     getRequest.send()

//     e.preventDefault;
// }









