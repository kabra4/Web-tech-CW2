function colorTaskList() {

    // Get today's date and time
    let now = new Date().getTime();

    const allTask = document.querySelectorAll('.tasks li');

    for (let i = 0; i < allTask.length; i++){
        let countDownDate = new Date(allTask[i].id).getTime();
        let days = Math.round((countDownDate - now) / (1000 * 60 * 60 * 24));
        let hours = Math.round((countDownDate - now) / (1000 * 60 * 60));
        let borColor, deadline, bgColor;
        if (countDownDate - now < 0){
            borColor = '#f00'
            bgColor = '#ffdfdf'
            deadline = 'Passed'
        } else if (days < 7){
            borColor = '#ffaa00'
            bgColor = '#ffe8c6'
            if (days > 1) deadline = ' ' + days.toString() + ' days'
            else deadline = ' ' + hours.toString() + ' hours'
        } else {
            borColor = '#00ff00'
            bgColor = '#d8ffd8'
            deadline = ' ' + days.toString() + ' days'
        }

        allTask[i].style.borderLeftColor = borColor
        allTask[i].style.borderRightColor = borColor
        allTask[i].style.background = bgColor

        allTask[i].getElementsByTagName('p')[0].innerHTML += deadline;
    }
}

colorTaskList()
