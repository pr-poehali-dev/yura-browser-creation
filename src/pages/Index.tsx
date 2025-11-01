import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Index() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Привет! Я встроенный AI-ассистент. Чем могу помочь?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', text: inputValue },
      { role: 'ai', text: 'Отличный вопрос! Я анализирую информацию и помогу вам с этим.' }
    ]);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] text-white">
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold">NovaBrowser</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="hover:text-[#00D9FF] transition-colors">Главная</a>
            <a href="#download" className="hover:text-[#00D9FF] transition-colors">Скачать</a>
            <a href="#community" className="hover:text-[#00D9FF] transition-colors">Сообщество</a>
          </div>
          
          <Button className="bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] hover:opacity-90 text-white border-0">
            Скачать
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 glass rounded-full text-sm text-[#00D9FF] mb-4">
                🚀 Браузер будущего уже здесь
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Браузер со встроенным
                <span className="block bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] bg-clip-text text-transparent glow-text">
                  AI-ассистентом
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Революционный браузер с искусственным интеллектом, который помогает вам работать быстрее, эффективнее и безопаснее
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] hover:opacity-90 text-white border-0 px-8 glow-border">
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать бесплатно
                </Button>
                <Button size="lg" variant="outline" className="glass border-[#00D9FF] text-white hover:bg-[#00D9FF]/10">
                  <Icon name="PlayCircle" size={20} className="mr-2" />
                  Смотреть демо
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-[#00D9FF]">5M+</div>
                  <div className="text-sm text-gray-400">Пользователей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#8B5CF6]">150+</div>
                  <div className="text-sm text-gray-400">Стран</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00D9FF]">4.9★</div>
                  <div className="text-sm text-gray-400">Рейтинг</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] rounded-3xl opacity-20 blur-2xl"></div>
              <Card className="relative glass border-[#00D9FF]/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-400 ml-4">AI Ассистент</span>
                </div>
                
                <div className="space-y-4 h-64 overflow-y-auto mb-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                          <Icon name="Sparkles" size={16} />
                        </div>
                      )}
                      <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                        msg.role === 'ai' 
                          ? 'bg-white/5 border border-white/10' 
                          : 'bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6]'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Спросите что-нибудь..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#00D9FF] transition-colors"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] hover:opacity-90 border-0"
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Возможности будущего
            </h2>
            <p className="text-xl text-gray-400">Технологии, которые меняют правила игры</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Brain',
                title: 'AI-ассистент',
                description: 'Умный помощник, который понимает контекст и помогает в реальном времени'
              },
              {
                icon: 'Zap',
                title: 'Молниеносная скорость',
                description: 'Оптимизированный движок для мгновенной загрузки страниц'
              },
              {
                icon: 'Shield',
                title: 'Максимальная защита',
                description: 'Встроенный VPN и блокировка трекеров для вашей приватности'
              },
              {
                icon: 'Workflow',
                title: 'Синхронизация',
                description: 'Ваши данные всегда с вами на всех устройствах'
              },
              {
                icon: 'Palette',
                title: 'Персонализация',
                description: 'Настройте браузер под себя с помощью тем и расширений'
              },
              {
                icon: 'Globe',
                title: 'Веб 3.0',
                description: 'Поддержка блокчейна и децентрализованных приложений'
              }
            ].map((feature, idx) => (
              <Card key={idx} className="glass border-white/10 p-6 hover:border-[#00D9FF]/50 transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center mb-4 group-hover:glow-border transition-all">
                  <Icon name={feature.icon} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Скачать для всех платформ
          </h2>
          <p className="text-xl text-gray-400 mb-12">Доступно на Windows, macOS, Linux, iOS и Android</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { platform: 'Windows', icon: 'Monitor', version: 'v2.0.1' },
              { platform: 'macOS', icon: 'Apple', version: 'v2.0.1' },
              { platform: 'Linux', icon: 'Terminal', version: 'v2.0.1' }
            ].map((platform, idx) => (
              <Card key={idx} className="glass border-white/10 p-6 hover:border-[#00D9FF]/50 transition-all cursor-pointer">
                <Icon name={platform.icon} size={48} className="mx-auto mb-4 text-[#00D9FF]" />
                <h3 className="text-2xl font-bold mb-2">{platform.platform}</h3>
                <p className="text-sm text-gray-400 mb-4">{platform.version}</p>
                <Button className="w-full bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] hover:opacity-90 border-0">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Присоединяйтесь к сообществу
            </h2>
            <p className="text-xl text-gray-400">Миллионы пользователей выбирают NovaBrowser</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { count: '5M+', label: 'Активных пользователей', icon: 'Users' },
              { count: '150+', label: 'Стран мира', icon: 'Globe' },
              { count: '1M+', label: 'Загрузок в месяц', icon: 'Download' },
              { count: '24/7', label: 'Поддержка', icon: 'MessageCircle' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon} size={32} />
                </div>
                <div className="text-3xl font-bold text-[#00D9FF] mb-2">{stat.count}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass border-white/10 p-6">
              <Icon name="Github" size={32} className="text-[#00D9FF] mb-4" />
              <h3 className="text-xl font-bold mb-2">Open Source</h3>
              <p className="text-gray-400 mb-4">Исходный код доступен на GitHub</p>
              <Button variant="outline" className="glass border-[#00D9FF] text-white hover:bg-[#00D9FF]/10">
                Посмотреть →
              </Button>
            </Card>

            <Card className="glass border-white/10 p-6">
              <Icon name="MessageSquare" size={32} className="text-[#8B5CF6] mb-4" />
              <h3 className="text-xl font-bold mb-2">Форум</h3>
              <p className="text-gray-400 mb-4">Обсуждайте идеи с другими пользователями</p>
              <Button variant="outline" className="glass border-[#8B5CF6] text-white hover:bg-[#8B5CF6]/10">
                Присоединиться →
              </Button>
            </Card>

            <Card className="glass border-white/10 p-6">
              <Icon name="Youtube" size={32} className="text-[#00D9FF] mb-4" />
              <h3 className="text-xl font-bold mb-2">Обучение</h3>
              <p className="text-gray-400 mb-4">Видео-уроки и руководства</p>
              <Button variant="outline" className="glass border-[#00D9FF] text-white hover:bg-[#00D9FF]/10">
                Смотреть →
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">NovaBrowser</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#00D9FF] transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="hover:text-[#00D9FF] transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="hover:text-[#00D9FF] transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="hover:text-[#00D9FF] transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2025 NovaBrowser. Все права защищены
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}