import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="page notfound">
      <div className="container notfound__inner">
        <p className="mono">Error 404</p>
        <h1 className="display display--xl notfound__title">
          This page shipped
          <br />
          <span className="serif serif--accent">without a route.</span>
        </h1>
        <p className="body-lg">
          The URL you followed does not exist on this site — it may have been renamed, or the link was
          mistyped.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn">
            Back home <ArrowRight size={15} />
          </Link>
          <Link to="/work" className="btn btn--ghost">
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
