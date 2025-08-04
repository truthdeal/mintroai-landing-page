describe('Utils - Class Name Merging', () => {
  describe('Given a class name utility function', () => {
    const { cn } = require('@/lib/utils');

    describe('When merging basic class names', () => {
      it('Then should combine multiple classes', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2');
      });
    });

    describe('When using conditional classes', () => {
      it('Then should include truthy conditions', () => {
        expect(cn('base', true && 'conditional')).toBe('base conditional');
      });

      it('Then should exclude falsy conditions', () => {
        expect(cn('base', false && 'conditional')).toBe('base');
      });
    });

    describe('When handling undefined/null values', () => {
      it('Then should ignore them gracefully', () => {
        expect(cn('base', undefined, null)).toBe('base');
      });
    });
  });
}); 