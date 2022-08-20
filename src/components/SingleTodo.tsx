import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";

interface Props {
	index: number;
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [inputEdit, setInputEdit] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);
	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id != id));
	};
	const handleEditDone = (e: any, id: number) => {
		e.preventDefault();
		setTodos(
			todos.map((todo) =>
				todo.id == id ? { ...todo, todo: inputEdit } : todo
			)
		);
		setEdit(false);
	};
	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};
	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided) => (
				<form
					className="todos__single"
					onSubmit={(e) => handleEditDone(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{edit ? (
						<input
							className="todos__single--text"
							value={inputEdit}
							onChange={(e) => setInputEdit(e.target.value)}
							ref={inputRef}
						/>
					) : (
						<>
							{todo.isDone ? (
								<span className="todos__single--text">
									{todo.todo}
								</span>
							) : (
								<s className="todos__single--text">
									{todo.todo}
								</s>
							)}
						</>
					)}
					<div>
						{edit ? (
							<span
								className="icon"
								onClick={(e) => handleEditDone(e, todo.id)}
							>
								<BsFillHandThumbsUpFill />
							</span>
						) : (
							<>
								<span
									className="icon"
									onClick={() => handleDone(todo.id)}
								>
									<MdDone />
								</span>
								<span
									className="icon"
									onClick={() => {
										if (!edit) {
											setEdit(!edit);
										}
									}}
								>
									<AiFillEdit />
								</span>
							</>
						)}
						<span
							className="icon"
							onClick={() => handleDelete(todo.id)}
						>
							<AiFillDelete />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleTodo;
