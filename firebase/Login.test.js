import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { AuthProvider } from '../../../context/AuthContext';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });
});
