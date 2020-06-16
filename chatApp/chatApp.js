import Toolbar from './components/toolbar/toolbar.js';
import Welcome from './components/welcome/welcome.js';
import Chat from './components/chat/chat.js';

import MessagingService from './services/messagingService.js';

function ChatApp() {
    this.initViews();
    this.initServices();
}

ChatApp.prototype.initViews = function() {
    const parentContainerElement = document.getElementById('main');

    this.toolbar = new Toolbar(parentContainerElement, '.toolbar');
    this.welcome = new Welcome(parentContainerElement, '.welcome');
    this.chat = new Chat(parentContainerElement, '.chat');

    this.welcome.init();
    this.welcome.onStartChat = this.startChat.bind(this);
    this.toolbar.onClose = this.close.bind(this);
}

ChatApp.prototype.initServices = function() {
    this.messagingService = new MessagingService();
}

ChatApp.prototype.startChat = function(userMessage) {
    this.messagingService.init();

    this.chat.onUserMessage = this.onUserMessage.bind(this);
    this.messagingService.onMessage = this.onServerMessage.bind(this);

    this.switchToChatView(userMessage);
}

ChatApp.prototype.switchToChatView = function(userMessage) {
    this.welcome.hide();
    this.chat.init({userMessage});
}

ChatApp.prototype.onUserMessage = function(data) {
    this.messagingService.sendMessage(data);
}

ChatApp.prototype.onServerMessage = function(msg) {
    this.chat.onMessage(msg);
}

ChatApp.prototype.close = function() {
    window.parent.postMessage({ msg: 'close' }, '*');
    
    this.chat.hide();
    this.chat.destroy();
    
    this.messagingService.destroy();
    
    this.welcome.show();
}

export default ChatApp;