import { Link } from 'react-router-dom';

const Crumb = (props: { text: string; href: string; last: boolean }) => {
  const { text, href, last = false } = props;
  if (last) {
    return <div className="text-sm font-semibold text-gray-400 inline-block">{text}</div>;
  }

  return (
    <>
      <Link to={href} className="inline-block text-sm font-semibold text-gray-500">
        {text === 'dashboard' ? 'dashboard' : text}
      </Link>
      <span className="mx-2 text-gray-300">/</span>
    </>
  );
};

export default Crumb;
