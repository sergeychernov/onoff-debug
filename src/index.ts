import { BinaryValue, Edge, Gpio as GpioOriginal, Options } from 'onoff';

import { tmpdir } from 'os';

import { existsSync, writeFileSync, readFileSync } from 'fs';

const TMP_FILE = tmpdir() + '/gpio_debug.json';
class Gpio {
  static states: number[] = new Array<number>(40);

  private gpio = 0;
  private original: GpioOriginal | undefined = undefined;
  constructor(gpio: number, direction: any, edge: Edge = 'none', options: Options = {}) {
    try {
      this.original = new GpioOriginal(gpio, direction, edge, options);
    } catch (e) {
      console.info('The Debug Mode is on');
      this.gpio = gpio;
      if (!existsSync(TMP_FILE)) {
        writeFileSync(TMP_FILE, JSON.stringify(Gpio.states.fill(0)));
      }
      Gpio.states = JSON.parse(readFileSync(TMP_FILE, 'utf8'));
      if (options.reconfigureDirection !== false) {
        Gpio.states[this.gpio] = 0;
        writeFileSync(TMP_FILE, JSON.stringify(Gpio.states));
      }
    }
  }
  info() {
    if (!this.original) {
        console.info(Gpio.states);
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
    writeFileSync(TMP_FILE, JSON.stringify(Gpio.states));
  }
}

export { Gpio };
