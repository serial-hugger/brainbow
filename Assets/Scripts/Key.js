#pragma strict

var myColor:int;
var myRenderer:MeshRenderer;
var myMaterial:Material;
var hitColliders:Collider[];
var myCollider:Collider;

function Start () {
    myRenderer = GetComponent(Renderer);
    myMaterial = myRenderer.material;
    if(Application.loadedLevelName == "EditMode"){
    	myCollider = transform.parent.GetComponent(Collider);
    	myCollider.enabled = true;
    }
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
        myMaterial.color = Color(.3, 1,.3, 1);
    }
    if(myColor == 4){
        myMaterial.color = Color(1, .5, .3, 1);
    }
    if(myColor == 5){
        myMaterial.color = Color(.5, .3, 1, 1);
    }
    Controller.levelKeys.Add(myColor);
}

function Update () {
    hitColliders = Physics.OverlapSphere(transform.position,.5);
    for(var i = 0; i < hitColliders.Length; i++){
        if(hitColliders[i].tag == "Player"){
            Destroy(gameObject);
        }
    }
}
function OnDestroy(){
	Controller.levelKeys.RemoveAt(IndexOfColor(myColor));
	if((Application.loadedLevelName != "EditMode")){
		Instantiate(Resources.Load("KeySound"),transform.position,transform.rotation);
	    if(!ColorKeyExists(myColor)){
	    	Instantiate(Resources.Load("UnlockSound"),transform.position,transform.rotation);
	    }
    }
}

function IndexOfColor(thisColor:int){
    for(var i = 0; i < Controller.levelKeys.length; i++){
        if(Controller.levelKeys[i]==thisColor){
            return i;
        }
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