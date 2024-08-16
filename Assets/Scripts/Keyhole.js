#pragma strict

var myColor:int;
var myRenderer:MeshRenderer;
var myMaterial:Material;

function Start () {
    myRenderer = GetComponent(Renderer);
    myMaterial = myRenderer.material;
    if(myColor == 0){
        myMaterial.color = Color(.3, .3, 1, 1);
    }
    if(myColor == 1){
        myMaterial.color = Color(1, .3, .3, 1);
    }
    if(myColor == 2){
        myMaterial.color = Color(1, 1, .3, 1);
    }
    if(myColor == 3){
        myMaterial.color = Color(.3, 1, .3, 1);
    }
    if(myColor == 4){
        myMaterial.color = Color(1, .5, .3, 1);
    }
    if(myColor == 5){
        myMaterial.color = Color(.5, .3, 1, 1);
    }
}

function Update () {
    if(!ColorKeyExists(myColor) && (Application.loadedLevelName != "EditMode")){
        Destroy(transform.parent.gameObject);
    }
}

function ColorKeyExists(thisColor:int){
    for(var i = 0; i < Controller.levelKeys.length; i++){
        if(Controller.levelKeys[i]==thisColor){
            return true;
        }
    }
    return false;
}