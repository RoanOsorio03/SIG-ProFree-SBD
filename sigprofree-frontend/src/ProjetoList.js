import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjetoList = () => {
    const [clientes, setClientes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await axios.delete(`http://localhost:3001/api/clientes/${id}`);
                
                setClientes(clientes.filter(c => c.id_cliente !== id)); 
            } catch (error) {
                alert('Erro ao excluir. O cliente pode ter projetos associados.');
            }
        }
    };

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/clientes'); 
                setClientes(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
                setError('Erro ao carregar os dados. Verifique se o servidor Node.js (Porta 3001) está rodando.');
                setLoading(false);
            }
        };

        fetchClientes();
    }, []); 

    if (loading) return <div>Carregando Projetos e Clientes...</div>;
    if (error) return <div style={{ color: 'red', margin: '20px' }}>{error}</div>;

    return (
        <div style={{ margin: '20px auto', maxWidth: '800px' }}>
            <h2>Lista de Clientes (Teste de Conexão READ/DELETE)</h2> 
            <p style={{ color: '#000020' }}>Integração React &lt;--&gt; Node.js &lt;--&gt; MySQL está OK!</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Telefone</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Ações</th> {/* 🚨 Coluna AÇÕES adicionada */}
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(item => (
                        <tr key={item.id_cliente} style={{ borderBottom: '1px solid #000020' }}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.id_cliente}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.nome}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.telefone}</td>
                            
                            {/* Célula para o botão DELETE */}
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                <button onClick={() => handleDelete(item.id_cliente)} 
                                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjetoList;