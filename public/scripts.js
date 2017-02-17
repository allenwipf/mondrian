window.addEventListener("load", function(){

    document.getElementById("color_palette").addEventListener("click", changeColor);
    document.getElementById("painting").addEventListener("click", changeBox);
    document.getElementById("save_button").addEventListener("click", saveCanvas);
    document.getElementById("past_button").addEventListener("click", openPastSaved);
    document.getElementById("clear_button").addEventListener("click", clearCanvas);
    document.getElementById("myModal").addEventListener("click", closeModal);

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
function saveCanvas(e){

    e.preventDefault();
    sendData = getColors(e);
    var ourRequest = new XMLHttpRequest();
    var params = "game=" + sendData;

    ourRequest.open('POST', '/', true);

    ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ourRequest.send(params);

    alert("Game Saved!");
}

// when a specific saved canvas is clicked inside the modal window, the unique id of that canvas
// is passed as a param to the server to retrieve that canvas
function getPastCanvas(canvasID) {

    var getRequest = new XMLHttpRequest();
    var params = "gameId=" + canvasID
    getRequest.open('GET', '/data' + '?' + params, true);

    getRequest.onload = function() {
        var ourData = getRequest.responseText; 

        paintPastCanvas(ourData)
    };
    getRequest.send(params);
}

// when a specific data set for a saved canvas is retrieved, this function loops though each color
// and applies that color to the appropriate block
function paintPastCanvas(ourData){
    var x = 1
    var y = 1

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
            document.getElementById("row_" + x + "_box_" + y + "").style.background = "#ffffff"
        }  
        y++
        if (y == 5){
            x++
            y = 1
        }
    });
    document.getElementById('myModal').style.display = "none"
}

// turns the background color of each block into an empty string to clear all the colors
function clearCanvas(e){
    var x = 1
    var y = 1
    var howmany = document.getElementsByClassName("row").length

    for (boxes = 1; boxes <= howmany; boxes++){
        document.getElementById("row_" + x + "_box_" + y + "").style.background = ""

        y++
        if (y == 5){
            x++
            y = 1
        }
    }
    e.preventDefault()
}

// each time a canvas is saved, the Epoch time in seconds is saved as it's unique id.
// this function gets all those titles via a get request and places them in a modal
// when user clicks the "Past" button
function openPastSaved(e){

    var getRequest = new XMLHttpRequest();
    getRequest.open('GET', '/titles');

    getRequest.onload = function() {
      
        var ourData = getRequest.responseText; 
        document.getElementById("saveMasters").innerHTML = ourData;
        document.getElementById('myModal').style.display = "block";
    };
    getRequest.send();
    e.preventDefault();
}

// Closes the Modal box if the "X" our anything outside the Modal is clicked on.
function closeModal(e){

    if (e.target == this) {
        document.getElementById('myModal').style.display = "none";
    } else if (e.target == this.getElementsByClassName("close")[0]) {
        document.getElementById('myModal').style.display = "none";
    }
    
}