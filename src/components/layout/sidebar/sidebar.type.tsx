import React from 'react';

export type Menu = {
  label: string;
  pathname: string;
  icon?: React.JSX.Element;
  childrens: Menu[];
};

export type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  menus: Menu[];
};
