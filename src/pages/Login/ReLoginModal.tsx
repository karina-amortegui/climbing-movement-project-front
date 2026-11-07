import { LoginForm } from "./LoginForm";
import "./ReLoginModal.css";

// displays the shared login form inside a modal

type ReLoginModalProps = {
  onSuccess: () => void;
};

export const ReLoginModal = ({ onSuccess }: ReLoginModalProps) => {
  return (
    <div className="relogin-overlay">
      <section
        className="relogin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="relogin-title"
      >
        <h2 id="relogin-title">Session Expired</h2>

        <p>Please sign in again to continue.</p>

        <LoginForm onSuccess={onSuccess} />
      </section>
    </div>
  );
};