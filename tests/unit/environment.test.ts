describe('Environment Variables', () => {
  it('should handle environment variable fallbacks', () => {
    const getEnvWithFallback = (envVar: string | undefined, fallback: string) => {
      return envVar || fallback;
    };

    // Test with defined env var
    expect(getEnvWithFallback('https://custom.com', 'https://default.com')).toBe('https://custom.com');
    
    // Test with undefined env var
    expect(getEnvWithFallback(undefined, 'https://default.com')).toBe('https://default.com');
    
    // Test with empty string
    expect(getEnvWithFallback('', 'https://default.com')).toBe('https://default.com');
  });

  it('should validate environment configuration', () => {
    const validateConfig = (config: { dappUrl?: string }) => {
      const errors: string[] = [];
      
      if (!config.dappUrl) {
        errors.push('dappUrl is required');
      } else if (!config.dappUrl.startsWith('http')) {
        errors.push('dappUrl must be a valid URL');
      }
      
      return errors;
    };

    // Test valid config
    expect(validateConfig({ dappUrl: 'https://dapp.com' })).toEqual([]);
    
    // Test invalid configs
    expect(validateConfig({})).toContain('dappUrl is required');
    expect(validateConfig({ dappUrl: 'invalid-url' })).toContain('dappUrl must be a valid URL');
  });
});