// grades/grades.js

// Constants
const API_BASE_URL = 'http://localhost:3000/api/grades';
const examSections = ['ise', 'mse', 'ese', 'lab_ise', 'lab_ese'];
const urlParams = new URLSearchParams(window.location.search);
const userRole = urlParams.get('role');
const studentId = sessionStorage.getItem('studentId') || 'student1';

// DOM Elements
const teacherView = document.getElementById('teacher-view');
const studentView = document.getElementById('student-view');
const subjectSelect = document.getElementById('subject-select');
const teacherGradesTable = document.getElementById('teacher-grades-table');
const studentGradesTable = document.getElementById('student-grades-table');
const studentNameEl = document.getElementById('student-name');
const totalGradePercentageEl = document.getElementById('total-grade-percentage');
const weightageInputsContainer = document.getElementById('weightage-inputs');

// Global variables for fetched data
let gradesDataCache = {};

/**
 * Calculates the total grade for a student in a specific subject.
 * @param {object} studentGrades The grades for a student.
 * @param {object} subjectWeightages The weightages for a subject.
 * @returns {number} The calculated total grade percentage.
 */
function calculateTotalGrade(studentGrades, subjectWeightages) {
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
async function renderTeacherView() {
    const selectedSubject = subjectSelect.value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/teacher?subject=${selectedSubject}`);
        if (!response.ok) throw new Error('Failed to fetch teacher grades data');
        const data = await response.json();
        gradesDataCache = data;

        // Render weightage inputs
        weightageInputsContainer.innerHTML = '';
        const subjectWeightages = gradesDataCache.weights[selectedSubject];
        examSections.forEach(section => {
            const weight = subjectWeightages[section] || 0;
            const div = document.createElement('div');
            div.classList.add('flex', 'items-center', 'space-x-2');
            div.innerHTML = `<label class="font-medium text-gray-700 uppercase">${section}:</label><input type="number" value="${weight}" min="0" max="100" class="weightage-input" data-section="${section}">`;
            weightageInputsContainer.appendChild(div);
            div.querySelector('input').addEventListener('change', (e) => {
                const newWeight = parseInt(e.target.value) || 0;
                updateWeightage(selectedSubject, e.target.dataset.section, newWeight);
            });
        });

        // Render grades table
        teacherGradesTable.innerHTML = '';
        for (const studentId in gradesDataCache.students) {
            const student = gradesDataCache.students[studentId];
            const studentGrades = student.grades[selectedSubject];
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-100', 'transition-colors', 'duration-200');
            let rowContent = `<td class="px-6 py-4 font-medium">${student.name}</td>`;
            examSections.forEach(section => {
                const mark = studentGrades[section] || 0;
                rowContent += `<td class="px-6 py-4 text-center"><input type="number" value="${mark}" min="0" max="100" class="grade-input bg-gray-100" data-student-id="${studentId}" data-subject="${selectedSubject}" data-section="${section}"></td>`;
            });
            const totalGrade = calculateTotalGrade(studentGrades, subjectWeightages);
            rowContent += `<td class="px-6 py-4 text-center font-bold">${totalGrade}%</td>`;
            row.innerHTML = rowContent;
            teacherGradesTable.appendChild(row);
            row.querySelectorAll('.grade-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const value = parseInt(e.target.value) || 0;
                    updateGrade(e.target.dataset.studentId, e.target.dataset.subject, e.target.dataset.section, value);
                });
            });
        }
    } catch (error) {
        console.error('Error fetching teacher grades:', error);
        alert('Failed to load data. Please check the server.');
    }
}

/**
 * Updates a student's grade for a specific exam section.
 */
async function updateGrade(studentId, subject, section, newMark) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-grade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, subject, section, newMark })
        });
        if (!response.ok) throw new Error('Failed to update grade');
        renderTeacherView();
    } catch (error) {
        console.error('Error updating grade:', error);
        alert('Failed to save grade. Please check the server.');
    }
}

/**
 * Updates the weightage for a specific exam section.
 */
async function updateWeightage(subject, section, newWeight) {
    try {
        let currentTotalWeight = 0;
        for (const s in gradesDataCache.weights[subject]) {
            if (s !== section) currentTotalWeight += gradesDataCache.weights[subject][s];
        }
        if (currentTotalWeight + newWeight > 100) {
            alert("Total weightage cannot exceed 100%. Please adjust other values.");
            return;
        }

        const response = await fetch(`${API_BASE_URL}/update-weightage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, section, newWeight })
        });
        if (!response.ok) throw new Error('Failed to update weightage');
        renderTeacherView();
    } catch (error) {
        console.error('Error updating weightage:', error);
        alert('Failed to save weightage. Please check the server.');
    }
}

/**
 * Renders the student's view.
 */
async function renderStudentView() {
    try {
        const response = await fetch(`${API_BASE_URL}/student?studentId=${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch student grades');
        const data = await response.json();
        gradesDataCache = data;

        const student = gradesDataCache.student;
        if (!student) {
            studentNameEl.textContent = 'User Not Found';
            return;
        }

        studentNameEl.textContent = student.name;
        studentGradesTable.innerHTML = '';
        let grandTotalGradePoints = 0;
        let grandTotalWeight = 0;
        const subjects = Object.keys(student.grades);
        
        subjects.forEach(subject => {
            const studentGrades = student.grades[subject];
            const subjectWeightages = gradesDataCache.weights[subject];
            const totalGrade = calculateTotalGrade(studentGrades, subjectWeightages);
            const row = document.createElement('tr');
            let rowContent = `<td class="px-6 py-4 font-medium">${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>`;
            examSections.forEach(section => {
                const mark = studentGrades[section] || 0;
                rowContent += `<td class="px-6 py-4 text-center">${mark}</td>`;
            });
            rowContent += `<td class="px-6 py-4 text-center font-bold">${totalGrade}%</td>`;
            row.innerHTML = rowContent;
            studentGradesTable.appendChild(row);
            const subjectWeight = Object.values(subjectWeightages).reduce((sum, val) => sum + val, 0);
            grandTotalGradePoints += (totalGrade * (subjectWeight / 100));
            grandTotalWeight += subjectWeight;
        });
        const overallPercentage = grandTotalWeight > 0 ? (grandTotalGradePoints / (grandTotalWeight / 100)) : 0;
        totalGradePercentageEl.textContent = `${overallPercentage.toFixed(2)}%`;
    } catch (error) {
        console.error('Error fetching student grades:', error);
        alert('Failed to load data. Please check the server.');
    }
}

// Event listeners
subjectSelect.addEventListener('change', renderTeacherView);

// Initial render based on role from URL
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
