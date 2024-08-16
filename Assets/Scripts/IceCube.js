#pragma strict

import Npgsql;

var speed:float;
var xChange = 0.0;
var zChange = 0.0;
var hitColliders:Collider[];
var myLight:Light;
var myModel:Transform;
var affectIce:boolean;
var teleportCooldown = 0.0;

function Start(){
	affectIce = true;
}
function Update(){
	if(teleportCooldown>0.0){
		teleportCooldown -= 2 * Time.deltaTime;
	}
}
function FixedUpdate () {
    transform.position.x += xChange * .02 * Controller.gameSpeed;
	transform.position.z += zChange * .02 * Controller.gameSpeed;
	var iceCubeScript:IceCube;
	if(xChange > .4){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+1,transform.position.y,transform.position.z),.5);
		for(var i1 = 0; i1 < hitColliders.Length; i1++){
		    if(hitColliders[i1].tag == "Player" || hitColliders[i1].tag == "Wall" || hitColliders[i1].tag == "Keyhole" || hitColliders[i1].tag == "ToggleCube" || (hitColliders[i1].tag == "IceCube" && hitColliders[i1].transform.GetInstanceID() != transform.GetInstanceID())){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
			if(affectIce && hitColliders[i1].tag == "IceCube" && hitColliders[i1].transform.GetInstanceID() != transform.GetInstanceID()){
    			iceCubeScript = hitColliders[i1].gameObject.GetComponent(IceCube);
    			iceCubeScript.xChange = speed;
			}
		}
	}
	if(xChange < -.4){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-1,transform.position.y,transform.position.z),.5);
		for(var i2 = 0; i2 < hitColliders.Length; i2++){
		    if(hitColliders[i2].tag == "Player" || hitColliders[i2].tag == "Wall" || hitColliders[i2].tag == "Keyhole" || hitColliders[i2].tag == "ToggleCube" || (hitColliders[i2].tag == "IceCube" && hitColliders[i2].transform.GetInstanceID() != transform.GetInstanceID())){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
			if(affectIce && hitColliders[i2].tag == "IceCube" && hitColliders[i2].transform.GetInstanceID() != transform.GetInstanceID()){
    			iceCubeScript = hitColliders[i2].gameObject.GetComponent(IceCube);
    			iceCubeScript.xChange = -speed;
			}
		}
	}
	if(zChange > .4){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z+1),.5);
		for(var i3 = 0; i3 < hitColliders.Length; i3++){
		    if(hitColliders[i3].tag == "Player" || hitColliders[i3].tag == "Wall" || hitColliders[i3].tag == "Keyhole" || hitColliders[i3].tag == "ToggleCube" || (hitColliders[i3].tag == "IceCube" && hitColliders[i3].transform.GetInstanceID() != transform.GetInstanceID())){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
			if(affectIce && hitColliders[i3].tag == "IceCube" && hitColliders[i3].transform.GetInstanceID() != transform.GetInstanceID()){
    			iceCubeScript = hitColliders[i3].gameObject.GetComponent(IceCube);
    			iceCubeScript.zChange = speed;
			}
		}
	}
	if(zChange < -.4){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z-1),.5);
		for(var i4 = 0; i4 < hitColliders.Length; i4++){
		    if(hitColliders[i4].tag == "Player" || hitColliders[i4].tag == "Wall" || hitColliders[i4].tag == "Keyhole" || hitColliders[i4].tag == "ToggleCube" || (hitColliders[i4].tag == "IceCube" && hitColliders[i4].transform.GetInstanceID() != transform.GetInstanceID())){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
			if(affectIce && hitColliders[i4].tag == "IceCube" && hitColliders[i4].transform.GetInstanceID() != transform.GetInstanceID()){
    			iceCubeScript = hitColliders[i4].gameObject.GetComponent(IceCube);
    			iceCubeScript.zChange = -speed;
			}
		}
	}
}
function OnCollisionLeave(collision:Collision){
	if(Application.loadedLevelName != "EditMode"){
    	if(collision.transform.tag == "StickyPlate"){
    		affectIce = true;
    	}
	}
}
function OnCollisionEnter(collision:Collision){
if(Application.loadedLevelName != "EditMode"){
    if(collision.transform.tag == "Booster"){
            transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
            transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
            Instantiate(Resources.Load("BoostSound"),transform.position,transform.rotation);
            if(collision.transform.eulerAngles.y == 0){
                xChange = 0;
                zChange = speed;
            }
            if(collision.transform.eulerAngles.y == 90){
                zChange = 0;
                xChange = speed;
            }
            if(collision.transform.eulerAngles.y > 170 && collision.transform.eulerAngles.y < 190){
                xChange = 0;
                zChange = -speed;
            }
            if(collision.transform.eulerAngles.y == 270){
                zChange = 0;
                xChange = -speed;
            }
    }
    if(collision.transform.tag == "StickyPlate"){
        xChange = 0;
        zChange = 0;
        transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
        transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
        affectIce = false;
    }
    if(collision.transform.tag == "Spike"){
    	Instantiate(Resources.Load("IceBreakSound"),transform.position,transform.rotation);
        Destroy(gameObject);
    }
}
}