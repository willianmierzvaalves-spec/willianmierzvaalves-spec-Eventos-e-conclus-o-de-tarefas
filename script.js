// --- No Final do script.js ---

const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('#filters .filter-btn');

// ==========================================================
// 🎯 DELEGAÇÃO DE EVENTOS: Gerenciando Cliques na Lista
// ==========================================================

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const taskItem = target.closest('li'); // Encontra o <li> pai da ação

    if (!taskItem) return; // Não é um clique relevante dentro de um <li>

    // 1. Marcar como Concluída
    if (target.classList.contains('complete-btn')) {
        taskItem.classList.toggle('completed');
        applyFilter(); // Re-aplica o filtro para esconder/mostrar se necessário
    }

    // 2. Modo de Edição (Mostrar Input/Botões Salvar/Cancelar)
    else if (target.classList.contains('edit-btn')) {
        const taskTextSpan = taskItem.querySelector('.task-text');
        const editInput = taskItem.querySelector('.edit-input');
        const saveBtn = taskItem.querySelector('.save-btn');
        const cancelBtn = taskItem.querySelector('.cancel-btn');
        const editBtn = target;

        taskItem.classList.add('editing');
        taskTextSpan.style.display = 'none';
        editInput.style.display = 'inline-block';
        editInput.focus(); // Foca no campo para edição

        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
    }

    // 3. Salvar Edição
    else if (target.classList.contains('save-btn')) {
        const taskTextSpan = taskItem.querySelector('.task-text');
        const editInput = taskItem.querySelector('.edit-input');

        const newText = editInput.value.trim();
        if (newText !== "") {
            taskTextSpan.textContent = newText;
        }

        // Finaliza o modo de edição
        exitEditMode(taskItem);
    }

    // 4. Cancelar Edição
    else if (target.classList.contains('cancel-btn')) {
        const editInput = taskItem.querySelector('.edit-input');
        // Restaura o valor do input para o texto atual (taskTextSpan)
        editInput.value = taskItem.querySelector('.task-text').textContent;

        // Finaliza o modo de edição
        exitEditMode(taskItem);
    }

    // 5. Excluir Tarefa
    else if (target.classList.contains('delete-btn')) {
        taskItem.remove();
    }
});

// Função Auxiliar para sair do modo de edição
function exitEditMode(taskItem) {
    const taskTextSpan = taskItem.querySelector('.task-text');
    const editInput = taskItem.querySelector('.edit-input');
    const saveBtn = taskItem.querySelector('.save-btn');
    const cancelBtn = taskItem.querySelector('.cancel-btn');
    const editBtn = taskItem.querySelector('.edit-btn');

    taskItem.classList.remove('editing');
    taskTextSpan.style.display = 'inline-block';
    editInput.style.display = 'none';
    
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}


// ==========================================================
// ⚙️ FILTROS DE TAREFAS
// ==========================================================

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');
        
        // Aplica o filtro
        applyFilter();
    });
});

function applyFilter() {
    const activeFilter = document.querySelector('#filters .filter-btn.active').getAttribute('data-filter');
    const taskItems = taskList.querySelectorAll('li');

    taskItems.forEach(item => {
        switch (activeFilter) {
            case 'all':
                item.style.display = 'flex'; // Mostra todas
                break;
            case 'pending':
                // Mostra se NÃO tem a classe 'completed'
                item.style.display = item.classList.contains('completed') ? 'none' : 'flex';
                break;
            case 'completed':
                // Mostra se TEM a classe 'completed'
                item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

// Opcional: Chama o filtro ao carregar para garantir que o filtro 'Todas' esteja aplicado
applyFilter();