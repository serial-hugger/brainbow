#pragma strict

var searchTools:GameObject;

function Start () {
	if(Controller.levelDisplayType == "UserLevels"){
		searchTools.SetActive(true);
	}
}