(function () {
    const chatIFrameStyles = {
        position: 'fixed',
        right: '0',
        bottom: '0',
        width: '350px',
        height: '490px',
        border: 'none',
        display: 'none'
    };

    const chatIconStyles = {
        position: 'fixed',
        right: '15px',
        bottom: '15px',
        width: '100px',
        height: '100px',
        lineHeight: '100px',
        textAlign: 'center',
        backgroundColor: '#CB6EF2',
        border: 'none',
        borderRadius: '50%',
        color: 'white',
        boxShadow: '0 0 15px #FF00CC',
        fontSize: '3em',
        cursor: 'pointer',
        userSelect: 'none'
    };

    const chatIconInteractionStyles = '#chat-icon:hover {' +
        'opacity: 0.7;' +
        'height: 150px;' +
        '}' +
        '#chat-icon:active {' +
        'border: none;' +
        'opacity: 0.5;' +
        '}' +
        '#chat-icon:focus {' +
        'outline: none;' +
        '}';

    window.addEventListener('load', function handleAppLoad() {
        const style = document.createElement('style');
        style.innerHTML = chatIconInteractionStyles;
        document.head.appendChild(style);

        const chatIconElement = document.createElement('button');
        chatIconElement.setAttribute('id', 'chat-icon');
        chatIconElement.innerHTML = '?';
        Object.assign(chatIconElement.style, chatIconStyles);

        const chatIFrameElement = document.createElement('iframe');
        chatIFrameElement.setAttribute('id', 'chat');
        chatIFrameElement.setAttribute('src', './chatApp/chatApp.html');
        Object.assign(chatIFrameElement.style, chatIFrameStyles);

        chatIconElement.onclick = function handleChatIconClick() {
            chatIFrameElement.style.display = 'block';
            chatIconElement.style.display = 'none';
        }

        document.body.appendChild(chatIconElement);
        document.body.appendChild(chatIFrameElement);

        window.addEventListener('message', function (event) {
            switch (event.data.msg) {
                case 'close':
                    {
                        chatIFrameElement.style.display = 'none';
                        chatIconElement.style.display = 'block';
    
                        break;
                    }
            }
        }, false);
    });
})();