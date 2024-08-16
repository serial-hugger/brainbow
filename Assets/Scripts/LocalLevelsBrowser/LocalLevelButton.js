#pragma strict

import System;

var levelEdit:boolean;
var levelDelete:boolean;
var levelListNext:boolean;
var levelListPrev:boolean;
var levelScript:LocalLevelDisplay;
var doAction:int;
var myController:GameObject;
var saveScript:SaveLevel1;


function Start () {
	myController = GameObject.Find("_Controller");
	saveScript = myController.transform.GetComponent(SaveLevel1);
}

function Update () {
	if(doAction>0){
		if(levelEdit){
			Controller.globalLevelName = levelScript.levelName;
			Application.LoadLevel ("EditMode");
			doAction = 0;
		}
		if(levelDelete){
			File.Delete("LocalLevels/" + levelScript.levelName + ".brnbw");
	    	Application.LoadLevel ("LocalLevelBrowser");
	    	doAction = 0;
        }
        if(Application.loadedLevelName == "LocalLevelBrowser"){
			if(levelListNext && Controller.listLevelsStartID < Controller.highestLevelID-7){
				Debug.Log("Next!");
				Controller.listLevelsStartID+=7;
				Application.LoadLevel ("LocalLevelBrowser");
			}
			if(levelListPrev && Controller.listLevelsStartID > 0){
				Debug.Log("Previous!");
				Controller.listLevelsStartID-=7;
				Application.LoadLevel ("LocalLevelBrowser");
			}
			doAction = 0;
		}
        if(Application.loadedLevelName == "OnlineLevelBrowser"){
			if(levelListNext && Controller.listLevelsStartID > 9){
				Debug.Log("Next!");
				Controller.listLevelsStartID-=9;
				Application.LoadLevel ("OnlineLevelBrowser");
			}
			if(levelListPrev && Controller.listLevelsStartID < Controller.highestLevelID){
				Debug.Log("Previous!");
				Controller.listLevelsStartID+=9;
				Application.LoadLevel ("OnlineLevelBrowser");
			}
			doAction = 0;
		}
	}
}