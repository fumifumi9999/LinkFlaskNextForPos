"use client"
import { useState } from 'react';
import { useZxing } from 'react-zxing';

const BarcodeReader = (barcode) => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
      onDecodeResult(result) {
        setResult(result.getText());
        if (result){
          barcode = result.getText(); // Call the callback function
          // console.log(barcode);
        } 
    },
    onError(error) {
      console.error('Decode error:', error);
    },
    onDecodeError(decodeError) {
      console.error('Decode processing error:', decodeError);
    }
  });

  return (
    <>
      {!result && <video ref={ref} style={{ width: '100%' }} />}
      {result && <p>{result}</p>}
    </>
  );
};

export default BarcodeReader;