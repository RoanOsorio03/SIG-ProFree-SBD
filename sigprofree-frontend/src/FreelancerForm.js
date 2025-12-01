
import React, { useState } from 'react';
import axios from 'axios';

const FreelancerForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        especialidade: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:3001/api/freelancers', formData);
            
            setMessage(response.data.message || 'Freelancer cadastrado com sucesso!');
            setIsError(false);
            setFormData({ nome: '', email: '', especialidade: '' });
        } catch (error) {
            console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.message || 'Erro desconhecido ao cadastrar.');
            setIsError(true);
        }
    };

    return (
        <div style={{ padding: '20px', border: '2px solid #000020', borderRadius: '5px', maxWidth: '400px', margin: '20px auto' }}>
            <h2>Cadastrar Novo Freelancer (CREATE)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required 
                       style={{ padding: '8px', border: '1px solid #ddd' }}/>
                
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                       style={{ padding: '8px', border: '1px solid #ddd' }}/>
                
                <label>Especialidade:</label>
                <input type="text" name="especialidade" value={formData.especialidade} onChange={handleChange} required 
                       style={{ padding: '8px', border: '1px solid #ddd' }}/>
                
                <button type="submit" 
                        style={{ marginTop: '15px', padding: '10px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold'}}>
                    Cadastrar
                </button>
            </form>

            {/* Exibe a mensagem de sucesso ou erro */}
            {message && (
                <p style={{ color: isError ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default FreelancerForm;