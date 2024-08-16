#pragma strict

import System;

var controller:GameObject;
var controllerScript:SaveLevel1;
var controlScript:Controller;
var doAction:int;
var myCamera:Transform;
var myCameraScript:EditorSelection;
var scrollItemForward:boolean;
var scrollItemBackward:boolean;
var increaseOption:boolean;
var decreaseOption:boolean;
var optionSave:boolean;
var optionLoad:boolean;
var optionPlay:boolean;
var optionNew:boolean;
var optionUpload:boolean;
var optionMenu:boolean;
var optionOnline:boolean;
//SEARCH FOR ONLINE LEVELS
var optionSearch:boolean;
//TABS
var tabNew:boolean;
var tabUser:boolean;
var optionLevelBrowser:boolean;
var optionRetry:boolean;
var optionText:TextMesh;
var levelTitleInputScript:InputField;

function Start(){
    myCameraScript = myCamera.GetComponent(EditorSelection);
    controller = GameObject.Find("_Controller");
    controllerScript = controller.GetComponent(SaveLevel1);
    controlScript = controller.GetComponent(Controller);
}
function Update () {
    if (doAction > 0 && optionText == null){
        if(optionSave){
            controllerScript.WriteFile();
            doAction = 0;
        }
        if(optionLoad){
            Instantiate(UnityEngine.Resources.Load("Texts/Loading"),Vector3(0,7,0),Quaternion.Euler(90,0,0));
            Application.LoadLevel ("EditMode");
            doAction = 0;
        }
        if(optionNew){
        	if(levelTitleInputScript != null){
        		levelTitleInputScript.actualText = "";
        	}
            Controller.globalLevelName = "";
            Controller.globalLevelDescription = "";
            controllerScript.levelString = "";
            Instantiate(UnityEngine.Resources.Load("Texts/Loading"),Vector3(0,7,0),Quaternion.Euler(90,0,0));
            Application.LoadLevel ("EditMode");
            doAction = 0;
        }
        if(optionPlay){
            Instantiate(UnityEngine.Resources.Load("Texts/Loading"),Vector3(0,7,0),Quaternion.Euler(90,0,0));
            Application.LoadLevel ("PlayMode");
            doAction = 0;
        }
        if(optionMenu){
            Application.LoadLevel ("MainMenu");
            doAction = 0;
        }
        if(optionOnline){
            Application.LoadLevel ("OnlineLevelBrowser");
            doAction = 0;
        }
        if(optionLevelBrowser){
            Application.LoadLevel ("LocalLevelBrowser");
            doAction = 0;
        }
        if(optionUpload){
        	Application.LoadLevel ("PlayToUpload");
            doAction = 0;
        }
        if(optionRetry){
        	Application.LoadLevel (Application.loadedLevelName);
            doAction = 0;
        }
        if(optionSearch){
        	controlScript.listOfLevelID.Clear();
        	Application.LoadLevel (Application.loadedLevelName);
            doAction = 0;
        }
        if(tabNew){
        	Controller.levelDisplayType = "Newest";
        	Controller.listLevelsStartID = 0;
			Controller.listLevelsStartIndex = 0;
			Controller.highestLevelID = 0;
        	Application.LoadLevel (Application.loadedLevelName);
            doAction = 0;
        }
        if(tabUser){
        	Controller.levelDisplayType = "UserLevels";
        	Controller.listLevelsStartID = 0;
			Controller.listLevelsStartIndex = 0;
			Controller.highestLevelID = 0;
        	Application.LoadLevel (Application.loadedLevelName);
            doAction = 0;
        }
    }
    if(doAction > 0){
        if(scrollItemForward && EditorSelection.item < EditorSelection.items.length-1){
            myCameraScript.item += 1;
            ItemHolder.createRotation = 0;
            ItemHolder.createSpeed = 0;
            ItemHolder.createColor = 0;
            doAction = 0;
        }
        if(scrollItemBackward && EditorSelection.item > 0){
            myCameraScript.item -= 1;
            ItemHolder.createRotation = 0;
            ItemHolder.createSpeed = 0;
            ItemHolder.createColor = 0;
            doAction = 0;
        }
    }
    if (doAction > 0 && optionText != null){
        if(increaseOption){
            if(optionText.text.Split(":"[0])[0] == "Facing"){
                ItemHolder.createRotation += 90;
            }
            if(optionText.text.Split(":"[0])[0] == "Speed"){
                ItemHolder.createSpeed += 1;
            }
            if(optionText.text.Split(":"[0])[0] == "Color"){
                ItemHolder.createColor += 1;
            }
            if(optionText.text.Split(":"[0])[0] == "Power"){
                ItemHolder.createPower += 1;
            }
            if(optionText.text.Split(":"[0])[0] == "Signal"){
                ItemHolder.createSignal += 1;
            }
        }
        if(decreaseOption){
            if(optionText.text.Split(":"[0])[0] == "Facing"){
                ItemHolder.createRotation -= 90;
            }
            if(optionText.text.Split(":"[0])[0] == "Speed"){
                ItemHolder.createSpeed -= 1;
            }
            if(optionText.text.Split(":"[0])[0] == "Color"){
                ItemHolder.createColor -= 1;
            }
            if(optionText.text.Split(":"[0])[0] == "Power"){
                ItemHolder.createPower -= 1;
            }
            if(optionText.text.Split(":"[0])[0] == "Signal"){
                ItemHolder.createSignal -= 1;
            }
        }
        doAction -= 1;
    }
    if(doAction >= 1){
        doAction = 0;
    }
}