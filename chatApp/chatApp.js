import Toolbar from './components/toolbar/toolbar.js';
import Welcome from './components/welcome/welcome.js';
import Chat from './components/chat/chat.js';

window.onload = function handleContainerLoad() {
    // Get container for inner views
    var parentContainerElement = document.getElementById('main');
    // Init views
    var toolbar = new Toolbar(parentContainerElement, '.toolbar');
    var welcome = new Welcome(parentContainerElement, '.welcome');
    var chat = new Chat(parentContainerElement, '.chat');

    // Define some intercommunications
    welcome.onStartChat = function startChat(startMsg) {
        welcome.hide();
        chat.init();
        chat.pushToMsgList({id: 0, data: startMsg});
    }

    toolbar.onClose = function closeChat() {
        welcome.show();
        chat.hide();
        chat.flushMsgList();

        // welcome.destroy();
        // chat.destroy();

        window.parent.postMessage({ msg: 'close' }, '*');
    }
}