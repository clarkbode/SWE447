var gl = null;
var cone = null;
var rotSpeed = 0;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 1.0, 1.0, 0.0, 1.0 );
    cone = Cone(gl, 100);
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	//
	
	rotSpeed += 0.5;
	cone.MV = rotate(rotSpeed, [1, 0, 0]);
	//
    cone.render()
	
	requestAnimationFrame( render );
}

window.onload = init;
