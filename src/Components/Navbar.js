import React from 'react';
import styles from '../Styles/Navbar.module.css';
import { SignedIn,UserButton } from '@clerk/clerk-react'; 
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate=useNavigate();
    const isSignedIn=useUser();

    const handleEditClick = () => {
        if (isSignedIn) {
            navigate('/resume-builder');
        } else {
            navigate('/login');
        }
    };
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.website_name}>Resume Builder</h1>

            <div className={styles.navlinks}>
                <button className={styles.button1} onClick={handleEditClick}>Resume Template</button>
                <a href='/ChatGbt'> AI Powered Suggestions</a>
                <Link to='/Login'>Login</Link>
               
                <SignedIn>
                    <UserButton afterSignOutUrl='/' /> 
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;