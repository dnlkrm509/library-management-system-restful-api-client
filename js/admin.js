if (window.location.href.match('resources.html') !== null) {
    window.onload = fetchResources;
} if (window.location.pathname.includes('edit-resource.html')) {
  window.onload = loadEditForm;
}

async function loadEditForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const resourceId = urlParams.get('id');

  navbarLinks(true, 3);

  if (!resourceId) return;

  try {
    const response = await fetch(`http://localhost:8080/admin/resource/${resourceId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resource for editing.');
    }

    const data = await response.json();

    // Populate form
    document.getElementById('resourceId').value = data._id;
    document.getElementById('title').value = data.title;
    document.getElementById('author').value = data.author;
    document.getElementById('publicationYear').value = data.publicationYear;
    document.getElementById('genre').value = data.genre;

    document.querySelector('.edit-form .btn').textContent = 'Update Resource';

  } catch (err) {
    console.error(err);
    alert('Failed to load resource data.');
  }
}


function navbarLinks(isAuthenticated, activeLinkNUM) {
  const navLeftUl = document.getElementById('left-list');
  const navRightUl = document.getElementById('right-list');

  if (navLeftUl.getAttribute('data-rendered') === 'true') return;

  if (isAuthenticated) {
    navLeftUl.insertAdjacentHTML('beforeend', `
      <li><a href="../shop/borrow.html" id="nav-1">Borrowed</a></li>
      <li><a href="../shop/borrow-history.html" id="nav-2">Borrow History</a></li>
      <li><a href="../admin/edit-resource.html" id="nav-3">Add Resource</a></li>
      <li><a href="../admin/resources.html" id="nav-4">Admin Resources</a></li>
    `);
    navLeftUl.setAttribute('data-rendered', 'true');

    const activeLink = document.getElementById(`nav-${activeLinkNUM}`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  if (!isAuthenticated) {
    navRightUl.innerHTML = `
      <li style="margin-right: 15px;">
        <a href="../auth/login.html">Login</a>
      </li>
      <li>
        <a href="../auth/signup.html">Signup</a>
      </li>
    `;
  } else {
    navRightUl.innerHTML = `
      <li>
        <button class="btn" style="border: none; color: lightgray;" type="button" onclick="logout()">Logout</button>
      </li>
    `;
  }
}

async function fetchResources() {
  try {
    const response = await fetch(`http://localhost:8080/admin/resources`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }

    const data = await response.json();

    navbarLinks(data.isAuthenticated, 4);

    const container = document.getElementById('resource-grid');
    container.innerHTML = '';

    if (!data.resources || data.resources.length === 0) {
      container.innerHTML = '<h1>No Resources Found!</h1>';
      return;
    }

    data.resources.forEach(resource => {
      const div = document.createElement('div');
      div.classList.add('item');

      div.innerHTML = `
        <h3>${resource.title}</h3>
        <p><strong>Author:</strong> ${resource.author}</p>
        <p><strong>Year:</strong> ${resource.publicationYear}</p>
        <p><strong>Genre:</strong> ${resource.genre}</p>
        <div class="buttons">
          <a class="btn" href="edit-resource.html?id=${resource._id}">Edit</a>
          <button class="btn" type="button">Delete</button>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    document.getElementById('resource-grid').innerHTML = '<h1>Error loading resources.</h1>';
  }
}

async function logout() {

  localStorage.removeItem('token');
  
  window.location.href = '../shop/resources.html';
}

async function updateResource() {
  const resourceId = document.getElementById('resourceId').value.trim();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const year = document.getElementById('publicationYear').value.trim();
  const genre = document.getElementById('genre').value.trim();

  const payload = {
    title,
    author,
    year,
    genre
  };


  const method = resourceId ? 'PUT' : 'POST';
  const url = resourceId 
    ? `http://localhost:8080/admin/edit-resource/${resourceId}` 
    : `http://localhost:8080/admin/add-resource`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error: ${errorData.message || 'Something went wrong.'}`);
      return;
    }

    const result = await response.json();
    console.log(resourceId ? 'Resource updated!' : 'Resource added!');
    window.location.href = '../shop/resources.html';

  } catch (err) {
    console.error('Fetch error:', err);
    alert('Failed to save the resource. Try again.');
  }
}

const deleteResource = (btn) => {
    const resourceId = btn.parentNode.querySelector('[name=resourceId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    
    const resourceElement = btn.closest('.item');
    
    fetch('/admin/resource/' + resourceId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrfToken
        }
    })
    .then(result => result.json())
    .then(data => {
        console.log(data);
        resourceElement.parentNode.removeChild(resourceElement);
    })
    .catch(err => console.log(err));
};