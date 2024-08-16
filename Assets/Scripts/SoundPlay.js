#pragma strict

var sound:AudioSource;
var minPitch:float;
var maxPitch:float;

function Awake(){
	sound.pitch = Random.Range(minPitch,maxPitch);
}
function Update () {
	if(!sound.isPlaying){
		Destroy(gameObject);
	}
}

function OnLevelWasLoaded(){
	Destroy(gameObject);
}
function OnApplicationQuit(){
	Destroy(gameObject);
}