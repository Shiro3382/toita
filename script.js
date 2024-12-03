let spiller = document.getElementById("spiller");
let ball = document.getElementById("ball");
let spillområde = document.getElementById("spillområde");
let score = 0;
let BevInt; //bevegelsesintervall, hvor ofte posisjonen til boksen oppdateres

let spillerPos = 375;
document.addEventListener("keydown", flyttSpiller);

function flyttSpiller(e) { //oppdatert funksjon for spillerbevegelse, slik at det er raskere og oppdateres oftere.
    if (e.key === "ArrowLeft" && spillerPos > 0) {
        if (!BevInt) {
            BevInt = setInterval(() => {
                if (spillerPos > 0) {
                    spillerPos -= 10;
                    spiller.style.left = spillerPos + "px";
                } else {
                    clearInterval(BevInt);
                    BevInt = null;
                }
            }, 10);
        }
    }

    if (e.key === "ArrowRight" && spillerPos < spillområde.clientWidth - spiller.clientWidth) {
        if (!BevInt) {
            BevInt = setInterval(() => {
                if (spillerPos < spillområde.clientWidth - spiller.clientWidth) {
                    spillerPos += 10;
                    spiller.style.left = spillerPos + "px";
                } else {
                    clearInterval(BevInt);
                    BevInt = null;
                }
            }, 10);
        }
    }
}

function stopMovement(e) { //sjekker etter om du har sluppet piltasten, slik at man ikke beveger seg når man ikke vil.
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        clearInterval(BevInt);
        BevInt = null;
    }
}

window.addEventListener("keydown", flyttSpiller);
window.addEventListener("keyup", stopMovement);

let ballPos = { x: Math.random() * (spillområde.clientWidth - 30), y: 0 };
let ballFallHastighet = 2;

function oppdaterBall() {
    ballPos.y += ballFallHastighet;

    if (ballPos.y > spillområde.clientHeight - spiller.clientHeight - ball.clientHeight &&
        ballPos.x > spillerPos &&
        ballPos.x < spillerPos + spiller.clientWidth) {
        ballPos.y = 0;
        ballPos.x = Math.random() * (spillområde.clientWidth - 30);
        ballFallHastighet += 0.5;
        score++;
        updateScore();
    }
function updateScore() {
    document.getElementById('score').textContent = "Score: " + score;

}
    if (ballPos.y > spillområde.clientHeight) {
        ballPos.y = 0;
        ballPos.x = Math.random() * (spillområde.clientWidth - 30);
    }

    ball.style.top = ballPos.y + "px";
    ball.style.left = ballPos.x + "px";

    requestAnimationFrame(oppdaterBall);
}

oppdaterBall();
