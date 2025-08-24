// Sample data structure for grades.
// 'marks' stores the student's score for each exam section.
// 'weightage' stores the percentage contribution for each exam section.
const gradesData = {
    'weights': {
        'math': { 'ise': 15, 'mse': 25, 'ese': 40, 'lab_ise': 10, 'lab_ese': 10 },
        'physics': { 'ise': 10, 'mse': 20, 'ese': 50, 'lab_ise': 10, 'lab_ese': 10 },
        'chemistry': { 'ise': 20, 'mse': 20, 'ese': 40, 'lab_ise': 10, 'lab_ese': 10 }
    },
    'students': {
        'student1': {
            name: 'Alice Johnson',
            grades: {
                'math': { 'ise': 80, 'mse': 75, 'ese': 85, 'lab_ise': 90, 'lab_ese': 95 },
                'physics': { 'ise': 70, 'mse': 80, 'ese': 75, 'lab_ise': 85, 'lab_ese': 90 },
                'chemistry': { 'ise': 90, 'mse': 85, 'ese': 92, 'lab_ise': 95, 'lab_ese': 90 }
            }
        },
        'student2': {
            name: 'Bob Williams',
            grades: {
                'math': { 'ise': 75, 'mse': 80, 'ese': 70, 'lab_ise': 85, 'lab_ese': 80 },
                'physics': { 'ise': 65, 'mse': 70, 'ese': 80, 'lab_ise': 80, 'lab_ese': 75 },
                'chemistry': { 'ise': 85, 'mse': 90, 'ese': 88, 'lab_ise': 90, 'lab_ese': 95 }
            }
        }
    }
};

// DOM Elements
const teacherView = document.getElementById('teacher-view');
const studentView = document.getElementById('student-view');
const subjectSelect = document.getElementById('subject-select');
const teacherGradesTable = document.getElementById('teacher-grades-table');
const studentGradesTable = document.getElementById('student-grades-table');
const studentNameEl = document.getElementById('student-name');
const totalGradePercentageEl = document.getElementById('total-grade-percentage');
const weightageInputsContainer = document.getElementById('weightage-inputs');
const examSections = ['ise', 'mse', 'ese', 'lab_ise', 'lab_ese'];

// Simulating the current student for the student view.
const currentStudentId = 'student1';
const urlParams = new URLSearchParams(window.location.search);
const userRole = urlParams.get('role');

/**
 * Calculates the total grade for a student in a specific subject.
 * @param {string} studentId The ID of the student.
 * @param {string} subject The subject to calculate the grade for.
 * @returns {number} The calculated total grade percentage.
 */
function calculateTotalGrade(studentId, subject) {
    const studentGrades = gradesData.students[studentId].grades[subject];
    const subjectWeightages = gradesData.weights[subject];
    
    let totalGrade = 0;
    examSections.forEach(section => {
        const mark = studentGrades[section] || 0;
        const weight = subjectWeightages[section] || 0;
        totalGrade += (mark * (weight / 100));
    });

    return totalGrade.toFixed(2);
}

/**
 * Renders the teacher's view with editable grades and weightages.
 */
function renderTeacherView() {
    const selectedSubject = subjectSelect.value;
    const subjectWeightages = gradesData.weights[selectedSubject];
    const students = gradesData.students;

    // Render weightage inputs
    weightageInputsContainer.innerHTML = '';
    examSections.forEach(section => {
        const weight = subjectWeightages[section] || 0;
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'space-x-2');
        div.innerHTML = `
            <label class="font-medium text-gray-700 uppercase">${section}:</label>
            <input type="number" value="${weight}" min="0" max="100" class="weightage-input" data-section="${section}">
        `;
        weightageInputsContainer.appendChild(div);

        div.querySelector('input').addEventListener('change', (e) => {
            const newWeight = parseInt(e.target.value) || 0;
            updateWeightage(selectedSubject, e.target.dataset.section, newWeight);
        });
    });

    // Render grades table
    teacherGradesTable.innerHTML = '';
    for (const studentId in students) {
        const student = students[studentId];
        const studentGrades = student.grades[selectedSubject];
        
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-100', 'transition-colors', 'duration-200');

        let rowContent = `<td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${student.name}</td>`;
        
        examSections.forEach(section => {
            const mark = studentGrades[section] || 0;
            rowContent += `
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <input type="number" value="${mark}" min="0" max="100" class="grade-input bg-gray-100" data-student-id="${studentId}" data-subject="${selectedSubject}" data-section="${section}">
                </td>
            `;
        });
        
        const totalGrade = calculateTotalGrade(studentId, selectedSubject);
        rowContent += `
            <td class="px-6 py-4 whitespace-nowrap text-center font-bold text-gray-900">${totalGrade}%</td>
        `;

        row.innerHTML = rowContent;
        teacherGradesTable.appendChild(row);

        row.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const value = parseInt(e.target.value) || 0;
                updateGrade(e.target.dataset.studentId, e.target.dataset.subject, e.target.dataset.section, value);
            });
        });
    }
}

/**
 * Updates a student's grade for a specific exam section.
 */
function updateGrade(studentId, subject, section, newMark) {
    gradesData.students[studentId].grades[subject][section] = newMark;
    renderTeacherView(); // Re-render to update totals
}

/**
 * Updates the weightage for a specific exam section.
 */
function updateWeightage(subject, section, newWeight) {
    let currentTotalWeight = 0;
    for (const s in gradesData.weights[subject]) {
        if (s !== section) {
            currentTotalWeight += gradesData.weights[subject][s];
        }
    }

    if (currentTotalWeight + newWeight > 100) {
        alert("Total weightage cannot exceed 100%. Please adjust other values.");
        // Revert the value and re-render
        document.querySelector(`input[data-section="${section}"]`).value = gradesData.weights[subject][section];
    } else {
        gradesData.weights[subject][section] = newWeight;
    }
    renderTeacherView();
}


/**
 * Renders the student's view.
 */
function renderStudentView() {
    const student = gradesData.students[currentStudentId];
    if (!student) return;

    studentNameEl.textContent = student.name;
    studentGradesTable.innerHTML = '';

    let grandTotalAttended = 0;
    let grandTotalWeight = 0;
    const subjects = Object.keys(student.grades);

    subjects.forEach(subject => {
        const studentGrades = student.grades[subject];
        const totalGrade = calculateTotalGrade(currentStudentId, subject);
        
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-100', 'transition-colors', 'duration-200');
        
        let rowContent = `<td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>`;
        
        examSections.forEach(section => {
            const mark = studentGrades[section] || 0;
            rowContent += `
                <td class="px-6 py-4 whitespace-nowrap text-center text-gray-700">${mark}</td>
            `;
        });
        
        rowContent += `<td class="px-6 py-4 whitespace-nowrap text-center font-bold text-gray-900">${totalGrade}%</td>`;
        
        row.innerHTML = rowContent;
        studentGradesTable.appendChild(row);

        // Summing up for overall percentage calculation
        const subjectWeight = Object.values(gradesData.weights[subject]).reduce((sum, val) => sum + val, 0);
        grandTotalAttended += (totalGrade * (subjectWeight / 100)); // weighted average
        grandTotalWeight += subjectWeight;
    });
    
    // Calculate and display overall percentage across all subjects
    const overallPercentage = grandTotalWeight > 0 ? (grandTotalAttended / (grandTotalWeight / 100)) : 0;
    totalGradePercentageEl.textContent = `${overallPercentage.toFixed(2)}%`;
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    if (userRole === 'teacher') {
        teacherView.classList.remove('hidden');
        studentView.classList.add('hidden');
        renderTeacherView();
    } else {
        teacherView.classList.add('hidden');
        studentView.classList.remove('hidden');
        renderStudentView();
    }
});

subjectSelect.addEventListener('change', renderTeacherView);
