    // Random text
    const letters = "abcdefghijklmnopqrstuvwxyz";

    let interval = null;

    document.getElementById("randomizer").onmouseover = event => {  
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 20);
    }

    // About img fade-in-out
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('about-animation');
                return;
            }
            entry.target.classList.remove('about-animation');
        })
    })
    observer.observe(document.querySelector('.about img'));

    // progress Reload Scroll
    const observer1 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('progress-span-animation');
                return;
            }
            entry.target.classList.remove('progress-span-animation');
        })
    })
    const progress = document.querySelectorAll('.skill .progress span');
    progress.forEach((element) => observer1.observe(element));
