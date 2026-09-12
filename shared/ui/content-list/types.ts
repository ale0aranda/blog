export type ViewMode = 'default' | 'compact';

export type ContentItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
  date: string;
  icon?: string;
  tags?: string[];
  type?: 'project' | 'writing';
};

export interface ContentCategory {
  id: string;
  label: string;
  href: string;
}

export interface ContentListProps {
  categories: ContentCategory[];
  itemsByCategory: Record<string, ContentItem[]>;

  defaultCategory?: string;
  defaultViewMode?: ViewMode;
}
