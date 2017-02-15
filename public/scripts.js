window.addEventListener("load", function(){

    var colorList = document.getElementById("color_palette");
    colorList.addEventListener("click", changeColor);

    var boxes = document.getElementById("painting");
    boxes.addEventListener("click", changeBox);

    var save = document.getElementById("save_button");
    save.addEventListener("click", saveImage);

});

// Sets the painter (currentColor) to white then depending on what box
// is clicked in the color box, will change currentColor to that color
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

// changes the background of the box clicked to whatever the value of 
// currentColor is at that moment
function changeBox(){
    event.target.style.background = currentColor
}

// when "save" is clicked, will push the background value of each box
// into an array, then turn that into a string.
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

// sends a post request to the server with the string of game box colors
// then alerts the artist that game was saved
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
