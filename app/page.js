import Link from 'next/link';
import ButtonLink from './components/ButtonLink';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Eurotrash Comedy</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <ButtonLink 
          href="/submit"
          className="text-white font-medium"
          backgroundColor="var(--button)"
          hoverColor="var(--accent)"
        >
          Submit a Struggle
        </ButtonLink>
        <ButtonLink 
          href="/admin"
          className="text-foreground font-medium"
          backgroundColor="var(--secondary-accent)"
          hoverColor="var(--accent)"
        >
          View Struggles (Admin)
        </ButtonLink>
      </div>
    </div>
  );
}