import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import ToDoList from "./components/ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		// console.log(e);
		e.preventDefault();
		if (todo) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: true }]);
			setTodo("");
		}
	};
	// console.log(todos);
	const onDragEnd = (result: DropResult) => {
		// console.log("result", result);
		const { source, destination } = result;
		if (!destination) return;
		if (
			destination.droppableId == source.droppableId &&
			destination.index == source.index
		)
			return;
		let add,
			active = todos,
			complete = completeTodos;

		if (source.droppableId === "TodosList") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}
		if (destination.droppableId === "TodosList") {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}
		setCompleteTodos(complete);
		setTodos(active);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskello</span>
				<InputField
					todo={todo}
					setTodo={setTodo}
					handleAdd={handleAdd}
				/>
				<ToDoList
					todos={todos}
					setTodos={setTodos}
					completeTodos={completeTodos}
					setCompleteTodos={setCompleteTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
