'use client';

// import { Button } from "@repo/ui/button";
// import Image from "next/image";
import { ChangeEvent,  FormEventHandler, useEffect, useState } from "react";
import { startThread, postMessage, getThread } from "./services/api";
import Image from "next/image";

interface Message {
  role: 'user' | 'assistant',
  content: string;
  id?: string;
  runId?: string;
}

const initialMessage: Message = {
  role: 'assistant',
  content: `Hi! I'm your AI home improvement advisor, Sarah. How can I help? 😊`
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  useEffect(() => {
    const threadId = localStorage.getItem('threadId');

    if (threadId) {
      // If previous thread, load messages
      getThread(threadId).then((data) => {
        console.log(data.messages);
        const oldMessages = data?.messages?.map(({ role, content, id, run_id }) => ({
          role,
          content: content?.map(({ text }) => text?.value ?? '')?.join('\n'),
          id,
          runId: run_id,
        }));
        setMessages([...oldMessages, initialMessage]);
      });
      setThreadId(threadId);
    } else {
      startThread().then((data) => {
        localStorage.setItem('threadId', data?.id);
        setThreadId(data?.id);
      });
    }
  }, []);

  const startNewThread = () => {
    setLoading(true);

    // Remove stored thread ID
    localStorage.removeItem('threadId');

    // Remove local thread state
    setThreadId(null);
    setMessages([initialMessage]);

    // Start new thread
    startThread().then((data) => {
      localStorage.setItem('threadId', data?.id);
      setThreadId(data?.id);
      setLoading(false);
    });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.currentTarget.value);
	};

  const sendMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!threadId) {
      return;
    }
    let updatedMessages: Message[] = [{
      role: 'user',
      content: inputValue,
    }, ...messages]

    setMessages(updatedMessages);

    setLoading(true);
    setInputValue('');

    postMessage(threadId, inputValue).then((data) => {
      // Get response and add to messages
      setMessages([{
        role: 'assistant',
        content: data?.content?.map(({ text }) => text?.value).join('\n'),
      }, ...updatedMessages]);
      setLoading(false);
    });
  }

  return (
    <div className="p-lg container">
      <main className="flex flex-col gap-md items-start mb-lg">
        <button type="button" onClick={startNewThread} className="p-sm text-content rounded-lg border border-border-neutral hover:border-interactive hover:text-interactive">
          New thread
        </button>
        <div className="flex flex-col gap-sm items-start w-[100%]">
          {messages?.toReversed()?.map(({ role, content }) => {
            const isUser = role === 'user';
            const boxStyles = isUser ? 'flex-row-reverse self-end' : '';
            const roleStyles = isUser ? 'bg-interactive bg-opacity-low text-content' : 'bg-surface-neutral text-content';

            // console.log('runId', runId)

            return (
              <div 
                key={`${role}:${content.substring(0, 5)}-${content.substring(content.length - 5, content.length)}`}
                className={`flex flex-col gap-sm ${boxStyles}`}
              >
                <div className={"flex gap-s"}>
                  {isUser ? null : (
                    <div className="flex-shrink-0">
                      <Image src="/sarah.webp" alt="Sarah" width={30} height={30} />
                    </div>
                  )}
                  <div className={`flex-grow justify-end p-sm rounded-md ${roleStyles}`}>{content}</div>
                </div>
                {/* {runId ? (
                  <div className="bg-interactive text-interactive-contrast text-body-emphasis p-md rounded-lg">
                    Posted your job to hipages
                  </div>
                 ) : null} */}
              </div>
            );
          })}
        </div>

        {loading? <div className="text-content-muted p-sm text-center">Loading...</div> : null}
      </main>
      <form onSubmit={sendMessage} className="flex gap-sm">
        <input type="text" placeholder="Your message..." value={inputValue} onChange={handleChange} className="bg-surface text-content p-md rounded-sm border-1 border-border-neutral flex-grow" />
        <button type="submit" className="bg-interactive text-interactive-contrast p-md rounded-sm border-1 border-interactive flex-shrink-0">Send</button>
      </form>
    </div>
  );
}
