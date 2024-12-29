import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'monedas'
})
export class MonedasPipe implements PipeTransform {

  private currencyMap: { [key: string]: string } = {
    'USD': 'USD $',
    'EUR': 'EUR €',
    'GBP': 'GBP £',
    'JPY': 'JPY ¥',
    'CNY': 'CNY ¥',
    'INR': 'INR ₹',
    'RUB': 'RUB ₽',
    'BRL': 'BRL R$',
    'CAD': 'CAD C$',
    'AUD': 'AUD A$'
  };

  transform(value: string): string {
    if (typeof value !== 'string') return '';
    return this.currencyMap[value.toUpperCase()] || '';
  }

}
