document.addEventListener("DOMContentLoaded", function () {
    let courseCount = 0; // Counter to track number of courses
    let totalCreditHours = 0;
    let totalPoints = 0;
    let addedCourses = new Set(); // Set to track added courses

    const addButton = document.getElementById("Add");
    const Reviewbtn = document.getElementById("Review");
    const courseNameInput = document.getElementById("courseName");
    const creditHoursInput = document.getElementById("creditHours");
    const gradeEarnedInput = document.getElementById("gradeEarned");
    const table = document.getElementById("table");
    const overallGpaDiv = document.getElementById("overAll");

    // GPA point conversion for grades
    const gradePoints = {
        A: 4.0,
        B: 3.0,
        C: 2.0,
        D: 1.0,
        F: 0.0
    };

    // Add Course Button Functionality
    addButton.addEventListener("click", function () {
        const courseName = courseNameInput.value.trim().toLowerCase(); // Convert to lowercase for consistency
        const creditHours = parseInt(creditHoursInput.value);
        const gradeEarned = gradeEarnedInput.value.toUpperCase().trim();

        // Check if course is already added
        if (addedCourses.has(courseName)) {
            alert("This course has already been added. Please enter a different course.");
            return;
        }

        // Validate inputs
        if (!courseName || isNaN(creditHours) || creditHours <= 0 || !gradePoints.hasOwnProperty(gradeEarned)) {
            alert("Please enter valid inputs:\nCourse Name: Non-empty\nCredit Hours: Positive number\nGrade: A, B, C, D, or F");
            return;
        }

        // Add course to the set to track duplicates
        addedCourses.add(courseName);

        // Increment course counter
        courseCount++;

        // Calculate points earned for this course
        const pointsEarned = gradePoints[gradeEarned] * creditHours;

        // Add row to the table
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${courseCount}</td>
            <td>${courseNameInput.value.trim()}</td>
            <td>${creditHours}</td>
            <td>${gradeEarned}</td>
            <td>${pointsEarned.toFixed(2)}</td>
            <td>${(pointsEarned / creditHours).toFixed(2)}</td>
        `;

        // Update totals for GPA calculation
        totalCreditHours += creditHours;
        totalPoints += pointsEarned;

        // Update overall GPA display
        updateOverallGPA();

        // Clear input fields after adding a course
        courseNameInput.value = "";
        creditHoursInput.value = "";
        gradeEarnedInput.value = "";
    });

    // Review Button Functionality
    Reviewbtn.addEventListener("click", function () {
        if (totalCreditHours > 0) {
            const overallGPA = (totalPoints / totalCreditHours).toFixed(2);
            let message;

            if (overallGPA >= 3.5) {
                message = `Your Overall GPA is ${overallGPA}. You are amazing! Keep it up!`;
            } else if (overallGPA >= 3) {
                message = `Your Overall GPA is ${overallGPA}. You're almost there! Keep pushing!`;
            } else {
                message = `Your Overall GPA is ${overallGPA}. Start working hard! You got this!`;
            }

            alert(message);
        } else {
            alert("No courses added yet. Please add courses to calculate your GPA.");
        }
    });

    // Function to update overall GPA
    function updateOverallGPA() {
        if (totalCreditHours > 0) {
            const overallGPA = (totalPoints / totalCreditHours).toFixed(2);
            overallGpaDiv.textContent = `Overall GPA: ${overallGPA}`;
        } else {
            overallGpaDiv.textContent = "Overall GPA: 0.00";
        }
    }
});
