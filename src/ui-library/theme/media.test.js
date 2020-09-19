import { media } from './media';

describe('Media', () => {
  it('should return correct lessThan media query', () => {
    const result = media.lessThan('md')`test`.join('');
    expect(result).toMatch(/max-width: 767px/);
    expect(result).toMatch(/test/);
  });

  it('should return correct greaterThan media query', () => {
    const result = media.greaterThan('lg')`color: black;`.join('');
    expect(result).toMatch(/min-width: 992px/);
    expect(result).toMatch(/color: black;/);
  });

  it('should throw error when breakpoint is not supported', () => {
    const result = () => {
      media.lessThan('new')`test`.join('');
    };
    expect(result).toThrow(Error);
  });
});
