import Icon from '@/components/ui/icon';

interface Tab {
  id: number;
  title: string;
  url: string;
  active: boolean;
}

interface BrowserTabsProps {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (id: number) => void;
  onTabClose: (id: number) => void;
  onAddTab: () => void;
}

export default function BrowserTabs({ tabs, activeTab, onTabClick, onTabClose, onAddTab }: BrowserTabsProps) {
  return (
    <div className="flex items-center gap-1 px-2 pt-2">
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`group flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer transition-all min-w-[200px] max-w-[250px] ${
            activeTab === tab.id
              ? 'bg-[#1a1f3a] border-t border-x border-[#00D9FF]/30'
              : 'bg-[#0d1128] hover:bg-[#0d1128]/80'
          }`}
        >
          <Icon name="Globe" size={14} className="flex-shrink-0" />
          <span className="flex-1 text-sm truncate">{tab.title}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }}
            className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded p-0.5 transition-opacity"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={onAddTab}
        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <Icon name="Plus" size={16} />
      </button>
    </div>
  );
}
