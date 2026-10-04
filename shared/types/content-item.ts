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
