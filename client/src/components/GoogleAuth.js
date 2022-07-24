import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function GoogleAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  //   console.log(isSignedIn);

  function handleCredentialResponse(response) {
    let decodedResponse = jwt_decode(response.credential);
    setIsSignedIn(decodedResponse.email_verified);
    setUserEmail(decodedResponse.email);
    setUserName(decodedResponse.given_name);
    setUserLastName(decodedResponse.family_name);
    document.getElementById("buttonDiv").hidden = true;
  }

  function signOutHandler() {
    window.google.accounts.id.revoke(userEmail, () =>
      console.log(`consent revoked`)
    );
    localStorage.removeItem("email");
    document.getElementById("buttonDiv").hidden = false;
    setIsSignedIn(false);
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "956300425875-n5423qg2pn6k9e7g313k8e6i2dtl9dkl.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { type: "icon", theme: "outlie", size: "large" }
    );
  }, []);

  useEffect(() => {
    let signInStatus = JSON.parse(localStorage.getItem("signedIn"));
    let email = JSON.parse(localStorage.getItem("email"));
    if (signInStatus) document.getElementById("buttonDiv").hidden = true;
    setIsSignedIn(signInStatus);
    setUserEmail(email);
  }, []);

  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(isSignedIn));
    if (isSignedIn) localStorage.setItem("email", JSON.stringify(userEmail));
  }, [isSignedIn]);

  //   localStorage.removeItem("email");

  return (
    <div>
      {" "}
      <div>Google Auth</div>
      {isSignedIn ? <button onClick={signOutHandler}>sign out</button> : ""}
      <div id="buttonDiv">button</div>
    </div>
  );
}

export default GoogleAuth;
