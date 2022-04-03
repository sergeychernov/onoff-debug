import { Gpio } from './index';

test('Initial', () => {
  const pin2 = new Gpio(2, 'out');
  expect(pin2.readSync()).toBe(0);
  pin2.writeSync(1);
  expect(pin2.readSync()).toBe(1);
});

test('reconfigureDirection', () => {
  const pin21 = new Gpio(2, 'out');
  pin21.writeSync(1);
  const pin22 = new Gpio(2, 'out');
  expect(pin22.readSync()).toBe(0);
  pin22.writeSync(1);
  const pin23 = new Gpio(2, 'out', 'both', { reconfigureDirection: false });
  expect(pin23.readSync()).toBe(1);
});
