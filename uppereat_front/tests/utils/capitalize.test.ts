import { capitalize } from '@/utils/capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter of each word', () => {
    expect(capitalize('hello world')).toBe('Hello World');
    expect(capitalize('javaScript is awesome')).toBe('Javascript Is Awesome');
  });

  it('should return an empty string for an empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle a single word correctly', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
});
