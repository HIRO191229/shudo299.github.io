const votingSection = document.getElementById('voting-section');
const thankYouSection = document.getElementById('thank-you');
const voteButtons = document.querySelectorAll('.vote-button');

// ローカルストレージ
const hasVoted = localStorage.getItem('hasVoted');

if (hasVoted) {
    votingSection.classList.add('hidden');
    thankYouSection.classList.remove('hidden');
}

// ボタン設定
voteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedNumber = this.getAttribute('data-number');
        
        // ローカルストレージに保存
        localStorage.setItem('hasVoted', true);
        localStorage.setItem('voteNumber', selectedNumber);

        // 投票後
        votingSection.classList.add('hidden');
        thankYouSection.classList.remove('hidden');

        // api送信
        const scriptURL = "https://script.google.com/macros/s/AKfycbw7TJkP9HN381-HFholnmbf8QAqn6Y1Xc9mwxzfXzTTS4CLigOOrBL6Cg2apPwP6U79/exec"; // デプロイしたウェブアプリのURL
        fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams({ 'voteNumber': selectedNumber }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
