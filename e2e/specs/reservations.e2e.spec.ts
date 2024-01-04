describe('Reservations', () => {
  let jwt = '';

  beforeAll(async () => {
    const userCredentials = {
      email: 'sopronukCC@gmail.com',
      password: '12345678Test$',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const createdReservation = await createReservation();

    const resGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservation = await resGet.json();
    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const resCreate = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        startDate: '02-01-2023',
        endDate: '02-05-2023',
        placeId: '123',
        invoiceId: '123',
        charge: {
          amount: 5.05,
          card: {
            cvc: '314',
            exp_month: 8,
            exp_year: 2026,
            number: '4242424242424242',
          },
        },
      }),
    });

    expect(resCreate.ok).toBeTruthy();

    return resCreate.json();
  };
});
