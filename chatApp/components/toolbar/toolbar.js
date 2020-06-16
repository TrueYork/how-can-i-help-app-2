function Toolbar(parent, selector) {
    this.element = parent.querySelector(selector);

    this.closeButton = new ToolbarButton(this.element, 'close');
    this.closeButton.handleClick = this.close.bind(this);

    this.closeButton = new ToolbarButton(this.element, 'minimize');

    this.closeButton = new ToolbarButton(this.element, 'expand');
}

Toolbar.prototype.close = function() {
    if (this.onClose) this.onClose();
}

function ToolbarButton(parent, className) {
    this.element = document.createElement('button');
    this.element.className = 'toolbar-button ' + className;

    this.element.onclick = this.onClick.bind(this);

    parent.appendChild(this.element);
}

ToolbarButton.prototype.onClick = function(event) {
    if (this.handleClick) {
        this.handleClick(event);
    }
}

export default Toolbar;