#pragma strict

var selection:Transform;
var selectionRenderer:MeshRenderer;
var startPosition:Vector3;
var myButtons:GameObject;
var myRenderer:Renderer;

function Start () {
    selectionRenderer = selection.GetComponent(MeshRenderer);
    startPosition = transform.position;
}
function Update () {
	if(Screen.width*1.0/Screen.height*1.0 > 1.7){
		myButtons.SetActive(true);
		myRenderer.enabled = true;
	}
	if(Screen.width*1.0/Screen.height*1.0 <= 1.7){
		if(Controller.clipboardActive == true){
			transform.position.x = Mathf.Lerp(transform.position.x,0,10*Time.deltaTime);
			transform.position.y = Mathf.Lerp(transform.position.y,3,10*Time.deltaTime);
			transform.position.z = Mathf.Lerp(transform.position.z,0,10*Time.deltaTime);
			myButtons.SetActive(true);
			myRenderer.enabled = true;
		}
		if(Controller.clipboardActive == false){
			transform.position.x = Mathf.Lerp(transform.position.x,startPosition.x,10*Time.deltaTime);
			transform.position.y = Mathf.Lerp(transform.position.y,startPosition.y,10*Time.deltaTime);
			transform.position.z = Mathf.Lerp(transform.position.z,startPosition.z,10*Time.deltaTime);
			myButtons.SetActive(false);
			myRenderer.enabled = false;
		}
	}
    if(selectionRenderer.enabled == false && Screen.width*1.0/Screen.height*1.0 > 1.7 && Controller.globalPerspective == 0){
        transform.rotation.eulerAngles.z = Mathf.Lerp(transform.rotation.eulerAngles.z, 30, 10*Time.deltaTime);
    }else{
        transform.rotation.eulerAngles.z = Mathf.Lerp(transform.rotation.eulerAngles.z, 0, 10*Time.deltaTime);
    }
}