import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(timestamp: number | null): string {
    if (!timestamp) {
      return '0 minutes';
    }

    if (timestamp < 0) {
      return '0 minutes';
    }

    const totalSeconds = Math.floor(timestamp / 1000);

    const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365));
    const months = Math.floor((totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
    const days = Math.floor((totalSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    const format: string[][] = [];
    if (years) {
      format.push([`${years}`, this.formatUnitPlural(years, 'year')]);
    }

    if (months) {
      format.push([`${months}`, this.formatUnitPlural(months, 'month')]);
    }

    if (days) {
      format.push([`${days}`, this.formatUnitPlural(months, 'day')]);
    }

    if (hours) {
      format.push([`${hours}`, this.formatUnitPlural(hours, 'hour')]);
    }

    if (minutes) {
      format.push([`${minutes}`, this.formatUnitPlural(minutes, 'minute')]);
    }

    if (!format.length) {
      return '0 minutes';
    }

    return format.map(([value, unit]) => `${value} ${unit}`).join(', ');
  }

  private formatUnitPlural(value: number, unit: string): string {
    return `${unit}${value > 1 ? 's' : ''}`;
  }
}
