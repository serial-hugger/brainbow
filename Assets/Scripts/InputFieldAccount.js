#pragma strict

var active = false;
var text:TextMesh;
var actualText:String;
var type:String;
var rectangle:MeshRenderer;

function Start () {
    if(type == "Username"){
        actualText = Controller.globalUsername.ToString();
    }
    if(type == "Password"){
        actualText = Controller.globalPassword.ToString();
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
    if(type == "Username"){
        Controller.globalUsername = actualText.ToLower();
        text.text = actualText.ToLower();
    }
    if(type == "Password"){
        Controller.globalPassword = actualText.ToLower();
        text.text = actualText.ToLower();
    }
    if(active){
    for (var c : char in Input.inputString) {
        // Backspace - Remove the last character
        if (c == "\b"[0]) {
            if (actualText.Length > 0)
                actualText = actualText.Substring(0, actualText.Length - 1);
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