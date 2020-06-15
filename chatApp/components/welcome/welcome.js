import MessageBox from '../messageBox/messageBox.js';

function Welcome(parent, selector) {
    this.element = parent.querySelector(selector);

    // this.welcomeText = 'Help us understanding your problem...';
    // this.welcomeViewDescr = new ViewDescr(this.element, this.welcomeText, 'head-text');
    this.init();
    this.messageBoxHolder = document.createElement('div');
    this.messageBoxHolder.classList.add('message-box-holder');
    this.element.appendChild(this.messageBoxHolder);
    this.messageBox = new MessageBox(this.messageBoxHolder, {
        placeholderText: 'Type a few words about your issue here and click "Start Chat"'
    });
    this.messageBox.handleUserMessage = this.startChat.bind(this);
    
    this.startChatButton = new StartChatButton(this.element);
    this.startChatButton.handleClick = this.startChat.bind(this);
}

Welcome.prototype.init = function() {

    this.initHeader(this.element, {
        title: 'Help us understanding your problem...'
    });

    //this.initMessageInput(this.element);
    //this.initStartChatButton(this.element)

    //this.show();
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

Welcome.prototype.startChat = function(data = {}) {
    const userMessage = data.msg || this.messageBox.getMessage();

    if (userMessage) {
        this.messageBox.clear();
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

export default Welcome;