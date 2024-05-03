import MlkitOcr from 'react-native-mlkit-ocr';

const handleImage = async (image) => {
    console.log("Processing image now.")
    const results = await MlkitOcr.detectFromUri(image);
    const resultList = [];
    // Structure of results: https://github.com/agoldis/react-native-mlkit-ocr/blob/main/src/index.d.ts
    results.forEach(block => {
        // We can split the text further by going into block.lines
        resultList.push(block.text);
    });
    return resultList;
};

export default handleImage;
