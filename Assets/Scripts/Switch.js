#pragma strict

var myLight:Light;
var power:boolean;
var myColor:int;
var myRenderer:MeshRenderer;
var myMaterial:Material;
//MATERIALS
var blue:Material;
var red:Material;
var yellow:Material;
var green:Material;
var orange:Material;
var purple:Material;

function Start () {
    myLight = transform.GetChild(0).GetChild(0).transform.GetComponent(Light);
    myRenderer = transform.GetChild(0).GetComponent(Renderer);
    //SET COLORS
    if(myColor == 0){
        myLight.color = Color(.3, .3, 1, 1);
        myRenderer.material = blue;
    }
    if(myColor == 1){
        myLight.color = Color(1, .3, .3, 1);
        myRenderer.material = red;
    }
    if(myColor == 2){
        myLight.color = Color(1, 1, .3, 1);
        myRenderer.material = yellow;
    }
    if(myColor == 3){
        myLight.color = Color(.3, 1, .3, 1);
        myRenderer.material = green;
    }
    if(myColor == 4){
        myLight.color = Color(1, .5, .3, 1);
        myRenderer.material = orange;
    }
    if(myColor == 5){
        myLight.color = Color(.5, .3, 1, 1);
        myRenderer.material = purple;
    }
    myMaterial = myRenderer.material;
}

function Update () {
    power = Controller.switcheStates[myColor];
    if(true){
        if(power){
            myLight.enabled = true;
            //myMaterial.SetColor ("_EmissionColor", Color(.4, .4, .4, 1));
        }else{
            myLight.enabled = false;
            //myMaterial.SetColor ("_EmissionColor", Color(0, 0, 0, 1));
        }
    }
}

function OnTriggerEnter(){
    if(Application.loadedLevelName != "EditMode"){
        Controller.switcheStates[myColor] = !Controller.switcheStates[myColor];
        Instantiate(Resources.Load("SwitchSound"),transform.position,transform.rotation);
    }
}