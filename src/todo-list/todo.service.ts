import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './model/todo';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  constructor(private http: HttpClient) {
    let savedTodos = localStorage.getItem('todos');
    if (savedTodos != null) {
      this.todos = JSON.parse(savedTodos);
      console.log(JSON.parse(savedTodos));
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos(): Observable<Todo[]> {
    const url =
      'https://europe-west1-cours-angular-263913.cloudfunctions.net/todoapp/todo';
    return this.http.get<Todo[]>(url);
    /* 
    .map(
      (res: Response) => {
        return res.json() as = Todo[];
      }).catch(
        (error: Response) => {
          return Observable.throw(error.json());
        }
      )); */
  }

  createTodo(label: string): void {
    if (!label) return;
    this.todos.push({
      id: '' + Math.floor(Math.random() * 1000),
      creationDate: new Date().valueOf(),
      label: label,
      done: false,
    });
    this.saveTodos();
  }

  updateTodo(todo: Todo): void {
    let i = this.todos.findIndex((t) => t.id == todo.id);
    if (i == -1) {
      console.warn('Todo of id : ' + todo.id + " couldn't be found");
      return;
    }
    this.todos[i] = todo;
    this.saveTodos();
  }
}
