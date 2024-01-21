import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(timestamp: number): string {
    const totalSeconds = Math.floor(timestamp / 1000);

    const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365));
    const months = Math.floor((totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
    const days = Math.floor((totalSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    const format: string[][] = [];
    if (years) {
      format.push([`${years}`, 'years']);
    }

    if (months) {
      format.push([`${months}`, 'months']);
    }

    if (days) {
      format.push([`${days}`, 'days']);
    }

    if (hours) {
      format.push([`${hours}`, 'hours']);
    }

    if (minutes) {
      format.push([`${minutes}`, 'minutes']);
    }

    if (!format.length) {
      return '0 minutes';
    }

    return format.map(([value, unit]) => `${value} ${unit}`).join(', ');
  }
}
