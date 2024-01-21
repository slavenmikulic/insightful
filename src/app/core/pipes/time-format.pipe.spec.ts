import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 0 years, 0 months, 0 days, 0 hours, 0 minutes', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe.transform(0)).toEqual('0 years, 0 months, 0 days, 0 hours, 0 minutes');
  });
});
