import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
import './CadastroUsuario.css';

const CadastroUsuario = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    aceitarTermos: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação simples
    const newErrors = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não conferem';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const result = await register(formData.nome, formData.email, formData.senha);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ geral: result.error });
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Criar Conta</h1>
      
      {errors.geral && (
        <div className="error-message">{errors.geral}</div>
      )}
      
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className={errors.nome ? 'error' : ''}
          />
          {errors.nome && <span className="error-text">{errors.nome}</span>}
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            className={errors.senha ? 'error' : ''}
          />
          {errors.senha && <span className="error-text">{errors.senha}</span>}
        </div>
        
        <div className="form-group">
          <label>Confirmar Senha</label>
          <input
            type="password"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            placeholder="Digite novamente"
            className={errors.confirmarSenha ? 'error' : ''}
          />
          {errors.confirmarSenha && <span className="error-text">{errors.confirmarSenha}</span>}
        </div>
        
        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>
      
      <p className="login-link">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default CadastroUsuario;