const highScoresList = document.getElementById("highScoresList");
const spinner = document.getElementById('spinner');
const highScoresContainer = document.getElementById('highScores');

const categoryNames = {
    'geography': 'გეოგრაფია',
    'music': 'მუსიკა',
    'history': 'ისტორია'
};

function loadHighScores(category = 'geography') {
    spinner.classList.remove('hidden');
    highScoresContainer.classList.add('hidden');
    fetch(`/api/scores/${category}`)
        .then(res => res.json())
        .then(scores => {
            spinner.classList.add('hidden');
            highScoresContainer.classList.remove('hidden');
            highScoresList.innerHTML = scores
                .map(score => {
                    const date = new Date(score.date).toLocaleDateString('ka-GE');
                    return `
                    <li class="high-score">
                        ${score.username} - ${score.score}
                        <div class="score-info">
                            კატეგორია: ${categoryNames[score.category]} | თარიღი: ${date}
                        </div>
                    </li>`;
                })
                .join("");
        })
        .catch(error => {
            spinner.classList.add('hidden');
            highScoresContainer.classList.remove('hidden');
            console.error('Error:', error);
            highScoresList.innerHTML = '<li class="high-score">შეცდომა შედეგების ჩატვირთვისას</li>';
        });
}


loadHighScores(); 