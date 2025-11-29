document.addEventListener("DOMContentLoaded", () => {
    const tooltipCard = document.getElementById("tooltip-card");
    const tooltipImg = document.getElementById("tooltip-img");
    const tooltipTitle = document.getElementById("tooltip-title");

    document.querySelectorAll(".marker").forEach(marker => {

        marker.addEventListener("mouseenter", () => {
            tooltipImg.src = marker.dataset.img;
            tooltipTitle.textContent = marker.dataset.name;

            tooltipCard.style.display = "block";

            const rect = marker.getBoundingClientRect();
            tooltipCard.style.top = (rect.top - 20) + "px";
            tooltipCard.style.left = (rect.right + 10) + "px";
        });

        marker.addEventListener("mouseleave", () => {
            tooltipCard.style.display = "none";
        });

        marker.addEventListener("click", (e) => {
            e.preventDefault();

            const link = marker.dataset.link;
            if (link) {
                setTimeout(() => {
                    window.location.href = link;
                }, 100);
            }
        });
    });
});
