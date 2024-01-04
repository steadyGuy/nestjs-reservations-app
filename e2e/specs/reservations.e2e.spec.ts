describe('Reservations', () => {
  beforeAll(async () => {
    const userCredentials = {
      email: 'sopronukCC@gmail.com',
      password: '12345678Test$',
    };

    await fetch('http://auth:3000', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    });

    await fetch('http://reservations:3000', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    });
  });

  test('Create', () => {});
});
