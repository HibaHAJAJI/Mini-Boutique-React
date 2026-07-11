import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-container" style={{ textAlign: 'center', padding: '40px 0' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Oups! La page que vous recherchez n'existe pas.
      </p>
      <Link to="/catalogue" className="btn-submit" style={{ display: 'inline-block', width: 'auto', padding: '12px 24px' }}>
        Retour au catalogue
      </Link>
    </div>
  );
}