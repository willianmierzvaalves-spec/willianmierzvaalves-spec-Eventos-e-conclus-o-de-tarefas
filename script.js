// Pega a lista principal para aplicar a delegação de eventos
const taskList = document.getElementById('taskList');

// --- DELEGAÇÃO DE EVENTOS NA LISTA ---
taskList.addEventListener('click', function(event) {
    const target = event.target;
    
    // Encontra o <li> mais próximo que contém a tarefa
    const listItem = target.closest('.todo-list-item');
    if (!listItem) return; // Se o clique não for dentro de um <li>, ignore

    // 1. Botão de Concluir Tarefa
    if (target.classList.contains('complete-btn')) {
        listItem.classList.toggle('completed');
        // Após a conclusão/desconclusão, aplica o filtro atual
        applyCurrentFilter(); 
    }

    // 2. Botão de Remover Tarefa
    else if (target.classList.contains('delete-btn')) {
        listItem.remove();
        // Não precisa de filtro aqui, a tarefa simplesmente desaparece.
    }

    // 3. Botão de Editar Tarefa
    else if (target.classList.contains('edit-btn')) {
        handleEdit(listItem);
    }
});

// Função de Edição
function handleEdit(listItem) {
    const taskSpan = listItem.querySelector('span');
    const currentText = taskSpan.textContent;

    // Cria um campo de input com o texto atual
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.classList.add('edit-input');

    // Troca o <span> pelo <input>
    listItem.replaceChild(inputField, taskSpan);
    inputField.focus();

    // Lógica para salvar a edição (ao perder o foco ou apertar Enter)
    const saveEdit = () => {
        const newText = inputField.value.trim();
        if (newText !== "") {
            taskSpan.textContent = newText;
        }
        // Troca o <input> de volta pelo <span>
        listItem.replaceChild(taskSpan, inputField);
    };

    inputField.addEventListener('blur', saveEdit); // Salva ao perder o foco
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}
// --- LÓGICA DE FILTROS ---
const filterContainer = document.querySelector('.filter-container');
const filterButtons = document.querySelectorAll('.filter-container button');
let currentFilter = 'all'; // Estado inicial

// Função para aplicar o filtro
function applyFilter(filterType) {
    currentFilter = filterType;
    const items = taskList.querySelectorAll('.todo-list-item');

    items.forEach(item => {
        const isCompleted = item.classList.contains('completed');

        if (filterType === 'all') {
            item.style.display = 'flex';
        } else if (filterType === 'pending' && !isCompleted) {
            item.style.display = 'flex';
        } else if (filterType === 'completed' && isCompleted) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Função para atualizar o estado do botão (qual está ativo)
function updateFilterButtons(clickedButton) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
}

// Evento de clique no container de filtros (também é uma forma de delegação!)
filterContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName !== 'BUTTON') return;

    // Define o tipo de filtro baseado no ID do botão
    let filterType;
    if (target.id === 'filter-all') {
        filterType = 'all';
    } else if (target.id === 'filter-pending') {
        filterType = 'pending';
    } else if (target.id === 'filter-completed') {
        filterType = 'completed';
    }
    
    // Aplica a lógica
    applyFilter(filterType);
    updateFilterButtons(target);
});


// Função auxiliar para ser chamada quando a tarefa é criada ou concluída
function applyCurrentFilter() {
    applyFilter(currentFilter);
}

// OBS: Certifique-se de que sua função que ADICIONA TAREFAS
// (taskForm handler) chame applyCurrentFilter() após adicionar um novo item.