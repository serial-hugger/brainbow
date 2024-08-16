#pragma strict

var text:TextMesh;
var actualText:String;
var type:String;

function Update () {
    if(type == "LevelName"){
        text.text = Controller.globalLevelName;
    }
    if(type == "Description"){
        text.text = Controller.globalLevelDescription;
    }
}