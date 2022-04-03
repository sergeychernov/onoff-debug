import { Gpio } from './index';

test('Initial', () => {
  const pin2 = new Gpio(2, 'out');
  expect(pin2.readSync()).toBe(0);
  pin2.writeSync(1);
  expect(pin2.readSync()).toBe(1);
});
