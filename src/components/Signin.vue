<template>
    <div>
        <div id="firebaseui-auth-container"></div>
    </div>
</template>
<script>
import firebase from "firebase/app"
import * as firebaseui from "firebaseui"
import "../../node_modules/firebaseui/dist/firebaseui.css"

export default {
  mounted() {
    let uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult() {
          window.location.href = '/'
        }
      }
        }
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start("#firebaseui-auth-container", uiConfig)
  }
}
</script>
