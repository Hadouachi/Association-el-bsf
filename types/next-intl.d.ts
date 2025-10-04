import type { Pathnames } from 'next-intl/navigation';

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/activities': '/activities',
  '/news': '/news',
  '/programs': '/programs',
  '/contact': '/contact',
} satisfies Pathnames<typeof pathnames>;

export type AppPathnames = keyof typeof pathnames; 