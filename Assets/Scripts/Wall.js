#pragma strict

var noneConnected:Mesh;
var oneConnected:Mesh;
var twoConnectedElbow:Mesh;
var twoConnectedStraight:Mesh;
var threeConnected:Mesh;
var fourConnected:Mesh;
var fourConnected1:Mesh;
var fourConnected2Straight:Mesh;
var fourConnected2Diagnal:Mesh;
var fourConnected3:Mesh;
var fourConnected4:Mesh;
var filter:MeshFilter;
var hitColliders:Collider[];
var wallN:boolean;
var wallNE:boolean;
var wallE:boolean;
var wallSE:boolean;
var wallS:boolean;
var wallSW:boolean;
var wallW:boolean;
var wallNW:boolean;
var connected:int;
var diagnalsConnected:int;
var i:int;
var mask:LayerMask;
var positionSet = false;

function Update () {
    if(positionSet == false || Application.loadedLevelName == "EditMode"){
    wallN = false;
    wallNE = false;
    wallE = false;
    wallSE = false;
    wallS = false;
    wallSW = false;
    wallW = false;
    wallNW = false;
    connected = 0;
    diagnalsConnected = 0;
    if(Controller.gameMode == 2){
        //CheckNorth
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z+2),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallN = true;
                connected += 1;
            }
        }
        //CheckSouth
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z-2),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallS = true;
                connected += 1;
            }
        }
        //CheckWest
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-2,transform.position.y,transform.position.z),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallW = true;
                connected += 1;
            }
        }
        //CheckEast
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+2,transform.position.y,transform.position.z),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallE = true;
                connected += 1;
            }
        }
        //DIAGNALS
        //CheckNorthEast
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+2,transform.position.y,transform.position.z+2),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallNE = true;
                diagnalsConnected += 1;
            }
        }
        //CheckSouthEast
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+2,transform.position.y,transform.position.z-2),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallSE = true;
                diagnalsConnected += 1;
            }
        }
        //CheckNorthWest
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-2,transform.position.y,transform.position.z+2),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallNW = true;
                diagnalsConnected += 1;
            }
        }
        //CheckSouthWest
        hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-2,transform.position.y,transform.position.z-2),.5,mask);
        for(i = 0; i < hitColliders.Length; i++){
            if(hitColliders[i].tag == "Wall"){
                wallSW = true;
                diagnalsConnected += 1;
            }
        }
        if(connected == 0){
            filter.mesh = noneConnected;
        }
        //set mesh and rotation if connected to 1 other wall
        if(connected == 1){
            filter.mesh = oneConnected;
            if(wallN){
                transform.eulerAngles = Vector3(-90,0,0);
            }
            if(wallE){
                transform.eulerAngles = Vector3(-90,90,0);
            }
            if(wallS){
                transform.eulerAngles = Vector3(-90,180,0);
            }
            if(wallW){
                transform.eulerAngles = Vector3(-90,270,0);
            }
        }
        //set mesh and rotation if connected to 2 other walls
        if(connected == 2){
            if((wallS && wallN)||(wallW && wallE)){
                filter.mesh = twoConnectedStraight;
                if(wallS && wallN){
                    transform.eulerAngles = Vector3(-90,0,0);
                }
                if(wallW && wallE){
                    transform.eulerAngles = Vector3(-90,90,0);
                }
            }else{
                filter.mesh = twoConnectedElbow;
                if(wallN && wallE){
                    transform.eulerAngles = Vector3(-90,270,0);
                }
                if(wallE && wallS){
                    transform.eulerAngles = Vector3(-90,0,0);
                }
                if(wallS && wallW){
                    transform.eulerAngles = Vector3(-90,90,0);
                }
                if(wallW && wallN){
                    transform.eulerAngles = Vector3(-90,180,0);
                }
            }
        }
        if(connected == 3){
            filter.mesh = threeConnected;
            if(wallW && wallS && wallE){
                transform.eulerAngles = Vector3(-90,90,0);
            }
            if(wallN && wallW && wallS){
                transform.eulerAngles = Vector3(-90,180,0);
            }
            if(wallE && wallN && wallW){
                transform.eulerAngles = Vector3(-90,270,0);
            }
            if(wallN && wallE && wallS){
                transform.eulerAngles = Vector3(-90,0,0);
            }
        }
        if(connected == 4){
            filter.mesh = fourConnected;
            transform.eulerAngles = Vector3(-90,0,0);
        }
        //create screw
        if(wallN && wallNE && wallE){
            hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+1,transform.position.y,transform.position.z+1),.5);
            for(i = 0; i < hitColliders.Length; i++){
                if(hitColliders[i].tag == "Screw"){
                    return;
                }
            }
            Instantiate(Resources.Load("screw"),Vector3(transform.position.x+1,Random.Range(1.0,3.0),transform.position.z+1),transform.rotation);
        }
    }
    positionSet = true;
    }
}
function OnDestroy () {
	hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+1,1,transform.position.z+1),.5);
	for(i = 0; i < hitColliders.Length; i++){
		if(hitColliders[i].tag == "Screw"){
			Destroy(hitColliders[i].gameObject);
		}
	}
	hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-1,1,transform.position.z-1),.5);
	for(i = 0; i < hitColliders.Length; i++){
		if(hitColliders[i].tag == "Screw"){
			Destroy(hitColliders[i].gameObject);
		}
	}
	hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+1,1,transform.position.z-1),.5);
	for(i = 0; i < hitColliders.Length; i++){
		if(hitColliders[i].tag == "Screw"){
			Destroy(hitColliders[i].gameObject);
		}
	}
	hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-1,1,transform.position.z+1),.5);
	for(i = 0; i < hitColliders.Length; i++){
		if(hitColliders[i].tag == "Screw"){
			Destroy(hitColliders[i].gameObject);
		}
	}
}