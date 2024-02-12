"use client"
import { useState } from 'react';
import { useZxing } from 'react-zxing';

const BarcodeReader = ({ onBarcodeScanned }) => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      onBarcodeScanned(result.getText()); // 親コンポーネントにバーコード値を渡す
    },
  });

  return (
    <>
      {!result && <video ref={ref} style={{ width: '100%' }} />}
      {result && <p>{result}</p>}
    </>
  );
};

export default BarcodeReader;