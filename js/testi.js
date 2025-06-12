

  function createConfetti() {
    const colors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590'];
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.width = confetti.style.height = (Math.random() * 7 + 5) + 'px';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      document.body.appendChild(confetti);

      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    }
  }

/* فرض کنید این تابع وقتی همه تودولیست کامل شد فراخوانی می‌شود */
  function onAllTasksCompleted() {
    createConfetti();
  }


const checkboxes = document.querySelectorAll('.checkbox');
const progressBar = document.querySelector('.progress-bar');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      createConfetti();
    }
    // در حالت برداشتن تیک کاری انجام نشود
  });
});

function updateProgressBar() {
  // کد به‌روزرسانی نوار پیشرفت
  if (progressBar.value === progressBar.max) {
    createConfetti();
  }
}
با این روش، کاغذ رنگی‌ها فقط زمانی که چک‌باکس تیک زده شود یا نوار پیشرفت کامل شود، ریخته می‌شوند و هنگام برداشتن تیک چک‌باکس هیچ کاغذ رنگی تولید نمی‌شود.

همچنین مطمئن شوید که در کد خود تابع updateProgressBar را به درستی فراخوانی می‌کنید تا وضعیت نوار پیشرفت به‌روزرسانی شود و در زمان کامل شدن، کاغذ رنگی‌ها فعال شوند.