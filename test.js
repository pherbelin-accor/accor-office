
let currentPopup;

WA.state.onVariableChange('testUrl').subscribe((value) => {
    console.log('Variable "testUrl" changed. New value: ', value);
});
WA.state.saveVariable('testUrl', 'test.html').catch(e => console.error('Something went wrong while saving variable', e));
WA.room.onEnterZone('testZone', () => {
  currentPopup = WA.ui.openPopup("popupRectangle", 'Hello world!', [{
         label: "Close",
         className: "secondary",
         callback: (popup) => {
             popup.close();
         }
     }]);
})

WA.room.onLeaveZone('testZone', () => {
  WA.state.saveVariable('testUrl', 'test.html').catch(e => console.error('Something went wrong while saving variable', e));
  closePopUp();
});


function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
