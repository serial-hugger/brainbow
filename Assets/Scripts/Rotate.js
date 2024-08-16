#pragma strict

var xRot:float;
var yRot:float;
var zRot:float;

function Update () {
	transform.eulerAngles.x += xRot * Time.deltaTime;
	transform.eulerAngles.y += yRot * Time.deltaTime;
	transform.eulerAngles.z += zRot * Time.deltaTime;
}