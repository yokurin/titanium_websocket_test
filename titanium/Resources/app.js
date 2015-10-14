// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var view1 = Ti.UI.createView({
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
    backgroundColor: '#00FF00'
});
win1.add(view1);

var textField = Ti.UI.createTextField({
    top: '0dp',
    left: '0dp',
    width: '250dp',
    height: '50dp',
    borderWidth: '1',
    color: '#000',
    hintText: 'テキスト',
    backgroundColor:'#FFF'
});
view1.add(textField);



uri = 'ws://192.168.1.111:9000';

var WS = require('net.iamyellow.tiws').createWS();

WS.addEventListener('open', function () {
    Ti.API.debug('websocket opened');
});

WS.addEventListener('close', function (ev) {
    Ti.API.info(ev);
    addMessage(ev.data);
});

WS.addEventListener('error', function (ev) {
    Ti.API.error(ev);
});

WS.addEventListener('message', function (ev) {
    Ti.API.log(ev);
    addMessage(ev.data);
});

WS.open(uri);

var submitButton = Ti.UI.createButton({
    top: '0dp',
    title: '送信',
    right: '10dp',
    width: '50dp',
    height: '50dp'
});
submitButton.addEventListener('click', function(e){
    //サーバへ送信
    WS.send(textField.getValue());
    textField.setValue('');
});
view1.add(submitButton);

var closeButton = Ti.UI.createButton({
    top: '60dp',
    title: '閉じる',
    right: '10dp',
    width: '50dp',
    height: '50dp',
    backgroundColor: '#0DFF00'
});
closeButton.addEventListener('click', function(e){
    //close情報をサーバへ送信
    WS.close();
});
win1.add(closeButton);


var commentView = Ti.UI.createView({
    top: 70,
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
    backgroundColor: '#00D0FF',
    layout: 'vertical'
});
view1.add(commentView);

function addMessage(text) {
    var comment = Ti.UI.createLabel({
        text: text,
        color: '#FFF',
        font: {
            fontSize: 12
        }
    });
    commentView.add(comment);
}

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 2',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


// open tab group
tabGroup.open();
