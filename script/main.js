window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
        try {
            const reg = await navigator.serviceWorker.register("/sw.js");
        } catch (e) {
            console.log("Service worker register fail");
        }
    }
});



// const userInfoArr = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : []

const form = document.getElementById('form')
form.addEventListener('submit', event => {
    event.preventDefault()

    if (validation(this) === true) {
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const phone = document.getElementById('phone').value

        const userInfo = {}
        userInfo.login = login
        userInfo.password = password
        userInfo.phone = phone

        // userInfoArr.push(userInfo)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        clearInput()
        location.href = './second_page.html'
    }
    else {
        alert('Please entrer this form')
    }
})



function validation(form) {
    let result = true

    const allInputs = document.querySelectorAll('input')

    allInputs.forEach(input => {
        removeError(input)

        if (input.value.length < 2) {
            createError(input)
            result = false
        }
        else {
            removeError(input)
            result = true
        }
    })
    return result
}

function createError(input) {

    const parentNode = input.parentNode
    parentNode.classList.add('input-wrapper')
}

function removeError(input) {

    const parentNode = input.parentNode

    if (parentNode.classList.contains('input-wrapper')) {
        parentNode.classList.remove('input-wrapper')
    }
}

const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('input', function () {
        input.addEventListener('input', updateProgressBar);

        function updateProgressBar() {
            const progressBar = input.nextElementSibling;
            const inputValue = input.value;
            const dataAttribute = input.dataset.progress;

            if (!dataAttribute) {
                return; // Пропускаем, если у инпута нет атрибута data-progress
            }

            const progressLength = parseInt(dataAttribute);
            const progress = (inputValue.length / progressLength) * 100; // Рассчитываем прогресс в процентах

            progressBar.style.width = `${progress}%`; // Устанавливаем ширину прогресс-бара

            if (inputValue.length >= progressLength) {
                progressBar.classList.add('completed'); // Добавляем класс "completed", чтобы изменить стиль псевдоэлемента
            } else {
                progressBar.classList.remove('completed'); // Удаляем класс "completed", чтобы вернуть стиль псевдоэлемента к исходному
            }
        }

        const parentNode = input.parentNode
        input.classList.remove('error')

        if (input.value.length === 0) {
            input.classList.remove('error')
            parentNode.classList.add('hide')
        }
        else if (input.value.length < parseInt(input.dataset.progress)) {
            input.classList.add('error')
            parentNode.classList.remove('hide')
            parentNode.classList.add('show')
        }
        else {
            input.classList.remove('error')
            parentNode.classList.remove('show')
            parentNode.classList.add('hide')
        }
    })
})

function checkInput(input) {

    input.classList.remove('error')

    if (input.value.length < 5) {
        input.classList.add('error')
    }
    else {
        input.classList.remove('error')
    }
}


function clearInput() {
    document.getElementById('login').value = ''
    document.getElementById('password').value = ''
    document.getElementById('phone').value = ''
}


let element = document.getElementById('phone');
let maskOptions = {
    mask: '+7 000 000 00 00'
};
IMask(element, maskOptions);


