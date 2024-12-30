import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MonedaPipe } from '../../pipes/moneda.pipe';

@Component({
  standalone: true,
  selector: 'app-result',
  imports: [FormsModule,DragDropModule,CommonModule,MonedaPipe],
  templateUrl: './result.component.html'
})
export class ResultComponent {

  stateService = inject(StateService);
  cdr          = inject(ChangeDetectorRef);

}
