import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { signIn, signOut, updateEmail } from "../actions";

function GoogleAuth({ isSignedIn, updateEmail, email, signIn, signOut }) {
  //----------------------------------------------------------------------------------------------------------
  //IMPLEMENTING GOOGLE SIGN IN AT FIRST RENDER
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

    if (isSignedIn) document.getElementById("buttonDiv").hidden = true;
  }, []);

  //THIS RUNS WHEN THE USER SIGNS IN
  function handleCredentialResponse(response) {
    let decodedResponse = jwt_decode(response.credential);
    onAuthChange(decodedResponse.email_verified);
    updateEmail(decodedResponse.email);
    document.getElementById("buttonDiv").hidden = true;
  }
  //------------------------------------------------------------------------------------------------------------------

  //WEHN THE SIGN IN STATUS CHANGES
  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(isSignedIn));
    if (isSignedIn) localStorage.setItem("email", JSON.stringify(email));
  }, [isSignedIn]);
  //-----------------------------------------------------------------------------------------------------------------

  //  SIGN OUT HANDLER
  function signOutHandler() {
    window.google.accounts.id.revoke(email, () =>
      console.log(`consent revoked`)
    );
    localStorage.removeItem("email");
    updateEmail("null");
    document.getElementById("buttonDiv").hidden = false;
    onAuthChange(false);
  }
  //----------------------------------------------------------------------------------------------------------------------

  function onAuthChange(isSignedIn) {
    if (isSignedIn === true) {
      signIn();
    } else if (isSignedIn === false) {
      signOut();
    }
  }

  return (
    <div>
      {isSignedIn ? <button onClick={signOutHandler}>sign out</button> : ""}
      <div id="buttonDiv">button</div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, email: state.email };
};

export default connect(mapStatetoProps, { signIn, signOut, updateEmail })(
  GoogleAuth
);
//316
