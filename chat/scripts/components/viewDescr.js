function ViewDescr(parent, content, className) {
    this.element = document.createElement('p');
    this.element.textContent = content;
    this.element.className = `${className}`;

    parent.appendChild(this.element);
}

export default ViewDescr;