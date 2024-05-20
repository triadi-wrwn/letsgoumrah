import { TabsProps } from './tabs.types';
import { cn } from '@/lib/utility';
import useTabs from '@/components/ui-group/tabs/use-tabs';

const Tabs = (props: TabsProps) => {
  const { data, onChange } = props;
  const { tabsRef, handleTabChange, activeTabIndex, tabUnderlineLeft, tabUnderlineWidth } = useTabs();

  return (
    <div>
      <div className="relative my-4">
        <div className="flex space-x-3 border-b">
          {data.map((tab, idx) => {
            return (
              <button
                type="button"
                key={tab.id}
                ref={el => {
                  if (el) {
                    tabsRef.current[idx] = el;
                  }
                }}
                className="pt-2 pb-3 px-2 font-normal text-sm"
                onClick={() => {
                  handleTabChange(idx);
                  onChange && onChange(tab);
                }}
              >
                <span className={cn(activeTabIndex === idx ? 'text-red-600 ' : ' text-primary ')}>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <span
          className="absolute bottom-0 rounded block h-[2px] bg-red-600 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className={cn(data[activeTabIndex].content ? 'py-4' : 'hidden')}>
        <div>{data[activeTabIndex].content}</div>
      </div>
    </div>
  );
};

export default Tabs;
