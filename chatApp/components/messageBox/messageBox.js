const ENTER_KEY_CODE = 13;

function MessageBox(parent, {placeholderText}) {
    this.element = document.createElement('textarea');
    this.element.classList.add('message-box');

    this.element.setAttribute('placeholder', placeholderText);

    this.element.onkeydown = this.onKeyDown.bind(this);

    parent.appendChild(this.element);
}

MessageBox.prototype.onKeyDown = function(event) {
    if (event.keyCode === ENTER_KEY_CODE && !event.shiftKey) {
        event.preventDefault();

        const message = this.element.value;
        if (!message) return;

        this.element.value = '';

        if (this.handleUserMessage) {
            this.handleUserMessage({msg: message.trim()});
        }
    }
}

MessageBox.prototype.getMessage = function() {
    return this.element.value;
}

export default MessageBox;