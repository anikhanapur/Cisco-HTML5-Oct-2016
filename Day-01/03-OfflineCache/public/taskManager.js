(function(){
			window.addEventListener("DOMContentLoaded", init);

			var btnAddTask = null,
				btnRemoveCompleted = null,
				olTaskList = null,
				txtTaskName = null;

			

			
			window.addEventListener('storage', loadTasksFromStorage);

			function init(){
				btnAddTask = document.getElementById("btnAddTask");
				btnRemoveCompleted = document.getElementById('btnRemoveCompleted');
				olTaskList = document.getElementById('olTaskList');
				txtTaskName = document.getElementById("txtTaskName");

				btnAddTask.addEventListener('click', onBtnAddTaskClick);
				btnRemoveCompleted.addEventListener('click', onBtnRemoveCompletedClick);

				loadTasksFromStorage();
			}
			function loadTasksFromStorage(){
				olTaskList.innerHTML = '';
				var tasks = taskStorage.getAll();
				for(var i=0; i < tasks.length ; i++)
					addTaskToList(tasks[i]);
			}
			function onBtnAddTaskClick(){
				var taskName = txtTaskName.value;
				var newTask = taskStorage.addNew(taskName);
				addTaskToList(newTask);
			}

			function addTaskToList(task){
				var newTaskItem = document.createElement("li");
				newTaskItem.innerHTML = task.name;
				newTaskItem.setAttribute("task-id", task.id);
				newTaskItem.addEventListener("click", onTaskItemClick);
				if (task.isCompleted)
					newTaskItem.classList.add("completed");
				olTaskList.appendChild(newTaskItem);
			}

			function onTaskItemClick(){
				this.classList.toggle("completed");
				var id = this.getAttribute("task-id");
				taskStorage.toggle(id);
			}

			function onBtnRemoveCompletedClick(){
				var taskItems = olTaskList.children;
				for(var i = taskItems.length-1; i >=0; i--)
					if (taskItems[i].classList.contains('completed')){
						var id = taskItems[i].getAttribute("task-id");
						taskStorage.remove(id);
						olTaskList.removeChild(taskItems[i]);
					}
			}

		})();