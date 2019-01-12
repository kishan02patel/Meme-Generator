var uploadedImage = null
var formattingObject = {
	topText: "",
	bottomText: "",
	fillColor: 'black',
	outlineColor: 'black'
}
setAllEventListeners()

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
	var canvasHandle = document.getElementById('canvas')
	var ctx = canvasHandle.getContext('2d')

	// Set the height of the canvas to the height of the parent element times 0.95
	canvasHandle.height = canvasHandle.parentElement.clientHeight
	canvasHandle.width = canvasHandle.parentElement.clientWidth

	// Clear the canvas everytime.
	ctx.clearRect(0, 0, canvasHandle.width, canvasHandle.height)

	// Check whether the image is uplaoded or not.
	if (uploadedImage != null)
		ctx.drawImage(uploadedImage, 0, 0)

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
	const colorFillTextHandle = document.getElementById('idColorFillText')
	const textBottomHandle = document.getElementById('idTextBottom')
	const colorOutlineHandle = document.getElementById('idColorOutline')
	const colorOutlineTextHandle = document.getElementById('idColorOutlineText')

	textTopHandle.addEventListener('keyup', () => {
		formattingObject.topText = textTopHandle.value
		drawMeme()
	})

	textBottomHandle.addEventListener('keyup', () => {
		formattingObject.bottomText = textBottomHandle.value
		drawMeme()
	})

	/*
	** Add the event listeners on the color picker and color input text field.
	*/
	colorFillHandle.addEventListener('change', () => {
		// Get the value of color picker and set the value inside the input tag.
		colorFillTextHandle.value = colorFillHandle.value
		formattingObject.fillColor = colorFillHandle.value
		drawMeme()
	})

	/* colorFillTextHandle.addEventListener('change', () => {
		// Get the value of color text input by user and set it on color picker.
		// Do validations to check the input color format is correct. It does not accept short hand like #FFF.
		// If correct format is not provided then use white color.

		if (/^#[0-9A-F]{6}$/i.test(colorFillTextHandle.value)) {
			colorFillHandle.value = colorFillTextHandle.value
			formattingObject.fillColor = colorFillTextHandle.value
		}
		else {
			alert('Please enter correct HEX format like "#10BF53"')
			colorFillHandle.value = '#FFFFFF'
			formattingObject.fillColor = '#FFFFFF'
		}
		drawMeme()
	}) */

	colorOutlineHandle.addEventListener('change', () => {
		console.log("#" + colorOutlineHandle.jscolor)
		// Get the value of color picker and set the value inside the input tag.
		colorOutlineTextHandle.value = colorOutlineHandle.value
		formattingObject.outlineColor = colorOutlineHandle.value
		drawMeme()
	})

	/* colorOutlineTextHandle.addEventListener('change', () => {
		// Get the value of color text input by user and set it on color picker.
		// Do validations to check the input color format is correct. It does not accept short hand like #FFF.
		// If correct format is not provided then use white color.

		if (/^#[0-9A-F]{6}$/i.test(colorOutlineTextHandle.value)) {
			colorOutlineHandle.value = colorOutlineTextHandle.value
			formattingObject.outlineColor = colorOutlineTextHandle.value
		}
		else {
			alert('Please enter correct HEX format like "#10BF53"')
			colorOutlineHandle.value = '#FFFFFF'
			formattingObject.outlineColor = '#FFFFFF'
		}
		drawMeme()
	}) */

}