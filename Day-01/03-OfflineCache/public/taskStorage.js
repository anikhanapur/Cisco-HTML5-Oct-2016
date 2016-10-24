var taskStorage =(function(){
			var currentTaskId = 0;
			var storage = window.localStorage;

			function getAllTasks(){
				var tasks = [];
				for(var i=0; i < storage.length; i++){
					var key = storage.key(i);
					var data = storage.getItem(key);
					var task = JSON.parse(data);
					currentTaskId = currentTaskId < task.id ? task.id : currentTaskId;
					tasks.push(task);
				}
				return tasks;
			}
			function addNewTask(taskName){
				var newTask = {
					id : ++currentTaskId,
					name : taskName,
					isCompleted : false
				};
				storage.setItem(newTask.id, JSON.stringify(newTask));
				return newTask;
			}
			function removeTask(id){
				storage.removeItem(id);
			}
			function toggleTask(id){
				var task = JSON.parse(storage.getItem(id));
				task.isCompleted = !task.isCompleted;
				storage.setItem(id, JSON.stringify(task));
			}
			return {
				getAll : getAllTasks,
				addNew : addNewTask,
				remove : removeTask,
				toggle : toggleTask
			}
		})();
