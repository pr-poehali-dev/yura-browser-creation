import { useState, useEffect } from 'react';
import BrowserTabs from './BrowserTabs';
import AddressBar from './AddressBar';
import NewTabPage from './NewTabPage';
import AiAssistantPanel from './AiAssistantPanel';

interface Tab {
  id: number;
  title: string;
  url: string;
  active: boolean;
}

export default function BrowserApp() {
  const [browserUrl, setBrowserUrl] = useState('nova://newtab');
  const [currentPage, setCurrentPage] = useState('newtab');
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'Новая вкладка', url: 'nova://newtab', active: true }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role: string, text: string}[]>([]);
  const [aiInput, setAiInput] = useState('');

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'Новая вкладка',
      url: 'nova://newtab',
      active: false
    };
    setTabs([...tabs.map(t => ({...t, active: false})), newTab]);
    setActiveTab(newTab.id);
    setBrowserUrl('nova://newtab');
    setCurrentPage('newtab');
  };

  const navigateToUrl = (url: string) => {
    setBrowserUrl(url);
    
    if (url.includes('google.com') || url === 'google') {
      setCurrentPage('google');
      const activeTabData = tabs.find(t => t.id === activeTab);
      if (activeTabData) {
        setTabs(tabs.map(t => t.id === activeTab ? {...t, title: 'Google', url: 'https://google.com'} : t));
      }
    } else if (url.includes('youtube.com') || url === 'youtube') {
      setCurrentPage('youtube');
      const activeTabData = tabs.find(t => t.id === activeTab);
      if (activeTabData) {
        setTabs(tabs.map(t => t.id === activeTab ? {...t, title: 'YouTube', url: 'https://youtube.com'} : t));
      }
    } else if (url.includes('github.com') || url === 'github') {
      setCurrentPage('github');
      const activeTabData = tabs.find(t => t.id === activeTab);
      if (activeTabData) {
        setTabs(tabs.map(t => t.id === activeTab ? {...t, title: 'GitHub', url: 'https://github.com'} : t));
      }
    } else if (url.includes('chat.openai.com') || url === 'chatgpt') {
      setCurrentPage('chatgpt');
      const activeTabData = tabs.find(t => t.id === activeTab);
      if (activeTabData) {
        setTabs(tabs.map(t => t.id === activeTab ? {...t, title: 'ChatGPT', url: 'https://chat.openai.com'} : t));
      }
    } else if (url === 'nova://newtab') {
      setCurrentPage('newtab');
    } else {
      setCurrentPage('external');
    }
  };

  const closeTab = (id: number) => {
    const newTabs = tabs.filter(t => t.id !== id);
    if (newTabs.length === 0) {
      window.location.reload();
    } else {
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[0].id);
      }
    }
  };

  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
    
    const userMessage = aiInput;
    setAiInput('');
    setAiMessages([...aiMessages, { role: 'user', text: userMessage }]);
    
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      response = 'Привет! Я AI-ассистент NovaBrowser. Могу помочь с поиском информации, ответить на вопросы, открыть сайты. Что вас интересует?';
    } else if (lowerMessage.includes('открой') && lowerMessage.includes('google')) {
      response = 'Открываю Google для вас...';
      setTimeout(() => navigateToUrl('google'), 500);
    } else if (lowerMessage.includes('открой') && lowerMessage.includes('youtube')) {
      response = 'Открываю YouTube...';
      setTimeout(() => navigateToUrl('youtube'), 500);
    } else if (lowerMessage.includes('открой') && lowerMessage.includes('github')) {
      response = 'Открываю GitHub...';
      setTimeout(() => navigateToUrl('github'), 500);
    } else if (lowerMessage.includes('что ты умеешь') || lowerMessage.includes('что можешь')) {
      response = 'Я могу:\n• Отвечать на ваши вопросы\n• Открывать сайты (Google, YouTube, GitHub, ChatGPT)\n• Помогать с поиском информации\n• Анализировать контент страниц\n• Переводить тексты\n• И многое другое! Просто спросите.';
    } else if (lowerMessage.includes('как дела') || lowerMessage.includes('как ты')) {
      response = 'Отлично! Я всегда готов помочь вам. Чем займёмся?';
    } else if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      response = 'Пожалуйста! Обращайтесь, если понадобится помощь.';
    } else if (lowerMessage.includes('погода')) {
      response = 'Для получения точного прогноза погоды рекомендую открыть специализированный сайт. Могу открыть для вас поисковик?';
    } else if (lowerMessage.includes('перевод') || lowerMessage.includes('переведи')) {
      response = 'Я могу помочь с переводом! Напишите текст и на какой язык нужно перевести.';
    } else if (lowerMessage.includes('найди') || lowerMessage.includes('поиск')) {
      response = 'Ищу информацию по вашему запросу... Рекомендую использовать Google для более подробного поиска. Открыть?';
    } else {
      const responses = [
        `Интересный вопрос о "${userMessage}". Проанализировав запрос, могу сказать, что это требует дополнительного исследования. Хотите, я открою поисковик?`,
        `По поводу "${userMessage}" - я могу помочь найти информацию. Какой именно аспект вас интересует?`,
        `Отличный вопрос! Для ответа на "${userMessage}" мне нужно немного больше контекста. Уточните, пожалуйста.`,
        `Я готов помочь с "${userMessage}". Это связано с веб-поиском, работой с сайтами или чем-то другим?`
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 300);
  };

  const handleQuickAction = (message: string) => {
    setAiMessages([...aiMessages, { role: 'user', text: message }]);
    
    const lowerMessage = message.toLowerCase();
    let response = '';
    
    if (lowerMessage.includes('открой') && lowerMessage.includes('google')) {
      response = 'Открываю Google для вас...';
      setTimeout(() => navigateToUrl('google'), 500);
    } else if (lowerMessage.includes('открой') && lowerMessage.includes('youtube')) {
      response = 'Открываю YouTube...';
      setTimeout(() => navigateToUrl('youtube'), 500);
    } else if (lowerMessage.includes('что ты умеешь')) {
      response = 'Я могу:\n• Отвечать на ваши вопросы\n• Открывать сайты (Google, YouTube, GitHub, ChatGPT)\n• Помогать с поиском информации\n• Анализировать контент страниц\n• Переводить тексты\n• И многое другое! Просто спросите.';
    } else {
      response = 'Конечно! Чем именно я могу вам помочь?';
    }
    
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowAiPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen bg-[#0A0E27] text-white flex flex-col overflow-hidden">
      <div className="bg-[#0d1128] border-b border-white/10">
        <BrowserTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          onTabClose={closeTab}
          onAddTab={addTab}
        />
        <AddressBar
          browserUrl={browserUrl}
          showAiPanel={showAiPanel}
          onUrlChange={setBrowserUrl}
          onNavigate={navigateToUrl}
          onToggleAi={() => setShowAiPanel(!showAiPanel)}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 bg-[#0A0E27] overflow-hidden">
          {currentPage === 'newtab' ? (
            <NewTabPage onNavigate={navigateToUrl} />
          ) : (
            <iframe
              src={
                currentPage === 'google' ? 'https://www.google.com/webhp?igu=1' :
                currentPage === 'youtube' ? 'https://www.youtube.com' :
                currentPage === 'github' ? 'https://github.com' :
                currentPage === 'chatgpt' ? 'https://chat.openai.com' :
                browserUrl
              }
              className="w-full h-full border-0"
              title="Browser Content"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )}
        </div>

        {showAiPanel && (
          <AiAssistantPanel
            aiMessages={aiMessages}
            aiInput={aiInput}
            onInputChange={setAiInput}
            onSend={handleAiSend}
            onClose={() => setShowAiPanel(false)}
            onQuickAction={handleQuickAction}
          />
        )}
      </div>
    </div>
  );
}
