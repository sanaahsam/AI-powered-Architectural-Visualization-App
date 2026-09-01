import React from "react";
import "./ProjectCard.css";

function ProjectCard() {
  return (
    <div className="project-card">
      <div className="project-image">
        <img
          src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
          alt="Project Manhattan floor plan"
        />
        <span className="project-badge">COMMUNITY</span>
      </div>
      <div className="project-info">
        <div className="project-details">
          <h3>Project Manhattan</h3>
          <div className="project-meta">
            <span>◷</span>
            <span>1/1/2027</span>
            <span>BY</span>
            <span>JS MASTER</span>
          </div>
        </div>
        <button className="project-arrow">↗</button>
      </div>
    </div>
  );
}

export default ProjectCard;
