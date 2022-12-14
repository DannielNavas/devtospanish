import { Component, HostListener, OnInit } from '@angular/core';
import { IDevto } from 'src/app/core/models/devto.interface';
import { IUserDevto } from 'src/app/core/models/user-devto.interface';
import DevtoService from 'src/app/core/services/devto.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import UserInformationComponent from 'src/app/components/user-information/user-information.component';
import LoaderService from '../../core/services/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit {
  posts!: IDevto[];

  counter: number = 1;

  loader: boolean = false;

  installEvent: any = null;

  constructor(
    private devtoService: DevtoService,
    public dialog: MatDialog,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.getPostSpanish();
  }

  getPostSpanish(): void {
    this.devtoService
      .getPostSpanish(this.counter)
      .subscribe((data: IDevto[]) => {
        this.counter += 1;
        this.posts = data;
        this.loaderService.hide();
      });
  }

  // eslint-disable-next-line class-methods-use-this
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

  dataUser(id: number): void {
    this.devtoService.getDataUser(id).subscribe((user: IUserDevto) => {
      this.openModal(user);
    });
  }

  openModal(user: IUserDevto) {
    this.dialog.open(UserInformationComponent, {
      data: { ...user },
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event): void {
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser(): void {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice
        .then((rta: any) => {
          console.log(rta);
        });
    }
  }
}
