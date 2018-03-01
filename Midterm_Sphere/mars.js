	var canvas = undefined;

	var gl = undefined;

var latitudeBands = 30;
var longitudeBands = 30;
var radius = 2;

var vertexPositionBuffer;
var vertexNormalBuffer;
var vertexTextureCoordBuffer;
var vertexIndexBuffer;

var vertexPositionData =[];
var normalData = [];
var textureCoordData = [];

var indexData = [];

function init()
{
	canvas = document.getElementById("webgl-canvas");

	gl = canvas.getContext("webgl");
	
	for (var latNumber = 0; latNumber <= latitudeBands; latNumber++)
	{
		var theta = latNumber * Math.PI / latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		
		for(var longNumber = 0; longNumber <= longitudeBands; longNumber++)
		{
			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);
			
			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1- (longNumber / longitudeBands);
			var v = latNumber / latitudeBands;
			
			normalData.push(x);
			normalData.push(y);
			normalData.push(z);
			textureCoordData.push(u);
			textureCoordData.push(v);
			vertexPositionData.push(radius * x);
			vertexPositionData.push(radius * y);
			vertexPositionData.push(radius * z);
		}
	}
	
	
	for (var latNumber = 0; latNumber < latitudeBands; latNumber++)
	{
		for (var longNumber = 0; longNumber < longitudeBands; longNumber++)
		{
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;
			indexData.push(first);
			indexData.push(second);
			indexData.push(first + 1);
			
			indexData.push(second);
			indexData.push(second + 1);
			indexData.push(first + 1);
		}
	}
	render();
}
function render()
{
	
	
	vertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(normalData), gl.STATIC_DRAW);
	vertexNormalBuffer.itemSize = 3;
	vertexNormalBuffer.numItems = normalData.length / 3;
	
	vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(textureCoordData), gl.STATIC_DRAW);
	vertexTextureCoordBuffer.itemSize = 2;
	vertexTextureCoordBuffer.numItems = textureCoordData.length / 2;
	
	vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(vertexPositionData), gl.STATIC_DRAW);
	vertexPositionBuffer.itemSize = 3;
	vertexPositionBuffer.numItems = vertexPositionData.length / 3;
	
	vertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
	vertexIndexBuffer.itemSize = 3;
	vertexIndexBuffer.numItems = indexData.length;
	
	
}

window.onload = init;