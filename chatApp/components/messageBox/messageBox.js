function MessageBox(parent, {placeholderText}) {
    this.element = document.createElement('textarea');
    this.element.classList.add('message-box');

    this.element.setAttribute('placeholder', placeholderText);

    this.element.onkeydown = this.onKeyDown.bind(this);

    parent.appendChild(this.element);
}

MessageBox.prototype.onKeyDown = function(event) {
    if (event.keyCode === 13 /* Enter */ ) {
        event.preventDefault();

        const message = this.element.value;
        if (!message) return;

        this.element.value = '';

        if (this.handleUserMessage) {
            this.handleUserMessage({msg: message});
        }
    }
}

MessageBox.prototype.getMessage = function() {
    return this.element.value;
}

export default MessageBox;