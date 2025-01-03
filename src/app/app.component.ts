import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ButtonComponent } from './shared/button/button.component';
import { ResultComponent } from './components/result/result.component';
import { StateService } from './services/state.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,MatSlideToggleModule,CommonModule,CalculatorComponent,ButtonComponent,ResultComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  stateService = inject(StateService);

  ngOnInit(): void {
    this.stateService.setMonedaSelet(this.stateService.monedas()[0]);
    this.stateService.obternerDeStorage();
  }

  generatePDF() {
    const section = document.getElementById('section-to-export');
    if (section) {
      html2canvas(section).then(canvas => {
        const imgData   = canvas.toDataURL('image/png');
        const pdf       = new jsPDF();
        const imgProps  = pdf.getImageProperties(imgData);
        const pdfWidth  = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('badge-rk.pdf');
      });
    }
  }
}
