// ========== Dynamic Year & Time ==========
document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").textContent = now.toLocaleString();
}

setInterval(updateDateTime, 1000);
updateDateTime();

// ========== Rock-Paper-Scissors ==========
let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const resultEl = document.getElementById('result');
  const scoreEl = document.getElementById('score');

  if (playerChoice === computerChoice) {
    resultEl.textContent = "It's a draw!";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    resultEl.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
    playerScore++;
  } else {
    resultEl.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
    computerScore++;
  }

  scoreEl.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

// ========== Password Generator ==========
function generatePassword() {
  const length = parseInt(document.getElementById('passwordLength').value, 10) || 12;
  const includeUpper = document.getElementById('includeUpper')?.checked ?? true;
  const includeLower = document.getElementById('includeLower')?.checked ?? true;
  const includeNumbers = document.getElementById('includeNumbers')?.checked ?? true;
  const includeSymbols = document.getElementById('includeSymbols')?.checked ?? true;

  let charset = '';
  if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+[]{}<>?/|';

  if (!charset) {
    alert('Please select at least one character type.');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  const passwordField = document.getElementById('generatedPassword');
  passwordField.value = password;

  displayStrength(password);
}

function copyPassword() {
  const passwordInput = document.getElementById('generatedPassword');
  if (!passwordInput.value) return;

  navigator.clipboard.writeText(passwordInput.value)
    .then(() => alert('Password copied to clipboard!'))
    .catch(() => alert('Failed to copy password.'));
}

function displayStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const strength = levels[Math.min(score, levels.length - 1)];

  const strengthEl = document.getElementById('passwordStrength');
  if (strengthEl) strengthEl.textContent = `Strength: ${strength}`;
}

// ========== Contact Form Submission ==========
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = "Thank you! Your message has been sent.";
  formMessage.style.color = "lightgreen";

  this.reset();
});

// ========== Mobile Navigation Toggle ==========
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Toggle menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
});
