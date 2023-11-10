import React, { Component } from "react";
import { Link } from "react-router-dom";
import p5 from 'p5';
import close_button from '../imgs/close_button.png';
// import firebase from "firebase";

class Paint2 extends Component {
	constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}

	s = (sketch) => {

		let bgImg;
		let bgImg1, bgImg2, bgImg3,bgImg4,bgImg5,bgImg6, bgImg7, bgImg8, bgImg9, bgImg10, bgImg11,bgImg12;

		sketch.preload = () => {
			// Load the image here
			bgImg = sketch.loadImage("icons/icons8-save-32.png");
			bgImg1 = sketch.loadImage("icons/icons8-paintbrush-30.png");
			bgImg2 = sketch.loadImage("icons/icons8-eraser-24.png");
			bgImg3 = sketch.loadImage("icons/icons8-delete-24.png");
			bgImg4 = sketch.loadImage("icons/icons8-sline-50.png");
			bgImg5 = sketch.loadImage("icons/icons8-circle-24.png");
			bgImg6 = sketch.loadImage("icons/icons8-square-32.png");
			bgImg7 = sketch.loadImage("icons/icons8-triangle-48.png");
			bgImg8 = sketch.loadImage("icons/icons8-line-50.png");
			bgImg9 = sketch.loadImage("icons/icons8-fill-color-48.png");
			bgImg10 = sketch.loadImage("icons/icons8-plus-32.png");
			bgImg11 = sketch.loadImage("icons/icons8-minus-48.png");
			bgImg12 = sketch.loadImage("icons/icons8-close-30.png");
		}

        		// Colors
		let white = '#ffffff';
		let red = '#fa5352'; // fa5352 fa4b4b
		let orange = '#f6b759'; // f6b759 ff9453
		let yellow = '#00bf9a'; // 00bf9a ffd953
		let green = '#008081'; // 008081 96df4f
		let blue = '#1c90ff'; // 1c90ff 5ec2fb
		let purple = '#060181'; // 060181 a067e6
		let pink = '#ee66ac';
		let brown = '#895739';
		let black = '#212529'; // 212529 000000
		let gray1 = '#c0c0c0'; // c0c0c0 7d7d7d
		let gray2 = '#6c757d'; // 6c757d 464646
		let toolbarcol= '#271B1B';
		let selectedColor; //color from color picker
		let userColorPicker;
		let colors = [red, orange, yellow, green, blue, purple, pink, brown, white, gray1, gray2, black];


        //Canvas Variables
        let canvasDistX = 62; //60
		let canvasDistY = 60; //14
        let canvasWidth;
		let canvasHeight;
        let canvasColor =white;
        let saveCanvas;

        //Button variables
		let closeButtonSize = 25;
        let buttonSize = 35;
		let buttonDist = 10;
		let fillColorButtonActive = false;

		// Brush Variables
		let brushColor = black;
		let prevBrushColor = brushColor;
		let brushSize = 10;
		let brushShape = "line";
		let incrementBrush = 2;


        sketch.setup = () => {
            sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
			sketch.background('#F7F1E9');

            // Drawing canvas
            canvasWidth = sketch.windowWidth-canvasDistX;
			canvasHeight = sketch.windowHeight-canvasDistY*5+canvasDistX;
             sketch.fill(canvasColor);
			 sketch.rect(62, canvasDistY, canvasWidth, canvasHeight);
            
			 //save canvas
            saveCanvas =  sketch.createGraphics(canvasWidth, canvasHeight);

			//toolbar
			sketch.fill(toolbarcol);
			sketch.rect(1,1,60,725,5);

			//Delete Button
			sketch.image(bgImg3, 15, buttonDist*55, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*55 , buttonSize);

			//Save Button
			sketch.image(bgImg, 15, buttonDist *60, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15, buttonDist*60, buttonSize);

			//Close Button
			sketch.image(bgImg12, 15, buttonDist*65, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*65, buttonSize);

           //Brush Button
		   	sketch.image(bgImg1, 15, buttonDist, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist , buttonSize);

			//Eraser Button
			sketch.image(bgImg2, 15, buttonDist*5, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*5 , buttonSize);

			//line Button
			sketch.image(bgImg4, 15, buttonDist*10, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*10 , buttonSize);

			//circle Button
			sketch.image(bgImg5, 15, buttonDist*15, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*15 , buttonSize);

			//square Button
			sketch.image(bgImg6, 15, buttonDist*20, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*20 , buttonSize);

			//triangle Button
			sketch.image(bgImg7, 15, buttonDist*25, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*25 , buttonSize);

			//slash Button
			sketch.image(bgImg8, 15, buttonDist*30, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*30 , buttonSize);

			//Fill Color Button
			sketch.image(bgImg9, 15, buttonDist*35, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*35 , buttonSize);

			//Plus Button
			sketch.image(bgImg10, 15, buttonDist*40, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*40, buttonSize);

			// Minus Button
			sketch.image(bgImg11, 15, buttonDist*45, buttonSize, buttonSize);
			sketch.noFill();
			sketch.rect(15,  buttonDist*45 , buttonSize);

			// Color Palette
			let colorBoxDist = 20;
			let colorBoxSize = (sketch.width - 30* colorBoxDist - canvasDistX) / 12;

			for (let i = 0; i < 12; i++) {
				sketch.strokeWeight(2);
				sketch.fill(colors[i]);
				sketch.rect(100+i*colorBoxSize+i*colorBoxDist, canvasDistY + canvasHeight + colorBoxDist, colorBoxSize);
				
			}

			userColorPicker = sketch.createColorPicker('#ff0000'); // You can set the default color
			userColorPicker.size(60, 20);
			userColorPicker.position(100 + 12 * colorBoxSize + 12 * colorBoxDist, canvasDistY + canvasHeight + colorBoxDist*4)

			// Use userColorPicker to get the selected color when it changes
			userColorPicker.changed(() => {
				selectedColor = userColorPicker.color(); // Update the selectedColor variable
				sketch.fill(red);
				sketch.rect(100 + 12 * colorBoxSize + 12 * colorBoxDist, canvasDistY + canvasHeight + colorBoxDist);
				console.log('User selected color: ' + selectedColor.toString());
			});


			//userColorPicker.input(updateSelectedColor);
		}


			sketch.draw = () => {
				canvasWidth = sketch.windowWidth-canvasDistX;
				canvasHeight = sketch.windowHeight-canvasDistY*5+canvasDistX;

				// Fill the canvas with the selected color if Fill Color button is active
				if (fillColorButtonActive) {
					sketch.fill(brushColor); // Use the selected color
					sketch.noStroke();
					sketch.rect(62, canvasDistY, canvasWidth, canvasHeight);
				}
			};

			// let updateSelectedColor = () => {
			// 	selectedColor = userColorPicker.color();
			//   }

			let updatePrevBrushColor = () => {
				prevBrushColor = brushColor;
			}
	
			let setColor = (color) => {
				brushColor = color;
				updatePrevBrushColor();
			}


			sketch.mouseDragged = () => {
				//paint
			if (sketch.mouseX > 62 + brushSize/2 && sketch.mouseX < 62 + canvasWidth - brushSize/2 && sketch.mouseY > canvasDistY + brushSize/2 && sketch.mouseY < canvasDistY + canvasHeight - brushSize/2) {
					if (brushShape === "circle") {
						sketch.noStroke();
						sketch.fill(brushColor);
						sketch.circle(sketch.mouseX, sketch.mouseY, brushSize);
					}

				if (brushShape === "line") {
					sketch.strokeWeight(brushSize/2);
					sketch.stroke(brushColor);
					sketch.noFill();
					sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
				}

				if (brushShape === "square") {
					sketch.noStroke();
					sketch.fill(brushColor);
					sketch.rect(sketch.mouseX, sketch.mouseY, brushSize);
				}

				if (brushShape === "triangle") {
					sketch.noStroke();
					sketch.fill(brushColor);
					sketch.triangle(sketch.mouseX, sketch.mouseY-brushSize/2, sketch.mouseX+brushSize/2, sketch.mouseY+brushSize/2, sketch.mouseX-brushSize/2, sketch.mouseY+brushSize/2);
				}

				if (brushShape === "slash") {
					sketch.strokeWeight(brushSize/8);
					sketch.stroke(brushColor);
					sketch.triangle(sketch.mouseX, sketch.mouseY, sketch.mouseX+brushSize/2, sketch.mouseY+brushSize/2, sketch.mouseX-brushSize/2, sketch.mouseY-brushSize/2);
				}
			}
		}

			sketch.mousePressed = () => {
				canvasWidth = sketch.windowWidth- canvasDistX;
				canvasHeight = sketch.windowHeight-canvasDistY*5+canvasDistX;
				let colorBoxDist = 20;
				let colorBoxSize = (sketch.width - 30 * colorBoxDist - canvasDistX) / 12;
				
				// Picking colors
				for (let i = 0; i < 13; i++) {
					if (sketch.mouseX >= 100+ colorBoxSize * i + colorBoxDist * i &&
						sketch.mouseX <= 100 + colorBoxSize * (i + 1) + colorBoxDist * i &&
						sketch.mouseY >= canvasDistY + canvasHeight + colorBoxDist &&
						sketch.mouseY <= canvasDistY + canvasHeight + colorBoxDist + colorBoxSize) {
							if (selectedColor) {
								// Use the selected color as the brush color
								setColor(selectedColor);
								console.log('Selected color: ' + selectedColor.toString());
								fillColorButtonActive = false;
								selectedColor = null;
							  } else {
								// Use one of the predefined colors
								setColor(colors[i]);
								console.log('Picked color: ' + colors[i]);
								fillColorButtonActive = false;
							  }
					}
				}

				// Select save button
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 60 &&
					sketch.mouseY <= buttonDist * 60 + buttonSize) {
					let c = sketch.get(canvasDistX, canvasDistY, canvasWidth, canvasHeight);
					saveCanvas.image(c, 0, 0);
					sketch.save(saveCanvas, "untitled.png");
					// var ref = database.ref('sketches');
					// ref.push(saveCanvas);
				}

				// Select eraser button
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 5 &&
					sketch.mouseY <= buttonDist * 5 + buttonSize) {
					updatePrevBrushColor();
					brushColor = canvasColor;
				}

				//Select Fill Color button
				if (sketch.mouseX >= 15 &&
					  sketch.mouseX <= 15 + buttonSize &&
					  sketch.mouseY >= buttonDist * 35 &&
					  sketch.mouseY <= buttonDist * 35 + buttonSize)
				  {
					fillColorButtonActive = true; // Activate the Fill Color button
				  }

				// Select clear all / delete button
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 55 &&
					sketch.mouseY <= buttonDist * 55 + buttonSize) {
					updatePrevBrushColor();  
					sketch.setup();
				}

				// Select brush button
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 10 &&
					sketch.mouseY <= buttonDist * 10 + buttonSize) {
					setColor(prevBrushColor);
				}

				//Select brushes
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 10 &&
					sketch.mouseY <= buttonDist * 10 + buttonSize) {
					brushShape = "line";
				}

				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 15 &&
					sketch.mouseY <= buttonDist * 15 + buttonSize) {
					brushShape = "circle";
				}

				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 20 &&
					sketch.mouseY <= buttonDist * 20 + buttonSize) {
					brushShape = "square";
				}

				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 25 &&
					sketch.mouseY <= buttonDist * 25 + buttonSize) {
					brushShape = "triangle";
				}

				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 30 &&
					sketch.mouseY <= buttonDist * 30 + buttonSize) {
					brushShape = "slash";
				}

				// Select + button
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 40 &&
					sketch.mouseY <= buttonDist * 40 + buttonSize) {
					brushSize += incrementBrush;
				}

				// Select - button
				if (sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 45 &&
					sketch.mouseY <= buttonDist * 45 + buttonSize) {
					brushSize -= incrementBrush;
				}

				// Close Button
				if (
					(sketch.mouseX >= 15 &&
					sketch.mouseX <= 15 + buttonSize &&
					sketch.mouseY >= buttonDist * 65 &&
					sketch.mouseY <= buttonDist * 65 + buttonSize)
				) {
					// Open a new window or tab with the specified link
					// sketch.mouseClickled(window.open('http://localhost:3000/'));
					window.location.href = '/doodle';
				}

			}

			
	}

    componentDidMount() {
		this.myP5 = new p5(this.s,this.myRef.current)
	}

    componentWillUnmount() {
        // Cleanup p5 instance here
        this.myP5.remove();
	}


    render() {
		return (
            <main>
				<section className="min-vh-100 d-flex align-items-center bg-primary">
					<div ref={this.myRef} className="canvas text-right">
					{/* <button onClick={() => window.location.href = '/doodle'}>Navigate to Home</button> */}
					</div>
				</section>
                </main>
		);
	}
}


export default Paint2