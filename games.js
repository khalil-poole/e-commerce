function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}

let games;

async function renderGames(filter) {
  const gamesWrapper = document.querySelector('.games');

  gamesWrapper.classList += ' games__loading'

  if (!games) {
    games = await getGames();
  }

  gamesWrapper.classList.remove('games__loading')


  if (filter === 'LOW_TO_HIGH') {
    console.log(filter)
    games.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  }
  else if (filter === 'HIGH_TO_LOW') {
    games.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  }
  else if (filter === 'RATING') {
    games.sort((a, b) => b.rating - a.rating);
  }

  const gamesHtml = games.map((game) => {
    return `<div class="game">
    <figure class="game__img--wrapper">
      <img class="game__img" src="${game.url}" alt="">
    </figure >
    <div class="game__title">
      ${game.title}
    </div>
    <div class="game__ratings">
      ${ratingsHtml(game.rating)}
    </div>
    <div class="game__price">
      ${priceHtml(game.originalPrice, game.salePrice)}
    </div>
  </div>`;
  }).join("");




  gamesWrapper.innerHTML = gamesHtml;

  //gamesWrapper.innerHTML =

}

function priceHtml(originalPrice, salePrice) {
  if (!salePrice) {
    return `${originalPrice}`
  }
  return `<span class="game__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
}

function ratingsHtml(rating) {
  let ratingHtml = '';
  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHtml += '<i class="fas fa-star"></i>\n'
  }
  if (!Number.isInteger(rating)) {
    ratingHtml += '<i class="fas fa-star-half-alt"></i>\n'
  }
  return ratingHtml;
}

function filterGames(event) {
  renderGames(event.target.value);
}


setTimeout(() => {
  renderGames();
});



// FAKE DATA
function getGames() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 0,
          title: "Guilty Gear Strive - PlayStation 5",
          url: "assets/game13.jpg",
          originalPrice: 59.99,
          salePrice: 19.99,
          rating: 4.5,
        },
        {
          id: 1,
          title: "Rocket League - Xbox One",
          url: "assets/game14.png",
          originalPrice: 29.99,
          salePrice: 9.99,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Far Cry 6 - Xbox One",
          url: "assets/game15.jpg",
          originalPrice: 59.99,
          salePrice: 44.99,
          rating: 4,
        },
        {
          id: 3,
          title: "Puyo Puyo Tetris 2 - Nintendo Switch",
          url: "assets/game16.jpg",
          originalPrice: 39.99,
          salePrice: 19.99,
          rating: 3.5,
        },
        {
          id: 4,
          title: "Final Fantasy IV The Complete Collection - Sony PSP",
          url: "assets/game17.jpg",
          originalPrice: 19.99,
          salePrice: 9.99,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Pokemon Sun - Nintendo 3DS",
          url: "assets/game18.png",
          originalPrice: 29.99,
          salePrice: 19.99,
          rating: 3.5,
        },
        {
          id: 6,
          title: "Kirby Super Star Ultra - Nintendo DS",
          url: "assets/game19.png",
          originalPrice: 29.99,
          salePrice: 14.99,
          rating: 4.5,
        },
        {
          id: 7,
          title: "Contra 4 - Nintendo DS",
          url: "assets/game20.jpg",
          originalPrice: 29.99,
          salePrice: 12.99,
          rating: 4.5,
        },
        {
          id: 8,
          title: "Bomber Man 64 - Nintendo 64",
          url: "assets/game21.jpg",
          originalPrice: 29.99,
          salePrice: 14.99,
          rating: 4,
        },
        {
          id: 9,
          title: "Turtles in Time - Nintendo SNES",
          url: "assets/game22.jpg",
          originalPrice: 79.99,
          salePrice: 49.99,
          rating: 4.5,
        },
        {
          id: 10,
          title: "Metal Gear Solid - PlayStation",
          url: "assets/game23.png",
          originalPrice: 29.99,
          salePrice: 14.99,
          rating: 5,
        },
        {
          id: 11,
          title: "Super R-Type - Nintendo SNES",
          url: "assets/game24.jpg",
          originalPrice: 19.99,
          salePrice: 9.99,
          rating: 3,
        },
      ])
    }, 1000);
  })
}


