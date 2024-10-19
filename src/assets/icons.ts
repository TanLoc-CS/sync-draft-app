import React from 'react';

export const DocumentIcon = React.lazy(() => import('@/assets/icons/DocumentIcon'));
export const PlusIcon = React.lazy(() => import('@/assets/icons/PlusIcon'));
export const SearchIcon = React.lazy(() => import('@/assets/icons/SearchIcon'));
export const ShareIcon = React.lazy(() => import('@/assets/icons/ShareIcon'));
export const ToggleSidebarIcon = React.lazy(() => import('@/assets/icons/ToggleSidebarIcon'));


const icons = {
  DocumentIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  ToggleSidebarIcon
};

export default icons;