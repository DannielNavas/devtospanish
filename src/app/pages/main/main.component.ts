import { Component, HostListener, OnInit } from '@angular/core';
import { IDevto } from 'src/app/core/models/devto.interface';
import DevtoService from 'src/app/core/services/devto.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit {
  posts!: IDevto[];

  counter: number = 1;

  loader: boolean = false;

  constructor(private devtoService: DevtoService) {}

  ngOnInit(): void {
    this.getPostSpanish();
  }

  getPostSpanish(): void {
    this.devtoService
      .getPostSpanish(this.counter)
      .subscribe((data: IDevto[]) => {
        this.counter += 1;
        this.posts = data;
      });
  }

  trackByPost(index: number, post: IDevto): number {
    return post.id;
  }

  addPosts() {
    this.loader = !this.loader;
    this.devtoService
      .getPostSpanish(this.counter)
      .subscribe((data: IDevto[]) => {
        this.counter += 1;
        this.posts.push(...data);
        this.loader = !this.loader;
      });
  }
}