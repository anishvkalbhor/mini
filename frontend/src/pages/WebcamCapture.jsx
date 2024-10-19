import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js'; // For OCR (optional)

const WebcamCapture = () => {
  // Reference to access the webcam
  const webcamRef = useRef(null);
  
  // State for storing the captured image and scanned text
  const [imageSrc, setImageSrc] = useState(null);
  const [scannedText, setScannedText] = useState('');

  // Function to capture the image from the webcam
  const capture = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImageSrc(capturedImage); // Save the captured image to state
    scanImage(capturedImage);   // Perform OCR on the image
  };

  // Function to scan the image using Tesseract.js for OCR
  const scanImage = (image) => {
    Tesseract.recognize(
      image,
      'eng',  // Language set to English
      { logger: (m) => console.log(m) } // Optional logger for progress
    ).then(({ data: { text } }) => {
      setScannedText(text);  // Save the scanned text to state
    });
  };

  return (
    <div>
      <h1>Image Scanner</h1>
      
      {/* Webcam element to capture image */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"  // Captures images in JPEG format
        width={400}
      />
      
      {/* Button to capture image */}
      <button onClick={capture}>Capture Image</button>
      
      {/* Display the captured image */}
      {imageSrc && (
        <div>
          <h2>Captured Image</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
      
      {/* Display scanned text (if OCR is done) */}
      {scannedText && (
        <div>
          <h2>Scanned Text</h2>
          <p>{scannedText}</p>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
