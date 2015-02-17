// Michael Zbytniewski
var gl;
var points;
var direction = 0;
var vertices;
var mvShape = 0.001;
var flag1 = 0;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	vertices = [
        vec2( -1/15, -1/15 ),
        vec2(  -1/15, 0/15 ),
        vec2(  0/15, 1/15 ),
        vec2( 1/15, 0/15),
		vec2( 1/15, -1/15 )
		];
	//
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	// Event Listener
	document.addEventListener("keydown",function () {
		if (event.keyCode == 65){ // A
		direction = 1;
		}
		else if (event.keyCode == 83){ // S
		direction = 2;
		}
		else if (event.keyCode == 68){  // D
		direction = 3;
		}
		else if (event.keyCode == 87){ // W
		direction = 4;
		}
		else if (event.keyCode == 49){ // 1
		direction = 0;
		}
		else {}
		render();
    });
    
    // Load the data into the GPU
	
	var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    render();
};

function moveShape(dir){
	if (dir == 0){ // Set the shape back to the middle
		vertices = [
        vec2( -1/15, -1/15 ),
        vec2(  -1/15, 0/15 ),
        vec2(  0/15, 1/15 ),
        vec2( 1/15, 0/15),
		vec2( 1/15, -1/15 )
		];
		flag1 = 0;
		flag2 = 0;
		flag3 = 0;
		flag4 = 0;
	}
	else if (dir == 1) { // Move left
		flag2 = 0;
		flag3 = 0;
		flag4 = 0;
		if (flag1 == 0){
		for (var i = 0; i < 5; i++){
			if (vertices[i][0] <= -1){
				flag1 = 1; // This will prevent the shape from moving off of the screen
			}
			else {
				vertices[i][0] = vertices[i][0] - mvShape;
			}
		}
		}
	 }
	 else if (dir == 2) { // Move down
		flag1 = 0;
		flag3 = 0;
		flag4 = 0;
		if (flag2 == 0){
		for (var i = 0; i < 5; i++){
			if (vertices[i][1] <= -1){
				flag2 = 1; // This will prevent the shape from moving off of the screen
			}
			else {
				vertices[i][1] = vertices[i][1] - mvShape;
			}
		}
		}
	 }
	 else if (dir == 3) { // Move right
		flag1 = 0;
		flag2 = 0;
		flag4 = 0;	 
		if (flag3 == 0){
		for (var i = 0; i < 5; i++){
			if (vertices[i][0] >= 1){
				flag3 = 1; // This will prevent the shape from moving off of the screen
			}
			else {
				vertices[i][0] = vertices[i][0] + mvShape;
			}
		}
		}
	 }
	 else if (dir == 4) { // Move up
		flag1 = 0;
		flag2 = 0;
		flag3 = 0;
		if (flag4 == 0){
		for (var i = 0; i < 5; i++){
			if (vertices[i][1] >= 1){
				flag4 = 1; // This will prevent the shape from moving off of the screen
			}
			else {
				vertices[i][1] = vertices[i][1] + mvShape;
			}
		}
		}
	 }
	else {}	
		gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );
}

function render() {
	moveShape(direction); // Move the shape
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
	requestAnimFrame( render );
}
