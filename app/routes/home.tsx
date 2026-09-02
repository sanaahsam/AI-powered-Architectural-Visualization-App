import Navbar from "~/Components/Navbar";
import type { Route } from "./+types/home";
import { GoArrowRight } from "react-icons/go";
import { HiSquare3Stack3D } from "react-icons/hi2";
import ProjectCard from "~/Components/ProjectCard";
import Upload from "~/Components/Upload";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomify" },
    {
      name: "description",
      content:
        "AI-powered-Architectural-Visualization using react.js and puter.js",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const handleUplodeComplete = async (base64Image: string) => {
    const newId = Date.now().toString();

    navigate(`/visualizer/${newId}`);
    return true;
  };

  return (
    <div>
      <Navbar />
      <section className="home">
        <h1>Build beautiful spaces at the speed of thought with Roomify</h1>

        <p>
          ROOMIFY IS AN AI-FIRST DESIGN ENVIRONMENT THAT HELPS YOU VISUALIZE,
          RENDER, AND SHIP ARCHITECTURAL PROJECTS FASTER THAN EVER.
        </p>

        <div className="home-buttons">
          <a className="cta" href="/#getstarted">
            START BUILDING
            <GoArrowRight size={20} />
          </a>
          <a className="demo">WATCH DEMO</a>
        </div>
      </section>

      <section id="getstarted">
        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <HiSquare3Stack3D className="icon" />
              </div>

              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG, formats up to 10MB</p>
            </div>

            <Upload onComplete={handleUplodeComplete} />
          </div>
        </div>
      </section>

      <section id="project" className="project-section">
        <h1 className="projecth1">Project</h1>
        <p className="projectP">
          Your latest work and community projects, all in one place.
        </p>
        <div className="project-conatainer">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
    </div>
  );
}
