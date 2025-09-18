
jQuery(function(){
  let $container = $('.thank-you-container');
  let timeout;

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });

  $('#submitAnotherFeedback').on('click', function(){
    let timerInterval;
    Swal.fire({
        title: "Redirecting to feedback form",
        html: "Redirecting to feedback form in <b></b> seconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = "/";
        }
    });
  })

  $(document).on('mousemove', function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => handleMouseMove(e), 100);
  });

  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    $container.css({
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`
    });
  }

});