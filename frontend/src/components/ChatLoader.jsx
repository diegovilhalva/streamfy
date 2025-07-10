import { LoaderIcon } from 'lucide-react';

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <LoaderIcon className="animate-spin size-10 text-primary" />
      <p className="text-lg font-medium text-base-content">Conectando ao chat...</p>
    </div>
  );
}

export default ChatLoader;
