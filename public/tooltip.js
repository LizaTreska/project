document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('tooltip');
  const markers = document.querySelectorAll('.marker');

  markers.forEach(marker => {
    marker.addEventListener('mouseenter', () => {
      const name = marker.dataset.name;
      const imgSrc = marker.dataset.img;
      
      if(!imgSrc) return;

      tooltip.innerHTML = `<img src="${imgSrc}" alt="${name}"><p>${name}</p>`;
      tooltip.style.opacity = '1';

      const rect = marker.getBoundingClientRect();
      tooltip.style.left = rect.left + window.scrollX - tooltip.offsetWidth/2 + marker.offsetWidth/2 + 'px';
      tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight - 10 + 'px';
    });

    marker.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });

    marker.addEventListener('click', () => {
      const link = marker.dataset.link;
      if(link) window.location.href = link;
    });
  });
});
