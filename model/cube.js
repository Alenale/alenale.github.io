var camera;
var scene;
var renderer;
var controls;

function init() {
    
	// Create a scene
    scene = new THREE.Scene();
    
	// Add the camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(-0, 10, 30);

    // Add a light
	var light = new THREE.DirectionalLight(0xaaaae5, 2);
	light.position.set(15, 16, -50);
    scene.add(light);
	//scene.add(new THREE.PointLightHelper(light, 3));
    
	// Create the sky box
	loadSkyBox();
    
	// Create the WebGL Renderer
	renderer = new THREE.WebGLRenderer( { antialias:true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // Append the renderer to the body
    document.body.appendChild( renderer.domElement );

    // Add a resize event listener
    window.addEventListener( 'resize', onWindowResize, false );
    
    // Add the orbit controls to the camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	// Set the point at which we will orbit around
    controls.target = new THREE.Vector3(0, 0, 0);     
}
init();

function loadSkyBox() {
	
		// Load the skybox images and create list of materials
		var materials = [
			createMaterial( 'https://alenale.github.io/pic/skyX55+x.png' ), // right
			createMaterial( 'https://alenale.github.io/pic/skyX55-x.png' ), // left
			createMaterial( 'https://alenale.github.io/pic/skyX55+y.png' ), // top
			createMaterial( 'https://alenale.github.io/pic/seabed_ny.png' ), // bottom
			createMaterial( 'https://alenale.github.io/pic/skyX55+z.png' ), // back
			createMaterial( 'https://alenale.github.io/pic/skyX55-z.png' )  // front
		];
		
		// Create a large cube
		var mesh = new THREE.Mesh( new THREE.BoxGeometry( 800, 800, 800, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );
		
		// Set the x scale to be -1, this will turn the cube inside out
		mesh.scale.set(-1,1,1);
		scene.add( mesh );	
}

function createMaterial( path ) {
	var texture = THREE.ImageUtils.loadTexture(path);
	var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

	return material; 
}

Sea = function() {
	var geometry = new THREE.BoxGeometry( 800, 200, 800 );
	//var material = new THREE.MeshBasicMaterial( { color: 0x384E74, transparent: true, opacity: 0.6 } );
	var material = new THREE.MeshPhongMaterial({
        color: 0x03436A,
        transparent: true,
        opacity: 0.6,
        shading: THREE.FlatShading,
    });

	// Create Array of vertices
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	geometry.mergeVertices();

	var l = geometry.vertices.length;
	this.waves = [];

	for (var i=0; i<l; i++){
        var v = geom.vertices[i];

        this.waves.push({
            y:v.y,
            x:v.x,
            z:v.z,
            // Random angle
            ang:Math.random()*Math.PI*2,
            // Random distance
            amp:5 + Math.random()*15,
            // Random speed between 0,016 0,048 
            speed:0.016 + Math.random()*0.032
        });
    };

    var wave = new THREE.Mesh( geometry, material );
	wave.position.set(0, -300, 0);


	scene.add( wave );
}

Sea.prototype.moveWaves = function (){
    
    // Get vertices
    var verts = this.mesh.geometry.vertices;
    var l = verts.length;
    
    for (var i=0; i<l; i++){
        var v = verts[i];
        
        // get data
        var vprops = this.waves[i];
        
        // update vertices position
        v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;

        // increase angle
        vprops.ang += vprops.speed;

    }

    this.mesh.geometry.verticesNeedUpdate=true;

    sea.mesh.rotation.z += .005;
}



function animate() {
	
	// Update the orbit controls
	if(controls != null) {
		controls.update();
	}
	
	// Render the scene
	renderer.render( scene, camera );
	
	// Repeat
    requestAnimationFrame( animate );
    // Animate waves
    Sea.moveWaves();
    
}
animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
