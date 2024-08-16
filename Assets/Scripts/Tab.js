#pragma strict

var newTab:boolean;
var userTab:boolean;

function Start () {
	if(newTab){
		if(Controller.levelDisplayType == "Newest"){
			transform.position.z = 23.9;
		}else{
			transform.position.z = 23.2;
		}
	}
	if(userTab){
		if(Controller.levelDisplayType == "UserLevels"){
			transform.position.z = 23.9;
		}else{
			transform.position.z = 23.2;
		}
	}
}