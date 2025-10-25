import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { TopbarComponent } from '../../core/components/topbar/topbar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TopbarComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  filter = 'all';
  loading = true;
  message: string | null = null;
  error: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.applyFilter();
        this.page = 1;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar las tareas';
        this.loading = false;
      },
    });
  }

  applyFilter() {
    if (this.filter === 'all') this.filteredTasks = this.tasks;
    else
      this.filteredTasks = this.tasks.filter((t) => t.status === this.filter);

    this.page = 1;
    this.updatePagination();
  }

  changeStatus(id: number, status: string) {
    this.taskService.updateTaskStatus(id, status).subscribe({
      next: (res) => {
        this.message = 'Estado actualizado correctamente';
        setTimeout(() => (this.message = null), 2000);

        const task = this.tasks.find((t) => t.id === id);
        if (task) task.status = status;
        this.applyFilter();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al actualizar estado';
        setTimeout(() => (this.error = null), 3000);
      },
    });
  }

  deleteTask(id: number) {
    if (confirm('¿Eliminar tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredTasks.length / this.pageSize);
  }

  get paginatedTasks() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredTasks.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }
}
