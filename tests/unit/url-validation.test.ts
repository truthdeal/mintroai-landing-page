describe('URL Validation', () => {
  it('should validate URL format correctly', () => {
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    // Test valid URLs
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('https://dapp.mintroai.com')).toBe(true);
    
    // Test invalid URLs
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('ftp://invalid')).toBe(true); // Valid URL, different protocol
  });

  it('should check if URL is HTTPS', () => {
    const isHttps = (url: string) => {
      try {
        return new URL(url).protocol === 'https:';
      } catch {
        return false;
      }
    };

    // Test HTTPS URLs
    expect(isHttps('https://example.com')).toBe(true);
    expect(isHttps('https://dapp.mintroai.com')).toBe(true);
    
    // Test non-HTTPS URLs
    expect(isHttps('http://example.com')).toBe(false);
    expect(isHttps('ftp://example.com')).toBe(false);
    expect(isHttps('invalid-url')).toBe(false);
  });
});