function ReadableStream () {
  var self = this;

  this._destination = [ ];
  this._emit = this.emit;

  this.emit = function (signal, data) {
    var i;

    if (signal === "data") {
      for (i = self._destination.length; i--;) {
        self._destination[i].write(data);
      }
    } else if (signal === "end") {
      for (i = self._destination.length; i--;) {
        self._destination[i].write(data);
      }
    }
    self._emit(signal, data);
  };
}

extend(ReadableStream, EventEmitter);

ReadableStream.prototype.pipe = function (destination) {
  this._destination.push(destination);
};

ReadableStream.prototype.unpipe = function (destination) {
  if (!destination) {
    this._destination = [ ];
  } else {
    for(var i = this._destination.length-1; i--;) {
      if (this._destination[i].listener === destination) {
        this._destination.splice(i, 1);
      }
    }
  }
};