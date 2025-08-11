// Manual trace of IMBUE filtering

function getFeedbackPattern(targetWord, guess) {
    console.log(`\nGetting feedback for guess "${guess}" against target "${targetWord}"`);
    
    const feedback = new Array(5).fill('not-in-word');
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const usedTargetIndices = new Set();
    
    // First pass: mark correct positions
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === targetLetters[i]) {
            feedback[i] = 'correct';
            usedTargetIndices.add(i);
            console.log(`  Position ${i}: ${guessLetters[i]} is CORRECT`);
        }
    }
    
    // Second pass: mark wrong positions
    for (let i = 0; i < 5; i++) {
        if (feedback[i] === 'not-in-word') {
            for (let j = 0; j < 5; j++) {
                if (!usedTargetIndices.has(j) && guessLetters[i] === targetLetters[j]) {
                    feedback[i] = 'wrong-position';
                    usedTargetIndices.add(j);
                    console.log(`  Position ${i}: ${guessLetters[i]} is WRONG-POSITION (found at ${j})`);
                    break;
                }
            }
        }
        
        if (feedback[i] === 'not-in-word') {
            console.log(`  Position ${i}: ${guessLetters[i]} is NOT-IN-WORD`);
        }
    }
    
    console.log(`Final feedback: ${feedback}`);
    return feedback;
}

// Test typical first guesses against IMBUE
console.log('=== Testing typical guesses against IMBUE ===');

const target = 'IMBUE';
const commonFirstGuesses = ['AROSE', 'ADIEU', 'AUDIO', 'SLATE', 'CRANE'];

commonFirstGuesses.forEach(guess => {
    const feedback = getFeedbackPattern(target, guess);
    console.log(`${guess} -> ${feedback.join(', ')}\n`);
});

// Now test if IMBUE survives filtering after AROSE
console.log('=== Testing if IMBUE survives after AROSE ===');

const aroseFeedback = getFeedbackPattern('IMBUE', 'AROSE');
console.log('\nAROS feedback against IMBUE:', aroseFeedback);

// The feedback should be: [not-in-word, not-in-word, not-in-word, not-in-word, correct]
// This means: A-gray, R-gray, O-gray, S-gray, E-green

console.log('\nNow testing if IMBUE would pass the filter with this feedback...');

// Simulate the filtering logic
function testWordSurvival(word, guess, feedback) {
    console.log(`\nTesting if "${word}" survives guess "${guess}" with feedback [${feedback.join(', ')}]`);
    
    // Build letter feedback structure
    const letterFeedback = {};
    
    for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        if (!letterFeedback[letter]) {
            letterFeedback[letter] = {correct: [], wrongPosition: [], notInWord: []};
        }
        letterFeedback[letter][feedback[i] === 'correct' ? 'correct' : 
                             feedback[i] === 'wrong-position' ? 'wrongPosition' : 'notInWord'].push(i);
    }
    
    console.log('Letter constraints:', JSON.stringify(letterFeedback, null, 2));
    
    // Test each constraint
    for (const [letter, constraints] of Object.entries(letterFeedback)) {
        console.log(`\nChecking letter "${letter}" in word "${word}":`);
        
        // Check correct positions
        for (const pos of constraints.correct) {
            if (word[pos] !== letter) {
                console.log(`  FAIL: Position ${pos} should be "${letter}" but is "${word[pos]}"`);
                return false;
            } else {
                console.log(`  PASS: Position ${pos} correctly has "${letter}"`);
            }
        }
        
        // Check wrong positions
        for (const pos of constraints.wrongPosition) {
            if (word[pos] === letter) {
                console.log(`  FAIL: Position ${pos} has "${letter}" but shouldn't`);
                return false;
            }
            if (!word.includes(letter)) {
                console.log(`  FAIL: Word should contain "${letter}" but doesn't`);
                return false;
            }
            console.log(`  PASS: "${letter}" not at position ${pos} but exists elsewhere`);
        }
        
        // Check not-in-word constraints
        if (constraints.notInWord.length > 0 && 
            constraints.correct.length === 0 && 
            constraints.wrongPosition.length === 0) {
            if (word.includes(letter)) {
                console.log(`  FAIL: Word contains "${letter}" but shouldn't`);
                return false;
            } else {
                console.log(`  PASS: Word correctly doesn't contain "${letter}"`);
            }
        }
    }
    
    console.log(`\n✓ "${word}" SURVIVES the filtering!`);
    return true;
}

const survives = testWordSurvival('IMBUE', 'AROSE', aroseFeedback);
console.log(`\nFinal result: IMBUE ${survives ? 'SURVIVES' : 'GETS FILTERED OUT'}`);