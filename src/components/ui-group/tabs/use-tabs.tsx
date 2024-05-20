import { useEffect, useRef, useState } from 'react';

const useTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleTabChange = (idx: number) => {
    setActiveTabIndex(idx);
  };

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return {
    tabsRef,
    activeTabIndex,
    tabUnderlineWidth,
    tabUnderlineLeft,
    handleTabChange
  };
};

export default useTabs;
