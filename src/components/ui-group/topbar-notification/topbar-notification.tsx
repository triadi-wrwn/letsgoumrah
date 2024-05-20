import { Button } from '@/components/ui-base/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui-base/dropdown';
import { Icons } from '@/lib/icons/icons';

const NotificationTopbar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="focus-visible:ring-0 relative" size="icon">
          <Icons.Bell className="text-primary" />
          <div className="w-[9px] h-[9px] bg-destructive rounded-full absolute top-2 right-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-w-sm"
        side="bottom"
        sideOffset={0}
        collisionPadding={{ right: 20 }}
        align="end"
      >
        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
          <DropdownMenuItem>Notifikasi anda akan tampil di sini</DropdownMenuItem>
          <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationTopbar;
