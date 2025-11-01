import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface AddressBarProps {
  browserUrl: string;
  showAiPanel: boolean;
  onUrlChange: (url: string) => void;
  onNavigate: (url: string) => void;
  onToggleAi: () => void;
}

export default function AddressBar({ browserUrl, showAiPanel, onUrlChange, onNavigate, onToggleAi }: AddressBarProps) {
  return (
    <div className="flex items-center gap-2 p-3">
      <div className="flex items-center gap-1">
        <Button size="sm" variant="ghost" className="text-white h-8 w-8 p-0">
          <Icon name="ChevronLeft" size={18} />
        </Button>
        <Button size="sm" variant="ghost" className="text-white h-8 w-8 p-0">
          <Icon name="ChevronRight" size={18} />
        </Button>
        <Button size="sm" variant="ghost" className="text-white h-8 w-8 p-0">
          <Icon name="RefreshCw" size={16} />
        </Button>
      </div>

      <div className="flex-1 flex items-center gap-2 bg-[#1a1f3a] border border-white/10 rounded-xl px-4 py-2 focus-within:border-[#00D9FF]/50 transition-colors">
        <Icon name="Lock" size={16} className="text-green-500" />
        <input
          type="text"
          value={browserUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          onKeyPress={(e) => { 
            if (e.key === 'Enter') {
              e.preventDefault();
              onNavigate(browserUrl);
            }
          }}
          placeholder="Введите URL или поисковый запрос..."
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <Button
          size="sm"
          onClick={onToggleAi}
          className={`h-7 px-3 ${
            showAiPanel
              ? 'bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6]'
              : 'bg-white/5 hover:bg-white/10'
          } border-0`}
        >
          <Icon name="Sparkles" size={14} className="mr-1" />
          AI
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button size="sm" variant="ghost" className="text-white h-8 w-8 p-0">
          <Icon name="Star" size={16} />
        </Button>
        <Button size="sm" variant="ghost" className="text-white h-8 w-8 p-0">
          <Icon name="Download" size={16} />
        </Button>
        <Button size="sm" variant="ghost" className="text-white h-8 w-8 p-0">
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>
    </div>
  );
}
