#pragma strict

var heart:Transform;
var player:GameObject;
var playerScript:PlayerMovement;
var scale:float;
var minSize:float;
var maxSize:float;
var grown:boolean;
var paintballAmountPrev:float;
var myCollider:Collider;
//Color
var myRenderer:MeshRenderer;
var myMaterial:Material;
var sat = 1.0;



function Start () {
    myMaterial = myRenderer.material;
}
function Update () {
	myMaterial.color = Color.HSVToRGB((Controller.globalColor+(transform.position.x/20)+(transform.position.z/20))%1,1,sat);
	if(player == null && Application.loadedLevelName != "EditMode"){
		player = GameObject.FindWithTag("Player");
		playerScript = player.GetComponent(PlayerMovement);
	}
	if(Application.loadedLevelName != "EditMode"){
		if(playerScript.collectedPaintballs == Controller.paintballAmount){
			myCollider.enabled = true;
		}else{
			myCollider.enabled = false;
		}
		if(paintballAmountPrev > playerScript.collectedPaintballs){
			paintballAmountPrev = playerScript.collectedPaintballs;
		}
		if(playerScript.collectedPaintballs != Controller.paintballAmount){
			sat = ((playerScript.collectedPaintballs/Controller.paintballAmount)/3)+.2;
		}else{
			sat = 1;
		}
		if(paintballAmountPrev < playerScript.collectedPaintballs){
			paintballAmountPrev = playerScript.collectedPaintballs;
			if(scale <= minSize+.05){
				grown = true;
			}
		}
	}
	if(grown){
		if(scale >= maxSize-.05){
			grown = false;
		}
		scale = Mathf.Lerp(scale,maxSize,15*Time.deltaTime);
	}else{
		scale = Mathf.Lerp(scale,minSize,15*Time.deltaTime);
	}
	heart.localScale = Vector3(scale,scale,scale);
}