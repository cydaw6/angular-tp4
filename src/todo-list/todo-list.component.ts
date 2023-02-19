declare var M: any;
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from './model/todo';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule, FormsModule, TodoItemComponent, HttpClientModule],
  providers: [TodoService],
  standalone: true,
})
export class TodoListComponent implements OnInit {
  public textInput: string;
  constructor(public todoService: TodoService) {
    this.todoService = todoService;
  }

  getTodos(): Todo[] {
    let datas: Todo[];
    this.todoService.getTodos().subscribe((data) => {
      datas = data;
    });
    return datas;
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
    M.toast({ html: 'Mise à jour effectuée' });
  }

  addTodo() {
    if (!this.textInput) return;
    this.todoService.createTodo(this.textInput);
    M.toast({ html: "La tâche '" + this.textInput + "' à été ajouté" });
    this.textInput = '';
  }

  ngOnInit() {}
}
