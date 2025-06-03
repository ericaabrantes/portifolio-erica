// ======= EFEITO FADE-IN (quando o conteúdo entra na tela) =======
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  faders.forEach(fader => {
    observer.observe(fader);
  });
});

// ======= YOUTUBE API (vídeo mais recente do canal) =======
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  const maxResults = 1;

  if (!apiKey || !channelId) {
    console.error("API Key ou Channel ID não encontrados!");
    return;
  }

  const youtubeContainer = document.querySelector('.youtube-video');
  if (!youtubeContainer) {
    console.error("Container '.youtube-video' não encontrado!");
    return;
  }

  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`)
    .then(response => response.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        youtubeContainer.innerHTML = '<p>Nenhum vídeo encontrado.</p>';
        return;
      }

      const videoId = data.items[0].id.videoId;
      const iframe = document.createElement('iframe');
      iframe.width = "100%";
      iframe.height = "315";
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      youtubeContainer.innerHTML = '';
      youtubeContainer.appendChild(iframe);
    })
    .catch(error => {
      youtubeContainer.innerHTML = `<p>Erro ao carregar vídeo: ${error.message}</p>`;
      console.error('Erro ao buscar o vídeo mais recente:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});
