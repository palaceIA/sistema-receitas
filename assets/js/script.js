const API_URL = 'http://localhost:3000';
const form = document.getElementById('form');
const divReceitas = document.getElementById('receitas');

document.addEventListener('DOMContentLoaded', carregarReceitas);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const ingredientes = document.getElementById('ingredientes').value;
    const modo_preparo = document.getElementById('modo_preparo').value;
    const tempo_preparo = document.getElementById('tempo_preparo').value;

    const response = await fetch(`${API_URL}/receitas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            ingredientes,
            modo_preparo,
            tempo_preparo: parseInt(tempo_preparo)
        })
    });

    if (response.ok) {
        alert('Receita adicionada!');
        form.reset();
        carregarReceitas();
    } else {
        alert('Erro ao adicionar receita');
    }
});

async function carregarReceitas() {
    const response = await fetch(`${API_URL}/receitas`);
    const receitas = await response.json();

    divReceitas.innerHTML = '';

    if (receitas.length === 0) {
        divReceitas.innerHTML = '<p>Nenhuma receita ainda!</p>';
        return;
    }

    receitas.forEach(receita => {
        const div = document.createElement('div');
        div.className = 'receita';

        div.innerHTML = `
            <h3>${receita.nome}</h3>
            <p><strong>Ingredientes:</strong> ${receita.ingredientes}</p>
            <p><strong>Modo de preparo:</strong> ${receita.modo_preparo}</p>
            <span class="tempo">${receita.tempo_preparo} min</span>
            
            <div class="acoes">
                <button class="btn-editar" onclick="editarReceita(${receita.id}, '${receita.nome}', '${receita.ingredientes.replace(/'/g, "\\'")}', '${receita.modo_preparo.replace(/'/g, "\\'")}', ${receita.tempo_preparo})">Editar</button>
                <button class="btn-deletar" onclick="deletarReceita(${receita.id})">Deletar</button>
            </div>
        `;

        divReceitas.appendChild(div);
    });
}

async function editarReceita(id, nome, ingredientes, modo_preparo, tempo_preparo) {
    const novoNome = prompt('Novo nome:', nome);
    if (!novoNome) return;

    const novoIngredientes = prompt('Novos ingredientes:', ingredientes);
    if (!novoIngredientes) return;

    const novoModoPreparo = prompt('Novo modo de preparo:', modo_preparo);
    if (!novoModoPreparo) return;

    const novoTempo = prompt('Novo tempo (minutos):', tempo_preparo);
    if (!novoTempo) return;

    const response = await fetch(`${API_URL}/receitas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: novoNome,
            ingredientes: novoIngredientes,
            modo_preparo: novoModoPreparo,
            tempo_preparo: parseInt(novoTempo)
        })
    });

    if (response.ok) {
        alert('Receita atualizada!');
        carregarReceitas();
    } else {
        alert('Erro ao atualizar');
    }
}

async function deletarReceita(id) {
    if (confirm('Tem certeza que quer deletar?')) {
        const response = await fetch(`${API_URL}/receitas/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Receita deletada!');
            carregarReceitas();
        } else {
            alert('Erro ao deletar');
        }
    }
}
