'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useTimeout } from '@/shared/hooks/use-timeout';
import { copyToClipboard } from '@/shared/lib/clipboard';
import { cn } from '@/shared/lib/cn';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  'data-language'?: string;
};

export function CodeBlock({ 'data-language': language, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('domains.writing.actions');
  const resetTimer = useTimeout();

  async function handleCopy() {
    const code = preRef.current?.textContent ?? '';
    const success = await copyToClipboard(code);
    if (!success) return;

    setCopied(true);
    resetTimer.clear();
    resetTimer.set(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-border border-b px-4 py-2">
        <span className="font-medium font-mono text-muted text-xs">{language ?? 'text'}</span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? t('copied') : t('copy')}
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1 font-mono text-muted text-xs transition-colors hover:bg-border/40 hover:text-fg"
        >
          {copied ? (
            <Check
              aria-hidden
              size={13}
            />
          ) : (
            <Copy
              aria-hidden
              size={13}
            />
          )}
          {copied ? t('copied') : t('copy')}
        </button>
      </div>

      <pre
        ref={preRef}
        {...props}
        className={cn(
          props.className,
          'm-0 overflow-x-auto rounded-none border-0 bg-transparent p-4 text-sm'
        )}
      />
    </div>
  );
}
