import React, { useState, useRef } from "react";
import styles from "../Styles/EditTemplate.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import profile from '../Assets/profile.jpg';


const EditTemplate = () => {

  const [uploadedImage, setUploadedImage] = useState(null);
const fileInputRef = useRef();

const handleImageClick = () => {
  fileInputRef.current.click();
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    phone: "",
    skills: [],
    certifications: [],
    references: [],
    company_name: "",
    company_job_title: "",
    company_start_date: "",
    company_end_date: "",
    college_name: "",
    course_name: "",
    course_start_date: "",
    course_end_date: "",
    project_name: "",
    project_start_date: "",
    project_end_date: "",
    job_responsibilities:[],
    education:[],
    projects:[],
  });

  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newReferences, setNewReferences] = useState("");
  const [newJobResponsibilities, setNewJobResponsibilities] = useState("");
  const [newEducationDetails, setNewEducationDetails] = useState("");
  const [newProjectsDetails, setNewProjectsDetails] = useState("");
  const [showInput, setShowInput] = useState(false);

  const rightSectionRef = useRef(); // Reference to the right section

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setResumeData({ ...resumeData, skills: [...resumeData.skills, newSkill] });
      setNewSkill("");
      setShowInput(false);
    }
  };

  const addCertification = () => {
    if (newCertification.trim() !== "") {
      setResumeData({ ...resumeData, certifications: [...resumeData.certifications, newCertification] });
      setNewCertification("");
      setShowInput(false);
    }
  };

  const addJobResponsibilities = () => {
  if (newJobResponsibilities.trim() === '') return;
  if (newJobResponsibilities.length > 100) return; // ✅ limit to 200 chars
  if (resumeData.job_responsibilities.length >= 3) return; // ✅ max 5 entries

  setResumeData({
    ...resumeData,
    job_responsibilities: [
      ...resumeData.job_responsibilities,
      newJobResponsibilities.trim()
    ]
  });

  setNewJobResponsibilities('');
  setShowInput(false);
};


    const addReferences = () => {
    if (newReferences.trim() !== "") {
      setResumeData({ ...resumeData, references: [...resumeData.references, newReferences] });
      setNewReferences("");
      setShowInput(false);
    }
  };

   
const addEducationDetails = () => {
  if (newEducationDetails.trim() === '') return;
  if (newEducationDetails.length > 100) return; // ✅ max 100 characters
  if (resumeData.education.length >= 3) return;  // ✅ max 3 entries

  setResumeData({
    ...resumeData,
    education: [...resumeData.education, newEducationDetails.trim()],
  });

  setNewEducationDetails('');
  setShowInput(false);
};


 const addNewProjectDetails = () => {
  if (newProjectsDetails.trim() === '') return;
  if (newProjectsDetails.length > 100) return; // ✅ Limit characters
  if (resumeData.projects.length >= 3) return;  // ✅ Limit entries

  setResumeData({
    ...resumeData,
    projects: [...resumeData.projects, newProjectsDetails.trim()],
  });

  setNewProjectsDetails('');
  setShowInput(false);
};



  const removeSkill = (index) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter((_, i) => i !== index) });
  };

  const removeCertifications = (index) => {
    setResumeData({ ...resumeData, certifications: resumeData.certifications.filter((_, i) => i !== index) });
  };
  const removeReferences = (index) => {
    setResumeData({ ...resumeData, references: resumeData.references.filter((_, i) => i !== index) });
  };
  const remove_job_responsibilities = (index) => {
    setResumeData({ ...resumeData, job_responsibilities: resumeData.job_responsibilities.filter((_, i) => i !== index) });
  };
  const remove_education_details = (index) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter((_, i) => i !== index) });
  };
  const remove_project_details = (index) => {
    setResumeData({ ...resumeData, projects: resumeData.projects.filter((_, i) => i !== index) });
  };

 
  // Function to Download PDF
  const downloadPDF = () => {
    const input = rightSectionRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10;
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      pdf.save("Resume.pdf");
    });
  };

  return (
    <>
    {/* <h1 style={{textAlign:'center',fontSize:'20px',marginTop:'50px'}}>Welcome {user.fullName}</h1>  */}
    <div className={styles.container}>
      <div className={styles.leftsection}>
         <h4>Personal Details</h4>

        <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} value={resumeData.summary}></textarea>

       
         
        <div className={styles.grid_container}>

         

        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={resumeData.fullName} maxLength={50} />

<input type="email" name="email" placeholder="Email" onChange={handleChange} value={resumeData.email} maxLength={50} />

<input type="text" name="phone" placeholder="Phone" onChange={handleChange} value={resumeData.phone} maxLength={15} />

<input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} value={resumeData.company_name} maxLength={50} />

<input type="text" name="company_job_title" placeholder="Company Job Title" onChange={handleChange} value={resumeData.company_job_title} maxLength={50} />

<input type="text" name="company_start_date" placeholder="Company Start Date" onChange={handleChange} value={resumeData.company_start_date} maxLength={20} />

<input type="text" name="company_end_date" placeholder="Company Last Working Date" onChange={handleChange} value={resumeData.company_end_date} maxLength={20} />

<input type="text" name="college_name" placeholder="College Name" onChange={handleChange} value={resumeData.college_name} maxLength={50} />

<input type="text" name="course_name" placeholder="Course Name" onChange={handleChange} value={resumeData.course_name} maxLength={50} />

<input type="text" name="course_start_date" placeholder="Course Start Date" onChange={handleChange} value={resumeData.course_start_date} maxLength={20} />

<input type="text" name="course_end_date" placeholder="Course End Date" onChange={handleChange} value={resumeData.course_end_date} maxLength={20} />

<input type="text" name="project_name" placeholder="Project Name" onChange={handleChange} value={resumeData.project_name} maxLength={50} />

<input type="text" name="project_start_date" placeholder="Project Start Date" onChange={handleChange} value={resumeData.project_start_date} maxLength={20} />

<input type="text" name="project_end_date" placeholder="Project End Date" onChange={handleChange} value={resumeData.project_end_date} maxLength={20} />

        </div>

        <h4>Skills:</h4>
        <div className={styles.skillsContainer}>
          {resumeData.skills.map((skill, index) => (
            <div key={index} className={styles.skillBox}>
              {skill} <FontAwesomeIcon icon={faTimes} className={styles.removeIcon} onClick={() => removeSkill(index)} />
            </div>
          ))}

          {showInput ? (
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
                placeholder="Enter skill" 
              />
              <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} onClick={addSkill} />
            </div>
          ) : (
            <button className={styles.addSkillButton} onClick={() => setShowInput(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Skill
            </button>
          )}
        </div>


        <h4>Certification:</h4>
        <div className={styles.skillsContainer}>
          {resumeData.certifications.map((certification, index) => (
            <div key={index} className={styles.skillBox}>
              {certification} <FontAwesomeIcon icon={faTimes} className={styles.removeIcon} onClick={() => removeCertifications(index)} />
            </div>
          ))}

          {showInput ? (
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                value={newCertification} 
                onChange={(e) => setNewCertification(e.target.value)} 
                placeholder="Enter Certification Name: " 
              />
              <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} onClick={addCertification} />
            </div>
          ) : (
            <button className={styles.addSkillButton} onClick={() => setShowInput(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Certification
            </button>
          )}
        </div>

      <h4>References:</h4>
        <div className={styles.skillsContainer}>
          {resumeData.references.map((reference, index) => (
            <div key={index} className={styles.skillBox}>
              {reference} <FontAwesomeIcon icon={faTimes} className={styles.removeIcon} onClick={() => removeReferences(index)} />
            </div>
          ))}

          {showInput ? (
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                value={newReferences} 
                onChange={(e) => setNewReferences(e.target.value)} 
                placeholder="Enter References: " 
              />
              <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} onClick={addReferences} />
            </div>
          ) : (
            <button className={styles.addSkillButton} onClick={() => setShowInput(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add References
            </button>
          )}
        </div>


     <h4>Job Responsibilities:</h4>
<div className={styles.skillsContainer}>
  {resumeData.job_responsibilities.map((job_responsibilitie, index) => (
    <div key={index} className={styles.skillBox}>
      {job_responsibilitie}
      <FontAwesomeIcon 
        icon={faTimes} 
        className={styles.removeIcon} 
        onClick={() => remove_job_responsibilities(index)} 
      />
    </div>
  ))}

  {showInput && resumeData.job_responsibilities.length < 3 ? (
    <div className={styles.inputWrapper}>
      <input 
        type="text" 
        value={newJobResponsibilities} 
        onChange={(e) => setNewJobResponsibilities(e.target.value)} 
        placeholder="Enter Job Responsibilities: " 
        maxLength={100} // ✅ limit per input
      />
      <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} onClick={addJobResponsibilities} />
    </div>
  ) : resumeData.job_responsibilities.length < 3 ? (
    <button className={styles.addSkillButton} onClick={() => setShowInput(true)}>
      <FontAwesomeIcon icon={faPlus} /> Add Job Responsibilities
    </button>
  ) : null}
</div>


      <h4>Education:</h4>
<div className={styles.skillsContainer}>
  {resumeData.education.map((education, index) => (
    <div key={index} className={styles.skillBox}>
      {education}
      <FontAwesomeIcon
        icon={faTimes}
        className={styles.removeIcon}
        onClick={() => remove_education_details(index)}
      />
    </div>
  ))}

  {showInput && resumeData.education.length < 3 ? (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        value={newEducationDetails}
        onChange={(e) => setNewEducationDetails(e.target.value)}
        placeholder="Enter Education Details: "
        maxLength={100} // ✅ max 100 characters
      />
      <FontAwesomeIcon
        icon={faCheck}
        className={styles.checkIcon}
        onClick={addEducationDetails}
      />
    </div>
  ) : resumeData.education.length < 3 ? (
    <button className={styles.addSkillButton} onClick={() => setShowInput(true)}>
      <FontAwesomeIcon icon={faPlus} /> Add Education Details
    </button>
  ) : null}
</div>

        
         <h4>Projects:</h4>
<div className={styles.skillsContainer}>
  {resumeData.projects.map((project, index) => (
    <div key={index} className={styles.skillBox}>
      {project}
      <FontAwesomeIcon
        icon={faTimes}
        className={styles.removeIcon}
        onClick={() => remove_project_details(index)}
      />
    </div>
  ))}

  {showInput && resumeData.projects.length < 3 ? (
    <div className={styles.inputWrapper}>
      <input 
        type="text" 
        value={newProjectsDetails} 
        onChange={(e) => setNewProjectsDetails(e.target.value)} 
        placeholder="Enter Project Details: "
        maxLength={100} // ✅ Max 100 characters
      />
      <FontAwesomeIcon 
        icon={faCheck} 
        className={styles.checkIcon} 
        onClick={addNewProjectDetails} 
      />
    </div>
  ) : resumeData.projects.length < 3 ? (
    <button className={styles.addSkillButton} onClick={() => setShowInput(true)}>
      <FontAwesomeIcon icon={faPlus} /> Add Project Details
    </button>
  ) : null}
</div>


        
      </div>

      {/* Right Section ----------- Resume Preview */}
      <div className={styles.rightsection} ref={rightSectionRef}>
        
 
          <div className={styles.container1}>
              <div className={styles.container1_left} onClick={handleImageClick} style={{ cursor: 'pointer', position: 'relative' }}>
            <img 
              src={uploadedImage || profile} 
              alt="Profile_Image" 
            />
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleImageUpload}
          />
          </div>
   
              


              <div className={styles.container1_right}>
                <h3>{resumeData.fullName}</h3>
                 <p>{resumeData.email}</p>
                <p>{resumeData.phone}</p>
                 {resumeData.summary && resumeData.summary.length > 0 ? (
               <div className={styles.content_bg}>
               <h4>Profile:</h4>
                <p>{resumeData.summary}</p>
               </div>
                 ) : (
              <div style={{ backgroundColor: 'white' }}></div>
            )}
              </div>
          </div>


          <div className={styles.container2}>
{(resumeData.company_start_date || resumeData.company_end_date || resumeData.company_name || resumeData.company_job_title || (resumeData.job_responsibilities && resumeData.job_responsibilities.length > 0)) ? (
  <div className={styles.container2_left}>
    <h3>Work Experience</h3>
    <p className={styles.content_bgcolor_black}>
      {resumeData.company_name} - {resumeData.company_job_title}
    </p>
    <p>
      {resumeData.company_start_date && <span>{resumeData.company_start_date}</span>}
      {resumeData.company_start_date && resumeData.company_end_date && <span> – </span>}
      {resumeData.company_end_date && <span>{resumeData.company_end_date}</span>}
    </p>
    
    {resumeData.job_responsibilities && resumeData.job_responsibilities.length > 0 && (
      <ul>
        {resumeData.job_responsibilities.map((job_responsibility, index) => (
          <li key={index}>{job_responsibility}</li>
        ))}
      </ul>
    )}
  </div>
) : (
  <div style={{ backgroundColor: 'white' }}></div>
)}








  {resumeData.skills && resumeData.skills.length > 0 ? (
              <div className={styles.container2_right}>
               <h4>Skills:</h4>
               <div className={styles.content_bg2}>
                <ul>
                 {resumeData.skills.map((skill, index) => (
                   <li key={index}>{skill}</li>
                  ))}
                </ul>
               </div>
              </div>
                ) : (
              <div style={{ backgroundColor: 'white' }}></div>
            )}
          </div>







         
<div className={styles.container2}>
  {(resumeData.course_start_date || resumeData.course_end_date || resumeData.college_name || resumeData.course_name || (resumeData.education && resumeData.education.length > 0)) ? (
    <div className={styles.container2_left}>
      <h3>Education</h3>

      {(resumeData.course_name || resumeData.college_name) && (
        <p className={styles.content_bgcolor_black}>
          {resumeData.course_name}{resumeData.course_name && resumeData.college_name ? " - " : ""}
          {resumeData.college_name}
        </p>
      )}

      {(resumeData.course_start_date || resumeData.course_end_date) && (
        <p>
          {resumeData.course_start_date && <span>{resumeData.course_start_date}</span>}
          {resumeData.course_start_date && resumeData.course_end_date && <span> – </span>}
          {resumeData.course_end_date && <span>{resumeData.course_end_date}</span>}
        </p>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <ul>
          {resumeData.education.map((education, index) => (
            <li key={index}>{education}</li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div style={{ backgroundColor: 'white' }}></div>
  )}



  {resumeData.certifications && resumeData.certifications.length > 0 ? (
              <div className={styles.container2_right}>
               <h4>Certifications:</h4>
               <div className={styles.content_bg2}>
                <ul>
                 {resumeData.certifications.map((certification, index) => (
                   <li key={index}>{certification}</li>
                  ))}
                </ul>
               </div>
              </div>
               ) : (
              <div style={{ backgroundColor: 'white' }}></div>
            )}
          </div>
          

    <div className={styles.container2}>
            {(resumeData.project_name || resumeData.project_start_date || resumeData.project_end_date) ? (
  <div className={styles.container2_left}>
    <h3>Projects</h3>

    {(resumeData.project_name || resumeData.project_start_date || resumeData.project_end_date) && (
      <>
        <p className={styles.content_bgcolor_black}>{resumeData.project_name}</p>
        <p>{resumeData.project_start_date} - {resumeData.project_end_date}</p>
      </>
    )}

    {resumeData.projects && resumeData.projects.length > 0 && (
      <ul>
        {resumeData.projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>
    )}
  </div>
) : (
  <div style={{ backgroundColor: 'white' }}></div>
)}





            {resumeData.references && resumeData.references.length > 0 ? (
              <div className={styles.container2_right}>
                <h4>Reference:</h4>
                  <div className={styles.content_bg2}>
                    <ul>
                    {resumeData.references.map((reference, index) => (
                    <li key={index}>{reference}</li>
                    ))}
                    </ul>
                  </div>
                </div>
              ) : (
              <div style={{ backgroundColor: 'white' }}></div>
            )}

          </div>

      
       

      </div>

        <div className={styles.buttonWrapper}>
        <button onClick={downloadPDF} className={styles.button1}>Download PDF</button>
        </div>
    </div>


    </>
  );
};

export default EditTemplate;
