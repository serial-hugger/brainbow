#pragma strict

var active = false;
var text:TextMesh;
var actualText:String;
var type:String;
var rectangle:MeshRenderer;
//FOR THE SEARCH IN LONLINE LEVEL BROWSER
var browserScript:OnlineLevelBrowserController;

function Start () {
    if(type == "LevelName"){
        actualText = Controller.globalLevelName.ToString();
    }
    if(type == "Description"){
        actualText = Controller.globalLevelDescription.ToString();
    }
    if(type == "Search"){
        actualText = Controller.globalUserSearch.ToString();
    }
}
function Update () {
    if(active == true){
        rectangle.material.color.a = .1;
    }else{
        rectangle.material.color.a = .5;
    }
    if(Input.GetMouseButtonDown(0)){
        active = false;
    }
    if(type == "LevelName"){
        Controller.globalLevelName = actualText.ToLower();
        text.text = actualText.ToLower();
    }
    if(type == "Description"){
        Controller.globalLevelDescription = actualText.ToLower();
        text.text = actualText.ToLower();
    }
    if(type == "Search"){
        Controller.globalUserSearch = actualText.ToLower();
        text.text = actualText.ToLower();
    }
    if(active){
    for (var c : char in Input.inputString) {
    	if(c == "*"[0] || c == "."[0] || c == "\""[0] || c == "/"[0] || c == "\\"[0] || c == "["[0] || c == "]"[0] || c == ":"[0] || c == ";"[0] || c == "|"[0] || c == "="[0] || c == ","[0] || c == "?"[0]){
      		c = ""[0];
       }
        // Backspace - Remove the last character
        if (c == "\b"[0]) {
            if (actualText.Length > 0){
                actualText = actualText.Substring(0, actualText.Length - 1);
            }
       }
// End of entry
    else if (c == "\n"[0] || c == "\r"[0]) {// "\n" for Mac, "\r" for windows.
        active = false;
    }
        // Normal text input - just append to the end
    else {
        if(actualText.Length < 28){
            actualText += c;
    }
}
}
}
}