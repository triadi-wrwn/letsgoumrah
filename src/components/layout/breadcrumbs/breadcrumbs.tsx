import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Crumb from './crumb';

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = useMemo(() => {
    const asPathWithoutQuery = location.pathname.split('?')[0];
    const asPathNestedRoutes = asPathWithoutQuery.split('/').filter(v => v.length > 0);

    let crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = `/${asPathNestedRoutes.slice(0, idx + 1).join('/')}`;
      const idPath = +subpath;
      let subpathDisplay = idPath
        ? 'Detail'
        : (subpath.charAt(0).toUpperCase() + subpath.slice(1))?.replaceAll('-', ' ');

      return {
        href,
        text: subpathDisplay
      };
    });
    crumblist = crumblist.filter(el => el.text !== 'Master data');
    return [...crumblist];
  }, [location.pathname]);
  return (
    <div>
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={crumb.href} last={idx === breadcrumbs.length - 1} />
      ))}
    </div>
  );
};

export default Breadcrumbs;
