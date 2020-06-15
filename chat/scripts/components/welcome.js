import ViewDescr from './viewDescr.js';
import MessageWindow from './messageWindow.js';

function Welcome(parent, selector) {
    this.element = parent.querySelector(selector);

    this.welcomeText = 'Help us understanding your problem...';
    this.welcomeViewDescr = new ViewDescr(this.element, this.welcomeText, 'head-text');
    
    this.placeholderText=`Type a few words about your issue here and click "Start Chat"`
    this.msgWnd = new MessageWindow(this.element, this.placeholderText, true);
    
    this.startChatButton = new StartChatButton(this.element);
    this.startChatButton.handleClick = this.startChat.bind(this);
}

function StartChatButton(parent) {
    this.element = document.createElement('button');
    this.element.className = `start-chat-button`;
    this.element.textContent = 'Start Chat';

    this.element.onclick = this.onClick.bind(this);

    parent.appendChild(this.element);    
}

StartChatButton.prototype.onClick = function(event) {
    if (this.handleClick) {
        this.handleClick(event);
    }
}

Welcome.prototype.startChat = function() {
    // validate?

    if (this.onStartChat) {
        if (this.msgWnd.element.value && this.msgWnd.element.value !== '\n') {
            this.onStartChat(this.msgWnd.element.value);
        }
        this.msgWnd.element.value = '';
    }
}

Welcome.prototype.hide = function() {
    this.preservedStyle = this.element.style;
    this.element.style.display = 'none';
}

Welcome.prototype.show = function() {
    this.element.style = this.preservedStyle;
}

export default Welcome;