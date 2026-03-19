let player = 1;
        let dice1 = 0;
        let dice2 = 0;

        let cardPlayer1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let cardPlayer2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        document.querySelector("#go").addEventListener("click", handleGo);
        showCards();

        function handleGo() {
          player = (player + 1) % 2;

          dice1 = randNumbFromTo(1, 6);
          dice2 = randNumbFromTo(1, 6);

          showDice();
        }

        function randNumbFromTo(n, N) {
          return Math.floor(n + Math.random() * (N - n + 1));
        }

        function showDice() {
          let str = `Player ${player + 1}'s turn:
            <span>
              ${dice1} ✧ ${dice2}
            </span>
            <div class="choice-buttons">
              <input type="button"
                value="${dice1} & ${dice2}"
                onclick="removeCards(${dice1},${dice2})" />

              <input type="button"
                value="Sum ${dice1 + dice2}"
                onclick="removeCards(${dice1 + dice2})" />
            </div>`;

          document.querySelector("#Dice").innerHTML = str;
          document.querySelector("#message").innerHTML = "";
        }

        function removeCards(num1, num2) {
          if (num2 === undefined) {
            removeCard(num1, num1);
          } else {
            removeCard(num1, num2);
          }
        }

        function removeCard(n1, n2) {
          let currentCards = player === 0 ? cardPlayer1 : cardPlayer2;
          let message = "";

          if (
            currentCards.includes(n1) &&
            currentCards.includes(n2) &&
            n1 !== n2
          ) {
            if (player === 0) {
              cardPlayer1 = cardPlayer1.filter((el) => el !== n1 && el !== n2);
            } else {
              cardPlayer2 = cardPlayer2.filter((el) => el !== n1 && el !== n2);
            }

            message = `Player ${player + 1} removed ${n1} and ${n2}!`;
          } else if (n1 === n2 && currentCards.includes(n1)) {
            if (player === 0) {
              cardPlayer1 = cardPlayer1.filter((el) => el !== n1);
            } else {
              cardPlayer2 = cardPlayer2.filter((el) => el !== n1);
            }

            message = `Player ${player + 1} removed ${n1}!`;
          } else {
            message = "You cannot remove these numbers!";
          }

          document.querySelector("#message").innerHTML = message;

          showCards();
          checkWinner();
        }

        function showCards() {
          let html = "<h3 style='color:#ab9f8c'>Player 1</h3>";
          html += '<div class="card-container">';
          cardPlayer1.forEach((num) => {
          html += `<div class="card player1-card">${num}</div>`;
          });
          html += "</div>";

          html += "<h3 style='color:#ab9f8c'>Player 2</h3>";
          html += "<div class='card-container'>";
          cardPlayer2.forEach((num) => {
            html += `<div class="card player2-card">${num}</div>`;
          });
          html += "</div>";

          document.querySelector("#GameField").innerHTML = html;
        }

        function checkWinner() {
          if (cardPlayer1.length === 0) {
            document.querySelector("#message").innerHTML = "PLAYER 1 WINS!";
            document.querySelector("#go").disabled = true;
            document.querySelector("#Dice").innerHTML = "Game Over";
          }

          if (cardPlayer2.length === 0) {
            document.querySelector("#message").innerHTML = "PLAYER 2 WINS!";
            document.querySelector("#go").disabled = true;
            document.querySelector("#Dice").innerHTML = "Game Over";
        }
            
          }
      