import { PortableTextBlock } from '@portabletext/types';

/**
 * Extract plain text from PortableText blocks for truncation
 */
export const extractPlainText = (blocks: PortableTextBlock[] | null | undefined): string => {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children
        .map((child: any) => {
          if (typeof child === 'string') {
            return child;
          }
          if (child.text) {
            return child.text;
          }
          return '';
        })
        .join('');
    })
    .join('\n');
};

/**
 * Truncate plain text to a maximum number of characters
 */
export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

