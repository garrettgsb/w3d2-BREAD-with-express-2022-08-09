const fruits = ['banana', 'apple', 'peach', 'coconut', 'lychee']; // In preference order

// const favorite = fruits[0];
// const secondFavorite = fruits[1];
// const thirdFavorite = fruits[2];

const [favorite, secondFavorite, thirdFavorite, ...nonMedalistFruits] = fruits;

const user = {
  name: 'Harold',
  email: 'harold@email.com',
  id: '12345',
};

const { name, email, id: userId } = user;
