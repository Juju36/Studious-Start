// Array of professors with their RateMyProf links
const professors = [
    { name: "Professor Smith", url: "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=123456" },
    { name: "Professor Johnson", url: "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=654321" },
    { name: "Professor Lee", url: "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=789123" }
];

// Function to populate the professor list
function populateProfList() {
    const profListDiv = document.getElementById("prof-list");

    professors.forEach(prof => {
        const button = document.createElement("button");
        button.className = "prof-button";
        button.textContent = prof.name;
        button.onclick = () => window.open(prof.url, "_blank");
        profListDiv.appendChild(button);
    });
}

// Call the function to populate the professor list on page load
populateProfList();

// Task List Functions
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push(taskText);
        displayTasks();
        taskInput.value = ""; // Clear input
    }
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const taskText = document.createElement("span");
        taskText.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Array of buildings with Google Maps links
const buildings = [
    { name: "SUB", url: "https://maps.app.goo.gl/hEj684nwCtoZyR7T7" },
    { name: "DICE", url: "https://maps.app.goo.gl/g2D8CtpsY6eo5zBr6" }
];

// Function to populate the building list
function populateBuildingList() {
    const buildingListDiv = document.getElementById("building-list");

    buildings.forEach(building => {
        const button = document.createElement("button");
        button.className = "building-button";
        button.textContent = building.name;
        button.onclick = () => window.open(building.url, "_blank");
        buildingListDiv.appendChild(button);
    });
}

// Call the function to populate the building list on page load
populateBuildingList();

// Campus Crush Functions
let crushDetails = [];

// Function to add a new crush detail
function addCrushDetail() {
    const crushInput = document.getElementById("crush-input");
    const crushText = crushInput.value.trim();

    if (crushText !== "") {
        crushDetails.push(crushText);
        displayCrushDetails();
        crushInput.value = ""; // Clear input
    }
}

// Function to display crush details
function displayCrushDetails() {
    const crushList = document.getElementById("crush-list");
    crushList.innerHTML = ""; // Clear existing details

    crushDetails.forEach((detail, index) => {
        const li = document.createElement("li");
        li.className = "crush-item";

        const detailText = document.createElement("span");
        detailText.textContent = detail;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.onclick = () => deleteCrushDetail(index);

        li.appendChild(detailText);
        li.appendChild(deleteButton);
        crushList.appendChild(li);
    });
}

// Function to delete a crush detail
function deleteCrushDetail(index) {
    crushDetails.splice(index, 1);
    displayCrushDetails();
}

// Array of video resources with links
const videos = [
    { name: "Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor" }
];

// Function to populate the video list
function populateVideoList() {
    const videoListDiv = document.getElementById("video-list");

    videos.forEach(video => {
        const button = document.createElement("button");
        button.className = "video-button";
        button.textContent = video.name;
        button.onclick = () => window.open(video.url, "_blank");
        videoListDiv.appendChild(button);
    });
}

// Call the function to populate the video list on page load
populateVideoList();

function searchLinkedIn() {
    const searchTerm = document.getElementById("network-search").value.trim();
    if (searchTerm) {
        const linkedInURL = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(searchTerm)}`;
        window.open(linkedInURL, "_blank");
    }
}

// Load Google API Client Library on Page Load
function loadGapiClient() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyDwiG_Tf_PMEDFNzzsRtFAhL9GLk0HnDgg', // Replace with your API key
        clientId: '294271858250-43gfc0joncdp7uciose4qcd93iovq8ph.apps.googleusercontent.com', // Replace with your Client ID
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.file'
    }).then(() => {
        console.log("Google API Client initialized successfully");
    }).catch(error => {
        console.error("Error initializing Google API Client:", error);
    });
}

function signInWithGoogle() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        console.log("User signed in");
        document.getElementById("upload-status").textContent = "Signed in successfully!";
    }).catch(error => {
        console.error("Error during sign-in:", error);
    });
}

// Function to upload a PDF file to Google Drive
function uploadPDF() {
    const fileInput = document.getElementById("pdf-upload");
    const file = fileInput.files[0]; // Get the first selected file

    if (!file) {
        alert("Please select a PDF file to upload.");
        return;
    }

    // Ensure the user is signed in before attempting the upload
    if (gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
        const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token; // Retrieve access token

        const metadata = {
            'name': file.name, // Filename at Google Drive
            'mimeType': 'application/pdf', // MIME type
            'parents': ['YOUR_FOLDER_ID'] // Replace with your Google Drive Folder ID
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
        form.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status === 200) {
                document.getElementById("upload-status").textContent = "File uploaded successfully! File ID: " + xhr.response.id;
            } else {
                document.getElementById("upload-status").textContent = "Upload failed. Please try again.";
                console.error("Error uploading file:", xhr.response);
            }
        };
        xhr.onerror = () => {
            document.getElementById("upload-status").textContent = "Upload failed. Network error.";
        };
        xhr.send(form);
    } else {
        alert("You need to sign in first.");
    }
}