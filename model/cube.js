		var scene;
		var camera;
		var renderer;

		function scene_setup(){
			//This is all code needed to set up a basic ThreeJS scene

			//First we initialize the scene and our camera
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			//We create the WebGL renderer and add it to the document
			renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
		}

		scene_setup();

		//Add your code here!
/*
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );//We make it green
		var cube = new THREE.Mesh( geometry, material );
		//Add it to the screen
		scene.add( cube );
		cube.position.z = -3;//Shift the cube back so we can see it
*/
    //Load the GLSL code from the HTML as a string
    var shaderCode = document.getElementById("fragShader").innerHTML; 

    //Load an image
    //THREE.ImageUtils.crossOrigin = '';//Allows us to load an external image
//var tex = THREE.ImageUtils.loadTexture( "https://alenale.github.io/pic/fluffy_clouds.png" );
var path = "https://alenale.github.io/pic/";

        var urls = [ path + "fluffy_clouds.png", path + "fluffy_clouds.png",
                     path + "fluffy_clouds.png", path + "fluffy_clouds.png",
                     path + "fluffy_clouds.png", path + "fluffy_clouds.png" ];
var envMap = THREE.ImageUtils.loadTextureCube( urls );
materials["phong-envmapped"] = new THREE.MeshBasicMaterial(
           { color: 0xffffff,
             envMap : envMap,
             reflectivity:1.3} );

    //Our data to be sent to the shader

    var uniforms = {};
    uniforms.resolution = {type:'v3',value:new THREE.Vector3(window.innerWidth,window.innerHeight)};
    uniforms.texture = {type:'t',value:envMap};
// Create the skybox
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = envMap;

     var material = new THREE.ShaderMaterial( { 
	     
            fragmentShader: shader.shaderCode,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            side: THREE.BackSide

        } ),

        mesh = new THREE.Mesh( new THREE.CubeGeometry( 500, 500, 500 ), material );
        scene.add( mesh );
/*
    

    //Create an object to apply the shaders to
    var material = new THREE.ShaderMaterial({uniforms:uniforms,fragmentShader:shaderCode})
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var sprite = new THREE.Mesh( geometry,material );
    scene.add( sprite );
    sprite.position.z = -2;//Move it back so we can see it

		//Render everything!
		function render() {
	  sprite.rotation.y += 0.02;
    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
		render();
*/
