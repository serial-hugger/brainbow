#pragma strict

import Npgsql;

var speed:float;
var xChange = 0.0;
var zChange = 0.0;
var hitColliders:Collider[];
var myLight:Light;
var color:float;
var myRenderer:MeshRenderer;
var myMaterial:Material;
var myCollider:BoxCollider;
var myParticleEmitter:ParticleSystem;
var myModel:Transform;
var collectedPaintballs = 0.0;
var teleportCooldown = 0.0;

//SQL
var sql:String;
var command:NpgsqlCommand;
var transaction:NpgsqlTransaction;

function Start(){
	myRenderer = transform.GetChild(1).GetComponent.<MeshRenderer>();
	myCollider = GetComponent.<BoxCollider>();
	myParticleEmitter = transform.GetChild(1).GetComponent.<ParticleSystem>();
}
function Update(){
	if(teleportCooldown>0.0){
		teleportCooldown -= 2 * Time.deltaTime;
	}
    if(Application.loadedLevelName == "PlayMode" || Application.loadedLevelName == "OnlinePlay" || Application.loadedLevelName == "PlayToUpload"){
		if(Input.GetKeyDown("up") && zChange == 0 && xChange == 0){
	        zChange = speed;
	    }
	    if(Input.GetKeyDown("down") && zChange == 0 && xChange == 0){
	        zChange = -speed;
	    }
	    if(Input.GetKeyDown("left") && zChange == 0 && xChange == 0){
	        xChange = -speed;
	    }
	    if(Input.GetKeyDown("right") && zChange == 0 && xChange == 0){
	        xChange = speed;
	    }
		if(Input.GetKeyDown("f") && Controller.devMode == true){
	        transform.position = GameObject.FindGameObjectsWithTag("Exit")[0].transform.position;
	    }
    }
    if(Controller.playerMoved == false && (Input.GetKeyDown("up") || Input.GetKeyDown("down") || Input.GetKeyDown("left") || Input.GetKeyDown("right"))){
    	Controller.playerMoved = true;
    }
}
function FixedUpdate () {
    var scale:float;
    if(Controller.paintballAmount>0){
        scale = 0.5 + ((collectedPaintballs/Controller.paintballAmount)/2);
    }else{
        scale = 0.5;
    }
    myModel.localScale = Vector3(scale,scale,scale);
    myMaterial.color = Color.HSVToRGB((Controller.globalColor+(transform.position.x/20)+(transform.position.z/20))%1,1,1);
    myParticleEmitter.startColor = Color.HSVToRGB((color+(transform.position.x/20)+(transform.position.z/20))%1,1,1);
    myLight.color = myMaterial.color;
    transform.position.x += xChange * .02 * Controller.gameSpeed;
	transform.position.z += zChange * .02 * Controller.gameSpeed;
	var iceCubeScript:IceCube;
	if(xChange > 0){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x+1,transform.position.y,transform.position.z),.5);
		for(var i1 = 0; i1 < hitColliders.Length; i1++){
			if(hitColliders[i1].tag == "IceCube"){
    			iceCubeScript = hitColliders[i1].gameObject.GetComponent(IceCube);
    			iceCubeScript.xChange = speed;
			}
		    if(hitColliders[i1].tag == "Wall" || hitColliders[i1].tag == "Keyhole" || hitColliders[i1].tag == "ToggleCube" || hitColliders[i1].tag == "IceCube"){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
		}
	}
	if(xChange < 0){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x-1,transform.position.y,transform.position.z),.5);
		for(var i2 = 0; i2 < hitColliders.Length; i2++){
			if(hitColliders[i2].tag == "IceCube"){
    			iceCubeScript = hitColliders[i2].gameObject.GetComponent(IceCube);
    			iceCubeScript.xChange = -speed;
			}
		    if(hitColliders[i2].tag == "Wall" || hitColliders[i2].tag == "Keyhole" || hitColliders[i2].tag == "ToggleCube" || hitColliders[i2].tag == "IceCube"){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
		}
	}
	if(zChange > 0){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z+1),.5);
		for(var i3 = 0; i3 < hitColliders.Length; i3++){
			if(hitColliders[i3].tag == "IceCube"){
    			iceCubeScript = hitColliders[i3].gameObject.GetComponent(IceCube);
    			iceCubeScript.zChange = speed;
			}
		    if(hitColliders[i3].tag == "Wall" || hitColliders[i3].tag == "Keyhole" || hitColliders[i3].tag == "ToggleCube" || hitColliders[i3].tag == "IceCube"){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
		}
	}
	if(zChange < 0){
		hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z-1),.5);
		for(var i4 = 0; i4 < hitColliders.Length; i4++){
			if(hitColliders[i4].tag == "IceCube"){
    			iceCubeScript = hitColliders[i4].gameObject.GetComponent(IceCube);
    			iceCubeScript.zChange = -speed;
			}
		    if(hitColliders[i4].tag == "Wall" || hitColliders[i4].tag == "Keyhole" || hitColliders[i4].tag == "ToggleCube" || hitColliders[i4].tag == "IceCube"){
				xChange = 0;
				zChange = 0;
				transform.position.x = (Mathf.Round(transform.position.x/2))*2;
				transform.position.z = (Mathf.Round(transform.position.z/2))*2;
			}
		}
	}
	if(myCollider.enabled == true){
	    hitColliders = Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,transform.position.z),.2);
	    for(var i5 = 0; i5 < hitColliders.Length; i5++){
	        if(hitColliders[i5].tag == "Wall" || hitColliders[i5].tag == "Keyhole" || (hitColliders[i5].tag == "ToggleCube" && xChange == 0 && zChange == 0) || hitColliders[i5].tag == "Spike"){
	        	Controller.playerDead = true;
	            myCollider.enabled = false;
	            myRenderer.enabled = false;
	            myParticleEmitter.Stop();
	            myLight.enabled = false;
	            xChange = 0;
	            zChange = 0;
	            transform.position.x = (Mathf.Round(transform.position.x/2))*2;
	            transform.position.z = (Mathf.Round(transform.position.z/2))*2;
	            Debug.Log("Hit spike!");
	            Instantiate(Resources.Load("DeathExplode"),transform.position,Quaternion.Euler(270, 0, 0));
	        }
	    }
	}
}
function OnCollisionEnter(collision:Collision){
if(Application.loadedLevelName != "EditMode"){
    if(collision.transform.tag == "Booster"){
    		Instantiate(Resources.Load("BoostSound"),transform.position,transform.rotation);
            transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
            transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
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
    if(collision.transform.tag == "Paintball"){
        collectedPaintballs += 1;
        Instantiate(Resources.Load("PopSound"),transform.position,transform.rotation);
        Destroy(collision.gameObject);
    }
    if(collision.transform.tag == "StickyPlate"){
        xChange = 0;
        zChange = 0;
        transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
        transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
    }

    if(collision.transform.tag == "SlidePlate"){
        if(Input.GetKey("up") && !(zChange > 0)){
            transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
            transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
            xChange = 0;
            zChange = speed;
        }
        if(Input.GetKey("down") && !(zChange < 0)){
            transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
            transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
            xChange = 0;
            zChange = -speed;
        }
        if(Input.GetKey("left") && !(xChange < 0)){
            transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
            transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
            zChange = 0;
            xChange = -speed;
        }
        if(Input.GetKey("right") && !(xChange > 0)){
            transform.position.x = (Mathf.Round(collision.transform.position.x/2))*2;
            transform.position.z = (Mathf.Round(collision.transform.position.z/2))*2;
            zChange = 0;
            xChange = speed;
        }
    }
    if(collision.transform.tag == "Exit"){
		myCollider.enabled = false;
	    myRenderer.enabled = false;
	    myParticleEmitter.Stop();
	    myLight.enabled = false;
	    xChange = 0;
	    zChange = 0;
	    transform.position.x = (Mathf.Round(transform.position.x/2))*2;
	    transform.position.z = (Mathf.Round(transform.position.z/2))*2;
	    if(Application.loadedLevelName == "PlayToUpload"){
	    	if(File.Exists("LocalLevels/" + Controller.globalLevelName + ".brnbw")){
	        	var sr = File.OpenText("LocalLevels/" + Controller.globalLevelName + ".brnbw");
	        	var line = sr.ReadLine();
	        	sr.Close();
	        	var conn:NpgsqlConnection = new NpgsqlConnection(Controller.ip+Controller.port+Controller.userId+Controller.password+Controller.database);
		    	conn.Open();
		    	command = conn.CreateCommand();
		    	transaction = conn.BeginTransaction();
		    	command.Connection = conn;
		    	command.Transaction = transaction;
		    	command.CommandText = ("INSERT INTO levels (level_id, user_id, level, level_name) VALUES (nextval('level_id_seq'),"+Controller.globalID+"," + "'" + line + "'," + "'" + Controller.globalLevelName +"')");
		    	command.ExecuteNonQuery();
		    	transaction.Commit();
            }
            Application.LoadLevel ("EditMode");
            Instantiate(UnityEngine.Resources.Load("Texts/LevelUploaded"),Vector3(0,7,0),Quaternion.Euler(90,0,0));
	    }
    }
  }
}