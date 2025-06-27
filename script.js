 class EventTarget {
      constructor() {
        this.listeners = new Map();
      }

      addEventListener(event, callback) {
        if (!this.listeners.has(event)) {
          this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
      }

      removeEventListener(event, callback) {
        if (this.listeners.has(event)) {
          const callbacks = this.listeners.get(event);
          callbacks.delete(callback);
          if (callbacks.size === 0) {
            this.listeners.delete(event);
          }
        }
      }

      dispatchEvent(event) {
        if (this.listeners.has(event)) {
          const callbacks = this.listeners.get(event);
          for (const callback of callbacks) {
            callback();
          }
        }
      }
    }

    
    const target = new EventTarget();

    const logHello = () => log('hello');
    const logWorld = () => log('world');

    function log(msg) {
      const logBox = document.getElementById('log');
      logBox.textContent += msg + '\n';
    }

    function addListeners() {
      target.addEventListener('hello', logHello);
      target.addEventListener('world', logWorld);
      log('Listeners added.');
    }

    function removeHello() {
      target.removeEventListener('hello', logHello);
      log("Removed 'hello' listener.");
    }

    function dispatchHello() {
      log("Dispatching 'hello'...");
      target.dispatchEvent('hello');
    }

    function dispatchWorld() {
      log("Dispatching 'world'...");
      target.dispatchEvent('world');
    }