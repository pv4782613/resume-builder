import React from 'react';
import styles from '../Styles/Homepage.module.css';
import homepageimg from '../Assets/resume.jpg';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate=useNavigate();

    return(
        <div className={styles.container}>
            <div className={styles.leftsection}>
                <h2>Build & Download Your Resume – No Hidden Fees!</h2>
                <p>Say Goodbye to Paid Resume Downloads! Just create, customize, and download your resume in a minute !</p>
                <button onClick={()=>{navigate('/resume-builder')}}>Create Resume</button>
            </div>

            <div className={styles.rightsection}>
                <img src={homepageimg} alt=""></img>
            </div>
        </div>
    );
};

export default Homepage;