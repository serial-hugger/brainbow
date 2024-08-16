#pragma strict

var myCamera:Transform;

function Start () {

}

function Update () {
    transform.LookAt(myCamera);
}