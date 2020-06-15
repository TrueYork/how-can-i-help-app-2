function MessageWindow(parent, placeholderText, expanded) {
    this.element = document.createElement('textarea');
    this.element.classList.add('msg-wnd');
    if (expanded) {
        this.element.classList.add('expanded');
    } else {
        this.element.classList.add('shrunk');
    }
    this.element.setAttribute('placeholder', placeholderText);

    this.element.onkeydown = this.onKeyDown.bind(this);

    parent.appendChild(this.element);
}

MessageWindow.prototype.onKeyDown = function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (this.handleKeyDown) {
            this.handleKeyDown(event);
        }
    }
}

export default MessageWindow;