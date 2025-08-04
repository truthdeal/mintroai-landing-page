describe('Scroll Progress Calculation', () => {
  describe('Given a scroll progress calculator', () => {
    const calculateScrollProgress = (scrollY: number, scrollHeight: number, innerHeight: number) => {
      const totalScroll = scrollHeight - innerHeight;
      if (totalScroll <= 0) return 0;
      return (scrollY / totalScroll) * 100;
    };

    describe('When calculating normal scroll positions', () => {
      it('Then should return 0% at top', () => {
        expect(calculateScrollProgress(0, 1000, 800)).toBe(0);
      });

      it('Then should return 50% at middle', () => {
        expect(calculateScrollProgress(100, 1000, 800)).toBe(50);
      });

      it('Then should return 100% at bottom', () => {
        expect(calculateScrollProgress(200, 1000, 800)).toBe(100);
      });
    });

    describe('When handling edge cases', () => {
      it('Then should return 0% when no scroll is needed', () => {
        expect(calculateScrollProgress(0, 800, 800)).toBe(0);
      });

      it('Then should calculate partial scroll correctly', () => {
        expect(calculateScrollProgress(300, 1200, 400)).toBe(37.5);
      });
    });
  });

  describe('Given a robust scroll progress calculator', () => {
    const calculateScrollProgress = (scrollY: number, scrollHeight: number, innerHeight: number) => {
      const totalScroll = scrollHeight - innerHeight;
      if (totalScroll <= 0) return 0;
      return Math.min(100, Math.max(0, (scrollY / totalScroll) * 100));
    };

    describe('When handling invalid values', () => {
      it('Then should handle negative scroll', () => {
        expect(calculateScrollProgress(-10, 1000, 800)).toBe(0);
      });

      it('Then should cap at 100% for over-scroll', () => {
        expect(calculateScrollProgress(1000, 1000, 800)).toBe(100);
      });

      it('Then should return 0% for no scrollable area', () => {
        expect(calculateScrollProgress(100, 800, 800)).toBe(0);
      });
    });
  });
});