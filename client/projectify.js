const button = document.getElementById('submit');

//Button click handler
button.addEventListener('click', async event => {
    //Grabs the title and description
    const pTitle = document.getElementById('ptitle').value;
    const pDesc = document.getElementById('description').value;
    const data = { pTitle, pDesc };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/api', options);
    const json = await response.json();
    updatePost(json.pTitle, json.pDesc);
});

//Creates all initial posts in database
async function createPosts() {
    const response = await fetch('/allPosts');
    const data = await response.json();

    for (var i = 0; i < data.length; i++) {
        updatePost(data[i].pTitle, data[i].pDesc);
    }
}

//Updates the post onto the screen
function updatePost(postTitle, postDesc) {
    var lineBreak = document.createElement("br");

    //Project post box
    var box = document.createElement("div");
    box.id = 'postBox';

    //Create project title
    var head = document.createElement("h2");
    var nodeHead = document.createTextNode(postTitle);
    head.appendChild(nodeHead);

    //Create project description
    var para = document.createElement("p");
    var nodePara = document.createTextNode(postDesc);
    para.appendChild(nodePara);

    //Posts the title and description
    var element = document.getElementById('post');
    box.appendChild(head);
    box.appendChild(para);
    element.appendChild(box);
    element.appendChild(lineBreak);
};

createPosts();