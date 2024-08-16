#pragma strict

var levelNameText:TextMesh;
var descriptionText:TextMesh;
var file:System.IO.FileInfo;
var editButton:Transform;
var deleteButton:Transform;
var levelID:int;
var userID:int;
var levelName:String;
var description:String;

function Update () {
	transform.rotation.eulerAngles.x = Mathf.Lerp(transform.rotation.eulerAngles.x, 0, 5*Time.deltaTime);
	deleteButton.gameObject.SetActive(true);
	editButton.gameObject.SetActive(true);

	levelNameText.text = "Title: " + levelName;
	descriptionText.text = "About: " + description;
}
