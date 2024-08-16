#pragma strict

import System;
import System.IO;
import System.Text;
import System.Security.Cryptography;
import System.Collections.Generic;
import System.Linq;
 
var  fileName = "";
var editorSelection:GameObject;
var levelObjectScript:EditorSelection;
var lastCreated:GameObject;
var levelString:String;
var levelList:List.<String>;
 
function OnLevelWasLoaded(){
    editorSelection = GameObject.Find("Main Camera");
    levelObjectScript = editorSelection.transform.GetComponent(EditorSelection);
    if(Controller.globalLevelName != "" && (Application.loadedLevelName == "EditMode" || Application.loadedLevelName == "PlayMode" || Application.loadedLevelName == "OnlinePlay" || Application.loadedLevelName == "PlayToUpload")){
        ReadFile();
    }
}
function WriteFile(){
    if (fileName == ""){
        return;
    }
    var sr = File.CreateText("LocalLevels/" + Controller.globalLevelName + ".brnbw");
    var descriptionAsString = Controller.globalLevelDescription.ToString().ToLower() + ";";
    var levelAsString = arrayToString(levelObjectScript.levelObjects);
    sr.WriteLine(Encrypt(descriptionAsString + levelAsString));
    sr.Close();
    Instantiate(UnityEngine.Resources.Load("Texts/LevelSaved"),Vector3(0,7,0),Quaternion.Euler(90,0,0));
}
function WriteStringFile(levelString:String){
    if (fileName == ""){
        return;
    }
    var sr = File.CreateText("OnlineLevels/" + Controller.globalLevelName + ".brnbw");
    sr.WriteLine(levelString);
    sr.Close();
}
function ReadFile(){
    if((File.Exists("LocalLevels/" + Controller.globalLevelName + ".brnbw") && (Application.loadedLevelName == "PlayMode" || Application.loadedLevelName == "EditMode" || Application.loadedLevelName == "PlayToUpload")) || (File.Exists("OnlineLevels/" + Controller.globalLevelName + ".brnbw") && Application.loadedLevelName == "OnlinePlay")){
    	var sr:System.IO.StreamReader;
    	if(Application.loadedLevelName == "PlayMode" || Application.loadedLevelName == "EditMode" || Application.loadedLevelName == "PlayToUpload"){
        	sr = File.OpenText("LocalLevels/" + Controller.globalLevelName + ".brnbw");
        }
    	if(Application.loadedLevelName == "OnlinePlay"){
        	sr = File.OpenText("OnlineLevels/" + Controller.globalLevelName + ".brnbw");
        }
        var textFileString:String;
        textFileString = Decrypt(sr.ReadLine());
        var semicolonSplit = textFileString.Split(";"[0]);
        var Type = "None";
        var X = 0;
        var Z = 0;
        var Rot = 0;
        var Speed = 0;
        var Color = 0;
        var Power = 0;
        var Recieve = 0;
        Controller.globalLevelDescription = semicolonSplit[0].ToLower();
        for(var i = 1;i<semicolonSplit.length-1;i++){
            var commaSplit = semicolonSplit[i].Split(","[0]);
            for(var i2 = 0;i2<commaSplit.length;i2++){
                var colonSplit = commaSplit[i2].Split(":"[0]);
                if(colonSplit[0] == "1"){
                    Type = colonSplit[1];
                }else if(colonSplit[0] == "2"){
                    int.TryParse(colonSplit[1],X);
                }else if(colonSplit[0] == "3"){
                    int.TryParse(colonSplit[1],Z);
                }else if(colonSplit[0] == "4"){
                    int.TryParse(colonSplit[1],Rot);
                }else if(colonSplit[0] == "5"){
                    int.TryParse(colonSplit[1],Speed);
                }else if(colonSplit[0] == "6"){
                    int.TryParse(colonSplit[1],Color);
                }else if(colonSplit[0] == "7"){
                    int.TryParse(colonSplit[1],Power);
                }else if(colonSplit[0] == "8"){
                    int.TryParse(colonSplit[1],Recieve);
                }else{
                    sr.Close();
                    Controller.globalLevelName = "";
                    Controller.globalLevelDescription = "";
                    Application.LoadLevel ("StartPage");
                }
            }
            CreateObject(Type,X,Z,Rot,Speed,Color,Power,Recieve);
        } 
        sr.Close();
    } else {
        return;
    }
}
function CreateObject(Type:String,X:int,Z:int,Rot:int,Speed:int,Color:int,Power:int,Recieve:int){
    if(Type == "1"){
        AddItem("1:" + "1" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        Instantiate(UnityEngine.Resources.Load("Player"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
    if(Type == "2"){
        AddItem("1:" + "2" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        Instantiate(UnityEngine.Resources.Load("Wall"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
    if(Type == "3"){
        AddItem("1:" + "3" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "4:" + Rot.ToString() + "," + "5:" + Speed.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Spikeball"),Vector3(X,0,Z),Quaternion.Euler(0,Rot,0));
        var movingScript:MovingSpikeball;
        movingScript = lastCreated.GetComponent(MovingSpikeball);
        movingScript.speed = Speed;
    }
    if(Type == "4"){
        AddItem("1:" + "4" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        Instantiate(UnityEngine.Resources.Load("Paintball"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
    if(Type == "5"){
        AddItem("1:" + "5" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "6:" + Color.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Key"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
        var keyScript:Key;
        keyScript = lastCreated.transform.GetChild(0).GetComponent(Key);
        keyScript.myColor = Color;
    }
    if(Type == "6"){
        AddItem("1:" + "6" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "6:" + Color.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Keyhole"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
        var keyholeScript:Keyhole;
        keyholeScript = lastCreated.transform.GetChild(0).GetComponent(Keyhole);
        keyholeScript.myColor = Color;
    }
    if(Type == "7"){
        AddItem("1:" + "7" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "6:" + Color.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Switch"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
        var switchScript:Switch;
        switchScript = lastCreated.transform.GetComponent(Switch);
        switchScript.myColor = Color;
        switchScript.power = true;
    }
    if(Type == "8"){
        AddItem("1:" + "8" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "6:" + Color.ToString() + "," + "8:" + Recieve.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("VanishBlock"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
        var vanishScript:VanishBlock;
        vanishScript = lastCreated.transform.GetComponent(VanishBlock);
        vanishScript.myColor = Color;
        vanishScript.powerNormal = (Recieve != 0);
    }
    if(Type == "14"){
        AddItem("1:" + "14" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "6:" + Color.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Portal"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
        var portalScript:Portal;
        portalScript = lastCreated.transform.GetComponent(Portal);
        portalScript.myColor = Color;
    }
    if(Type == "9"){
        AddItem("1:" + "9" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        Instantiate(UnityEngine.Resources.Load("StickyPlate"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
    if(Type == "10"){
        AddItem("1:" + "10" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        Instantiate(UnityEngine.Resources.Load("SlidePlate"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
    if(Type == "11"){
        AddItem("1:" + "11" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString() + "," + "4:" + Rot.ToString() + "," + "6:" + Color.ToString() + "," + "8:" + Recieve.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Booster"),Vector3(X,0,Z),Quaternion.Euler(0,Rot,0));
        var boosterScript:Booster;
        boosterScript = lastCreated.transform.GetComponent(Booster);
        boosterScript.myColor = Color;
        boosterScript.powerNormal = (Recieve != 0);
    }
    if(Type == "12"){
        AddItem("1:" + "12" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("Heart"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
    if(Type == "13"){
        AddItem("1:" + "13" + "," + "2:" + X.ToString() + "," + "3:" + Z.ToString());
        lastCreated = Instantiate(UnityEngine.Resources.Load("IceCube"),Vector3(X,0,Z),Quaternion.Euler(0,0,0));
    }
}
static function Encrypt(toEncrypt : String ){
var encoding = System.Text.UTF8Encoding();
var keyArray = encoding.GetBytes("31178281066204194021056824416839");
var toEncryptArray = UTF8Encoding.UTF8.GetBytes (toEncrypt);
 
var rDel = new RijndaelManaged ();
rDel.Key = keyArray;
rDel.Mode = CipherMode.ECB;
rDel.Padding = PaddingMode.PKCS7;
var cTransform = rDel.CreateEncryptor ();
var resultArray = cTransform.TransformFinalBlock (toEncryptArray, 0, toEncryptArray.Length);
return Convert.ToBase64String (resultArray, 0, resultArray.Length);
}
static function Decrypt(toDecrypt : String ){
var encoding = System.Text.UTF8Encoding();
var keyArray = encoding.GetBytes("31178281066204194021056824416839");
var toEncryptArray = Convert.FromBase64String (toDecrypt);
var rDel = new RijndaelManaged ();
rDel.Key = keyArray;
rDel.Mode = CipherMode.ECB;
rDel.Padding = PaddingMode.PKCS7;
var cTransform = rDel.CreateDecryptor ();
var resultArray = cTransform.TransformFinalBlock (toEncryptArray, 0, toEncryptArray.Length);
return UTF8Encoding.UTF8.GetString (resultArray);
}
function arrayToString(theArray:List.<String>){
    var arrayString:String;
    for(var i = 0;i < theArray.Count;i++){
        arrayString += theArray[i].ToString() + ";";
    }
    return arrayString;
}
function stringToArray(myString:String){
    var split = myString.Split(";"[0]);
    System.Array.Resize.<String>(split, split.length - 1);
    return split.ToList();
}
function AddItem(object : String) {
    levelObjectScript.levelObjects.Add(object);
}