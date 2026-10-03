import homeEn from '@/domains/home/messages/en.json';
import homeEs from '@/domains/home/messages/es.json';
import notFoundEn from '@/domains/not-found/messages/en.json';
import notFoundEs from '@/domains/not-found/messages/es.json';
import projectsEn from '@/domains/projects/messages/en.json';
import projectsEs from '@/domains/projects/messages/es.json';
import writingEn from '@/domains/writing/messages/en.json';
import writingEs from '@/domains/writing/messages/es.json';

import contentListEn from '@/shared/ui/content-list/messages/en.json';
import contentListEs from '@/shared/ui/content-list/messages/es.json';
import dockEn from '@/shared/ui/dock/messages/en.json';
import dockEs from '@/shared/ui/dock/messages/es.json';
import listPageEn from '@/shared/ui/list-page/messages/en.json';
import listPageEs from '@/shared/ui/list-page/messages/es.json';

export const messages = {
  en: {
    home: homeEn,
    domains: {
      projects: projectsEn,
      writing: writingEn,
      notFound: notFoundEn
    },
    shared: {
      contentList: contentListEn,
      listPage: listPageEn,
      dock: dockEn
    }
  },
  es: {
    home: homeEs,
    domains: {
      projects: projectsEs,
      writing: writingEs,
      notFound: notFoundEs
    },
    shared: {
      contentList: contentListEs,
      listPage: listPageEs,
      dock: dockEs
    }
  }
} as const;
