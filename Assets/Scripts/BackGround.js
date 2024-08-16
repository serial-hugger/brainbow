#pragma strict

var speed:float;
var myRenderer:MeshRenderer;
var myMaterial:Material;
var sat = 1.0;

function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}
function Start () {
    myMaterial = myRenderer.material;
}

function Update () {
    if(Application.loadedLevelName == "EditMode"){
        sat = Mathf.Lerp(sat,0.0,2);
    }else{
        sat = Mathf.Lerp(sat,0.8,2);
    }
    myMaterial.color = Color.HSVToRGB((Controller.globalColor-(transform.position.y/400))%1,sat,.6);
    myMaterial.color.a = .5;
    var offset : float = Time.time * speed;
    myMaterial.SetTextureOffset("_MainTex", Vector2(myMaterial.mainTextureOffset.x,-offset));
}