#pragma strict

import Npgsql;
import System;

var levelPlay:boolean;
var levelDelete:boolean;
var levelListNext:boolean;
var levelListPrev:boolean;
var levelScript:OnlineLevelDisplay;
var browserScript:OnlineLevelBrowserController;
var doAction:int;
var myController:GameObject;
var saveScript:SaveLevel1;
var controllerScript:Controller;
//POSTGRESQL
var sql:String;
var reader:NpgsqlDataReader;
var command:NpgsqlCommand;
var transaction:NpgsqlTransaction;
var conn:NpgsqlConnection;


function Start () {
	myController = GameObject.Find("_Controller");
	saveScript = myController.transform.GetComponent(SaveLevel1);
	controllerScript = myController.transform.GetComponent(Controller);
}

function Update () {
	if(doAction>0){
		if(levelPlay){
			conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
			conn.Open();
			var dbcmd = conn.CreateCommand();
			sql = ("SELECT level FROM levels WHERE level_id = " + "'" + levelScript.levelID.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				var level:String = reader["level"];
			}
			sql = ("SELECT level_name FROM levels WHERE level_id = " + "'" + levelScript.levelID.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				var levelName:String = reader["level_name"];
			}
			Controller.globalLevelName = levelName;
			saveScript.WriteStringFile(level);
			Application.LoadLevel ("OnlinePlay");
			doAction = 0;
		}
		if(levelDelete){
        	conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
	    	conn.Open();
	    	command = conn.CreateCommand();
	    	transaction = conn.BeginTransaction();
	    	command.Connection = conn;
	    	command.Transaction = transaction;
	    	command.CommandText = ("DELETE FROM levels WHERE level_id =" + "'" + levelScript.levelID + "'");
	    	command.ExecuteNonQuery();
	    	transaction.Commit();
	    	Application.LoadLevel ("OnlineLevelBrowser");
        }
        if(levelListNext){
			if(controllerScript.levelDisplayType == "Newest" && controllerScript.listLevelsStartID > 9){
				controllerScript.listLevelsStartID-=9;
				Application.LoadLevel ("OnlineLevelBrowser");
			}
			if(controllerScript.levelDisplayType == "UserLevels" && controllerScript.listLevelsStartIndex < controllerScript.listOfLevelID.Count - 9){
				Debug.Log("NEXT");
				controllerScript.listLevelsStartIndex+=9;
				Application.LoadLevel ("OnlineLevelBrowser");
			}
		}
		if(levelListPrev){
			if(controllerScript.levelDisplayType == "Newest" && controllerScript.listLevelsStartID < controllerScript.highestLevelID){
				controllerScript.listLevelsStartID+=9;
				Application.LoadLevel ("OnlineLevelBrowser");
			}
			if(controllerScript.levelDisplayType == "UserLevels" && controllerScript.listLevelsStartIndex > 0){
				controllerScript.listLevelsStartIndex-=9;
				Application.LoadLevel ("OnlineLevelBrowser");
			}
		}
		doAction = 0;
	}
}