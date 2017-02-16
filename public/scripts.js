window.addEventListener("load", function(){

    document.getElementById("color_palette").addEventListener("click", changeColor);

    document.getElementById("painting").addEventListener("click", changeBox);

    document.getElementById("save_button").addEventListener("click", saveImage);

    document.getElementById("past_button").addEventListener("click", getPastGames);

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

    } else if (event.target.id == "white"){
        currentColor = "#ffffff";
    }
}

// changes the background of the box clicked to whatever the value of 
// currentColor is at that moment
function changeBox(){
    event.target.style.background = currentColor
}

// when "save" is clicked, will push the background value of each box
// into an array, then turn that into a string.
function getColors(e){
  
    var boxArray = [];
    var boxes = document.getElementsByClassName("row");
    for (x=0; x <= boxes.length-1; x++){
        if (boxes[x].style.background == ''){

            boxes[x].style.background = "#ffffff";
        }
       boxArray.push(boxes[x].style.background);
       var boxString = boxArray.join();
    }   
    return boxString;
}

// sends a post request to the server with the string of game box colors
// then alerts the artist that game was saved
function saveImage(e){

    e.preventDefault();
    sendData = getColors(e);
    var ourRequest = new XMLHttpRequest();
    var params = "game=" + sendData;

    ourRequest.open('POST', '/', true);

    ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ourRequest.send(params);

    alert("Game Saved!");
}


function getPastGames(e) {

    var getRequest = new XMLHttpRequest();
    getRequest.open('GET', '/data');

    getRequest.onload = function() {
        var ourData = getRequest.responseText; 

        paintPastCanvas(ourData)
    };
    getRequest.send();
    e.preventDefault();
}

function paintPastCanvas(ourData){
    var x = 1
    var y = 1
  

    // ourData = ourData.{split}(",")
    ourData = ourData.slice(1, -1);
    ourData = ourData.split(/\W,{1}\W/)

    ourData.forEach(function(color) {

        if (color == '204, 0, 0'){
            document.getElementById("row_" + x + "_box_" + y + "").style.background = "#cc0000" 
               
        } else if (color == '255, 236, 0'){
            document.getElementById("row_" + x + "_box_" + y + "").style.background = "#ffec00"

        } else if ( color == '0, 0, 204'){
            document.getElementById("row_" + x + "_box_" + y + "").style.background = "#0000cc"

        } else {
            document.getElementById("row_" + x + "_box_" + y + "").style.background = "white"
        }  


        y++
        if (y == 5){

            x++
            y = 1
        }

    } );

}

















