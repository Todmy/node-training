class UniqueDocsMap extends Map {
  constructor(...args) {
    var core = super(...args);
    this._core = core;
  }

  set(key, value) {
    if(!this.has(key)) {
      return this._core.set(key, value);
    }
  }

  get(key) {
    return this._core.get(key);
  }

  has(key) {
  	return this._core.has(key);
  }

  delete(keys) {
    return keys.some(function(key) {
      return this._core.delete(key);
    }, this)
  }
}

var uniqDocs = new UniqueDocsMap();
uniqDocs.set('dd', 'sdsd');
uniqDocs.set('ddd', { a: 'dddd' });
uniqDocs.set('ddssqq', 8888);
uniqDocs.set('dds', 121);
uniqDocs.set('dds', uniqDocs.get('dd'));

console.log(uniqDocs.delete([ 'dd', 'sss' ]));
console.log(uniqDocs.get('dds'));
