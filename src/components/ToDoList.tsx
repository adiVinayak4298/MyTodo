import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

import { Droppable } from "react-beautiful-dnd";

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completeTodos: Todo[];
	setCompleteTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList: React.FC<Props> = ({
	todos,
	setTodos,
	completeTodos,
	setCompleteTodos,
}) => {
	return (
		<div className="container">
			<Droppable droppableId="TodosList">
				{(provided) => (
					<div
						className="todos"
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos_heading">Active Tasks</span>
						{todos.map((todo, index) => (
							<SingleTodo
								index={index}
								todo={todo}
								key={todo.id}
								todos={todos}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="TodosRemove">
				{(provided) => (
					<div
						className="todos remove"
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos_heading">Completed Tasks</span>
						{completeTodos.map((todo, index) => (
							<SingleTodo
								index={index}
								todo={todo}
								key={todo.id}
								todos={completeTodos}
								setTodos={setCompleteTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default ToDoList;
