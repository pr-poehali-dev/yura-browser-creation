import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface InstallationScreenProps {
  installProgress: number;
}

export default function InstallationScreen({ installProgress }: InstallationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] text-white flex items-center justify-center p-6">
      <Card className="glass border-[#00D9FF]/30 p-8 max-w-2xl w-full animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-4 glow-border">
            <Icon name="Download" size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Установка NovaBrowser</h2>
          <p className="text-gray-400">Пожалуйста, подождите...</p>
        </div>

        <div className="space-y-4 mb-6">
          <Progress value={installProgress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>Прогресс установки</span>
            <span>{installProgress}%</span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            {installProgress > 10 && <div className="flex items-center gap-2"><Icon name="Check" size={16} className="text-green-500" /> Проверка системы</div>}
            {installProgress > 30 && <div className="flex items-center gap-2"><Icon name="Check" size={16} className="text-green-500" /> Распаковка файлов</div>}
            {installProgress > 60 && <div className="flex items-center gap-2"><Icon name="Check" size={16} className="text-green-500" /> Установка компонентов</div>}
            {installProgress > 90 && <div className="flex items-center gap-2"><Icon name="Check" size={16} className="text-green-500" /> Настройка браузера</div>}
          </div>
        </div>
      </Card>
    </div>
  );
}
