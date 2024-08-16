#pragma strict

var hitColliders:Collider[];
var i:int;
var wallsConnected:int;

function Start(){
}
function Update () {
	if(transform.position.y>.3){
		transform.position.y -= 2 * Time.deltaTime;
		transform.eulerAngles.y += 200 * Time.deltaTime;
	}
}