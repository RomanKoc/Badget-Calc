import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Apartado, Seccion } from '../../interfaces/budget';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { CdkDragDrop, CdkDragStart, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MonedasPipe } from '../../pipes/monedas.pipe';
import { StateService } from '../../services/state.service';

@Component({
  standalone: true,
  selector: 'app-calculator',
  imports: [FormsModule,ButtonComponent,DragDropModule,CommonModule,MonedasPipe],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {

  stateService = inject(StateService);
  cdr = inject(ChangeDetectorRef);

  setMoneda(event: Event): void {
    const target = event.target as HTMLInputElement;
    if(target && target.value) this.stateService.setMonedaSelet(target.value);
  }

  ngDoCheck() {
    this.stateService.guardarEnStorage();
  }

  clearInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    target.value = '';
  }

  drop(event: CdkDragDrop<(Seccion | Apartado)[]>):void {
    moveItemInArray(this.stateService.apartados(), event.previousIndex, event.currentIndex);
    this.stateService.reorderId();
    this.cdr.detectChanges(); // Forzar detección de cambios
  }
  onDragStarted(event: CdkDragStart):void {
    const previewElement = event.source.getRootElement().querySelector('.cdk-drag-preview');
    if (previewElement) {
      const originalElement = event.source.getRootElement();
  
      // Copia los estilos manualmente
      const computedStyles = window.getComputedStyle(originalElement);
      (previewElement as HTMLElement).style.cssText = computedStyles.cssText;
    }
  }
}
