//--------keyboard input--------------
Key = {

    _pressed: {},
    _released: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    a: 65,
    c: 67,
    w: 87,
    s: 83,
    d: 68,
    z: 90,
    x: 88,
    f: 70,
    p: 80,
    r: 82,

    isDown(keyCode) {
        return this._pressed[keyCode];
    },

    justReleased(keyCode) {
        return this._released[keyCode];
    },

    onKeydown(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup(event) {
        this._released[event.keyCode] = true;
        delete this._pressed[event.keyCode];

    },

    update() {
        this._released = {};
    }
};

function playSound(buffer, playbackRate = 1, pan = 0, volume = .5, loop = false) {

    var source = audioCtx.createBufferSource();
    var gainNode = audioCtx.createGain();
    var panNode = audioCtx.createStereoPanner();
  
    source.buffer = buffer;
    source.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(audioMaster);
  
    source.playbackRate.value = playbackRate;
    source.loop = loop;
    gainNode.gain.value = volume;
    panNode.pan.value = pan;
    source.start();
    return {volume: gainNode, sound: source};

}

/** Seedable psuedo-random number generator class. */
class PRNG {
    /**
     * Create a pseudo-random number generator. The seed must be an integer.
     *
     * Uses the Lehmer / Park-Miller PRNG
     * https://en.wikipedia.org/wiki/Lehmer_random_number_generator
     *
     *  Utilizes MINSTD parameters where:
     *  n = 2^31 − 1 = 2,147,483,647 (a Mersenne prime)
     *  g = 7^5 = 16,807 (a primitive root modulo)
     */
    constructor (seed) {
      // Verify that seed is an integer
      if (seed % 1 === 0) {
        // Initialize seed with a modulo by n
        this.seed = seed % 2147483647
        if (this.seed <= 0) {
          // If seed is negative or zero, add n
          this.seed += 2147483646
        }
      } else {
        throw new Error('Seed value must be an integer.')
      }
    }
  
    /** Return a pseudo-random value between 1 and n */
    next () {
      // x_k+1 = (g * x_k) % n
      return this.seed = this.seed * 16807 % 2147483647
    }
  
    /** Return a pseudo-random floating point number in range [0, 1] */
    nextFloat () {
      // We know that result of next() will be 1 to 2147483646 (inclusive)
      return (this.next() - 1) / 2147483646
    }
  
    /** Return pseudo-random int between 0 and the specified max */
    nextBoundedInt(min, max) {
      return Math.floor(this.nextFloat() * (max - min) + min)
    }
  }