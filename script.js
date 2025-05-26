document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const music = document.getElementById('bg-music');
    const startButton = document.getElementById('startButton');
    const card = document.querySelector('.card');
    const songSelector = document.getElementById('songSelector');
    const volumeControl = document.getElementById('volumeControl');

    // Referencias a los GIFs
    const gifs = {
        marisa: document.getElementById('marisaGif'),
        furina: document.getElementById('furinaGif'),
        konata: document.getElementById('konataGif'),
        lily: document.getElementById('lilyGif'),
        marisa2: document.getElementById('marisaGif2'),
        furina2: document.getElementById('furinaGif2'),
        fortnite: document.getElementById('fortniteGif')
    };
    
    // Configuración inicial
    let isPlaying = false;
    
    // Configurar el volumen inicial (máximo 1.0)
    music.volume = parseFloat(volumeControl.value);
    
    // Función para mostrar elementos con un retraso
    function showWithDelay(element, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (element) {
                    element.classList.remove('hidden');
                    // Forzar el reflow para que funcione la transición
                    void element.offsetWidth;
                    element.classList.add('visible');
                }
                resolve();
            }, delay);
        });
    }
    
    // Función para mostrar los GIFs con animaciones escalonadas
    async function showGifs() {
        // Mostrar GIFs de las esquinas superiores primero
        await showWithDelay(gifs.konata, 300);
        await showWithDelay(gifs.lily, 300);
        
        // Mostrar GIFs de los laterales
        await showWithDelay(gifs.marisa2, 200);
        await showWithDelay(gifs.furina2, 200);
        
        // Mostrar GIFs de las esquinas inferiores
        await showWithDelay(gifs.marisa, 200);
        await showWithDelay(gifs.furina, 200);
        
        // Mostrar GIF central en la parte inferior
        await showWithDelay(gifs.fortnite, 300);
    }
    
    // Función para cambiar de canción
    function changeSong() {
        const selectedSong = songSelector.value;
        music.src = selectedSong;
        if (isPlaying) {
            music.play().catch(error => {
                console.error("Error al reproducir la canción:", error);
            });
        }
        

    }
    
    // Función para iniciar la experiencia
    async function startExperience() {
        console.log('Iniciando experiencia...');
        try {
            console.log('Intentando reproducir música...');
            // Reproducir música
            await music.play().catch(error => {
                console.error('Error al reproducir música:', error);
                throw error;
            });
            isPlaying = true;
            console.log('Música reproducida correctamente');
            
            // Ocultar el botón de inicio
            startButton.style.display = 'none';
            
            console.log('Mostrando carta...');
            // Mostrar la carta con animación
            card.classList.remove('hidden');
            // Forzar el reflow para que funcione la transición
            void card.offsetWidth;
            card.classList.add('visible');
            console.log('Carta mostrada');
            
            // Actualizar la canción actual
            // Mostrar todos los GIFs con animaciones escalonadas
            await showGifs();
            
        } catch (error) {
            console.error("Error al iniciar la experiencia:", error);
        }
    }
    
    // Configurar el evento de clic del botón
    console.log('Configurando evento de clic para el botón...');
    startButton.addEventListener('click', function() {
        console.log('Botón clickeado, iniciando experiencia...');
        startExperience().catch(error => {
            console.error('Error en startExperience:', error);
        });
    });
    
    // Cambiar de canción cuando se selecciona una nueva
    songSelector.addEventListener('change', changeSong);
    
    // Control de volumen
    volumeControl.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        music.volume = volume;
    });
    
    // Reproducir la siguiente canción cuando termine la actual
    music.addEventListener('ended', () => {
        if (songSelector.selectedIndex < songSelector.options.length - 1) {
            songSelector.selectedIndex++;
        } else {
            songSelector.selectedIndex = 0;
        }
        changeSong();
    });
    
    // También permitir iniciar con la tecla Enter o Espacio
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !card.classList.contains('visible')) {
            startExperience();
        }
    });
});
