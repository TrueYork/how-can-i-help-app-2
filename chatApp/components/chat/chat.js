import MessageBox from '../messageBox/messageBox.js';

function Chat(parent, selector) {
    this.element = parent.querySelector(selector);
}

Chat.prototype.init = function() {
    this.messages = [];

    this.initHeader(this.element, {
        title: 'Bill Gates',
        description: 'Sales Support Department',
    });

    this.initMessageList(this.element);
    this.initMessageInput(this.element);

    this.show();
}

Chat.prototype.destroy = function() {
    this.headerElement.remove();
    this.messageListElement.remove();
    this.messageInputElement.remove();
}

Chat.prototype.initHeader = function(parent, {title, description}) {
    this.headerElement = document.createElement('div');
    this.headerElement.className = 'header';

    const titleElement = document.createElement('p');
    titleElement.className = 'title';
    titleElement.textContent = title;

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'description';
    descriptionElement.textContent = description;

    this.headerElement.appendChild(titleElement);
    this.headerElement.appendChild(descriptionElement);

    parent.appendChild(this.headerElement);
}

Chat.prototype.initMessageList = function(parent) {
    this.messageListElement = document.createElement('div');
    this.messageListElement.className = 'message-list';

    parent.appendChild(this.messageListElement);
}

Chat.prototype.initMessageInput = function(parent) {
    this.messageInputElement = document.createElement('div');
    this.messageInputElement.className = 'message-input';

    const messageBox = new MessageBox(this.messageInputElement, {
        placeholderText: 'Type a message and click Enter...'
    });
    messageBox.handleUserMessage = this.handleUserMessage.bind(this);

    parent.appendChild(this.messageInputElement);
}

Chat.prototype.pushToMsgList = function(msg) {
        this.messages.push(msg);
        this.msgToPush = document.createElement('div');
        this.msgToPush.classList = 'msg-item';
        if (msg.id) {
            this.msgToPush.classList.add('sent');
        } else {
            this.msgToPush.classList.add('recieved');
        }
        this.msgToPush.textContent = msg.data;

        this.messageListElement.appendChild(this.msgToPush);
        console.log(this.messages);
}

Chat.prototype._clearMessageList = function() {
    this.messages = [];
    let messagesElements = this.messageListElement.children;
    for (let i = messagesElements.length - 1; i >= 0; i--) {
        messagesElements[i].remove();
     }
}

Chat.prototype.handleUserMessage = function({msg}) {
    this.pushToMsgList({id: 1, data: msg});
}

Chat.prototype.show = function() {
    this.element.classList.add('visible');
}

Chat.prototype.hide = function() {
    this.element.classList.remove('visible');
}

export default Chat;