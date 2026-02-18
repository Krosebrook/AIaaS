import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export function useAIBackground(prompt, cacheKey) {
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateBackground = async () => {
      // Check cache first
      const cached = localStorage.getItem(`ai_bg_${cacheKey}`);
      if (cached) {
        setBackgroundUrl(cached);
        setLoading(false);
        return;
      }

      try {
        const result = await base44.integrations.Core.GenerateImage({
          prompt: `Abstract, professional, modern ${prompt}. Subtle gradients, minimal design, suitable as a website background. High quality, 4K resolution.`
        });

        if (result?.url) {
          localStorage.setItem(`ai_bg_${cacheKey}`, result.url);
          setBackgroundUrl(result.url);
        }
      } catch (error) {
        console.error('Failed to generate AI background:', error);
      } finally {
        setLoading(false);
      }
    };

    generateBackground();
  }, [prompt, cacheKey]);

  return { backgroundUrl, loading };
}