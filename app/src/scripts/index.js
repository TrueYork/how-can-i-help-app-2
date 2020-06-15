var chatIconElement;
var chatIFrameElement;

window.onload = function handleAppLoad() {
    chatIconElement = document.getElementById('chat-icon');
    chatIFrameElement = document.getElementById('chat');

    chatIconElement.onclick = function handleChatIconClick() {
        chatIconElement.style.display = 'none';
        chatIFrameElement.style.display = 'block';
    }
};

window.addEventListener('message', function (data) {
    switch (data.data.msg) {
        case 'close':
            {
                chatIFrameElement.style.display = 'none';
                chatIconElement.style.display = 'block';

                break;
            }
    }
}, false)