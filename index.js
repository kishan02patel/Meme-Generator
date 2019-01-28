var uploadedImage = null
const canvasHandle = document.getElementById('canvas')
var formattingObject = {
	topText: "",
	bottomText: "",
	fillColor: 'black',
	outlineColor: 'black'
}
setAllEventListeners();

// Set the canvas height and width
(() => {
	// Set the height of the canvas to the height of the parent element times 0.95
	canvasHandle.height = canvasHandle.parentElement.clientHeight * 0.95
	canvasHandle.width = canvasHandle.parentElement.clientWidth * 0.95
})()

// To download the image
function download() {
	var download = document.getElementById("download");
	var image = canvasHandle.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");
	download.setAttribute("href", image);
}

// Get the image uploaded by the user
function getUploadedImage(event) {
	var file = event.target.files[0]

	// Generate a new FileReader Object
	var reader = new FileReader()

	reader.onload = function (fileObject) {
		// Create a new image object and store it in global object
		uploadedImage = new Image()
		uploadedImage.onload = function () {
			drawMeme()
		}
		uploadedImage.src = fileObject.target.result
	}

	reader.readAsDataURL(file)
}

/*
** Draws the image on the canvas.
** Writes the text on the image.
*/
function drawMeme() {
	var ctx = canvasHandle.getContext('2d')

	// Clear the canvas everytime.
	ctx.clearRect(0, 0, canvasHandle.width, canvasHandle.height)

	// Check whether the image is uplaoded or not.
	if (uploadedImage != null)
		ctx.drawImage(uploadedImage, 0, 0, canvasHandle.width, canvasHandle.height)

	ctx.font = '30pt Impact';
	ctx.textAlign = 'center';
	ctx.strokeStyle = formattingObject.outlineColor;
	ctx.lineWidth = 1;
	ctx.fillStyle = formattingObject.fillColor;

	if (formattingObject.topText != null) {
		ctx.fillText(formattingObject.topText, canvasHandle.width / 2, 50);
		ctx.strokeText(formattingObject.topText, canvasHandle.width / 2, 50);
	}

	if (formattingObject.bottomText != null) {
		ctx.fillText(formattingObject.bottomText, canvasHandle.width / 2, canvasHandle.height - 20);
		ctx.strokeText(formattingObject.bottomText, canvasHandle.width / 2, canvasHandle.height - 20);
	}
}

// This function is used to set all the event listeners on the page
function setAllEventListeners() {

	// Get the reference of all the input fields so that its value can be extracted and event listeners can be set up.
	const textTopHandle = document.getElementById('idTextTop')
	const colorFillHandle = document.getElementById('idColorFill')
	const textBottomHandle = document.getElementById('idTextBottom')
	const colorOutlineHandle = document.getElementById('idColorOutline')

	textTopHandle.addEventListener('keyup', () => {
		formattingObject.topText = textTopHandle.value
		drawMeme()
	})

	textBottomHandle.addEventListener('keyup', () => {
		formattingObject.bottomText = textBottomHandle.value
		drawMeme()
	})

	colorFillHandle.addEventListener('change', () => {
		formattingObject.fillColor = colorFillHandle.value
		drawMeme()
	})

	colorOutlineHandle.addEventListener('change', () => {
		formattingObject.outlineColor = colorOutlineHandle.value
		drawMeme()
	})
}