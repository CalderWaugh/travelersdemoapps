import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Navbar(){
	
	function handleClick() {
		const query = document.getElementById("searchQuery").value
        window.location='http://localhost:3000/searchresult?query='+query;
    };

    return(
        <header>
			<div class="p-3 text-center bg-white border-bottom">
				<div class="container">
				<div class="row gy-3">
					<div class="col-lg-2 col-sm-4 col-4">
					<a class="navbar-brand" href="/">Toy's R Me</a>
					</div>
					<div class="order-lg-last col-lg-3 col-sm-8 col-8">
					<div class="d-flex float-end">
						<a href="/cart" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" /*target="_blank"*/> <p class="d-none d-md-block mb-0">My cart</p> </a>
						<button class="navbar-toggler border rounded me-1 py-1 px-3 d-flex align-items-center" type="button" data-bs-toggle="offcanvas" tabindex="-1" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
							Categories
						</button>

						<div class="offcanvas offcanvas-end" id="offcanvasNavbar">
							<div class="offcanvas-header">
							<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Categories</h5>
							<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
							</div>
							<div class="offcanvas-body">
							<ul id = "nav-list" class="navbar-nav">
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Arts">Arts</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Baby">Baby</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#http://localhost:3000/category?category=Bags">Bags</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Bedding">Bedding</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Camping">Camping</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Car">Car</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Characters">Characters</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Cooking">Cooking</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Die-Cast">Die-Cast</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Dogs">Dogs</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Dolls">Dolls</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Educational">Educational</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Electronic">Electronic</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Fancy">Fancy</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Figures">Figures</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Games">Games</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Gardening">Gardening</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Handbags">Handbags</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Hobbies">Hobbies</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Home">Home</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Indoor">Indoor</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Jams">Jams</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Jigsaws">Jigsaws</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Lab">Lab</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Laundry">Laundry</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Medical">Medical</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Medication">Medication</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Men">Men</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Musical">Musical</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Novelty">Novelty</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Office">Office</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Party">Party</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Pens">Pens</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Pretend">Pretend</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Puppets">Puppets</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Sports">Sports</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Storage">Storage</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Supporters">Supporters</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Sweets">Sweets</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Women">Women</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=Worlds">Worlds</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="http://localhost:3000/category?category=noCategory">No category</a>
								</li>
							</ul>
						</div>
						</div>
					</div>
					</div>
					<div class="col-lg-7 col-md-12 col-12">
					<div class="input-group float-center">
						<div class="form-outline">
						<form class="d-flex" role="search">
							<input class="form-control w-75" type="search" placeholder="Search" aria-label="Search" id="searchQuery"></input>
							<a href="#" class="btn btn-primary mt-1" onClick={() => handleClick()}>Search</a>
						</form>
					</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		</header>
    );
}

export default Navbar;