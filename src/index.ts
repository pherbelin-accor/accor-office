/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;

WA.state.onVariableChange('freeze players').subscribe((value: boolean) => {
  if (value == true && WA.player.name != 'Pierre'){
    WA.controls.disablePlayerControls();
  } else {
    WA.controls.restorePlayerControls();
  }
});

WA.room.onEnterZone('testZone', () => {
  console.log(WA.state.loadVariable('enable second floor'));

  if (WA.state.loadVariable('enable second floor')){
    currentPopup = WA.ui.openPopup("popup_elevator", "Voulez-vous changer d'étage?", [{
           label: "Oui",
           className: "primary",
           callback: (popup) => {
             WA.nav.goToRoom('cafet.json');
               popup.close();
           }
       }]);
  }
})


WA.room.onLeaveZone('testZone', () => {
  closePopUp();
});


function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


function sendHttpsRequest(playerName: String){
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", "https://reqbin.com/echo/post/json");
  //xhr.setRequestHeader("Accept", "application/json");
  //xhr.setRequestHeader("Content-Type", "application/json");

  httpRequest.onreadystatechange = function () {
     if (httpRequest.readyState === 4) {
        console.log(httpRequest.status);
        console.log(httpRequest.responseText);
     }};

  var data = `{
    "test": "toto"
  }`;

  httpRequest.send(data);

}
