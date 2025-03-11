const listen = document.querySelector('#btn-listen');
const voiceText = document.querySelector('#voice-text');

listen.addEventListener('click', exeSpeechApi);

function exeSpeechApi() {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onstart = function (){
        voiceText.classList.add('text-secondary');
        voiceText.innerHTML = 'listening...';
        
        setTimeout(() => {
            voiceText.innerHTML = '';
            voiceText.classList.remove('text-secondary');
        }, 1500);
    }
    
    recognition.onspeechend = function(){
        const spinner = document.querySelector('.lds-roller');
        spinner.classList.remove('hide');

        setTimeout(() => {
            spinner.classList.add('hide');
        }, 2000);
        }

    recognition.onresult = function(e){
        const { transcript } = e.results[0][0];
        setTimeout(() => {
            voiceText.innerHTML = transcript;

            const btnRefresh = document.createElement('button');
            btnRefresh.classList.add('btn', 'btn-outline-danger', 'mt-5', 'text-light', 'text-center', 'text-capitalize');
            btnRefresh.textContent = 'refresh';

            btnRefresh.addEventListener('click', refresh);
            
            function refresh (){
                voiceText.innerHTML = '';
                btnRefresh.classList.add('disabled');
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
            document.querySelector('.refresh').appendChild(btnRefresh);
        }, 3000);
    }

}

