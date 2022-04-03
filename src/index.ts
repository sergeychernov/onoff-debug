import { BinaryValue, Edge, Gpio as GpioOriginal } from 'onoff';
class Gpio {
  static states = [0, 0, 0, 0, 0];

  private gpio = 0;
  private original: GpioOriginal | undefined = undefined;
  constructor(gpio: number, direction: any, edge: Edge = 'none', options = {}) {
    try {
      this.original = new GpioOriginal(gpio, direction, edge, options);
    } catch (e) {
      this.gpio = gpio;
    }
  }
  readSync() {
    if (this.original) {
      return this.original.readSync();
    }
    return Gpio.states[this.gpio];
  }
  writeSync(value: BinaryValue) {
    if (this.original) {
      return this.original.writeSync(value);
    }
    Gpio.states[this.gpio] = value === 0 ? 0 : 1;
  }
}

export { Gpio };
