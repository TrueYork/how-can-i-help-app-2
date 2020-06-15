import ViewDescr from './viewDescr.js';
import MessageWindow from './messageWindow.js';

function Chat(parent, selector) {
    this.element = parent.querySelector(selector);

    this.msgListArray = [];

    this.chatText = 'Bill Gates';
    this.chatViewDescr = new ViewDescr(this.element, this.chatText, 'head-text');

    this.positionText = 'Sales Support Department';
    this.welcomeViewDescr = new ViewDescr(this.element, this.positionText, 'position-text');

    this.msgList = document.createElement('div');
    this.msgList.classList.add('msg-list');
    this.msgList.style.flexGrow = '1';
    this.element.appendChild(this.msgList);

    this.placeholderText=`Type a message and click Enter...`
    this.msgWnd = new MessageWindow(this.element, this.placeholderText, false);
    this.msgWnd.handleKeyDown = this.pushToMsgListOnEnter.bind(this);
}

Chat.prototype.pushToMsgList = function(msg) {
        this.msgListArray.push(msg);
        this.msgToPush = document.createElement('div');
        this.msgToPush.classList = 'msg-item';
        if (msg.id) {
            this.msgToPush.classList.add('sent');
        } else {
            this.msgToPush.classList.add('recieved');
        }
        this.msgToPush.textContent = msg.data;

        this.msgList.appendChild(this.msgToPush);
        console.log(this.msgListArray);
}

Chat.prototype.flushMsgList = function() {
    this.msgListArray = [];
    this.msgList.innerHTML = '';
}


Chat.prototype.pushToMsgListOnEnter = function() {
    if (this.msgWnd.element.value && this.msgWnd.element.value !== '\n') {
        this.pushToMsgList({id: 1, data: this.msgWnd.element.value});
    }
    this.msgWnd.element.value = '';
}

Chat.prototype.show = function() {
    const chatStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '0'
    };
    Object.assign(this.element.style, chatStyle);
}

Chat.prototype.hide = function() {
    this.element.style.display = 'none';
}

export default Chat;