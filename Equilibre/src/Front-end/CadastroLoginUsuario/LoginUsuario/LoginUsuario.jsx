import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginUsuario.css';

const LoginUsuario = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função de login
  const login = (email, senha) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.senha === senha);
    
    if (foundUser) {
      // Remover senha antes de salvar no localStorage
      const userToSave = { ...foundUser, senha: undefined };
      localStorage.setItem('currentUser', JSON.stringify(userToSave));
      return { success: true, user: foundUser };
    } else {
      return { success: false, error: 'Email ou senha incorretos' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.senha) {
      setErrors({ geral: 'Preencha todos os campos' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = login(formData.email, formData.senha);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ geral: result.error });
      }
    } catch (error) {
      setErrors({ geral: 'Erro ao fazer login' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Entrar</h1>
      
      {errors.geral && (
        <div className="error-message">{errors.geral}</div>
      )}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
        </div>
        
        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      <p className="register-link">
        Não tem uma conta? <Link to="/CadastroUsuario">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default LoginUsuario;