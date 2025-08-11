# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Wordle game analysis and debugging toolkit containing:

- **reverse-wordle.html** - Interactive reverse Wordle game where players provide feedback and the AI guesses the target word
- **debug-imbue.html** - Debug testing tool specifically for analyzing the word "IMBUE" filtering scenario
- **trace-imbue.js** - Manual tracing script for debugging IMBUE word filtering logic

## Architecture

### Core Components

**Word Filtering System**: The central logic uses `isWordPossible(word, guess, feedback)` to determine if a word remains viable given feedback constraints. The function analyzes:
- Correct position matches (green feedback)
- Wrong position matches (yellow feedback) 
- Letters not in word (gray feedback)

**Game State Management**: 
- `possibleWords` array tracks remaining viable words
- `usedWords` array prevents word repetition
- `feedbackData` stores color-coded feedback patterns

**Guess Selection Strategy**: Multi-tier approach prioritizing:
1. Optimal starting words for first guess
2. Strategic word selection based on remaining candidates
3. Common word preferences when multiple options exist

### Key Functions

- `getFeedbackPattern(targetWord, guess)` - Generates Wordle feedback (correct/wrong-position/not-in-word)
- `filterPossibleWords()` - Applies feedback constraints to narrow possible words
- `testWordSurvival()` - Debug function for tracing word filtering logic

## Debugging

The project includes specialized debugging tools for analyzing edge cases:

- Use **debug-imbue.html** to test specific word scenarios in browser
- Run **trace-imbue.js** in Node.js for detailed filtering analysis
- Check console output for detailed constraint testing

## Development

All code is contained in standalone HTML files with embedded JavaScript. No build system or dependencies required - open HTML files directly in browser for testing.