import {
  ShoppingCartIcon,
  ChartBarIcon,
  CreditCardIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  SettingIcon,
  SquareStack3DIcon,
  StartFillHalfIcon,
  UserGroupIcon
} from '@/components/Icons'

export const ROUTES = [
  {
    name: 'Dashboard',
    icon: <RectangleStackIcon />,
    links: [
      { name: 'Sales Analytics', path: '/' },
      { name: 'Sellers List', path: '/sellers-list' },
      { name: 'Sellers Table', path: '/sellers-table' },
      { name: 'Sellers Grid', path: '/sellers-grid' },
      { name: 'Seller Profile', path: '/seller-profile' },
      { name: 'Revenue by Period', path: '/revenue-by-period' }
    ]
  },
  {
    name: 'Products',
    icon: <RectangleGroupIcon />,
    links: [
      { name: 'Top Products', path: '/top-products' },
      { name: 'Products Grid', path: '/products-grid' },
      { name: 'Products Management', path: '/products-management' },
      { name: 'Product Editor', path: '/product-editor' },
      { name: 'Banners', path: '/banners' }
    ]
  },
  {
    name: 'Orders',
    icon: <ShoppingCartIcon />,
    path: '/orders'
  },
  {
    name: 'Statistics',
    icon: <ChartBarIcon />,
    path: '/statistics'
  },
  {
    name: 'Reviews',
    icon: <StartFillHalfIcon />,
    path: '/reviews'
  },
  {
    name: 'Customers',
    icon: <UserGroupIcon />,
    path: '/customers'
  },
  {
    name: 'Transactions',
    icon: <CreditCardIcon />,
    path: '/transactions',
    qty: 279
  },
  {
    name: 'Pages',
    icon: <SquareStack3DIcon />,
    links: [
      { name: 'Login', path: '/login' },
      { name: 'Page 404', path: '/404' }
    ]
  },
  {
    name: 'Profile',
    icon: <SettingIcon />,
    links: [
      { name: 'Profile', path: '/profile' },
      { name: 'Connected Apps', path: '/connected-apps' }
    ]
  }
]
