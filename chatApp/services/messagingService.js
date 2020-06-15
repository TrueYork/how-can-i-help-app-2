function MessagingService() {
    this.ws = null;
    this.pendingMessageQueue = [];
}

MessagingService.prototype.init = function() {
    this.ws = new WebSocket('ws://localhost:8333');

    this.ws.onopen = () => {
        while(this.pendingMessageQueue.length) {
            this.ws.send(this.pendingMessageQueue.shift());
        }
    }

    this.ws.onmessage = event => {
        if (this.onMessage) this.onMessage(event.data);
    }
}

MessagingService.prototype.isOpen = function() {
    return Boolean(this.ws) && this.ws.readyState === WebSocket.OPEN;
}

MessagingService.prototype.sendMessage = function({msg}) {
    if (!this.isOpen()) {
        this.pendingMessageQueue.push(msg);
    } else {
        this.ws.send(msg);
    }
}

MessagingService.prototype.destroy = function() {
    if (this.ws) this.ws.close();
}

export default MessagingService;