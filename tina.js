
const inputElement = document.querySelector("#new-task-input")
const addTaskButton = document.querySelector("#new-task-button")
const tasks = document.querySelector(".tasks")

const validateInput = () => inputElement.value.length > 0;  

const handleAddTask = () => {
    const inputIsValid = validateInput (); 
    
    if(!inputIsValid) {
        return inputElement.classList.add("error"); 
    }
   

    
    const taskContainer = document.createElement("div")
    taskContainer.classList.add("taskItem")

    
    const taskText = document.createElement("p")
    taskText.innerText = inputElement.value 
    
    taskText.addEventListener("click", () => handleClick(taskText));

    
    const deleteTask = document.createElement("i")
    deleteTask.classList.add("fa-solid")
    deleteTask.classList.add("fa-trash-can") 
    
    deleteTask.addEventListener("click", () => handleDeleteClick(taskContainer, taskText))


    
    taskContainer.appendChild(taskText)
    taskContainer.appendChild(deleteTask)

    
    tasks.appendChild(taskContainer)

    
    inputElement.value = ""

    updateLocalStorage()
    
};
//****************************************************função de concluir tarefa**********************************/
const handleClick = (taskText) => {
    const task = tasks.childNodes;
    // console.log(task) da que o 1° filho é text e não o p. COMO A FUNCTIONA TA ENTRANDO NO IF ENTÃO ???
    for(newTask of task) { 
        if(newTask.firstChild === taskText) {
            newTask.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage()   
     
}
/****************************************************função de apagar tarefa**********************************/
const handleDeleteClick = (taskContainer, taskText) => {
    const geral = tasks.childNodes
    // console.log(geral) mesma situação do handleclick
    for(const element of geral) {
        
        if(element.firstChild === taskText) {
            
            taskContainer.remove()
        }
    }

    updateLocalStorage()
    
}

/***************************************************função de salvar tarefas no local Storage***************************/
const updateLocalStorage = () => {
    const newTasks = [...tasks.childNodes].slice(1);
    // console.log(newTasks) graças ao .slice ta chamando o filho certo, mas dúvida continua pq ta criando o 1° filho sendo "text"
    const localStorageTasks = newTasks.map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");
        
        return { description: content.innerText, isCompleted };

        
    });
    // console.log(localStorageTasks) ta funcionando certiho
    //.setItem está adicionando no localStorage, recebendo o keyNamw e o value, tudo como string
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
    
};


/***************************************************FUNÇÃO QUE ATUALIZA A PÁGINA COM OS DADOS SALVOS********************************/
const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    // console.log(tasksFromLocalStorage) retorna o objeto  tasks  com discription and if is completed
    if (!tasksFromLocalStorage) return;
  
    for (const task of tasksFromLocalStorage) {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-item");
  
      const taskText = document.createElement("p");
      taskText.innerText = task.description;
  
      if (task.isCompleted) {
        taskText.classList.add("completed");
      }
  
      taskText.addEventListener("click", () => handleClick(taskText));
  
      const deleteTask = document.createElement("i");
      deleteTask.classList.add("far");
      deleteTask.classList.add("fa-trash-alt");
  
      deleteTask.addEventListener("click", () =>
        handleDeleteClick(taskContainer, taskText)
      );
  
      taskContainer.appendChild(taskText);
      taskContainer.appendChild(deleteTask);
  
      tasks.appendChild(taskContainer);
    }
  };
  
  refreshTasksUsingLocalStorage();

//**********************************funções de validação ***********************/
const handleInputChange = () => {
    const inputIsValid = validateInput();
    
    if(inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());

