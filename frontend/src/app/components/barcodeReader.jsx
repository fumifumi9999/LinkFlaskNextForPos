"use client"
import React, { useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import Webcam from 'react-webcam';

const BarcodeReader = () => {
  const [barcode, setBarcode] = useState('');

  const webcamRef = React.useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      codeReader.decodeFromImage(undefined, imageSrc).then((result) => {
        console.log(result);
        setBarcode(result.text);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [codeReader]);

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 1000);

    return () => clearInterval(interval);
  }, [capture]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: "environment"
        }}
      />
      {barcode && <p>バーコード: {barcode}</p>}
    </>
  );
};

export default BarcodeReader;