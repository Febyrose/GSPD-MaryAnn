import MlkitOcr from 'react-native-mlkit-ocr';
import { ExpectedDocumentMapping, TemplateMapping } from './DocumentTypes/Mapping';

const testImage = true;

const handleImage = async (image) => {
    let results = await MlkitOcr.detectFromUri(image);
    const resultList = {};

    if (testImage) {
        const orderedResults = [];
        const foundBlocks = [];
        for (let blockNum = 1; blockNum <= 77; blockNum++) {
            // Special case: Age+Sex needs to be combined
            if (ExpectedDocumentMapping[blockNum] == "Age,Sex") {
                const ageBlockNum = Object.keys(TemplateMapping).find(key => TemplateMapping[key] == "Age");
                const sexBlockNum = Object.keys(TemplateMapping).find(key => TemplateMapping[key] == "Sex");
                results[ageBlockNum - 1].text += results[sexBlockNum - 1].text;
                orderedResults.push(results[17]);
                foundBlocks.push([ageBlockNum, sexBlockNum]);
                continue;
            }
            const testBlockNum = Object.keys(TemplateMapping).find(key => TemplateMapping[key] == ExpectedDocumentMapping[blockNum]);        
            orderedResults.push(results[testBlockNum - 1]);
            foundBlocks.push(testBlockNum);
        }
        // Add the rest of the data
        for (let i = 1; i <= 77; i++) {
            if (!foundBlocks.includes(i)) {
                orderedResults.push(results[i - 1]);
            }            
        }
        results = orderedResults;
    }

    // Create a list of the column descriptors that we can later reference for coordinates
    columnCoordinates = {};
    results.forEach(block => {
        switch (true) {
            case block == undefined:
                break;
            // These all come together in one block
            case block.text.includes("Ketamine"):
            case block.text.includes("propofol"):
            case block.text.includes("Diazepam"):
                const distanceThird = block.bounding.width / 3;
                columnCoordinates["Ketamine"] = {"height": block.bounding.height, "left": block.bounding.left, "top": block.bounding.top, "width": distanceThird};
                columnCoordinates["Propofol"] = {"height": block.bounding.height, "left": block.bounding.left + distanceThird, "top": block.bounding.top, "width": distanceThird};
                columnCoordinates["Diazepam"] = {"height": block.bounding.height, "left": block.bounding.left + distanceThird * 2, "top": block.bounding.top, "width": distanceThird};
                break;

            case block.text.includes("Date"):
                columnCoordinates["Date"] = block.bounding;
                break;
            case block.text.includes("BP"):
                columnCoordinates["BP"] = block.bounding;
                break;
            case block.text.includes("PR"):
                columnCoordinates["PR"] = block.bounding;
                break;
            case block.text.includes("SPO2"):
                columnCoordinates["SPO2"] = block.bounding;
                break;
            case block.text.includes("Temp"):
                columnCoordinates["Temp"] = block.bounding;
                break;
            case block.text.includes("Induction"):
                columnCoordinates["Time of Induction"] = block.bounding;
                break;
            case block.text.includes("Procedure"):
                columnCoordinates["Duration of Procedure"] = block.bounding;
                break;
            case block.text.includes("Anesthesia"):
                columnCoordinates["Duration of Anesthesia"] = block.bounding;
                break;
            case block.text.includes("Recovery"):
                columnCoordinates["Time of Recovery"] = block.bounding;
                break;
            case block.text.includes("Anesthetist"):
                columnCoordinates["Name of Anesthetist"] = block.bounding;
                break;        
            default:
                break;
        }
    });

    // Figure out how far apart the rows are
    rowBounding = {};
    rowCoordinates = {};
    multipleRow = [];
    results.forEach(block => {
        if (block == undefined) return;
        if (block.text >= 1 && block.text <= 20 && !multipleRow.includes(block.text)) {
            if (rowBounding[block.text] != undefined) {
                multipleRow.push(block.text);
                delete rowBounding[block.text];
                return;
            }
            rowBounding[block.text] = block.bounding;
        }
    });
    for (let i = 1; i <= 20; i++) {
        if (rowBounding[i] == undefined || rowBounding[i + 1] == undefined || rowBounding[i + 2] == undefined) continue;
        const distanceOne = rowBounding[i + 2].top - rowBounding[i + 1].top;
        const distanceTwo = rowBounding[i + 1].top - rowBounding[i].top;
        const combinedDistance = Math.abs(distanceTwo - distanceOne);
        if (combinedDistance <= 1) {
            // We found the distances between rows
            rowCoordinates[i] = rowBounding[i].top;
            rowCoordinates[i + 1] = rowBounding[i + 1].top;
            rowCoordinates[i + 2] = rowBounding[i + 2].top;
            for (let index = 1; index < i; index++) {
                rowCoordinates[index] = rowBounding[i].top - (i - index) * distanceOne;
            }
            for (let index = i + 3; index <= 20; index++) {
                rowCoordinates[index] = rowBounding[i + 2].top - (index - i) * distanceOne;
            }
        }
    }

    blockNum = 1;
    // Structure of results: https://github.com/agoldis/react-native-mlkit-ocr/blob/main/src/index.d.ts
    results.forEach(block => {
        // With block number and mapping, set correct key and save value
        // Handle row data by finding row number
        // Extract all other data depending on row number
        switch (blockNum) {
            case 2:
            case 4:
            case 5:
            case 6:
            case 7:
                const value = block.text.split(ExpectedDocumentMapping[blockNum]).pop();
                resultList[ExpectedDocumentMapping[blockNum]] = value;
                break;
            case 3:
                const age = block.text.split('Age').pop().split('Sex')[0];
                const sex = block.text.split('Sex').pop();
                resultList["Age"] = age;
                resultList["Sex"] = sex;
                break;
            default:
                // Handles the tabular data entries
                if (blockNum <= 24 || block == undefined) break;
                // Figure out in which row we are
                const blockMidTop = block.bounding.top - block.bounding.height / 2;
                let nearestRow;
                let closestDistance = Infinity;
                for (const [key, value] of Object.entries(rowCoordinates)) {
                    if (Math.abs(blockMidTop - value) < closestDistance) {
                        closestDistance = Math.abs(blockMidTop - value);
                        nearestRow = key;
                    }
                }
                // Too far away, if properties on top slip in here for example
                if (closestDistance > 20) break;
                // Figure out which data entry the text is
                const blockMidLeft = block.bounding.left + block.bounding.width / 2;
                let entryType = "";
                for (const [key, value] of Object.entries(columnCoordinates)) {
                    if (value.left < blockMidLeft && blockMidLeft < value.left + value.width) {
                        // block is within this column
                        entryType = key;
                        break;
                    }
                }
                resultList["Row" + nearestRow + entryType] = block.text;
                break;
        }
        blockNum++;
    });
    return resultList;
};

export default handleImage;
