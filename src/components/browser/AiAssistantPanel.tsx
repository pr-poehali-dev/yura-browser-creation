import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Message {
  role: string;
  text: string;
}

interface AiAssistantPanelProps {
  aiMessages: Message[];
  aiInput: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  onQuickAction: (message: string) => void;
}

export default function AiAssistantPanel({ 
  aiMessages, 
  aiInput, 
  onInputChange, 
  onSend, 
  onClose,
  onQuickAction 
}: AiAssistantPanelProps) {
  return (
    <div className="w-96 bg-[#0d1128] border-l border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center">
            <Icon name="Sparkles" size={16} />
          </div>
          <div>
            <h3 className="font-bold">AI Ассистент</h3>
            <p className="text-xs text-gray-400">Готов помочь</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/5 rounded p-1 transition-colors"
        >
          <Icon name="X" size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {aiMessages.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center mx-auto">
              <Icon name="Sparkles" size={32} />
            </div>
            <div>
              <h4 className="font-bold mb-2">Чем могу помочь?</h4>
              <p className="text-sm text-gray-400">Задайте любой вопрос</p>
            </div>
            <div className="space-y-2">
              {[
                'Открой Google',
                'Открой YouTube',
                'Что ты умеешь?',
                'Помоги найти информацию'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickAction(suggestion)}
                  className="block w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          aiMessages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={16} />
                </div>
              )}
              <div className={`px-4 py-2 rounded-2xl max-w-[85%] ${
                msg.role === 'ai'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6]'
              }`}>
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Спросите что-нибудь..."
            value={aiInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
          />
          <Button
            onClick={onSend}
            className="bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] hover:opacity-90 border-0 h-10 w-10 p-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
