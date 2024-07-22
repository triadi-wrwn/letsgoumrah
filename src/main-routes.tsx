import PageNotFound from '@/components/layout/error/page-not-found';
import MainLayout from '@/components/layout/mainlayout';
import ProtectedRoute from '@/config/protected-route';
import Authentication from '@/features/authentication';
import Dashboard from '@/features/dashboard';

import UserManagement from '@/features/setup-config/user-management';
import FormUser from '@/features/setup-config/user-management/components/form';
import DetailUser from '@/features/setup-config/user-management/detail';
import { PAGE_CHILD_URLS, PAGE_PARAMS, PAGE_URLS } from '@/lib/constants/page-urls';
import { AuthProvider } from '@/lib/contexts/auth-context';
import { Routes, Route, Navigate } from 'react-router-dom';
import OrganizationStructure from './features/organization-structure';

const MainRoutes = () => {
  const {
    AUTH: { LOGIN },
    DASHBOARD,
    SETUP_CONFIG: { SETUP_CONFIG_INDEX, USERS },
    ORGANIZATION_STRUCTURE
  } = PAGE_URLS;

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to={LOGIN} replace />} />
        <Route path={LOGIN} element={<Authentication />} />
        <Route path={ORGANIZATION_STRUCTURE} element={<OrganizationStructure />} />
        <Route path={DASHBOARD} element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path={SETUP_CONFIG_INDEX}>
              <Route path={USERS}>
                <Route path="" element={<UserManagement />} />
                <Route path={PAGE_CHILD_URLS.CREATE} element={<FormUser />} />
                <Route path={`${PAGE_CHILD_URLS.UPDATE}/${PAGE_PARAMS.ID}`} element={<FormUser />} />
                <Route path={`${PAGE_CHILD_URLS.DETAIL}/${PAGE_PARAMS.ID}`} element={<DetailUser />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default MainRoutes;
