import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import { menus } from './data/menu';
import Topbar from './topbar/topbar';
import Confirmation from '@/components/ui-group/confirmation/confirmation';
import { ThemeProvider } from '@/lib/providers/theme.provider';
import { AuthProvider } from '@/lib/contexts/auth-context';

const MainLayout = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="kartala-ui-theme">
        <div className="flex bg-[#080F1F]">
          <div className="bg-red-700 h-1 w-full absolute top-0" />
          <Sidebar menus={menus} className="hidden lg:block" />
          <div className="w-full pb-6 pr-4 transition-all">
            <Topbar />
            <div className="min-h-[calc(100%-68px)] px-4 py-6 lg:px-8 rounded-xl bg-white">
              <Outlet />
            </div>
          </div>

          <Confirmation />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MainLayout;
