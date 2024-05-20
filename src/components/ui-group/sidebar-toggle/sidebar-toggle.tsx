import { Toggle } from '@/components/ui-base/toggle';
import { useTheme } from '@/lib/providers/theme.provider';
import { TextAlignLeftIcon, TextAlignRightIcon } from '@radix-ui/react-icons';

const SidebarToggle = () => {
  const { collapsed, setCollapsed } = useTheme();
  return (
    <Toggle
      className="hover:bg-primary data-[state=on]:bg-primary"
      aria-label="Toggle collapse"
      onClick={() => setCollapsed(state => !state)}
    >
      {collapsed ? (
        <TextAlignLeftIcon className="h-4 w-4 text-white" />
      ) : (
        <TextAlignRightIcon className="h-4 w-4 text-white" />
      )}
    </Toggle>
  );
};

export default SidebarToggle;
