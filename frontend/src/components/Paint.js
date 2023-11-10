

import React, { Component } from "react";
import { Link } from "react-router-dom";
import p5 from 'p5';
// import close_button from './images/close_button.png';
// import firebase from "firebase";

class Paint extends Component {
	constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}

	s = (sketch) => {
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
		let colors = [red, orange, yellow, green, blue, purple, pink, brown, white, gray1, gray2, black];

		// Canvas Variables
		let canvasDistX = 25;
		let canvasDistY = 67.5;
		let canvasWidth;
		let canvasHeight;
		let canvasColor = white;

		let saveCanvas;

		// Brush Variables
		let brushColor = black;
		let prevBrushColor = brushColor;
		let brushSize = 20;
		// let brushOpacity = 255;
		let brushShape = "line";
		let incrementBrush = 2;

		// Button Variables
		let closeButtonSize = 25;
		let buttonSize = 35;
		let buttonDist = 10;
		let shadowDist = 2;
		let shadowColor = white;

		var database;

		sketch.setup = () => {
			// console.log(sketch.pixelDensity);
			sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
			sketch.background('#c0c0c0');

			// Firebase database for image storage
			// var config = {
			// 	apiKey: "AIzaSyDhMETYzofQ7lzAt4eNZbEjDzNbwsAThLM",
			// 	authDomain: "ms-paint-ac45b.firebaseapp.com",
			// 	databaseURL: "https://ms-paint-ac45b-default-rtdb.firebaseio.com",
			// 	projectId: "ms-paint-ac45b",
			// 	storageBucket: "ms-paint-ac45b.appspot.com",
			// 	messagingSenderId: "162109324286",
			// 	appId: "1:162109324286:web:b012050c03b389f4f59eaf",
			// 	measurementId: "G-8P32QE4W01"
			// };
			// initializeApp(config);
			// database = firebase.database();

			// Drawing canvas
			canvasWidth = sketch.windowWidth-canvasDistX*2;
			canvasHeight = sketch.windowHeight-canvasDistY*5+canvasDistX;

			sketch.fill(canvasColor);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(canvasDistX, canvasDistY, canvasWidth, canvasHeight);

			// Set saveCanvas graphics image size
			saveCanvas =  sketch.createGraphics(canvasWidth, canvasHeight);

			// Buttons
			// // Close Button
			// // Shadow
			// sketch.noStroke();
			// sketch.fill(shadowColor);
			// sketch.rect(sketch.width - closeButtonSize - buttonDist + shadowDist, buttonDist + shadowDist, closeButtonSize);
			// // Button
			// sketch.fill(white);
			// sketch.stroke(black);
			// sketch.strokeWeight(2);
			// sketch.rect(sketch.width - closeButtonSize - buttonDist, buttonDist, closeButtonSize);
			// // X icon
			// sketch.line(sketch.width - closeButtonSize - buttonDist + 5, buttonDist + 5, sketch.width - buttonDist - 5, buttonDist + closeButtonSize - 5)
			// sketch.line(sketch.width - buttonDist - 5, buttonDist + 5, sketch.width - closeButtonSize - buttonDist + 5, buttonDist + closeButtonSize - 5)

			// let a = sketch.createA('http://localhost:3000/', 'hello');
			// a.position(sketch.windowWidth-closeButtonSize-buttonDist, buttonDist);
			
			// Save Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(canvasDistX + shadowDist, canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Save Icon
			sketch.noStroke();
			sketch.fill(black);
			sketch.rect(canvasDistX + buttonDist * 1.5/2, canvasDistY - buttonDist * 0.5 - buttonSize + shadowDist, buttonSize - buttonDist * 3/2);
			sketch.fill(white);
			sketch.triangle(canvasDistX + buttonDist * 1.5/2 + buttonSize - buttonDist * 3/2, canvasDistY - buttonDist * 0.5 - buttonSize + shadowDist, canvasDistX + buttonDist * 1.5/2 + buttonSize - buttonDist * 3/2 - buttonDist / 2, canvasDistY - buttonDist * 0.5 - buttonSize + shadowDist, canvasDistX + buttonDist * 1.5/2 + buttonSize - buttonDist * 3/2, canvasDistY - buttonSize + shadowDist);
			sketch.rect(canvasDistX + buttonDist*6/5, canvasDistY - buttonDist * 0.5 - buttonSize + shadowDist, buttonDist*2/3, buttonDist/3);
			sketch.rect(canvasDistX + buttonDist*5/4, canvasDistY + buttonDist * 0.5 - buttonSize + shadowDist, buttonDist, buttonDist/1.5);

			// // Brush Button
			// // Shadow
			// sketch.noStroke();
			// sketch.fill(shadowColor);
			// sketch.rect(canvasDistX + buttonSize + buttonDist + shadowDist, canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// // Button
			// sketch.fill(white);
			// sketch.stroke(black);
			// sketch.strokeWeight(2);
			// sketch.rect(canvasDistX + buttonSize + buttonDist, canvasDistY - buttonDist - buttonSize, buttonSize);
			// // Brush icon
			// sketch.stroke(black);
			// sketch.strokeWeight(6);
			// sketch.line(canvasDistX + 2 * buttonSize + buttonDist - 10, canvasDistY - buttonDist - buttonSize + 10, canvasDistX + buttonSize + buttonDist + 12, canvasDistY - buttonDist - 12);
			// sketch.stroke(black);
			// sketch.strokeWeight(1);
			// sketch.line(canvasDistX + buttonSize + buttonDist + 9, canvasDistY - buttonDist - 8, canvasDistX + 2 * buttonSize + buttonDist - 8, canvasDistY - buttonDist - 8)
			// sketch.noStroke();
			// sketch.fill(black);
			// sketch.triangle(canvasDistX + buttonSize + buttonDist + 8,canvasDistY - buttonDist - 8, canvasDistX + buttonSize + buttonDist + 12, canvasDistY - buttonDist - 9, canvasDistX + buttonSize + buttonDist + 9, canvasDistY - buttonDist - 12);
			
			// Eraser Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(canvasDistX + 2 * buttonSize + 2 * buttonDist + shadowDist, canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(canvasDistX + 2 * buttonSize + 2 * buttonDist, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Eraser icon
			sketch.rotate(sketch.PI/4);
			sketch.rect(canvasDistX + 2.04*buttonSize + 2 * buttonDist, canvasDistY - 2 * buttonDist - 3.48*buttonSize, 9, 18);
			sketch.fill(black);
			sketch.rect(canvasDistX + 2.04*buttonSize + 2 * buttonDist, canvasDistY - 2 * buttonDist - 3.48*buttonSize, 9, 12);
			sketch.rotate(-sketch.PI/4);
			
			// Clear Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(canvasDistX + 3 * buttonSize + 3 * buttonDist + shadowDist, canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(canvasDistX + 3 * buttonSize + 3 * buttonDist, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Clear icon
			sketch.line(canvasDistX + 3 * buttonSize + 3 * buttonDist+8, canvasDistY - buttonDist - buttonSize + 12, canvasDistX + 4 * buttonSize + 3 * buttonDist - 8, canvasDistY - buttonDist - buttonSize + 12);
			sketch.line(canvasDistX + 3 * buttonSize + 3 * buttonDist + 14, canvasDistY - buttonDist - buttonSize + 12, canvasDistX + 3 * buttonSize + 3 * buttonDist + 14, canvasDistY - buttonDist - buttonSize + 8);
			sketch.line(canvasDistX + 4 * buttonSize + 3 * buttonDist - 14, canvasDistY - buttonDist - buttonSize + 12, canvasDistX + 4 * buttonSize + 3 * buttonDist - 14, canvasDistY - buttonDist - buttonSize + 8);
			sketch.line(canvasDistX + 3 * buttonSize + 3 * buttonDist + 14, canvasDistY - buttonDist - buttonSize + 8, canvasDistX + 4 * buttonSize + 3 * buttonDist - 14, canvasDistY - buttonDist - buttonSize + 8);
			sketch.line(canvasDistX + 3 * buttonSize + 3 * buttonDist + 12, canvasDistY - buttonDist - 8, canvasDistX + 3 * buttonSize + 3 * buttonDist+11, canvasDistY - buttonDist - buttonSize + 12);
				sketch.line(canvasDistX + 4 * buttonSize + 3 * buttonDist - 12, canvasDistY - buttonDist - 8, canvasDistX + 4 * buttonSize + 3 * buttonDist - 11, canvasDistY - buttonDist - buttonSize + 12);
			sketch.line(canvasDistX + 3 * buttonSize + 3 * buttonDist + 12, canvasDistY - buttonDist - 8, canvasDistX + 4 * buttonSize + 3 * buttonDist - 12, canvasDistY - buttonDist - 8);
			
			// Line Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize*7 - buttonDist*10 - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize*7 - buttonDist*10 - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Line icon
			sketch.strokeWeight(4);
			sketch.line(sketch.width - buttonSize*7 - buttonDist*10 - canvasDistX + 8, canvasDistY - buttonDist - 1*buttonSize/2, sketch.width - buttonSize*6 - buttonDist*10 - canvasDistX - 8, canvasDistY - buttonDist - 1 * buttonSize/2)
			
			// Circle Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize*6 - buttonDist*9 - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize*6 - buttonDist*9 - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Circle icon
			sketch.fill(black);
			sketch.circle(sketch.width - 11 * buttonSize/2 - buttonDist * 9 - canvasDistX, canvasDistY - buttonDist - 1 * buttonSize/2, buttonSize - 2 * 8);
			
			// Square Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize*5 - buttonDist*8 - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize*5 - buttonDist*8 - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Square icon
			sketch.fill(black);
			sketch.rect(sketch.width - buttonSize*5 - buttonDist*8 - canvasDistX + 8, canvasDistY - buttonDist - buttonSize + 8, buttonSize - 2*8);
			
			// Triangle Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize*4 - buttonDist*7 - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize*4 - buttonDist*7 - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// Triangle icon
			sketch.fill(black);
			sketch.triangle(sketch.width - buttonSize*4 - buttonDist*7 - canvasDistX + 8, canvasDistY - buttonDist - 8, sketch.width - canvasDistX - buttonSize*3 - buttonDist*7 - 8, canvasDistY - buttonDist - 8, sketch.width - 7*buttonSize/2 - buttonDist*7 - canvasDistX, canvasDistY - buttonDist - buttonSize + 8)
			
			// Slash Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize*3 - buttonDist*6 - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize*3 - buttonDist*6 - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// \ icon
			sketch.strokeWeight(3);
			sketch.line(sketch.width - buttonSize*3 - buttonDist*6 - canvasDistX + 12, canvasDistY - buttonDist - buttonSize + 8, sketch.width - canvasDistX - buttonSize*2 - buttonDist*6 - 12, canvasDistY - buttonDist - 8)
			
			// + Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize*2 - buttonDist - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize*2 - buttonDist - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// + icon
			sketch.strokeWeight(3);
			sketch.line(sketch.width - buttonSize*2 - buttonDist - canvasDistX + 8, canvasDistY - buttonDist - 1*buttonSize/2, sketch.width - canvasDistX - buttonSize - buttonDist - 8, canvasDistY - buttonDist - 1*buttonSize/2)
			sketch.line(sketch.width - 3*buttonSize/2 - buttonDist - canvasDistX, canvasDistY - buttonDist - buttonSize + 8, sketch.width - 3*buttonSize/2 - buttonDist - canvasDistX, canvasDistY - buttonDist - 8)
			
			// - Button
			// Shadow
			sketch.noStroke();
			sketch.fill(shadowColor);
			sketch.rect(sketch.width - buttonSize - canvasDistX + shadowDist,  canvasDistY - buttonDist - buttonSize + shadowDist, buttonSize);
			// Button
			sketch.fill(white);
			sketch.stroke(black);
			sketch.strokeWeight(2);
			sketch.rect(sketch.width - buttonSize - canvasDistX, canvasDistY - buttonDist - buttonSize, buttonSize);
			// - icon
			sketch.strokeWeight(3);
			sketch.line(sketch.width - buttonSize - canvasDistX + 10, canvasDistY - buttonDist - 1*buttonSize/2, sketch.width - canvasDistX - 10, canvasDistY - buttonDist - 1*buttonSize/2)

			// Color Palette
			let colorBoxDist = 20;
			let colorBoxSize = (sketch.width - 11 * colorBoxDist - 2 * canvasDistX) / 12;

			for (let i = 0; i < 12; i++) {
				sketch.strokeWeight(2);
				sketch.fill(colors[i]);
				sketch.rect(canvasDistX+i*colorBoxSize+i*colorBoxDist, canvasDistY + canvasHeight + colorBoxDist, colorBoxSize);
			}
		};

		sketch.draw = () => {
			canvasWidth = sketch.windowWidth-canvasDistX*2;
			canvasHeight = sketch.windowHeight-canvasDistY*5+canvasDistX;
			// let colorBoxDist = 20;
			// let colorBoxSize = (sketch.width - 11 * colorBoxDist - 2 * canvasDistX) / 12;
		};
			
		// Define helper methods

		// let clearCanvas = () => {
		// 	sketch.fill(canvasColor);
		// 	sketch.stroke(black);
		// 	sketch.strokeWeight(2);
		// 	sketch.rect(canvasDistX, canvasDistY, canvasWidth, canvasHeight);
		// }

		// let closeWindow = () => {
		// 	let a = sketch.createA('/', 'hello');
		// 	a.position(sketch.windowWidth-closeButtonSize-buttonDist, buttonDist);
		// 	// sketch.fill(white);
		// 	// sketch.noStroke();
		// 	// sketch.rect(0, 0, sketch.width, sketch.height);
		// }

		let updatePrevBrushColor = () => {
			prevBrushColor = brushColor;
		}

		let setColor = (color) => {
			brushColor = color;
			updatePrevBrushColor();
		}

		// Keyboard / mouse functions

		sketch.mouseDragged = () => {
			// paint!
			if (sketch.mouseX > canvasDistX + brushSize/2 && sketch.mouseX < canvasDistX + canvasWidth - brushSize/2 && sketch.mouseY > canvasDistY + brushSize/2 && sketch.mouseY < canvasDistY + canvasHeight - brushSize/2) {
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
				if (brushShape === "slash") {
					sketch.strokeWeight(brushSize/8);
					sketch.stroke(brushColor);
					sketch.triangle(sketch.mouseX, sketch.mouseY, sketch.mouseX+brushSize/2, sketch.mouseY+brushSize/2, sketch.mouseX-brushSize/2, sketch.mouseY-brushSize/2);
				}
				if (brushShape === "triangle") {
					sketch.noStroke();
					sketch.fill(brushColor);
					sketch.triangle(sketch.mouseX, sketch.mouseY-brushSize/2, sketch.mouseX+brushSize/2, sketch.mouseY+brushSize/2, sketch.mouseX-brushSize/2, sketch.mouseY+brushSize/2);
				}
			}
		};

		sketch.keyPressed = () => {
			// sketch.keyCodes: http://sketch.keyCode.info/
			
			// Keyboard Shortcuts for Colors
			if (sketch.keyCode === 82) { // if R, then red
				setColor(red);
			}
			if (sketch.keyCode === 79) { // if O, then orange
				setColor(orange);
			}
			if (sketch.keyCode === 89) { // if Y, then yellow
				setColor(yellow);
			}
			if (sketch.keyCode === 71) { // if G, then green
				setColor(green);
			}
			if (sketch.keyCode === 66) { // if B, then blue
				setColor(blue);
			}
			if (sketch.keyCode === 80) { // if P, then purple
				setColor(purple);
			}
			if (sketch.keyCode === 77) { // if M, then magenta
				setColor(pink);
			}
			if (sketch.keyCode === 78) { // if N, then brown
				setColor(brown);
			}
			if (sketch.keyCode === 87) { // if W, then white
				setColor(white);
			}
			if (sketch.keyCode === 49) { // if 1, then gray1
				setColor(gray1);
			}
			if (sketch.keyCode === 50) { // if 2, then gray2
				setColor(gray2);
			}
			if (sketch.keyCode === 75) { // if K, then black
				setColor(black);
			}
			
			// Keyboard Shortcuts for Shapes
			if (sketch.keyCode === 220) { // if \, then slash
				brushShape = "slash";
			}
			if (sketch.keyCode === 67) { // if C, then circle
				brushShape = "circle";
			}
			if (sketch.keyCode === 83) { // if S, then square
				brushShape = "square";
			}
			if (sketch.keyCode === 84) { // if T, then triangle
				brushShape = "triangle";
			}
			if (sketch.keyCode === 76) { // if L, then line
				brushShape = "line";
			}
			
			// Keyboard Shortcuts for Brush Size
			if (sketch.keyCode === 221) { // if arrow up, then increase brush size
				brushSize += incrementBrush;
			}
			if (sketch.keyCode === 219) { // if arrow down, then decrease brush size
				brushSize -= incrementBrush;
			}
			
			// Keyboard Shortcuts for Tools
			if (sketch.keyCode === 68) { // if D, then draw tool
				setColor(prevBrushColor);
			}
			if (sketch.keyCode === 69) { // if E, then eraser tool
				updatePrevBrushColor();
				brushColor = canvasColor;
			}
			if (sketch.keyCode === 8) { // if backspace (delete), then clear all
				updatePrevBrushColor();
				sketch.setup();
			}
			// if (sketch.keyCode === 88) { // if X, then close window
			// 	updatePrevBrushColor();
			// 	closeWindow();
			// }
		};

		sketch.mousePressed = () => {
			canvasWidth = sketch.windowWidth-canvasDistX*2;
			canvasHeight = sketch.windowHeight-canvasDistY*5+canvasDistX;
			let colorBoxDist = 20;
			let colorBoxSize = (sketch.width - 11 * colorBoxDist - 2 * canvasDistX) / 12;
			
			// Picking colors
			for (let i = 0; i < 12; i++) {
				if (sketch.mouseX >= canvasDistX + colorBoxSize*i + colorBoxDist*(i) && sketch.mouseX <= canvasDistX + colorBoxSize*(i+1) + colorBoxDist*(i) && sketch.mouseY >= canvasDistY + canvasHeight + colorBoxDist && sketch.mouseY <= canvasDistY + canvasHeight + colorBoxDist + colorBoxSize) {
					setColor(colors[i]);
					console.log('picked' + brushColor);
				}
			}
			
			// Select save button
			if (sketch.mouseX >= canvasDistX && sketch.mouseX <= canvasDistX + buttonSize && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				let c = sketch.get(canvasDistX, canvasDistY, canvasWidth, canvasHeight);
				saveCanvas.image(c, 0, 0);
				sketch.save(saveCanvas, "untitled.png");
				// var ref = database.ref('sketches');
				// ref.push(saveCanvas);
			}
			
			// Select brush button
			if (sketch.mouseX >= canvasDistX + buttonDist + buttonSize && sketch.mouseX <= canvasDistX + buttonDist + 2*buttonSize && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				setColor(prevBrushColor);
			}
			
			// Select eraser button
			if (sketch.mouseX >= canvasDistX + 2 * buttonDist + 2 * buttonSize && sketch.mouseX <= canvasDistX + 2 * buttonDist + 3 * buttonSize && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				updatePrevBrushColor();
				brushColor = canvasColor;
			}
			
			// Select clear all / delete button
			if (sketch.mouseX >= canvasDistX + 3 * buttonDist + 3 * buttonSize && sketch.mouseX <= canvasDistX + 3 * buttonDist + 4 * buttonSize && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				updatePrevBrushColor();  
				sketch.setup();
			}
			
			
			// Select line button
			if (sketch.mouseX >= sketch.width - buttonSize*7 - buttonDist*10 - canvasDistX && sketch.mouseX <= sketch.width - buttonSize*6 - buttonDist*10 - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushShape = "line";
			}
			
			// Select circle button
			if (sketch.mouseX >= sketch.width - buttonSize*6 - buttonDist*9 - canvasDistX && sketch.mouseX <= sketch.width - buttonSize*5 - buttonDist*9 - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushShape = "circle";
			}
			
			// Select square button
			if (sketch.mouseX >= sketch.width - buttonSize*5 - buttonDist*8 - canvasDistX && sketch.mouseX <= sketch.width - buttonSize*4 - buttonDist*8 - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushShape = "square";
			}
			
			// Select triangle button
			if (sketch.mouseX >= sketch.width - buttonSize*4 - buttonDist*7 - canvasDistX && sketch.mouseX <= sketch.width - buttonSize*3 - buttonDist*7 - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushShape = "triangle";
			}
			
			// Select slash button
			if (sketch.mouseX >= sketch.width - buttonSize*3 - buttonDist*6 - canvasDistX && sketch.mouseX <= sketch.width - buttonSize*2 - buttonDist*6 - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushShape = "slash";
			}
			
			// Select + button
			if (sketch.mouseX >= sketch.width - buttonSize*2 - buttonDist - canvasDistX && sketch.mouseX <= sketch.width - buttonSize - buttonDist - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushSize += incrementBrush;
			}
			
			// Select - button
			if (sketch.mouseX >= sketch.width - buttonSize - canvasDistX && sketch.mouseX <= sketch.width - canvasDistX && sketch.mouseY >= canvasDistY - buttonDist - buttonSize && sketch.mouseY <= canvasDistY - buttonDist) {
				brushSize -= incrementBrush;
			}
			
			// // Select close button
			// if (sketch.mouseX >= sketch.width - closeButtonSize - buttonDist && sketch.mouseX <= sketch.width - buttonDist && sketch.mouseY >= buttonDist && sketch.mouseY <= buttonDist + closeButtonSize) {
			// 	updatePrevBrushColor();
			// 	closeWindow();
			// }
		};
	}

	componentDidMount() {
		this.myP5 = new p5(this.s, this.myRef.current)
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
						<Link to="/" role="button">
							<img className="mt-2 mr-4 flex-nowrap" alt="Close Button" width="40px"></img>
						</Link>
					</div>
				</section>
			</main>
		);
	}
}

export default Paint;