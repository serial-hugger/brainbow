#pragma strict

var myCollider:Collider;
var myRenderer:Renderer;

function Start () {

}

function Update () {
	if(Controller.clipboardActive || Controller.itemSelecterActive){
		myCollider.enabled = true;
		myRenderer.enabled = true;
	}else{
		myCollider.enabled = false;
		myRenderer.enabled = false;
	}
}