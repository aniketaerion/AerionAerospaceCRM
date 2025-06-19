import { useState, useRef } from 'react';

export function usePasswordPwnedCheck(): {
  checkPassword: (password: string) => Promise<boolean>;
  isChecking: boolean;
  error: string | null;
} {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple in-memory cache to avoid repeated checks in same session
  const cacheRef = useRef<Record<string, boolean>>({});

  async function checkPassword(password: string): Promise<boolean> {
    setIsChecking(true);
    setError(null);

    if (cacheRef.current[password] !== undefined) {
      setIsChecking(false);
      return cacheRef.current[password];
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);

      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const text = await res.text();

      // Check if suffix exists in returned list
      const isPwned = text.includes(suffix);
      cacheRef.current[password] = isPwned; // Cache result

      return isPwned;
    } catch (err: any) {
      setError('Password check failed. Please try again later.');
      console.error('usePasswordPwnedCheck error:', err);
      return false;
    } finally {
      setIsChecking(false);
    }
  }

  return { checkPassword, isChecking, error };
}
