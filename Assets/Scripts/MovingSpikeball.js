#pragma strict

var hitColliders:Collider[];
var i:int;
var controller:Transform;
var speed = 0.0;
var jumpAhead = 0.0;
var displayRotation:float;
var mask:LayerMask;
var myRenderer:Renderer;
var normalMaterial:Material;
var movingMaterial:Material;
var teleportCooldown = 0.0;

function Start(){
    myRenderer = transform.GetChild(0).GetComponent(Renderer);
    if(speed == 0){
        myRenderer.material = normalMaterial;
        gameObject.layer = 9;
    }else{
        myRenderer.material = movingMaterial;
    }
}
function Update(){
	if(teleportCooldown>0.0){
		teleportCooldown -= 2 * Time.deltaTime;
	}
}
function FixedUpdate () {
    if((Application.loadedLevelName != "EditMode") && speed > 0){
	    hitColliders = Physics.OverlapSphere(transform.position,.8,mask);
		Debug.DrawLine(transform.position, transform.position + transform.forward * 10);
		for(var i = 0; i < hitColliders.Length; i++){
		    if(/*VERTICAL*/((Mathf.Round(transform.eulerAngles.y%360) == 0) && (hitColliders[i].transform.position.z > transform.position.z)) || ((Mathf.Round(transform.eulerAngles.y%360) == 180) && (hitColliders[i].transform.position.z < transform.position.z))||/*HORIZONTAL*/((Mathf.Round(transform.eulerAngles.y%360) == 90) && (hitColliders[i].transform.position.x > transform.position.x)) || ((Mathf.Round(transform.eulerAngles.y%360) == 270) && (hitColliders[i].transform.position.x < transform.position.x))){
		        if(hitColliders[i].tag == "Wall" || hitColliders[i].tag == "Keyhole" || hitColliders[i].tag == "ToggleCube"){
		            transform.eulerAngles.y += 180;
		        }
		        if(hitColliders[i].tag == "Spike" && hitColliders[i].gameObject != transform.gameObject){
		            var spikeballScript:MovingSpikeball;
		            spikeballScript = hitColliders[i].GetComponent(MovingSpikeball);
		            if(spikeballScript.speed == 0){
		                transform.eulerAngles.y += 180;
		            }
		        }
		    }
		}
		transform.position += transform.forward* .02 * speed * Controller.gameSpeed;
	}
	transform.GetChild(0).transform.Rotate(Vector3.forward * .8 * speed * Controller.gameSpeed);
}
function OnCollisionEnter(collision:Collision){
	if(Application.loadedLevelName != "EditMode"){
	    if(collision.transform.tag == "Booster"){
	    	transform.eulerAngles.y = collision.transform.eulerAngles.y;
	    	Instantiate(Resources.Load("BoostSound"),transform.position,transform.rotation);
		    transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
		    transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
	    }
	}
}