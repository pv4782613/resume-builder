import React from 'react';
import styles from '../Styles/ResumeBuilder.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


import t1 from '../Assets/template1.png';
import t2 from '../Assets/template2.png';
import t3 from '../Assets/template3.png';


const Resume_builder = () => {

	const navigate = useNavigate();
    const { isSignedIn } = useUser();

    const handleEditClick = () => {
        if (isSignedIn) {
            navigate('/edit-template');
        } else {
            navigate('/login');
        }
    };

    return(
    <div className={styles.container}>
        <div className={styles.row}>
		<div className={styles.column}>
			<div className={styles.cards}>
				<img src={t1} alt='t1'></img>
				<button className={styles.button1} onClick={handleEditClick}>Edit this template</button>
			</div>
		</div>
		<div className={styles.column}>
			<div className={styles.cards}>
            <img src={t2} alt='t2'></img>
			<button className={styles.button1} onClick={()=>alert("Coming Soon !!")}>Edit this template</button>
			</div>
		</div>
		<div className={styles.column}>
			<div className={styles.cards}>
            <img src={t3} alt='t3'></img>
			<button className={styles.button1} onClick={()=>alert("Coming Soon !!")}>Edit this template</button>
			</div>
		</div>
</div>


</div>
    );
};

export default Resume_builder;