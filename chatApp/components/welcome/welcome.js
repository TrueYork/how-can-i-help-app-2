import MessageBox from '../messageBox/messageBox.js';

function Welcome(parent, selector) {
    this.element = parent.querySelector(selector);
}

Welcome.prototype.init = function() {

    this.initHeader(this.element, {
        title: 'Help us understanding your problem...'
    });

    this.initMessageInput(this.element);
    this.initStartChatButton(this.element)
}

Welcome.prototype.initHeader = function(parent, {title}) {
    this.headerElement = document.createElement('div');
    this.headerElement.className = 'header';

    const titleElement = document.createElement('p');
    titleElement.className = 'title';
    titleElement.textContent = title;

    this.headerElement.appendChild(titleElement);

    parent.appendChild(this.headerElement);
}

Welcome.prototype.initMessageInput = function(parent) {
    this.messageBoxHolder = document.createElement('div');
    this.messageBoxHolder.classList.add('message-box-holder');

    this.messageBox = new MessageBox(this.messageBoxHolder, {
        placeholderText: 'Type a few words about your issue here and click "Start Chat"'
    });
    this.messageBox.handleUserMessage = this.startChat.bind(this);

    parent.appendChild(this.messageBoxHolder);
}

Welcome.prototype.initStartChatButton = function(parent) {
    this.startChatButton = new StartChatButton(parent);
    this.startChatButton.handleClick = this.startChat.bind(this);
}

function StartChatButton(parent) {
    this.element = document.createElement('button');
    this.element.className = 'start-chat-button';
    this.element.textContent = 'Start Chat';

    this.element.onclick = this.onClick.bind(this);

    parent.appendChild(this.element);    
}

StartChatButton.prototype.onClick = function(event) {
    if (this.handleClick) {
        this.handleClick(event);
    }
}

StartChatButton.prototype.remove = function() {
    this.element.remove();
}

Welcome.prototype.startChat = function(data = {}) {
    const userMessage = data.msg || this.messageBox.getMessage();

    if (userMessage) {
        if (this.onStartChat) {
            this.onStartChat(userMessage);
        }
    }
}

Welcome.prototype.hide = function() {
    this.element.classList.add('hidden');
}

Welcome.prototype.show = function() {
    this.element.classList.remove('hidden');
}

Welcome.prototype.destroy = function() {
    if (this.headerElement) this.headerElement.remove();
    if (this.messageBoxHolder) this.messageBoxHolder.remove();
    if (this.startChatButton) this.startChatButton.remove();
}

export default Welcome;