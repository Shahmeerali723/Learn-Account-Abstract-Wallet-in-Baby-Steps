export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || !window.navigator) return false;
  const userAgent = navigator.userAgent;

  // Regex to check for common mobile device identifiers in the user agent string
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent);
}
