import React, { useState } from 'react'; 
import './App.css'; 
import ProjetoList from './ProjetoList'; 
import FreelancerForm from './FreelancerForm'; 
import FreelancerEdit from './FreelancerEdit'; 

function App() {
    const [freelancerIdToEdit, setFreelancerIdToEdit] = useState(1); 

    const handleEditSave = () => {
        alert('Edição salva! A lista seria recarregada aqui.');
    };

    return (
      <div className="App" style={{ backgroundColor: 'white' }}> {/* Fundo Branco */}
        
        <header style={{ backgroundColor: '#000020', color: 'white', padding: '20px 0', borderBottom: '5px solid #FFFFFF' }}>
          <h1>SIG-ProFree</h1>
          <p>Sistema de Gerenciamento de Projetos para Freelancers</p>
        </header>
        
        <main style={{ padding: '20px' }}>
          <FreelancerForm /> 
          
          <hr style={{ margin: '40px 0', borderColor: '#ccc' }} />

          {/* UPDATE: Edição de Freelancer (Demonstração) */}
          <FreelancerEdit 
              freelancerId={freelancerIdToEdit} 
              onSave={handleEditSave}
          />
          
          <hr style={{ margin: '40px 0', borderColor: '#ccc' }} />
          
          {/* READ/DELETE: Lista de Clientes */}
          <ProjetoList /> 
          
        </main>
        
        <footer>
          <p style={{ marginTop: '30px', color: 'white', padding: '10px 0', backgroundColor: '#000020' }}>
            Trabalho SBD - UERJ
          </p>
        </footer>
      </div>
    );
}

export default App;