const input = document.getElementById('input');
const list = document.getElementById('list');
const getProfileButton = document.getElementById('getProfileButton');

async function getProfile(){
    if (!input.value) {
        alert("Please enter a GitHub username.");
        return;
    }
    const response = await fetch(`https://api.github.com/users/${input.value}`, { method: 'GET' });
    if (!response.ok) {
        if(response.status === 404){
            alert("User not found.");
            return;
        } else{
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
    const body = await response.json();
    list.innerHTML += `
    <div class="profile">
    <img width="100" height="100" src="${body.avatar_url}" alt="Profile picture">
    <h2>${body.name || body.login}</h2>
    <p>Username: ${body.login}</p>
    <p>Followers: ${body.followers}</p>
    <p>Following: ${body.following}</p>
    <p>Public Repos: ${body.public_repos}</p>
    <p><a href="${body.html_url}" target="_blank">View Profile</a></p>
    <button onclick="getRepos('${body.login}')">View Repositories</button>
    </div>`;
};
        
const getRepos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, { method: 'GET' });
    const repos = await response.json();
    let reposHtml = `
    <div class="profile">
    <h2>${username}'s Repositories</h2>
    <ul>`;
    repos.forEach(repo => {
        reposHtml += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
    });
    reposHtml += `</ul></div>`;
    list.innerHTML += reposHtml;
};