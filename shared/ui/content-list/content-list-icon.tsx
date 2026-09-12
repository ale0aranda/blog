'use client';

import Image from 'next/image';

import { FileText, FlaskConical } from 'lucide-react';

type Props = {
  icon: string | undefined;
  type: 'project' | 'writing' | undefined;
  alt: string;
};

export function ContentListIcon({ icon, type, alt }: Props) {
  return (
    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-surface">
      {icon ? (
        <Image src={icon} alt={alt} width={36} height={36} className="size-full object-cover" />
      ) : type === 'project' ? (
        <FlaskConical aria-hidden size={16} strokeWidth={1.5} className="text-fg" />
      ) : (
        <FileText aria-hidden size={16} strokeWidth={1.5} className="text-fg" />
      )}
    </div>
  );
}
