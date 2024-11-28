import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category?: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Playlist',
    icon: 'Tv',
    label: 'Playlist',
    children: [
      {
        title: 'Stories',
        href: '/dashboard/stories',
        icon: 'SquareMousePointer',
        label: 'Stories'
      },
      {
        title: 'Product',
        href: '/dashboard/product',
        icon: 'product',
        label: 'product'
      }
    ]
  },
];
