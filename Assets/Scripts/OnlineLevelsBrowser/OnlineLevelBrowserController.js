#pragma strict

import Npgsql;
import System;

var myController:Transform;
var controllerScript:Controller;
//Newest Variables
var firstID:int;
var userID:int;
//User Level Variables
var startIndex:int;
var userSearch = "";
var userIDSearch:int;

var currentPosition = 20;
var levelBlock:GameObject;
var levelScript:OnlineLevelDisplay;

//LEVEL INFO
var levelName:String;
var levelID:int;
var username:String;
var listCreated:boolean;
//SQL
var sql:String;
var reader:NpgsqlDataReader;
var conn:NpgsqlConnection;
var dbcmd:NpgsqlCommand;


function Start () {
	controllerScript = GameObject.Find("_Controller").GetComponent(Controller);
	userSearch = Controller.globalUserSearch;
	if(Controller.levelDisplayType == "UserLevels"){
		userIDSearch = GetUserID(userSearch);
		startIndex = Controller.listLevelsStartIndex;
	}
	if(Controller.levelDisplayType == "Newest"){
		if(Controller.listLevelsStartID == 0){
			conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
			conn.Open();
			dbcmd = conn.CreateCommand();
			sql = ("SELECT MAX(level_id) FROM levels");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				var maxLevelId:int = reader["MAX"];
				firstID = maxLevelId;
			}
			// clean up
			reader.Close();
			Controller.highestLevelID = firstID;
			Controller.listLevelsStartID = firstID;
		}else{
			firstID = Controller.listLevelsStartID;
		}
	}
}

function Update () {
	if((currentPosition < -20 || firstID <= 0) && Controller.levelDisplayType == "Newest"){
		Controller.flipTiles = true;
	}
	//Create Level List
	if(Controller.levelDisplayType == "UserLevels"){
		if(!listCreated && controllerScript.listOfLevelID.Count == 0){
			conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
			conn.Open();
			dbcmd = conn.CreateCommand();
			sql = ("SELECT level_id FROM levels WHERE user_id = " + "'" + userIDSearch.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				levelID = reader["level_id"];
				controllerScript.listOfLevelID.Add(levelID);
			}
			// clean up
			listCreated = true;
			reader.Close();
		}
		if(currentPosition == 20 && controllerScript.listOfLevelID.Count > 0){
			for(var i = startIndex; i < (startIndex + 9); i++){
				if(controllerScript.listOfLevelID[i]!=null){
					levelBlock = Instantiate(UnityEngine.Resources.Load("LevelBlock"),Vector3(0,0,currentPosition),Quaternion.Euler(90,0,0));
					levelScript = levelBlock.GetComponent(OnlineLevelDisplay);
					levelScript.levelID = controllerScript.listOfLevelID[i];
					conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
					conn.Open();
					dbcmd = conn.CreateCommand();
					sql = ("SELECT level_name FROM levels WHERE level_id = " + "'" + controllerScript.listOfLevelID[i].ToString() + "'");
					dbcmd.CommandText = sql;
					reader = dbcmd.ExecuteReader();
					while(reader.Read()) {
						levelName = reader["level_name"];
						levelScript.levelName = levelName;
					}
					sql = ("SELECT user_id FROM levels WHERE level_id = " + "'" + controllerScript.listOfLevelID[i].ToString() + "'");
					dbcmd.CommandText = sql;
					reader = dbcmd.ExecuteReader();
					while(reader.Read()) {
						userID = reader["user_id"];
						levelScript.userID = userID;
					}
					sql = ("SELECT username FROM users WHERE id = " + "'" + userIDSearch.ToString() + "'");
					dbcmd.CommandText = sql;
					reader = dbcmd.ExecuteReader();
					while(reader.Read()) {
						username = reader["username"];
						levelScript.userName = username;
					}
					// clean up
					currentPosition -= 5;
					reader.Close();
					Controller.flipTiles = true;
				}
			}
		}
	}
	if(Controller.levelDisplayType == "Newest"){
		if(currentPosition >= -20 && firstID > 0 && firstID < Controller.highestLevelID+9){
			levelBlock = Instantiate(UnityEngine.Resources.Load("LevelBlock"),Vector3(0,0,currentPosition),Quaternion.Euler(90,0,0));
			levelScript = levelBlock.GetComponent(OnlineLevelDisplay);
			levelScript.levelID = firstID;
			conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
			conn.Open();
			dbcmd = conn.CreateCommand();
			sql = ("SELECT level_name FROM levels WHERE level_id = " + "'" + firstID.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				levelName = reader["level_name"];
				levelScript.levelName = levelName;
			}
			sql = ("SELECT user_id FROM levels WHERE level_id = " + "'" + firstID.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				userID = reader["user_id"];
				levelScript.userID = userID;
			}
			sql = ("SELECT username FROM users WHERE id = " + "'" + userID.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				username = reader["username"];
				levelScript.userName = username;
			}
			// clean up
			currentPosition -= 5;
			reader.Close();
		}
		firstID -= 1;
	}
}
function levelExists(id:int){
	conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
	conn.Open();
	dbcmd = conn.CreateCommand();
	sql = ("SELECT level FROM levels WHERE level_id = " + "'" + id.ToString() + "'");
	dbcmd.CommandText = sql;
	reader = dbcmd.ExecuteReader();
	while(reader.Read()) {
		var level:String = reader["level"];
	}
	if(level != null){
		return true;
	}else{
		return false;
	}
}
function GetUserID(username:String){
	conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
	conn.Open();
	dbcmd = conn.CreateCommand();
	sql = ("SELECT id FROM users WHERE username = " + "'" + userSearch + "'");
	dbcmd.CommandText = sql;
	reader = dbcmd.ExecuteReader();
	while(reader.Read()) {
		return reader["id"];
	}
}
function AddLevelsToList(userid:String){
		if(currentPosition >= -20 && firstID > 0 && firstID < Controller.highestLevelID+9){
			levelBlock = Instantiate(UnityEngine.Resources.Load("LevelBlock"),Vector3(0,0,currentPosition),Quaternion.Euler(90,0,0));
			levelScript = levelBlock.GetComponent(OnlineLevelDisplay);
			levelScript.levelID = firstID;
			conn = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
			conn.Open();
			dbcmd = conn.CreateCommand();
			sql = ("SELECT level_name FROM levels WHERE user_id = " + "'" + userid.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			if(reader.Read()==null){
				return;
			}
			while(reader.Read()) {
				levelName = reader["level_name"];
				levelScript.levelName = levelName;
			}
			sql = ("SELECT username FROM users WHERE id = " + "'" + userid.ToString() + "'");
			dbcmd.CommandText = sql;
			reader = dbcmd.ExecuteReader();
			while(reader.Read()) {
				username = reader["username"];
				levelScript.userName = username;
			}
			reader.Close();
		}
}