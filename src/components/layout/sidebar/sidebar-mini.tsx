import { Menu } from '@/components/layout/sidebar/sidebar.type';
import useSidebar from '@/components/layout/sidebar/use-sidebar';
import { Button } from '@/components/ui-base/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-base/popover';
import { cn } from '@/lib/utility';
import { NavLink } from 'react-router-dom';

type SidebarMiniProps = {
  menu: Menu;
};
const SidebarMini = ({ menu }: SidebarMiniProps) => {
  const { handleLogout, lastPath, secondLastPath } = useSidebar();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="block p-0 py-[0.65rem] text-white text-opacity-70 cursor-pointer hover:text-white hover:text-opacity-100 hover:bg-transparent"
        >
          {menu.icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 py-2 bg-blackHino text-white text-opacity-70 " side="right" sideOffset={20}>
        <div>
          {menu.childrens.length ? (
            menu.childrens.map(childMenu => (
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
                  {childMenu.label}
                </Button>
              </NavLink>
            ))
          ) : (
            <Button
              key={menu.label}
              variant="ghost"
              className={cn(
                'w-full justify-start hover:bg-gray-800 hover:text-white font-normal p-0',
                lastPath === menu.pathname || (!menu.pathname && lastPath === 'dashboard') ? 'text-white font-bold' : ''
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
                  {menu.label}
                </NavLink>
              )}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SidebarMini;
