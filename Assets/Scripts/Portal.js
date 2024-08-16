#pragma strict

var myColor:int;
var myRenderer:SpriteRenderer;
var myMaterial:Material;
var myCollider:Collider;
var portalScript:Portal;
var playerScript:PlayerMovement;
var spikeballScript:MovingSpikeball;
var iceScript:IceCube;
var portals:Array;
var layerMask:LayerMask;

function Start () {
    myMaterial = myRenderer.material;
    if(myColor == 0){
        myRenderer.color = Color(.2, .2, 1, 1);
    }
    if(myColor == 1){
        myRenderer.color = Color(1, .2, .2, 1);
    }
    if(myColor == 2){
        myRenderer.color = Color(1, 1, .2, 1);
    }
    if(myColor == 3){
        myRenderer.color = Color(.2, 1, .2, 1);
    }
    if(myColor == 4){
        myRenderer.color = Color(1, .5, .2, 1);
    }
    if(myColor == 5){
        myRenderer.color = Color(.5, .2, 1, 1);
    }
}
function Update(){
	Debug.DrawRay(transform.position,transform.right*10,Color.red,100);
}
function OnCollisionEnter(collision:Collision){
	if(collision.transform.tag == "Player"){
		playerScript = collision.transform.GetComponent(PlayerMovement);
		if(!(playerScript.teleportCooldown > 0.0)){
			playerScript.teleportCooldown = 0.1;
			var direction:int;
			if(playerScript.xChange > 0.0){
				portals = Physics.RaycastAll(transform.position, transform.right*100,100.0,layerMask);
			}
			if(playerScript.xChange < 0.0){
				portals = Physics.RaycastAll(transform.position, -transform.right*100,100.0,layerMask);
			}
			if(playerScript.zChange > 0.0){
				portals = Physics.RaycastAll(transform.position, transform.forward*100,100.0,layerMask);
			}
			if(playerScript.zChange < 0.0){
				portals = Physics.RaycastAll(transform.position, -transform.forward*100,100.0,layerMask);
			}
			Debug.Log(portals.length);
			for(var i = 0;i<portals.length;i++){
				var hit: RaycastHit = portals[i];
				portalScript = hit.transform.GetComponent(Portal);
				if (portalScript.myColor == myColor){
					Instantiate(Resources.Load("InwardPortal"),Vector3(transform.position.x,transform.position.y,transform.position.z),Quaternion.Euler(270, 0, 0));
					collision.transform.position.x = hit.transform.position.x;
					collision.transform.position.z = hit.transform.position.z;
					Instantiate(Resources.Load("Smoke"),hit.transform.position,Quaternion.Euler(270, 0, 0));
					return;
				}
			}
		}
	}
	if(collision.transform.tag == "IceCube"){
		iceScript = collision.transform.GetComponent(IceCube);
		if(!(iceScript.teleportCooldown > 0.0)){
			iceScript.teleportCooldown = 0.1;
			if(iceScript.xChange > 0.0){
				portals = Physics.RaycastAll(transform.position, transform.right*100,100.0,layerMask);
			}
			if(iceScript.xChange < 0.0){
				portals = Physics.RaycastAll(transform.position, -transform.right*100,100.0,layerMask);
			}
			if(iceScript.zChange > 0.0){
				portals = Physics.RaycastAll(transform.position, transform.forward*100,100.0,layerMask);
			}
			if(iceScript.zChange < 0.0){
				portals = Physics.RaycastAll(transform.position, -transform.forward*100,100.0,layerMask);
			}
			Debug.Log(portals.length);
			for(var i2 = 0;i2<portals.length;i2++){
				var hit2: RaycastHit = portals[i2];
				portalScript = hit2.transform.GetComponent(Portal);
				if (portalScript.myColor == myColor){
					Instantiate(Resources.Load("InwardPortal"),Vector3(transform.position.x,transform.position.y,transform.position.z),Quaternion.Euler(270, 0, 0));
					collision.transform.position.x = hit2.transform.position.x;
					collision.transform.position.z = hit2.transform.position.z;
					Instantiate(Resources.Load("Smoke"),hit2.transform.position,Quaternion.Euler(270, 0, 0));
					return;
				}
			}
		}
	}
	if(collision.transform.tag == "Spike"){
		spikeballScript = collision.transform.GetComponent(MovingSpikeball);
		if(!(spikeballScript.teleportCooldown > 0.0)){
			spikeballScript.teleportCooldown = 0.1;
			if((Mathf.Round(collision.transform.eulerAngles.y%360) == 90.0)){
				portals = Physics.RaycastAll(transform.position, transform.right*100,100.0,layerMask);
			}
			if((Mathf.Round(collision.transform.eulerAngles.y%360) == 270.0)){
				portals = Physics.RaycastAll(transform.position, -transform.right*100,100.0,layerMask);
			}
			if((Mathf.Round(collision.transform.eulerAngles.y%360) == 0.0) || (Mathf.Round(collision.transform.eulerAngles.y%360) == 360.0)){
				portals = Physics.RaycastAll(transform.position, transform.forward*100,100.0,layerMask);
			}
			if((Mathf.Round(collision.transform.eulerAngles.y%360) == 180.0)){
				portals = Physics.RaycastAll(transform.position, -transform.forward*100,100.0,layerMask);
			}
			Debug.Log(portals.length);
			for(var i3 = 0;i3<portals.length;i3++){
				var hit3: RaycastHit = portals[i3];
				portalScript = hit3.transform.GetComponent(Portal);
				if (portalScript.myColor == myColor){
					Instantiate(Resources.Load("InwardPortal"),Vector3(transform.position.x,transform.position.y,transform.position.z),Quaternion.Euler(270, 0, 0));
					collision.transform.position.x = hit3.transform.position.x;
					collision.transform.position.z = hit3.transform.position.z;
					Instantiate(Resources.Load("Smoke"),hit3.transform.position,Quaternion.Euler(270, 0, 0));
					return;
				}
			}
		}
	}
}