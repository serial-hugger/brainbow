using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AccountButtonCS : MonoBehaviour {
	int doAction;
	bool optionLogin;
	TextMesh usernameText;
	TextMesh passwordText;
	bool loginTried;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		if (doAction > 0) {
			if (optionLogin == true) {
				doAction = 0;
				var user = new GameJolt.API.Objects.User(usernameText.text, passwordText.text);
				user.SignIn((bool success) => {
					if (success){
						Debug.Log("Success!");
					}else{
						Debug.Log("The user failed to signed in :(");
					}
				});
				loginTried = false;
			}
		}
	}
}
