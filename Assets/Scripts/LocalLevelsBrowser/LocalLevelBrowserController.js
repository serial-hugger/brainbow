#pragma strict

import Npgsql;
import System;

var currentPosition = 20;
var levelBlock:GameObject;

function Start () {
	var info = new DirectoryInfo("LocalLevels");
	var fileInfo = info.GetFiles("*.brnbw");
	Controller.highestLevelID = fileInfo.Length;
	for (var i = Controller.listLevelsStartID; i < fileInfo.Length; i++){
		if(currentPosition >= -10){
		var theFile = fileInfo[i];
		levelBlock = Instantiate(UnityEngine.Resources.Load("LocalLevelBlock"),Vector3(0,0,currentPosition),Quaternion.Euler(90,0,0));
		var levelScript:LocalLevelDisplay = levelBlock.GetComponent(LocalLevelDisplay);
		levelScript.file = theFile;
		currentPosition -= 5;
		var sr:System.IO.StreamReader;
		//for reading name of level
		var locationSplit = theFile.ToString().Split("\\"[0]);
		//reads level name
		var levelFileName = locationSplit[locationSplit.Length-1];
		var levelName = levelFileName.Split("."[0])[0];
        sr = File.OpenText("LocalLevels/" + levelFileName);
    	var textFileString:String;
    	textFileString = Decrypt(sr.ReadLine());
    	var semicolonSplit = textFileString.Split(";"[0]);
    	levelScript.levelName = levelName;
    	levelScript.description = semicolonSplit[0].ToLower();
    	}
	}
}
static function Decrypt(toDecrypt : String ){
var encoding = System.Text.UTF8Encoding();
var keyArray = encoding.GetBytes("31178281066204194021056824416839");
var toEncryptArray = Convert.FromBase64String (toDecrypt);
var rDel = new RijndaelManaged ();
rDel.Key = keyArray;
rDel.Mode = CipherMode.ECB;
rDel.Padding = PaddingMode.PKCS7;
var cTransform = rDel.CreateDecryptor ();
var resultArray = cTransform.TransformFinalBlock (toEncryptArray, 0, toEncryptArray.Length);
return UTF8Encoding.UTF8.GetString (resultArray);
}