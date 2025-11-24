import React from 'react';
import Input from './Input';
import Button from './Button';
import { login, signup, saveToken } from '../services/authService';

interface Props {
  onClose: () => void;
  onAuthSuccess: (user: { id: string; email: string; name?: string }) => void;
}

const AuthModal: React.FC<Props> = ({ onClose, onAuthSuccess }) => {
  const [isSignup, setIsSignup] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSignup) {
        const res = await signup(email, password, name || undefined);
        saveToken(res.token);
        onAuthSuccess(res.user);
      } else {
        const res = await login(email, password);
        saveToken(res.token);
        onAuthSuccess(res.user);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4">{isSignup ? 'Create account' : 'Sign in'}</h3>
        <form onSubmit={submit} className="flex flex-col gap-3">
          {isSignup && (
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
          )}
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
          <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 mt-2">
            <Button type="submit" isLoading={loading}>{isSignup ? 'Sign up' : 'Sign in'}</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          {isSignup ? (
            <span>Already have an account? <button onClick={() => setIsSignup(false)} className="text-primary-600 underline">Sign in</button></span>
          ) : (
            <span>Don't have an account? <button onClick={() => setIsSignup(true)} className="text-primary-600 underline">Create one</button></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
