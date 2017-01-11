const manySpaces = '                             ';
String.prototype.padify = function padify(length, rightAlign) {
    if (rightAlign) {
        return manySpaces.substring(0, length - this.length) + this;
    }
    
    return this + manySpaces.substring(0, length - this.length);
};