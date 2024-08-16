#pragma strict

var myColor:int;
var myRenderer:MeshRenderer;
var myMaterial:Material;
var myCollider:Collider;
var power:boolean;
var powerNormal:boolean;
var block:Transform;
var blockSize:float;

function Start () {
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
    block.localScale.x = Mathf.Lerp(block.localScale.x,blockSize,10*Time.deltaTime);
    block.localScale.y = Mathf.Lerp(block.localScale.y,blockSize,10*Time.deltaTime);
    block.localScale.z = Mathf.Lerp(block.localScale.z,blockSize,10*Time.deltaTime);
    if(powerNormal == false){
        if(Controller.switcheStates[myColor]){
            power = true;
            blockSize = 1;
        }else{
            power = false;
            blockSize = .5;
        }
    }
    if(powerNormal == true){
        if(Controller.switcheStates[myColor]){
            power = false;
            blockSize = .5;
        }else{
            power = true;
            blockSize = 1;
        }
    }
    if(power){
        transform.tag = "ToggleCube";
        myCollider.enabled = true;
        myRenderer.material.color.a = 1f;
    }
    if(!power){
        transform.tag = "ToggleCubeOff";
        if(Application.loadedLevelName != "EditMode"){
            myCollider.enabled = false;
        }
        myRenderer.material.color.a = .3f;
    }
}

function IsColorInArray(thisArray:Array){
    for(var i = 0; i < thisArray.length; i++){
        if(thisArray[i]==myColor){
            return true;
        }
    }
    return false;
}