import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { FiUpload } from "react-icons/fi";
import { FaRegCircleCheck, FaImage } from "react-icons/fa6";

import {
  PROGRESS_INCREMENT,
  REDIRECT_DELAY_MS,
  PROGRESS_INTERVAL_MS,
} from "../lib/constant";

interface UploadProps {
  onComplete: (base64Data: string) => void;
}

function Upload({ onComplete }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const { isSignedIn } = useOutletContext<AuthContext>();

  // -----------------------------
  // PROCESS FILE
  // -----------------------------
  const processFile = (selectedFile: File) => {
    // Block everything if not signed in
    if (!isSignedIn) {
      return;
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/png"];

    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a JPG, JPEG, or PNG image.");
      return;
    }

    // Check file size - 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
    setProgress(0);

    const reader = new FileReader();

    // Convert image to Base64
    reader.onload = () => {
      if (!isSignedIn) {
        return;
      }

      const base64Data = reader.result as string;

      let currentProgress = 0;

      const interval = setInterval(() => {
        // Stop if user is no longer signed in
        if (!isSignedIn) {
          clearInterval(interval);
          return;
        }

        currentProgress = Math.min(currentProgress + PROGRESS_INCREMENT, 100);

        setProgress(currentProgress);

        // Progress finished
        if (currentProgress >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            // Check sign-in again before completing
            if (!isSignedIn) {
              return;
            }

            onComplete(base64Data);
          }, REDIRECT_DELAY_MS);
        }
      }, PROGRESS_INTERVAL_MS);
    };

    reader.readAsDataURL(selectedFile);
  };

  // -----------------------------
  // FILE INPUT
  // -----------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) {
      return;
    }

    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    processFile(selectedFile);

    // Allows selecting the same file again
    event.target.value = "";
  };

  // -----------------------------
  // DRAG OVER
  // -----------------------------
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    if (!isSignedIn) {
      return;
    }

    setDragging(true);
  };

  // -----------------------------
  // DRAG LEAVE
  // -----------------------------
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    if (!isSignedIn) {
      return;
    }

    setDragging(false);
  };

  // -----------------------------
  // DROP
  // -----------------------------
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    setDragging(false);

    if (!isSignedIn) {
      return;
    }

    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) {
      return;
    }

    processFile(droppedFile);
  };

  return (
    <div className="upload">
      {!file ? (
        <label
          className={`dropzone ${
            isDragging ? "is-dragging" : "not-dragging"
          } ${!isSignedIn ? "disabled" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleFileChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <FiUpload size={20} />
            </div>

            <p>
              {isSignedIn
                ? isDragging
                  ? "Drop your floor plan here"
                  : "Click to upload or just drag and drop"
                : "Sign in or Sign up with Puter to upload"}
            </p>

            <p className="help">Maximum file size 10MB.</p>
          </div>
        </label>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <FaRegCircleCheck size={20} />
              ) : (
                <FaImage size={20} />
              )}
            </div>

            <h3>{file.name}</h3>

            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />

              <p className="status-text">
                {progress < 100 ? "Analyzing Floor Plan..." : "Redirecting..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
