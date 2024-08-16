#pragma strict

private var ortho: Matrix4x4;
private var perspective: Matrix4x4;
           
public var fov: float   = 60f;
public var near: float  = .3f;
public var far: float   = 1000f;
public var orthographicSize: float = 30f;
 
private var aspect: float;
private var orthoOn: boolean;
 
function Start (){
    aspect = (Screen.width+0.0) / (Screen.height+0.0);
 
    perspective = Camera.main.projectionMatrix;
 
    ortho = Matrix4x4.Ortho(-orthographicSize * aspect, orthographicSize * aspect, -orthographicSize, orthographicSize, near, far);
    orthoOn = false;
}
 
function Update (){
	if (Controller.globalPerspective == 1){
		Camera.main.projectionMatrix = ortho;
	}else{
		Camera.main.projectionMatrix = perspective;
	}
}