import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';
import { defineNextConfig } from '@ale0aranda/rules/next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = defineNextConfig({});

export default withNextIntl(nextConfig);
