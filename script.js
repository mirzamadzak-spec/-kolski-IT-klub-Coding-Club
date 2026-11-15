document.getElementById('prijavaForma').addEventListener('submit', function(e) {
    e.preventDefault();

    const ime = document.getElementById('ime').value.trim();
    const email = document.getElementById('email').value.trim();
    const poruka = document.getElementById('poruka').value.trim();
    const feedback = document.getElementById('formPoruka');

    if (ime === '' || email === '' || poruka === '') {
        feedback.style.color = 'red';
        feedback.textContent = 'Molimo popunite sva polja prije slanja prijave!';
    } else {
        feedback.style.color = 'green';
        feedback.textContent = 'Hvala ' + ime + '! Vaša prijava u IT klub je uspješno poslana.';
        this.reset();
    }
});