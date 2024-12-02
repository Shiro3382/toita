let spiller = document.getElementById("spiller");
let ball = document.getElementById("ball");
let spillområde = document.getElementById("spillområde");

let spillerPos = 375;
document.addEventListener("keydown", flyttSpiller);

function flyttSpiller(e) {
    if (e.key === "ArrowLeft" && spillerPos > 0) {
        spillerPos -= 20;
    }
    if (e.key === "ArrowRight" && spillerPos < spillområde.clientWidth - spiller.clientWidth) {
        spillerPos += 20;
    }
    spiller.style.left = spillerPos + "px";
}

let ballPos = { x: Math.random() * (spillområde.clientWidth - 30), y: 0 };
let ballFallHastighet = 2;

function oppdaterBall() {
    ballPos.y += ballFallHastighet;

    if (ballPos.y > spillområde.clientHeight - spiller.clientHeight - ball.clientHeight &&
        ballPos.x > spillerPos &&
        ballPos.x < spillerPos + spiller.clientWidth) {
        alert("Du fanget ballen!");
        ballPos.y = 0;
        ballPos.x = Math.random() * (spillområde.clientWidth - 30);
        ballFallHastighet += 0.5;
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
