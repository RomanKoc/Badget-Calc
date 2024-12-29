import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  private currencyMap: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CNY': '¥',
    'INR': '₹',
    'RUB': '₽',
    'BRL': 'R$',
    'CAD': 'C$',
    'AUD': 'A$'
  };

  transform(value: string): string {
    if (typeof value !== 'string') return '';
    return this.currencyMap[value.toUpperCase()] || '';
  }

}
