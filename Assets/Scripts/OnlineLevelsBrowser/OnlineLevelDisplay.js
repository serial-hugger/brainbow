#pragma strict

var levelNameText:TextMesh;
var userNameText:TextMesh;
var playButton:Transform;
var deleteButton:Transform;
var levelID:int;
var userID:int;
var levelName:String;
var userName:String;
var myRenderer:Renderer;

function Update () {
	if(Controller.flipTiles){
		transform.rotation.eulerAngles.x = Mathf.Lerp(transform.rotation.eulerAngles.x, 0, 5*Time.deltaTime);
	}
	if(userID == Controller.globalID){
		deleteButton.gameObject.SetActive(true);
	}
	if(levelName == ""){
		levelName = "DELETED";
		deleteButton.gameObject.SetActive(false);
		playButton.gameObject.SetActive(false);
	}else if(levelName != "DELETED"){
		playButton.gameObject.SetActive(true);
	}
	levelNameText.text = "Title: " + levelName;
	if(userName=="serialhugger"){
		userNameText.text = "User: " + "DEVELOPER " + userName;
		myRenderer.material.color = Color.yellow;
	}else if(levelName != "DELETED"){
		userNameText.text = "User: " + userName;
	}else{
		myRenderer.material.color = Color.red;
		levelNameText.text = "DELETED";
		userNameText.text = "";
	}
}