import MessageBox from '../messageBox/messageBox.js';

const MESSAGE_TYPES = {
    SENT: 'sent',
    RECIEVED: 'recieved'
};

function Chat(parent, selector) {
    this.element = parent.querySelector(selector);
}

Chat.prototype.init = function({userMessage}) {
    this.initHeader(this.element, {
        title: 'Bill Gates',
        description: 'Sales Support Department',
    });

    this.initMessageList(this.element);
    this.initMessageInput(this.element);

    this.show();

    this.handleUserMessage({msg: userMessage});
}

Chat.prototype.destroy = function() {
    if (this.headerElement) this.headerElement.remove();
    if (this.messageListElement) this.messageListElement.remove();
    if (this.messageInputElement) this.messageInputElement.remove();
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

Chat.prototype.displayMessage = function({type, msg}) {
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'msg-item';
    this.messageElement.classList.add(type);

    this.messageElement.textContent = msg;

    this.messageListElement.appendChild(this.messageElement);

    this.messageListElement.scrollTo(0, this.messageListElement.scrollHeight);
}

Chat.prototype.onMessage = function(msg) {
    this.displayMessage({type: MESSAGE_TYPES.RECIEVED, msg})
}

// Chat.prototype.clearMessageList = function() {
//     Array.from(this.messageListElement.children).forEach(function(element) {
//         element.remove();
//     });
// }

Chat.prototype.handleUserMessage = function({msg}) {
    this.displayMessage({type: MESSAGE_TYPES.SENT, msg});

    if (this.onUserMessage) this.onUserMessage({msg});
}

Chat.prototype.show = function() {
    this.element.classList.add('visible');
}

Chat.prototype.hide = function() {
    this.element.classList.remove('visible');
}

export default Chat;