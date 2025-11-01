import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface NewTabPageProps {
  onNavigate: (url: string) => void;
}

export default function NewTabPage({ onNavigate }: NewTabPageProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-center space-y-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-8 glow-border">
            <Icon name="Sparkles" size={64} className="text-white" />
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            Добро пожаловать в
            <span className="block bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] bg-clip-text text-transparent mt-2">
              NovaBrowser
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ваш умный браузер со встроенным AI-ассистентом готов к работе
          </p>

          <div className="grid md:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto">
            <Card className="glass border-white/10 p-6 hover:border-[#00D9FF]/50 transition-all cursor-pointer group">
              <Icon name="Bookmark" size={40} className="text-[#00D9FF] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">Закладки</h3>
              <p className="text-sm text-gray-400">Быстрый доступ к любимым сайтам</p>
            </Card>
            
            <Card className="glass border-white/10 p-6 hover:border-[#8B5CF6]/50 transition-all cursor-pointer group">
              <Icon name="History" size={40} className="text-[#8B5CF6] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">История</h3>
              <p className="text-sm text-gray-400">Все ваши посещения</p>
            </Card>
            
            <Card className="glass border-white/10 p-6 hover:border-[#00D9FF]/50 transition-all cursor-pointer group">
              <Icon name="Settings" size={40} className="text-[#00D9FF] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">Настройки</h3>
              <p className="text-sm text-gray-400">Персонализация браузера</p>
            </Card>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00D9FF]/10 to-[#8B5CF6]/10 border border-[#00D9FF]/30 rounded-xl p-6">
              <Icon name="Sparkles" size={32} className="text-[#00D9FF]" />
              <div className="text-left">
                <p className="font-bold text-lg">AI-ассистент активен</p>
                <p className="text-sm text-gray-400">Нажмите на кнопку AI в адресной строке или Ctrl+K</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {[
              { name: 'Google', icon: 'Search', url: 'google' },
              { name: 'YouTube', icon: 'Youtube', url: 'youtube' },
              { name: 'GitHub', icon: 'Github', url: 'github' },
              { name: 'ChatGPT', icon: 'MessageSquare', url: 'chatgpt' },
            ].map((site, idx) => (
              <Card
                key={idx}
                className="glass border-white/10 p-4 hover:border-[#00D9FF]/50 transition-all cursor-pointer group"
                onClick={() => onNavigate(site.url)}
              >
                <Icon name={site.icon} size={32} className="text-[#00D9FF] mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-sm">{site.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
