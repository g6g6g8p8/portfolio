import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Create mailto URL
    const mailtoUrl = `mailto:giuliopinotti@me.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Message from: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoUrl;

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full p-2 focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
      >
        <Send size={16} /> Send Message
      </button>
    </form>
  );
}
