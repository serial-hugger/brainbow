#pragma strict

var color:float;
var myRenderer:MeshRenderer;
var myMaterial:Material;

function Start () {
    myRenderer = GetComponent(Renderer);
    myMaterial = myRenderer.material;
    Controller.paintballAmount += 1;
}

function OnDestroy(){
    if(Application.loadedLevelName == "EditMode"){
        Controller.paintballAmount -= 1;
    }
}

function Update () {
    myMaterial.color = Color.HSVToRGB((Controller.globalColor+(transform.position.x/20)+(transform.position.z/20))%1,.8,1);
}