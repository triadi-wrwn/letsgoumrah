import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui-base/avatar';

import SidebarToggle from '@/components/ui-group/sidebar-toggle/sidebar-toggle';
import NotificationTopbar from '@/components/ui-group/topbar-notification/topbar-notification';
// import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useAuthContext } from '@/lib/contexts/auth-context';

const Topbar = () => {
  const user = useAuthContext();
  return (
    <div className="h-16 py-3 px-4 flex justify-between items-center bg-[#080F1F]">
      {/* <Breadcrumbs /> */}
      <SidebarToggle />

      <div className="flex items-center gap-6">
        <NotificationTopbar />
        <Avatar>
          <AvatarImage
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
            alt="@shadcn"
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="text-white text-sm">{user.currentUser?.employee_name}</div>
          <div className="text-white text-sm text-opacity-70">{user.currentUser?.group_name}</div>
        </div>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="bottom" sideOffset={10} collisionPadding={{ right: 20 }}>
          <DropdownMenuLabel>{user.currentUser?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
};

export default Topbar;
