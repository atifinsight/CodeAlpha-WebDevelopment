// DOM elements
const dayInput = document.getElementById("day")
const monthInput = document.getElementById("month")
const yearInput = document.getElementById("year")
const calculateBtn = document.getElementById("calculateBtn")
const errorDiv = document.getElementById("error")
const resultDiv = document.getElementById("result")
const clearBtn = document.getElementById("clearFields")

// Calculate age function
function calculateAge() {
  // Clear previous results
  errorDiv.textContent = ""
  resultDiv.textContent = ""

  // Get input values
  const day = Number.parseInt(dayInput.value)
  const month = Number.parseInt(monthInput.value)
  const year = Number.parseInt(yearInput.value)

  // Input validation
  if (!day || !month || !year) {
    errorDiv.textContent = "Please fill in all fields"
    return
  }

  if (day < 1 || day > 31) {
    errorDiv.textContent = "Please enter a valid day (1-31)"
    return
  }

  if (month < 1 || month > 12) {
    errorDiv.textContent = "Please enter a valid month (1-12)"
    return
  }

  if (year < 1900 || year > new Date().getFullYear()) {
    errorDiv.textContent = "Please enter a valid year"
    return
  }

  // Create Date objects
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()

  // Check if birth date is in the future
  if (birthDate > today) {
    errorDiv.textContent = "Birth date cannot be in the future"
    return
  }

  // Calculate age
  let ageYears = today.getFullYear() - birthDate.getFullYear()
  let ageMonths = today.getMonth() - birthDate.getMonth()
  let ageDays = today.getDate() - birthDate.getDate()

  // Adjust for negative days
  if (ageDays < 0) {
    ageMonths--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    ageDays += lastMonth.getDate()
  }

  // Adjust for negative months
  if (ageMonths < 0) {
    ageYears--
    ageMonths += 12
  }

  // Display result
  resultDiv.textContent = `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days`
}

function clearFields(){
  dayInput.value = ""
  monthInput.value = ""
  yearInput.value = ""
  errorDiv.textContent = ""
  resultDiv.textContent = ""
}

// Event listener for calculate age
calculateBtn.addEventListener("click", calculateAge)

// Event listener for clear all the fields
clearBtn.addEventListener("click", clearFields)


// Allow Enter key to calculate
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    calculateAge()
  }
})

// Allow Backspace key to clear
document.addEventListener('keydown', (event) => {
  if (event.key === "c") {
    clearFields()
  }
})

