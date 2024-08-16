#pragma strict

import System.Collections.Generic;

public static var devMode = false;
public static var globalPerspective = 0;
public static var gameMode = 2;
public static var gameSpeed = 1.0;
public static var playerMoved:boolean;
public static var playerDead:boolean;
public static var controlMode = 0;
public static var globalColor:float;
public static var levelKeys = new Array ();
var levelKeysDisplay:int;
public static var switcheStates = new Array(true,true,true,true,true,true);
public static var globalLevelName = "";
public static var globalLevelDescription = "";
public static var globalTempOnlineLevel = "";
//CURSOR
var cursorTexture: Texture2D;
//LEVEL BROWSER VARIABLES
public static var levelDisplayType = "Newest";
//FOR NEWEST
public static var listLevelsStartID = 0;
//FOR USER SEARCH
public static var listLevelsStartIndex = 0;
public static var globalUserSearch = "";
//LAST LEVEL UPLOADED
public static var highestLevelID = 0;
public static var flipTiles:boolean;
var listOfLevelID:List.<int>;
//USER ACCOUNT VARIABLES
public static var globalUsername = "";
public static var globalPassword = "";
public static var globalID:int;
public static var paintballAmount = 0.0;
//SQL SERVER INFO
//"Server=127.0.0.1;Port=5432;User Id=postgres;Password=REDACTED;Database=postgres;"
//192.168.1.184
public static var ip = "Server=107.133.208.229;";
public static var port = "Port=5432;";
public static var userId = "User Id=postgres;";
public static var password = "Password=password;";
public static var database = "Database=postgres;";
//UI
public static var clipboardActive:boolean;
public static var itemSelecterActive:boolean;
var clipboardShowTexture:Texture;
var itemselecterShowTexture:Texture;

function Start () {
    DontDestroyOnLoad (transform.gameObject);
    Cursor.SetCursor(cursorTexture,Vector2.zero,CursorMode.Auto);
    globalColor = 1000;
}
function OnLevelWasLoaded() {
	if(Application.loadedLevelName != "OnlineLevelBrowser" && Application.loadedLevelName != "LocalLevelBrowser"){
		listLevelsStartID = 0;
		listLevelsStartIndex = 0;
		highestLevelID = 0;
		listOfLevelID.Clear();
	}
	if(Application.loadedLevelName == "PlayToUpload"){
		Instantiate(UnityEngine.Resources.Load("Texts/BeatTheLevel"),Vector3(0,7,0),Quaternion.Euler(90,0,0));
	}
	if(Application.loadedLevelName == "EditMode"){
		gameSpeed = 1.0;
	}else{
		gameSpeed = 0.0;
	}
	playerMoved = false;
	playerDead = false;
	clipboardActive = false;
	itemSelecterActive = false;
    paintballAmount = 0;
    switcheStates = new Array(true,true,true,true,true,true);
    flipTiles = false;
}
function Update () {
    levelKeysDisplay = levelKeys.length;
    globalColor += .2 * Time.deltaTime;
	if (Input.GetKey ("escape")) {
	    Application.Quit();
	}
}
function FixedUpdate () {
	if(!playerDead && gameSpeed < 1.0){
		gameSpeed += .02;
	}
	if(playerDead && gameSpeed > 0.0){
		gameSpeed -= .01;
	}
	if(gameSpeed > 1.0){
		gameSpeed = 1.0;
	}
	if(gameSpeed < 0.0){
		gameSpeed = 0.0;
	}
}
function OnGUI () {
	// Make a text field that modifies stringToEdit.
	//ip = GUI.TextField (Rect (10, 10, 200, 20), ip, 100);
	//if(devMode || true){
	//	if(GUI.Button(Rect(220,10,75,20),"To Local")){
	//		ip = "Server=127.0.0.1;";
	//	}
	//}
	if(globalPerspective == 0){
		if(GUI.Button(Rect(10,10,100,20),"Perspective")){
			globalPerspective = 1;
		}
	}
	if(globalPerspective == 1){
		if(GUI.Button(Rect(10,10,100,20),"Orthographic")){
			globalPerspective = 0;
		}
	}
	//if(controlMode == 0){
	//	if(GUI.Button(Rect(410,10,100,20),"Keyboard")){
	//		controlMode = 1;
	//	}
	//}
	//if(controlMode == 1){
	//	if(GUI.Button(Rect(410,10,100,20),"Controller")){
	//		controlMode = 0;
	//	}
	//}
	if(Screen.width*1.0/Screen.height*1.0 <= 1.7 && !itemSelecterActive && !clipboardActive && Application.loadedLevelName == "EditMode"){
		if(GUI.Button(Rect(Screen.width-100,Screen.height/3,100,300),itemselecterShowTexture,GUIStyle.none)){
			if(Controller.controlMode == 0){
				itemSelecterActive = true;
			}
		}
		if(GUI.Button(Rect(0,Screen.height/3,100,300),clipboardShowTexture,GUIStyle.none)){
			if(Controller.controlMode == 0){
				clipboardActive = true;
			}
		}
	}
}
