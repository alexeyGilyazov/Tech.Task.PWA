const getLocalData = localStorage.getItem('userInfo');
const data = getLocalData ? JSON.parse(getLocalData) : {};
const renderInfo = (data) => {
    return `
            <p class="second-page__p">Your login ${data.login}</p>
            <p class="second-page__p">Your password ${data.password}</p>    
            <p class="second-page__p">Your phone ${data.phone}</p>
    `;
}
const contentElement = document.getElementById('content');
contentElement.innerHTML = renderInfo(data);

const toBackBtn = document.getElementById('btn-back');
toBackBtn.addEventListener('click', () => {
    history.back();
});
