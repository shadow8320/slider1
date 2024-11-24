const track = document.getElementById("slider");

// Handle mouse down
const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX; // Support touch
};

// Handle mouse up
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage || "0";
};

// Handle mouse move
const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return; // If mouse is not down, exit

  const mouseDelta =
      parseFloat(track.dataset.mouseDownAt) - (e.clientX || e.touches[0].clientX),
    maxDelta = window.innerWidth;

  // Adjust dragging sensitivity by dividing the delta by a factor (e.g., 2)
  const sensitivityFactor = 2;
  const percentage = (mouseDelta / maxDelta / sensitivityFactor) * -100;

  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage || "0") + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

  track.dataset.percentage = nextPercentage;

  // Apply transform for smooth movement
  track.style.transform = `translateX(${nextPercentage}%)`;
};

// Attach event listeners
window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", handleOnDown);
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", handleOnUp);
window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", handleOnMove);
