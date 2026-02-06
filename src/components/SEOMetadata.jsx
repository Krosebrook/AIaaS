import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function SEOMetadata({ pageName, content }) {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const generateMetadata = async () => {
      try {
        const result = await base44.integrations.Core.InvokeLLM({
          prompt: `Generate SEO metadata for an AI implementation services landing page. 
          
Page: ${pageName}
Content summary: ${content}

Requirements:
- Brand: INTinc Technology (powered by FlashFusion)
- Tone: Professional, technical, action-oriented
- Focus: Enterprise AI, security-first, measurable outcomes
- Industry: MSP/Technology consulting

Generate:
1. Meta title (max 60 chars, compelling, includes primary keyword)
2. Meta description (max 155 chars, actionable, includes call-to-action)
3. Keywords (5-7 relevant SEO keywords, comma-separated)`,
          response_json_schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              keywords: { type: "string" }
            }
          }
        });

        setMetadata(result);
        
        // Update meta tags
        document.title = result.title;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', result.description);
        
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', result.keywords);
        
      } catch (error) {
        console.error('Failed to generate SEO metadata:', error);
      }
    };

    generateMetadata();
  }, [pageName, content]);

  return null; // This component doesn't render anything
}