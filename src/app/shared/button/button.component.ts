import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() text: string = 'Button';
  @Input() icon: string = '';

}
