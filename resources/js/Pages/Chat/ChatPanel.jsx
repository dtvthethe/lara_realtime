import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';

export default function ChatPanel({ user }) {
    return (
        <section className="flex min-h-0 flex-1 flex-col">
            <MessageHeader user={user} />
            <Message user={user} />
            <MessageInput />
        </section>
    );
}
