#pragma strict
import System.Collections.Generic;

var selection:Transform;
var selectionRenderer:MeshRenderer;
var hitColliders:Collider[];
var levelObjects:List.<String>;
var i:int;
public static var items = new Array ("Player","Finish","Wall","Spikeball","Paintball","Key","Keyhole","Switch","Vanish Cube","Sticky Plate", "Slide Plate","Booster","Ice Cube","Portal");
var itemOrder = new Array(0,1,4,2,3,9,10,12,5,6,13,7,8,11);
public static var amountOfEachItem = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
public static var item = 0;
var lastCreated:GameObject;

function Start(){
	selectionRenderer = selection.GetComponent.<MeshRenderer>();
}
function Update() {
	var hit: RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Vector3(Input.mousePosition.x,Input.mousePosition.y,0));
	Debug.DrawRay(ray.origin,ray.direction * 100,Color.red);
	if (Physics.Raycast(ray, hit)) {
	    if (hit.collider){
	        if(hit.collider.tag != "Button" && hit.collider.tag != "InputField" && hit.collider.tag != "Deactivate"){
	            selection.transform.position.x = (Mathf.Round(hit.point.x/2))*2;
	            selection.transform.position.z = (Mathf.Round(hit.point.z/2))*2;
	            if(Application.loadedLevelName == "EditMode"){
	                selectionRenderer.enabled = true;
	            }
	        }
	        if(hit.collider.tag == "Button" && ((Input.GetMouseButtonDown(0) && Controller.controlMode == 0) || (Input.GetButtonDown("Fire1") && Controller.controlMode == 1))){
	            var buttonScript = hit.collider.GetComponent(Button);
	            if(buttonScript != null){
	            	buttonScript.doAction = 1;
	            }
	            var accountButtonScript = hit.collider.GetComponent(AccountButton);
	            if(accountButtonScript != null){
	            	accountButtonScript.doAction = 1;
	            }
	            var onlineButtonScript = hit.collider.GetComponent(OnlineLevelButton);
	            if(onlineButtonScript != null){
	            	onlineButtonScript.doAction = 1;
	            }
	            var localButtonScript = hit.collider.GetComponent(LocalLevelButton);
	            if(localButtonScript != null){
	            	localButtonScript.doAction = 1;
	            }
	        }
	        if(hit.collider.tag == "InputField" && ((Input.GetMouseButtonUp(0) && Controller.controlMode == 0))){
	            var inputScript = hit.collider.GetComponent(InputField);
	            if(inputScript != null){
	            	inputScript.active = true;
	            }
	            var accountInputScript = hit.collider.GetComponent(InputFieldAccount);
	            if(accountInputScript != null){
	            	accountInputScript.active = true;
	            }
	        }
	        if(hit.collider.tag == "Deactivate" && ((Input.GetMouseButtonUp(0) && Controller.controlMode == 0))){
	        	Controller.clipboardActive = false;
	        	Controller.itemSelecterActive = false;
	        }
	    }
	}else{
	    if(selectionRenderer != null){
		    selectionRenderer.enabled = false;
	    }
	}
	if(Input.GetAxis("Mouse ScrollWheel") > 0f ){
		if(item < items.length-1){
			item+=1;
		}
	}
	if(Input.GetAxis("Mouse ScrollWheel") < 0f ){
		if(item > 0){
			item-=1;
		}
	}
}
function LateUpdate(){
	//CREATE OBJECT
	if(((Input.GetMouseButton(0) && Controller.controlMode == 0) || (Input.GetButton("Fire1") && Controller.controlMode == 1)) && selectionRenderer.enabled == true && Application.loadedLevelName == "EditMode"){
	    hitColliders = Physics.OverlapSphere(Vector3(selection.transform.position.x,selection.transform.position.y,selection.transform.position.z),.5);
	    if(items[itemOrder[item]]=="Player" && GameObject.FindGameObjectsWithTag("Player").length < 1){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "1" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	        Instantiate(Resources.Load("Player"),selection.transform.position,selection.transform.rotation);
	    }
	    if(items[itemOrder[item]]=="Wall" && GameObject.FindGameObjectsWithTag("Wall").length < 301){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "2" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	        Instantiate(Resources.Load("Wall"),selection.transform.position,selection.transform.rotation);
	    }
	    if(items[itemOrder[item]]=="Spikeball" && GameObject.FindGameObjectsWithTag("Spike").length < 200){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "3" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "4:" + ItemHolder.createRotation.ToString() + "," + "5:" + ItemHolder.createSpeed.ToString());
	        lastCreated = Instantiate(Resources.Load("Spikeball"),selection.transform.position,Quaternion.EulerAngles(0,0,0));
	        lastCreated.transform.rotation.eulerAngles.y = ItemHolder.createRotation;
	        var movingScript:MovingSpikeball;
	        movingScript = lastCreated.GetComponent(MovingSpikeball);
	        movingScript.speed = ItemHolder.createSpeed;
	    }
	    if(items[itemOrder[item]]=="Paintball"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "4" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	        Instantiate(Resources.Load("Paintball"),selection.transform.position,selection.transform.rotation);
	    }
	    if(items[itemOrder[item]]=="Key"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "5" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "6:" + ItemHolder.createColor.ToString());
	        lastCreated = Instantiate(Resources.Load("Key"),selection.transform.position,selection.transform.rotation);
	        var keyScript:Key;
	        keyScript = lastCreated.transform.GetChild(0).GetComponent(Key);
	        keyScript.myColor = ItemHolder.createColor;
	    }
	    if(items[itemOrder[item]]=="Keyhole"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "6" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "6:" + ItemHolder.createColor.ToString());
	        lastCreated = Instantiate(Resources.Load("Keyhole"),selection.transform.position,selection.transform.rotation);
	        var keyholeScript:Keyhole;
	        keyholeScript = lastCreated.transform.GetChild(0).GetComponent(Keyhole);
	        keyholeScript.myColor = ItemHolder.createColor;
	    }
	    if(items[itemOrder[item]]=="Switch"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "7" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "6:" + ItemHolder.createColor.ToString());
	        lastCreated = Instantiate(Resources.Load("Switch"),selection.transform.position,selection.transform.rotation);
	        var switchScript:Switch;
	        switchScript = lastCreated.transform.GetComponent(Switch);
	        switchScript.myColor = ItemHolder.createColor;
	        switchScript.power = true;
	    }
	    if(items[itemOrder[item]]=="Vanish Cube"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "8" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "6:" + ItemHolder.createColor.ToString() + "," + "8:" + ItemHolder.createSignal.ToString());
	        lastCreated = Instantiate(Resources.Load("VanishBlock"),selection.transform.position,selection.transform.rotation);
	        var vanishScript:VanishBlock;
	        vanishScript = lastCreated.transform.GetComponent(VanishBlock);
	        vanishScript.myColor = ItemHolder.createColor;
	        vanishScript.powerNormal = (ItemHolder.createSignal != 0);
	    }
	    if(items[itemOrder[item]]=="Portal"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "14" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "6:" + ItemHolder.createColor.ToString());
	        lastCreated = Instantiate(Resources.Load("Portal"),selection.transform.position,selection.transform.rotation);
	        var portalScript:Portal;
	        portalScript = lastCreated.transform.GetComponent(Portal);
	        portalScript.myColor = ItemHolder.createColor;
	    }
	    if(items[itemOrder[item]]=="Sticky Plate"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        Instantiate(Resources.Load("StickyPlate"),selection.transform.position,selection.transform.rotation);
	        AddItem("1:" + "9" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	    }
	    if(items[itemOrder[item]]=="Slide Plate"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        Instantiate(Resources.Load("SlidePlate"),selection.transform.position,selection.transform.rotation);
	        AddItem("1:" + "10" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	    }
	    if(items[itemOrder[item]]=="Booster"){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "11" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString() + "," + "4:" + ItemHolder.createRotation.ToString() + "," + "6:" + ItemHolder.createColor.ToString() + "," + "8:" + ItemHolder.createSignal.ToString());
	        lastCreated = Instantiate(Resources.Load("Booster"),selection.transform.position,selection.transform.rotation);
	        lastCreated.transform.rotation.eulerAngles.y = ItemHolder.createRotation;
	        var boosterScript:Booster;
	        boosterScript = lastCreated.transform.GetComponent(Booster);
	        boosterScript.myColor = ItemHolder.createColor;
	        boosterScript.powerNormal = (ItemHolder.createSignal != 0);
	    }
	    if(items[itemOrder[item]]=="Finish" && GameObject.FindGameObjectsWithTag("Exit").length < 1){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i]) || LowerBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "12" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	        lastCreated = Instantiate(Resources.Load("Heart"),selection.transform.position,selection.transform.rotation);
	    }
	    if(items[itemOrder[item]]=="Ice Cube"  && GameObject.FindGameObjectsWithTag("IceCube").length < 50){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(FullBlockItems(hitColliders[i]) || UpperBlockItems(hitColliders[i])){
	                return;
	            }
	        }
	        AddItem("1:" + "13" + "," + "2:" + selection.transform.position.x.ToString() + "," + "3:" + selection.transform.position.z.ToString());
	        lastCreated = Instantiate(Resources.Load("IceCube"),selection.transform.position,selection.transform.rotation);
	    }
	}
	//DESTROY OBJECT
	if(((Input.GetMouseButton(1) && Controller.controlMode == 0) || (Input.GetButton("Fire2") && Controller.controlMode == 1)) && selectionRenderer.enabled == true  && Application.loadedLevelName == "EditMode"){
	    hitColliders = Physics.OverlapSphere(Vector3(selection.transform.position.x,selection.transform.position.y,selection.transform.position.z),.5);
	    if(items[itemOrder[item]]=="Player" || Input.GetKey("left shift")){
	        for(i = 0; i < hitColliders.Length; i++){
	            if(hitColliders[i].tag == "Player"){
	                levelObjects.RemoveAt(ReturnIndex("1:" + "1","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
	                Destroy(hitColliders[i].gameObject);
	            }
	        }
	    }
		if(items[itemOrder[item]]=="Wall" || Input.GetKey("left shift")){
			for(i = 0; i < hitColliders.Length; i++){
				if(hitColliders[i].tag == "Wall"){
					levelObjects.RemoveAt(ReturnIndex("1:" + "2","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
					Destroy(hitColliders[i].gameObject);
				}
			}
		}
		if(items[itemOrder[item]]=="Spikeball" || Input.GetKey("left shift")){
			for(i = 0; i < hitColliders.Length; i++){
				if(hitColliders[i].tag == "Spike"){
					levelObjects.RemoveAt(ReturnIndex("1:" + "3","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
					Destroy(hitColliders[i].gameObject);
				}
			}
		}
		if(items[itemOrder[item]]=="Paintball" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Paintball"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "4","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Key" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Key"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "5","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Keyhole" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Keyhole"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "6","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Switch" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Switch"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "7","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Vanish Cube" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "ToggleCube" || hitColliders[i].tag == "ToggleCubeOff"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "8","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Sticky Plate" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "StickyPlate"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "9","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Slide Plate" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "SlidePlate"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "10","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Booster" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Booster"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "11","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Finish" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Exit"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "12","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Ice Cube" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "IceCube"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "13","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
		if(items[itemOrder[item]]=="Portal" || Input.GetKey("left shift")){
		    for(i = 0; i < hitColliders.Length; i++){
		        if(hitColliders[i].tag == "Portal"){
		            levelObjects.RemoveAt(ReturnIndex("1:" + "14","2:" + hitColliders[i].transform.position.x.ToString(),"3:" + hitColliders[i].transform.position.z.ToString()));
		            Destroy(hitColliders[i].gameObject);
		        }
		    }
		}
	}
}
 function AddItem(object : String) {
     levelObjects.Add(object);
 }
 function ReturnIndex(type : String, x : String, z : String){
 	for(var i3 = 0; i3 < levelObjects.Count; i3++){
  		if(levelObjects[i3].Split(","[0])[0] == type && levelObjects[i3].Split(","[0])[1] == x && levelObjects[i3].Split(","[0])[2] == z){
    		return i3;
  		}
	}
	Debug.Log("Didn't find it");
 }
function FullBlockItems(thisItem:Collider){
	if(thisItem.tag == "Wall" || thisItem.tag == "Key" || thisItem.tag == "Keyhole" || thisItem.tag == "ToggleCube" || thisItem.tag == "ToggleCubeOff" || thisItem.tag == "Exit" || thisItem.tag == "Portal"){
		return true;
	}else{
		return false;
	}
}
function LowerBlockItems(thisItem:Collider){
	if(thisItem.tag == "Switch" || thisItem.tag == "StickyPlate" || thisItem.tag == "SlidePlate" || thisItem.tag == "Booster"){
		return true;
	}else{
		return false;
	}
}
function UpperBlockItems(thisItem:Collider){
	if(thisItem.tag == "Player" || thisItem.tag == "Spike" || thisItem.tag == "Paintball" || thisItem.tag == "IceCube"){
		return true;
	}else{
		return false;
	}
}