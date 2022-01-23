import { SalarioPipe } from './salario.pipe';

describe('SalarioPipe', () => {
  it('create an instance', () => {
    const pipe = new SalarioPipe();
    expect(pipe).toBeTruthy();
  });
});
