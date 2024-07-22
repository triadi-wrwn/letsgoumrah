import MainRoutes from '@/main-routes';
import './App.css';
import { useLocation } from 'react-router-dom';
import useDocumentTitle from '@/lib/hooks/use-document-title';
import { tabTitleConverter } from '@/lib/utility';

function App() {
  const location = useLocation();
  let newTitle = tabTitleConverter('Let`s Go Umrah', location.pathname, 'CMS Application');
  useDocumentTitle(newTitle);

  return <MainRoutes />;
}

export default App;
