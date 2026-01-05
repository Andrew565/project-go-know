
import { Knowstones } from './knowstones';

describe('Knowstones', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should return 0 when no knowstones are saved', () => {
    expect(Knowstones.get()).toBe(0);
  });

  test('should save and retrieve knowstones', () => {
    Knowstones.save(5);
    expect(Knowstones.get()).toBe(5);
  });

  test('should update existing knowstones', () => {
    Knowstones.save(5);
    Knowstones.save(10);
    expect(Knowstones.get()).toBe(10);
  });
});
