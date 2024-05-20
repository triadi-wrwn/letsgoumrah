import { SidebarProps } from './sidebar.type';
import { NavLink } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui-base/accordion';
import { Button } from '@/components/ui-base/button';
import { ScrollArea } from '@/components/ui-base/scrollarea';
import { cn } from '@/lib/utility/cn';
import { Icons } from '@/lib/icons/icons';
import useSidebar from '@/components/layout/sidebar/use-sidebar';
import { useTheme } from '@/lib/providers/theme.provider';
import { useEffect, useState } from 'react';
import SidebarMini from '@/components/layout/sidebar/sidebar-mini';
import { useAuthContext } from '@/lib/contexts/auth-context';

const Sidebar = ({ className, menus }: SidebarProps) => {
  const { handleLogout, lastPath, secondLastPath } = useSidebar();
  const { collapsed } = useTheme();
  const [openedAcc, setOpenedAcc] = useState<string[]>(['']);
  const { currentUser } = useAuthContext();
  useEffect(() => {
    if (collapsed) {
      setOpenedAcc(['']);
    }
  }, [collapsed]);
  const userMenus = currentUser?.privilege?.menus || [];

  const listMenu = menus.map(menu => {
    if (menu.label == 'Dashboard' || menu.label == 'Logout') {
      return menu;
    }
    const filteredChildrens = menu.childrens.filter(childMenu => {
      const allowedMenu = userMenus.find(userMenu => userMenu.menu_name === childMenu.label && userMenu.allow_read);
      return !!allowedMenu;
    });

    return {
      ...menu,
      childrens: filteredChildrens
    };
  });

  const filteredMenus = listMenu.filter(side => {
    if (side.label == 'Dashboard' || side.label == 'Logout') {
      return side;
    }

    if (side.childrens.length > 0) return side;
  });

  return (
    <div className={cn(className, collapsed ? 'w-16' : 'w-80', 'bg-[#080F1F] transition-all')}>
      <Button variant="link" className="w-full items-center justify-start h-14 ml-3 px-0 text-2xl hover:no-underline">
        <div className={cn(collapsed ? 'w-12' : 'w-full', 'h-full relative overflow-hidden')}>
          <Icons.HinoLogoWhiteFull className="h-12 w-40 absolute " />
        </div>
      </Button>
      <ScrollArea className="h-[calc(100vh-3.5rem)] px-1">
        <div className="space-y-4 px-1 pt-2 pb-4 relative h-fit">
          <div
            className={cn(
              collapsed ? 'opacity-100 visible overflow-hidden' : 'opacity-0 invisible',
              'transition-all top-[1.5rem] px-4 absolute'
            )}
          >
            {filteredMenus.map(menu => (
              <SidebarMini key={menu.label} menu={menu} />
            ))}
          </div>
          <div
            className={cn(
              collapsed ? 'opacity-0 invisible' : 'opacity-100 visible',
              'space-y-1 text-white text-opacity-70 transition-all'
            )}
          >
            {filteredMenus.map(menu =>
              menu.childrens.length ? (
                <Accordion
                  key={menu.label}
                  type="multiple"
                  className="px-4"
                  value={openedAcc}
                  onValueChange={e => setOpenedAcc(e)}
                >
                  <AccordionItem value={menu.pathname} className="border-0">
                    <AccordionTrigger className="justify-between hover:no-underline py-2">
                      <div className="flex items-center font-normal">
                        {menu.icon}
                        {menu.label}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-5 pb-2">
                      {menu.childrens.map(childMenu => (
                        <NavLink key={childMenu.label} to={`./${menu.pathname}/${childMenu.pathname}`}>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start hover:bg-gray-800 hover:text-white font-normal',
                              lastPath === childMenu.pathname || secondLastPath === childMenu.pathname
                                ? 'text-white font-bold'
                                : ''
                            )}
                          >
                            {childMenu.icon}
                            {childMenu.label}
                          </Button>
                        </NavLink>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Button
                  key={menu.label}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start hover:bg-gray-800 hover:text-white font-normal p-0',
                    lastPath === menu.pathname || (!menu.pathname && lastPath === 'dashboard')
                      ? 'text-white font-bold'
                      : ''
                  )}
                  onClick={() => handleLogout(menu.pathname)}
                >
                  {menu.pathname === 'logout' ? (
                    <div className="flex w-full px-4 py-2">
                      {menu.icon}
                      {menu.label}
                    </div>
                  ) : (
                    <NavLink to={menu.pathname ? `./${menu.pathname}` : ''} className="flex w-full px-4 py-2">
                      {menu.icon}
                      {menu.label}
                    </NavLink>
                  )}
                </Button>
              )
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
