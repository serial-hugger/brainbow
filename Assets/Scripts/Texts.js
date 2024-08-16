#pragma strict

var time = 5.0;

function Start(){
	DontDestroyOnLoad (transform.gameObject);
	if(GameObject.FindGameObjectsWithTag("Text")){
		for(var i = 0;i<GameObject.FindGameObjectsWithTag("Text").Length;i++){
			if(GameObject.FindGameObjectsWithTag("Text")[i].gameObject != transform.gameObject){
				Destroy(GameObject.FindGameObjectsWithTag("Text")[i]);
			}
		}
	}
}
function Update() {
    time -= 1.0 * Time.deltaTime;
    if(time < 0){
        Destroy(gameObject);
    }
}