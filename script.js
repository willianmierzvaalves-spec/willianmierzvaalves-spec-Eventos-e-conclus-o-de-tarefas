// Variáveis do DOM (mantendo a referência do código da aula anterior)
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Variáveis para os Filtros
const filterContainer = document.getElementById('filter-container');
let currentFilter = 'all'; // Estado inicial do filtro

// Função para criar o elemento da tarefa (li)
const createTaskElement = (taskText) => {
    const li = document.createElement('li');

    // Elemento que guarda o texto da tarefa
    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = taskText;

    // Campo de input para edição (inicialmente escondido)
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskText;
    editInput.style.display = 'none'; // Esconde por padrão

    // Contêiner de ações (botões)
    const actions = document.createElement('div');
    actions.classList.add('actions');

    // Botão de Edição
    const editBtn = document.createElement('button');
    editBtn.classList.add('action-btn', 'edit-btn');
    editBtn.textContent = 'Editar';
    editBtn.dataset.action = 'edit'; // Usado na Delegação de Eventos

    // Botão de Remoção
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('action-btn', 'remove-btn');
    removeBtn.textContent = 'Remover';
    removeBtn.dataset.action = 'remove'; // Usado na Delegação de Eventos

    // Montar o LI
    actions.appendChild(editBtn);
    actions.appendChild(removeBtn);

    li.appendChild(span);
    li.appendChild(editInput);
    li.appendChild(actions);

    return li;
};

// 1. Adicionar Tarefa
const addTask = (event) => {
    event.preventDefault(); // Previne o envio do formulário

    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = createTaskElement(taskText);
        taskList.appendChild(newTask);

        // Limpar o input
        taskInput.value = '';
    }
};

taskForm.addEventListener('submit', addTask);


// --- Delegação de Eventos para Ações na Lista ---
/*
    📌 No script.js, adicione após o código do taskForm:
    Usamos a delegação de eventos no elemento PAI (#task-list) para
    controlar cliques em itens FILHOS (li) criados dinamicamente,
    como os botões de edição/remoção e a marcação de concluída.
*/
taskList.addEventListener('click', (e) => {
    const clickedElement = e.target;
    const taskItem = clickedElement.closest('li'); // Encontra o LI pai mais próximo

    if (!taskItem) return; // Sai se não clicou