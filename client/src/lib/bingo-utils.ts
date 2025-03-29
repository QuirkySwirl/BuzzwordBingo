// Check if a bingo has been achieved
export function checkForBingo(
  markedSquares: boolean[],
  freeSpaceIndex: number = 12
): { hasBingo: boolean; bingoLines: number[][] } {
  const rows = 5;
  const cols = 5;
  const bingoLines: number[][] = [];
  let hasBingo = false;

  // Mark the free space automatically
  const effectiveMarks = [...markedSquares];
  effectiveMarks[freeSpaceIndex] = true;

  // Check rows
  for (let row = 0; row < rows; row++) {
    const indices = [];
    let rowBingo = true;
    
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      indices.push(index);
      
      if (!effectiveMarks[index]) {
        rowBingo = false;
      }
    }
    
    if (rowBingo) {
      hasBingo = true;
      bingoLines.push(indices);
    }
  }

  // Check columns
  for (let col = 0; col < cols; col++) {
    const indices = [];
    let colBingo = true;
    
    for (let row = 0; row < rows; row++) {
      const index = row * cols + col;
      indices.push(index);
      
      if (!effectiveMarks[index]) {
        colBingo = false;
      }
    }
    
    if (colBingo) {
      hasBingo = true;
      bingoLines.push(indices);
    }
  }

  // Check diagonal (top-left to bottom-right)
  let diag1Bingo = true;
  const diag1Indices = [];
  
  for (let i = 0; i < rows; i++) {
    const index = i * cols + i;
    diag1Indices.push(index);
    
    if (!effectiveMarks[index]) {
      diag1Bingo = false;
    }
  }
  
  if (diag1Bingo) {
    hasBingo = true;
    bingoLines.push(diag1Indices);
  }

  // Check diagonal (top-right to bottom-left)
  let diag2Bingo = true;
  const diag2Indices = [];
  
  for (let i = 0; i < rows; i++) {
    const index = i * cols + (cols - 1 - i);
    diag2Indices.push(index);
    
    if (!effectiveMarks[index]) {
      diag2Bingo = false;
    }
  }
  
  if (diag2Bingo) {
    hasBingo = true;
    bingoLines.push(diag2Indices);
  }

  return { hasBingo, bingoLines };
}

// Calculate the bingo progress as a percentage
export function calculateBingoProgress(
  markedSquares: boolean[],
  freeSpaceIndex: number = 12
): number {
  // Count marked squares (including free space)
  const markedCount = markedSquares.filter(Boolean).length + (markedSquares[freeSpaceIndex] ? 0 : 1);
  
  // Calculate percentage (out of 25 squares)
  return Math.round((markedCount / 25) * 100);
}

// Generate share text based on meeting type and bingo status
export function generateShareText(
  meetingType: string,
  hasBingo: boolean,
  markedWords: string[]
): string {
  if (hasBingo) {
    return `BINGO! I just won at Corporate Buzzword Bingo during a ${meetingType}! The buzzword bingo card was filled with classics like "${markedWords[0]}" and "${markedWords[1]}". #CorporateBuzzwordBingo`;
  } else {
    return `Playing Corporate Buzzword Bingo during my ${meetingType}. So far I've heard "${markedWords[0]}"${markedWords.length > 1 ? ` and "${markedWords[1]}"` : ''} multiple times! #CorporateBuzzwordBingo`;
  }
}
