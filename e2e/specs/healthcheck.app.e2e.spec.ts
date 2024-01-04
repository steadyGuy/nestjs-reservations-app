describe('Helath', () => {
  test('Reservations', async () => {
    const res = await fetch('http://reservations:3000');
    console.log('res', res);
    expect(res.ok).toBeTruthy();
  });
  test('Auth', async () => {
    const res = await fetch('http://auth:3000');
    expect(res.ok).toBeTruthy();
  });
});
