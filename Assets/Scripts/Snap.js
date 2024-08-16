#pragma strict


function LateUpdate () {
	transform.position.x = transform.position.x % 32;
	transform.position.z = transform.position.z % 32;
}