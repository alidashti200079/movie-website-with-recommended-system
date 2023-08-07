import React, { useEffect, useState } from 'react';
import './userPage.css';
import Navbar from './navbar';

const UserPage = () => {

    const [state, setState]=useState("Profile"); 

    useEffect(() => {
        const navTabs = document.querySelectorAll("#nav-tabs > a");
        navTabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            navTabs.forEach((tab) => {
              tab.classList.remove("active");
            });
            tab.classList.add("active");
          });
        });
      }, []);

  return (
    <>
    <Navbar/>
    <div className="div1">
        <div className="site-wrap">

        <nav className="site-nav">

        <div className="name">
        User Dashboard
        </div>

        <ul>
        <li><a onClick={() => {setState("Profile")}}>Profile</a></li>
        <li><a onClick={() => {setState("Connected devices")}}>Connected devices</a></li>
        <li><a onClick={() => {setState("Transaction history")}}>Transaction history</a></li>
        <li><a onClick={() => {setState("Favorites")}}>Favorites</a></li>   
        <li><a onClick={() => {setState("Voted")}}>Voted</a></li>
        <li><a onClick={() => {setState("Reports")}}>Reports</a></li>
        </ul>

        <div className="note">
        <h3>Your Monthly Report</h3>
        <p>There are only 13 days left in your subscription.</p>
        </div>

        </nav>

        <main>

        <header>
        <h1 className="title">{state}</h1>

        <nav className="nav-tabs" id="nav-tabs">
        <a href="#0" class="active">
            Deals
        </a>
        <a href="#0">
            Library
        </a>
        <a href="#0">
            Search Library
        </a>
        </nav>
        </header>

        <div class="content-columns">

        <div class="col">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        </div>
        <div class="col">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        </div>
        <div class="col">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        </div>
        <div class="col">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        </div>

        </div>

        </main>

        </div>
    </div>
    </>
  );
};

export default UserPage;
