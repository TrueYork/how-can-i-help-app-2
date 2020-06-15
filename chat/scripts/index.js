import Toolbar from './components/toolbar.js';
import Welcome from './components/welcome.js';
import Chat from './components/chat.js';

window.onload = function handleContainerLoad() {
    // Get container for inner views
    var parentContainerElement = document.getElementById('main');
    // Init views
    var toolbar = new Toolbar(parentContainerElement, '.toolbar');
    var welcome = new Welcome(parentContainerElement, '.welcome');
    var chat = new Chat(parentContainerElement, '.chat');

    // Define some intercommunications
    welcome.onStartChat = function startChat(startMsg) {
        chat.pushToMsgList({id: 0, data: startMsg});
        welcome.hide();
        chat.show();
    }

    toolbar.onCloseChat = function closeChat() {
        welcome.show();
        chat.hide();
        chat.flushMsgList();
    }
}