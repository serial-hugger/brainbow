#pragma strict

var selection:Transform;
var selectionRenderer:MeshRenderer;
var itemPreview:Transform;
var itemPreviewRenderer:Renderer;
var itemPreviewMeshFilter:MeshFilter;
var itemPreviewMaterial:Material;
public static var createRotation = 0;
public static var createSpeed = 0.0;
public static var createColor = 0;
public static var createPower = 0;
public static var createSignal = 0;
//ITEM INFO
//LITERAL Start 0,Finish 1,Wall 2,Spikeball 3,Paintball 4,Key 5,Keyhole 6,Switch 7,ToggleCube 8,StickyPlate 9,SlidePlate 10,Booster 11,IceCube 12,Portal 13
//FIGURATIVE Start,Finish,Paintball,Wall,Spikeball,StickyPlate,SlidePlate,IceCube,Key,Keyhole,Portal,Switch,ToggleCube,Booster
//0,1,4,2,3,9,10,12,5,6,13,7,8,11
var itemSizes = new Array (1.5,1,1.5,1,2,-2,1.5,2,1.5,1.5,1.5,2,1.5,.4);
var itemTexts = new Array("Start","Finish","Wall","Spikeball","Paintball","Key","Keyhole","Switch","Toggle Cube","Sticky Plate","Slide Plate","Booster","Ice Cube","Portal");
var itemOrder = new Array(0,1,4,2,3,9,10,12,5,6,13,7,8,11);
var itemText:TextMesh;
var powerStateTexts = new Array("On","Off");
var powerRecieveTexts = new Array("Normal","Invert");
var directionTexts = new Array("Up","Right","Down","Left");
var colorTexts = new Array("Blue","Red","Yellow","Green","Orange","Purple");
//ITEM OPTIONS
var itemOption1Text:TextMesh;
var itemOption2Text:TextMesh;
var itemOption3Text:TextMesh;
var itemOption4Text:TextMesh;
var itemOption1 = new Array ("None","None","None","Facing","None","Color","Color","Color","Color","None","None","Facing","None","Color");
var itemOption2 = new Array ("None","None","None","Speed" ,"None","None" ,"None" ,"None","Signal","None","None","Color","None","None");
var itemOption3 = new Array ("None","None","None","None"  ,"None","None" ,"None" ,"None","None","None","None","Signal","None","None");
var itemOption4 = new Array ("None","None","None","None"  ,"None","None" ,"None" ,"None","None","None","None","None","None","None");
//MATERIALS
var playerMaterial:Material;
var wallMaterial:Material;
var spikeballMaterial:Material;
var paintballMaterial:Material;
var keyMaterial:Material;
var keyholeMaterial:Material;
var buttonMaterial:Material;
//BUTTON MATERIAL VARIENTS
var buttonMaterial0:Material;
var buttonMaterial1:Material;
var buttonMaterial2:Material;
var buttonMaterial3:Material;
var buttonMaterial4:Material;
var buttonMaterial5:Material;
var vanishblockMaterial:Material;
var stickyPlateMaterial:Material;
var slidePlateMaterial:Material;
var boosterMaterial:Material;
var heartMaterial:Material;
var iceMaterial:Material;
var portalMaterial:Material;
var itemMaterials = new Array ();
//MESHS
var playerMesh:Mesh;
var wallMesh:Mesh;
var spikeballMesh:Mesh;
var paintballMesh:Mesh;
var keyMesh:Mesh;
var keyholeMesh:Mesh;
var buttonMesh:Mesh;
var vanishblockMesh:Mesh;
var stickyPlateMesh:Mesh;
var slidePlateMesh:Mesh;
var boosterMesh:Mesh;
var heartMesh:Mesh;
var iceMesh:Mesh;
var portalMesh:Mesh;
var itemMeshs= new Array ();
//UI
var startPosition:Vector3;
var myButtons:GameObject;

function Start () {
    itemMaterials = [playerMaterial,heartMaterial,wallMaterial,spikeballMaterial,paintballMaterial,keyMaterial,keyholeMaterial,buttonMaterial,vanishblockMaterial,stickyPlateMaterial,slidePlateMaterial,boosterMaterial,iceMaterial,portalMaterial];
    itemMeshs = [playerMesh,heartMesh,wallMesh,spikeballMesh,paintballMesh,keyMesh,keyholeMesh,buttonMesh,vanishblockMesh,stickyPlateMesh,slidePlateMesh,boosterMesh,iceMesh,portalMesh];
    selectionRenderer = selection.GetComponent(MeshRenderer);
    itemPreviewRenderer = itemPreview.GetComponent(Renderer);
    itemPreviewMeshFilter = itemPreview.GetComponent(MeshFilter);
    startPosition = transform.position;
}
function Update () {
    itemPreview.transform.localScale = Vector3(itemSizes[itemOrder[EditorSelection.item]],itemSizes[itemOrder[EditorSelection.item]],itemSizes[itemOrder[EditorSelection.item]]);
    itemPreviewRenderer.material = itemMaterials[itemOrder[EditorSelection.item]];
    itemPreviewMeshFilter.mesh = itemMeshs[itemOrder[EditorSelection.item]];
    itemText.text = itemTexts[itemOrder[EditorSelection.item]];
    if(itemOrder[EditorSelection.item] == 0 || itemOrder[EditorSelection.item] == 1 || itemOrder[EditorSelection.item] == 4){
    	itemPreviewRenderer.material.color = Color.HSVToRGB((Controller.globalColor)%1,1,1);
    }
	if(itemOrder[EditorSelection.item] == 5 || itemOrder[EditorSelection.item] == 6 || itemOrder[EditorSelection.item] == 8 || itemOrder[EditorSelection.item] == 11 || itemOrder[EditorSelection.item] == 13){
	    if(createColor == 0){
        	itemPreviewRenderer.material.color = Color(0, 0, 1, 1);
	    }
	    if(createColor == 1){
	        itemPreviewRenderer.material.color = Color(1, 0, 0, 1);
	    }
	    if(createColor == 2){
	        itemPreviewRenderer.material.color = Color(1, 1, 0, 1);
	    }
	    if(createColor == 3){
	        itemPreviewRenderer.material.color = Color(0, 1,0, 1);
	    }
	    if(createColor == 4){
	        itemPreviewRenderer.material.color = Color(1, .5, 0, 1);
	    }
	    if(createColor == 5){
	        itemPreviewRenderer.material.color = Color(.5, 0, 1, 1);
	    }
	}
	//SET BUTTON COLOR
	if(itemOrder[EditorSelection.item] == 7){
	    if(createColor == 0){
        	itemPreviewRenderer.material = buttonMaterial0;
	    }
	    if(createColor == 1){
	        itemPreviewRenderer.material = buttonMaterial1;
	    }
	    if(createColor == 2){
	        itemPreviewRenderer.material = buttonMaterial2;
	    }
	    if(createColor == 3){
	        itemPreviewRenderer.material = buttonMaterial3;
	    }
	    if(createColor == 4){
	        itemPreviewRenderer.material = buttonMaterial4;
	    }
	    if(createColor == 5){
	        itemPreviewRenderer.material = buttonMaterial5;
	    }
	}
	//UI
	if(Screen.width*1.0/Screen.height*1.0 > 1.7){
		myButtons.SetActive(true);
	}
	if(Screen.width*1.0/Screen.height*1.0 <= 1.7){
		if(Controller.itemSelecterActive == true){
			transform.position.x = Mathf.Lerp(transform.position.x,0,10*Time.deltaTime);
			transform.position.y = Mathf.Lerp(transform.position.y,3,10*Time.deltaTime);
			transform.position.z = Mathf.Lerp(transform.position.z,0,10*Time.deltaTime);
			myButtons.SetActive(true);
		}
		if(Controller.itemSelecterActive == false){
			transform.position.x = Mathf.Lerp(transform.position.x,startPosition.x,10*Time.deltaTime);
			transform.position.y = Mathf.Lerp(transform.position.y,startPosition.y,10*Time.deltaTime);
			transform.position.z = Mathf.Lerp(transform.position.z,startPosition.z,10*Time.deltaTime);
			myButtons.SetActive(false);
		}
	}
    if(createRotation >= 360){
        createRotation = 0;
    }
    if(createRotation < 0){
        createRotation = 270;
    }
    if(createSpeed > 10){
        createSpeed = 0;
    }
    if(createSpeed < 0){
        createSpeed = 10;
    }
    if(createColor > 5){
        createColor = 0;
    }
    if(createColor < 0){
        createColor = 5;
    }
    if(createPower > 1){
        createPower = 0;
    }
    if(createPower < 0){
        createPower = 1;
    }
    if(createSignal > 1){
        createSignal = 0;
    }
    if(createSignal < 0){
        createSignal = 1;
    }
    //ITEM OPTIONS 1
    if(itemOption1[itemOrder[EditorSelection.item]] == "None"){
        itemOption1Text.text = "---";
    }
    if(itemOption1[itemOrder[EditorSelection.item]] == "Facing"){
        itemOption1Text.text = "Facing:" + directionTexts[createRotation/90];
    }
    if(itemOption1[itemOrder[EditorSelection.item]] == "Color"){
        itemOption1Text.text = "Color:" + colorTexts[createColor];
    }
    //ITEM OPTIONS 2
    if(itemOption2[itemOrder[EditorSelection.item]] == "None"){
        itemOption2Text.text = "---";
    }
    if(itemOption2[itemOrder[EditorSelection.item]] == "Speed"){
        itemOption2Text.text = "Speed:" + createSpeed.ToString();
    }
    if(itemOption2[itemOrder[EditorSelection.item]] == "Color"){
        itemOption2Text.text = "Color:" + colorTexts[createColor];
    }
    if(itemOption2[itemOrder[EditorSelection.item]] == "Power"){
        itemOption2Text.text = "Power:" + powerStateTexts[createPower];
    }
    if(itemOption2[itemOrder[EditorSelection.item]] == "Signal"){
        itemOption2Text.text = "Signal:" + powerRecieveTexts[createSignal];
    }
    //ITEM OPTIONS 3
    if(itemOption3[itemOrder[EditorSelection.item]] == "None"){
        itemOption3Text.text = "---";
    }
    if(itemOption3[itemOrder[EditorSelection.item]] == "Speed"){
        itemOption3Text.text = "Speed";
    }
    if(itemOption3[itemOrder[EditorSelection.item]] == "Signal"){
        itemOption3Text.text = "Signal:" + powerRecieveTexts[createSignal];
    }
    //ITEM OPTIONS 4
    if(itemOption4[itemOrder[EditorSelection.item]] == "None"){
        itemOption4Text.text = "---";
    }
    if(itemOption4[itemOrder[EditorSelection.item]] == "Speed"){
        itemOption4Text.text = "Speed";
    }
    if(selectionRenderer.enabled == false && Screen.width*1.0/Screen.height*1.0 > 1.7 && Controller.globalPerspective == 0){
        transform.rotation.eulerAngles.z = Mathf.Lerp(transform.rotation.eulerAngles.z, 30, 10*Time.deltaTime);
    }else{
        transform.rotation.eulerAngles.z = Mathf.Lerp(transform.rotation.eulerAngles.z, 0, 10*Time.deltaTime);
    }
}