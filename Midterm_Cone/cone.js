//NOTE TO TEACHER:
// 	This was WAY harder than it needed to be - and most of this was not something we covered in our 
// presentations. I did my best, and had to cobble some ideas together from other sources, but this 
// is what I have.
var cone = null;
var gl = null;

var canvas = undefined;

var near = 0.1;     //these control distance
var far = 10.0;     

// transforms
var V = undefined;
var M = undefined;
var S = undefined;
var angle = 0.0;
var dAngle = 0.0; 

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var zvalue = -0.5*(near + far);
var offset = [ 0.0,  0.0, 0.0 ];

var rotationAxis = undefined;
var xAxis = [1, 0, 0];
var yAxis = [0, 1, 0];

var speed = 1;
var stopRot = 0;

function init() 
{
    canvas = document.getElementById("webgl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    
    if ( !gl ) 
	{
        alert("Unable to setup WebGL");
        return;
    }
   
    //these are the interactable elements and control what happens when you click them
    document.getElementById("xButton").onclick = function() 
	{
        rotationAxis = xAxis;
        
    }
    
    document.getElementById("yButton").onclick = function() 
	{
        rotationAxis = yAxis;
    }
	
	    document.onmouseup = function handleMouseUp(event) 
		{
        mouseDown = false;
        if (stopRot) dAngle = 0.0;
        return;
		}
    
    canvas.onmousedown = function handleMouseDown(event) 
	{
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
    
    
    document.onmousemove = function handleMouseMove(event) 
	{
        if (!mouseDown) 
		{
            if(stopRot) dAngle = 0.0;
            return;
        }
		
        var newX = event.clientX;
        var newY = event.clientY;
        
        var deltaX = newX - lastMouseX;
        var deltaY = newY - lastMouseY;
        dAngle = degToRad(deltaX + deltaY) * Math.PI * 5;
        lastMouseX = newX;
        lastMouseY = newY;
    }
    
   
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);
    
    cone = new Cone(gl);
    resize();
    
    window.requestAnimationFrame(render);
}

function render() //I basically had to redo this to make the rotation work. the dot-based cone refused.
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
    V = translate(0.0, 0.0, zvalue);
    angle += dAngle ;
    
    var axis = undefined; //Apparently we have to start with this undefined and can't define it here.
    if (rotationAxis != undefined) axis = rotationAxis;
    else axis = [ 1.0, 1.0, 1.0 ]; //NOW I get to define it...
    
    ms = new MatrixStack(); //all the things
    ms.push();
    ms.load(V);
    ms.translate(offset);
    ms.rotate((speed * angle), axis);
    ms.scale(1.0, 1.0, 1.0);
    cone.MV = ms.current();
    ms.pop();
    
    cone.render();
    window.requestAnimationFrame(render);
}

function resize() {
    var width = canvas.clientWidth,
    height = canvas.clientHeight;
	var fovy = 120.0; // degrees
    gl.viewport(0, 0, width, height);
    aspect = width/height;
    cone.P = perspective(fovy, aspect, near, far);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180; //apparently you have to do this. not sure why. Ask teacher to review.
}

window.onload = init;
window.onresize = resize;
