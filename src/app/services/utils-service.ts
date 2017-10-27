declare function require(path: string): any;

export class UtilsService {
  private murmurHash3 = null;
  constructor(){
    this.murmurHash3 = require('murmur-hash').v3;
  }

  murmurHash(s: string) {
    return this.murmurHash3.x86.hash32(s);
  }
}
