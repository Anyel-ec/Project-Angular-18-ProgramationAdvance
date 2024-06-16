import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const toggle = this.renderer.selectRootElement('#toggle');
    const navbar = this.renderer.selectRootElement('#navbar');
    const container = this.renderer.selectRootElement('#home');
    const links = this.renderer.selectRootElement('.nav-bar ul li a', true);

    if (toggle) {
      this.renderer.listen(toggle, 'click', () => {
        this.renderer.addClass(toggle, 'active');
        this.renderer.addClass(navbar, 'active');
        this.renderer.addClass(container, 'active');
      });
    }

    this.renderer.listen('document', 'click', (e: Event) => {
      if ((e.target as HTMLElement).id !== 'navbar' && (e.target as HTMLElement).id !== 'toggle' && (e.target as HTMLElement).id !== 'home') {
        this.renderer.removeClass(toggle, 'active');
        this.renderer.removeClass(navbar, 'active');
        this.renderer.removeClass(container, 'active');
      }
    });

    if (links.length) {
      links.forEach((link: HTMLElement) => {
        this.renderer.listen(link, 'click', () => {
          links.forEach((link: HTMLElement) => {
            this.renderer.removeClass(link, 'active');
          });
          this.renderer.addClass(link, 'active');
        });
      });
    }
  }
}