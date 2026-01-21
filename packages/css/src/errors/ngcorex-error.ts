export class NgCorexError extends Error {
  constructor(message: string, details?: string) {
    super(
      details
        ? `ngCorex Error: ${message}\n\n${details}`
        : `ngCorex Error: ${message}`
    );
    this.name = 'NgCorexError';
  }
}
