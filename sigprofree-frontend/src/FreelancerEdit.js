import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FreelancerEdit = ({ freelancerId, onSave }) => { 
    const [formData, setFormData] = useState({ nome: '', email: '', especialidade: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFreelancer = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/freelancers/${freelancerId}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                setMessage('Erro ao carregar dados para edição.');
                setLoading(false);
            }
        };

        if (freelancerId) {
            fetchFreelancer();
        }
    }, [freelancerId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/freelancers/${freelancerId}`, formData);
            
            setMessage('Freelancer atualizado com sucesso!');
            onSave(); 

        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro ao atualizar dados.');
        }
    };

    if (loading) return <div>Carregando dados para edição...</div>;

    return (
        <div style={{ padding: '20px', border: '1px solid #000020', borderRadius: '5px', maxWidth: '400px', margin: '20px auto' }}>
            <h2>Editar Freelancer (UPDATE) - ID: {freelancerId}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                
                <label>E-mail:</label>
                <input type="email" name="email" value={formData.email} disabled style={{ backgroundColor: '#f0f0f0' }}/>
                
                <label>Especialidade:</label>
                <input type="text" name="especialidade" value={formData.especialidade} onChange={handleChange} required />
                
                <button type="submit" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold' }}>
                    Salvar Alterações
                </button>
            </form>
            {message && <p style={{ color: 'green', marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
};

export default FreelancerEdit;