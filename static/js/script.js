// Getting the slider elements by ID
var sepalLengthSlider = document.getElementById("sepalLength")
var sepalWidthSlider = document.getElementById("sepalWidth")
var petalLengthSlider = document.getElementById("petalLength")
var petalWidthSlider = document.getElementById("petalWidth")

var prediction = document.getElementById("predictionText")

// Updates the lengths and widths live from the slider
function updateText(){
    let sepalLength = sepalLengthSlider.value
    let sepalWidth = sepalWidthSlider.value
    let petalLength = petalLengthSlider.value
    let petalWidth = petalWidthSlider.value

    document.getElementById("sepalLengthText").innerHTML = sepalLength
    document.getElementById("sepalWidthText").innerHTML = sepalWidth
    document.getElementById("petalLengthText").innerHTML = petalLength
    document.getElementById("petalWidthText").innerHTML = petalWidth 

    $.ajax({ 
        url: '/predict', 
        type: 'POST', 
        contentType: 'application/json', 
        data: JSON.stringify({ 'sepalLength': sepalLength, 
        'sepalWidth': sepalWidth, 
        'petalLength': petalLength,
        'petalWidth': petalWidth }), 
        success: function(response) { 
            console.log("success")
            prediction.innerHTML = response['prediction']
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
    
}

updateText()

//Set event listeners for the