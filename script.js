const resultat = document.getElementById('result');
const boutonVerifier = document.getElementById('check-btn');
const boutonSuivant = document.getElementById('bouton-suivant');
const boutonRejouer = document.getElementById('bouton-rejouer');
const messageScore = document.querySelector('.erreur');
const scoreTotal = document.querySelector('.js-ScoreTotal');
const messageScoreFinal = document.querySelector(".js-message-score");

let score = 0;
let questionActuelle = 1;
const nombreDeQuestions = 5;
let boutonSelectionne = null;


function afficherQuestion(numero) {
    document.querySelectorAll(".question").forEach(q => q.classList.add('hidden'));
    document.getElementById(`question-${numero}`).classList.remove('hidden');
}


function gererSelectionReponse() {
    document.querySelectorAll(".Reponse-btn").forEach(bouton => {
        bouton.addEventListener('click', function() {
            document.querySelectorAll(".Reponse-btn").forEach(b => b.classList.remove('bg-yellow-300'));
            boutonSelectionne = this;
            this.classList.add('bg-yellow-300');
         
        });
    });
}


function verifierReponse() {
    if (boutonSelectionne) {
        const estCorrect = boutonSelectionne.classList.contains('juste');
        if (estCorrect) {
            score++;
            resultat.textContent = score;
            messageScore.innerHTML = '<div class="text-green-500 font-bold">Bonne réponse !</div>';
        } else {
            messageScore.innerHTML = '<div class="text-red-500 font-bold">Mauvaise réponse</div>';
        }
        boutonVerifier.classList.add('hidden');
        if (questionActuelle < nombreDeQuestions) {
            boutonSuivant.classList.remove('hidden');
        } else {
            FinirLeQuiz();
        }
    } else {
        messageScore.innerHTML = '<div class="text-yellow-500 font-bold">Veuillez choisir une réponse</div>';
    }
}


function questionSuivante() {
    questionActuelle++;
    if (questionActuelle <= nombreDeQuestions) {
        afficherQuestion(questionActuelle);
        boutonVerifier.classList.remove('hidden');
        boutonSuivant.classList.add('hidden');
        boutonSelectionne = null;
        messageScore.innerHTML = "";
        document.querySelectorAll(".Reponse-btn").forEach(b => b.classList.remove('bg-yellow-300'));
    }
}


function afficherMessageFinal() {
    if (score <= 4) {
        messageScoreFinal.innerHTML = "Tu devrais rebosser les bases de Javascript.";
        messageScoreFinal.classList.add("JsMauvais");
 
    } else if (score === 5) {
        messageScoreFinal.innerHTML = "Bravo tu maitrises les bases de Javascript !";
        messageScoreFinal.classList.add("JsJuste");
    }
}


function FinirLeQuiz() {
    messageScore.innerHTML = `Votre score final est de : ${score}/${nombreDeQuestions}`;
    boutonVerifier.classList.add('hidden');
    boutonSuivant.classList.add('hidden');
    boutonRejouer.classList.remove('hidden');
    scoreTotal.classList.add('hidden');
    afficherMessageFinal();
}



function redemarrerQuiz() {
    score = 0;
    questionActuelle = 1;
    resultat.textContent = '0';
    messageScore.innerHTML = "";
    messageScoreFinal.innerHTML = "";
    messageScoreFinal.classList.remove("JsMauvais", "JsJuste");
    afficherQuestion(1);
    boutonVerifier.classList.remove('hidden');
    boutonSuivant.classList.add('hidden');
    boutonRejouer.classList.add('hidden');
    scoreTotal.classList.remove('hidden');
    boutonSelectionne = null;
    document.querySelectorAll(".Reponse-btn").forEach(b => b.classList.remove('bg-yellow-300'));
}


function initialiserQuiz() {
    afficherQuestion(1);
    boutonSuivant.classList.add('hidden');
    boutonRejouer.classList.add('hidden');
    gererSelectionReponse();
    
    boutonVerifier.addEventListener('click', verifierReponse);
    boutonSuivant.addEventListener('click', questionSuivante);
    boutonRejouer.addEventListener('click', redemarrerQuiz);
}

// Lancer le quiz
initialiserQuiz();