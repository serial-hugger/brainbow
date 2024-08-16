#pragma strict

var myColor:int;
var myRenderer:MeshRenderer;
var myMaterial:Material;
var powerNormal:boolean;
var power:boolean;
var myCollider:Collider;

function Start () {
    if(power){
        myCollider.enabled = true;
    }else{
        if(Application.loadedLevelName != "EditMode"){
            myCollider.enabled = false;
        }
    }
    myMaterial = myRenderer.material;
    if(myColor == 0){
        myMaterial.color = Color(.2, .2, 1, 1);
    }
    if(myColor == 1){
        myMaterial.color = Color(1, .2, .2, 1);
    }
    if(myColor == 2){
        myMaterial.color = Color(1, 1, .2, 1);
    }
    if(myColor == 3){
        myMaterial.color = Color(.2, 1, .2, 1);
    }
    if(myColor == 4){
        myMaterial.color = Color(1, .5, .2, 1);
    }
    if(myColor == 5){
        myMaterial.color = Color(.5, .2, 1, 1);
    }
}
function Update(){
    if(power){
        myCollider.enabled = true;
        var offset : float = Time.time * 5;
        myMaterial.SetTextureOffset("_MainTex", Vector2(0,-offset));
    }else{
        if(Application.loadedLevelName != "EditMode"){
            myCollider.enabled = false;
        }
    }
    if(powerNormal){
        power = !Controller.switcheStates[myColor];
    }else{
        power = Controller.switcheStates[myColor];
    }
}