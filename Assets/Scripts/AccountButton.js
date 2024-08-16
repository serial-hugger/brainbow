#pragma strict

var doAction:int;
var optionLogin:boolean;
var usernameText:TextMesh;
var passwordText:TextMesh;
var loginTried:boolean;

function Update () {
	if (doAction > 0) {
		if (optionLogin == true) {
			doAction = 0;
			var user = new GameJolt.API.Objects.User(usernameText.text, passwordText.text);
			user.SignIn(success():boolean);
			loginTried = false;
		}
	}
}
