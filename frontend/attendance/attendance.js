// attendance/attendance.js

// Constants
const API_BASE_URL = 'http://localhost:3000/api/attendance';
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const urlParams = new URLSearchParams(window.location.search);
const userRole = urlParams.get('role');

// DOM Elements
const teacherView = document.getElementById('teacher-view');
const studentView = document.getElementById('student-view');
const subjectSelect = document.getElementById('subject-select');
const teacherTableBody = document.getElementById('teacher-attendance-table');
const studentNameEl = document.getElementById('student-name');
const attendancePercentageEl = document.getElementById('attendance-percentage');
const studentTableBody = document.getElementById('student-attendance-table');
const studentTableHeader = document.getElementById('student-table-header');
const activitySelect = document.getElementById('activity-select');
const divisionSelect = document.getElementById('division-select');
const totalClassesInputsContainer = document.getElementById('total-classes-inputs');
const studentMonthSelect = document.getElementById('student-month-select');

// Global variables to store fetched data
let attendanceDataCache = {};
let studentInfoCache = {};
let totalClassesCache = {};

/**
 * Renders the attendance table for the teacher view.
 */
async function renderTeacherView() {
    const subject = subjectSelect.value;
    const activityType = activitySelect.value;
    const division = divisionSelect.value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/teacher?subject=${subject}&activity=${activityType}&division=${division}`);
        if (!response.ok) throw new Error('Failed to fetch teacher attendance data');
        
        const data = await response.json();
        attendanceDataCache = data.attendance;
        totalClassesCache = data.totalClasses;

        renderMonthlyTotalInputs(totalClassesCache);
        
        teacherTableBody.innerHTML = '';
        for (const studentId in attendanceDataCache) {
            const student = attendanceDataCache[studentId];
            let totalAttended = 0;
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-100', 'transition-colors', 'duration-200');
            let rowContent = `<td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${student.name}</td>`;
            
            months.forEach(month => {
                const attendedCount = student.attendance[month] || 0;
                totalAttended += attendedCount;
                rowContent += `
                    <td class="px-3 py-2 text-center border-l border-gray-300">
                        <input type="number" value="${attendedCount}" min="0" max="${totalClassesCache[month] || 0}" class="w-12 text-center bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-student-id="${studentId}" data-subject="${subject}" data-activity="${activityType}" data-month="${month}">
                    </td>
                `;
            });
            const overallTotal = Object.values(totalClassesCache).reduce((sum, val) => sum + val, 0);
            rowContent += `<td class="px-3 py-2 text-center font-bold border-l border-gray-300">${totalAttended} / ${overallTotal}</td>`;
            row.innerHTML = rowContent;
            teacherTableBody.appendChild(row);

            row.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('change', (e) => {
                    const { studentId, subject, activity, month } = e.target.dataset;
                    const value = parseInt(e.target.value) || 0;
                    updateAttendance(studentId, subject, activity, month, value);
                });
            });
        }
    } catch (error) {
        console.error('Error fetching teacher data:', error);
        alert('Failed to load data. Please try again.');
    }
}

/**
 * Renders the monthly total inputs for the teacher.
 * @param {object} totalClasses - The object containing total classes per month.
 */
function renderMonthlyTotalInputs(totalClasses) {
    totalClassesInputsContainer.innerHTML = '';
    months.forEach(month => {
        const total = totalClasses[month] || 0;
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'space-x-2');
        div.innerHTML = `
            <label class="font-medium text-gray-700">${month} Total:</label>
            <input type="number" value="${total}" min="0" class="monthly-total-input" data-month="${month}">
        `;
        totalClassesInputsContainer.appendChild(div);

        div.querySelector('input').addEventListener('change', (e) => {
            const month = e.target.dataset.month;
            const newTotal = parseInt(e.target.value) || 0;
            updateMonthlyTotal(subjectSelect.value, activitySelect.value, divisionSelect.value, month, newTotal);
        });
    });
}

/**
 * Updates a single student's attended classes count in the database.
 */
async function updateAttendance(studentId, subject, activity, month, newAttended) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-attended`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, subject, activity, month, newAttended })
        });
        if (!response.ok) throw new Error('Failed to update attendance');
        renderTeacherView();
    } catch (error) {
        console.error('Error updating attendance:', error);
        alert('Failed to save data. Please check the server.');
    }
}

/**
 * Updates the monthly total classes in the database.
 */
async function updateMonthlyTotal(subject, activity, division, month, newTotal) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-total`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, activity, division, month, newTotal })
        });
        if (!response.ok) throw new Error('Failed to update total classes');
        renderTeacherView();
    } catch (error) {
        console.error('Error updating total classes:', error);
        alert('Failed to save data. Please check the server.');
    }
}

/**
 * Renders the attendance record for the student view.
 */
async function renderStudentView() {
    const studentId = sessionStorage.getItem('studentId') || 'student1'; // Fallback for demo
    
    try {
        const response = await fetch(`${API_BASE_URL}/student?studentId=${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch student attendance data');
        const data = await response.json();
        attendanceDataCache = data.attendance;
        studentInfoCache = data.studentInfo;
        
        studentNameEl.textContent = studentInfoCache.name;
        studentTableBody.innerHTML = '';
        studentTableHeader.innerHTML = '';
        
        const selectedMonth = studentMonthSelect.value;
        let grandTotalAttended = 0;
        let grandTotalClasses = 0;
        const studentSubjects = Object.keys(attendanceDataCache);

        if (selectedMonth === 'all') {
            studentTableHeader.innerHTML = `<tr><th scope="col" class="px-6 py-3">Subject</th><th scope="col" class="px-6 py-3 text-center">Attended</th><th scope="col" class="px-6 py-3 text-center">Total</th></tr>`;
            const aggregatedData = {};
            studentSubjects.forEach(subject => {
                aggregatedData[subject] = { attended: 0, total: 0 };
                ['lectures', 'labs'].forEach(activity => {
                    months.forEach(month => {
                        const attendedCount = attendanceDataCache[subject][activity][month] || 0;
                        const totalCount = studentInfoCache.totalClasses[subject][activity][month] || 0;
                        aggregatedData[subject].attended += attendedCount;
                        aggregatedData[subject].total += totalCount;
                        grandTotalAttended += attendedCount;
                        grandTotalClasses += totalCount;
                    });
                });
            });
            for (const subject in aggregatedData) {
                const row = document.createElement('tr');
                row.innerHTML = `<td class="px-6 py-4 font-medium">${subject.charAt(0).toUpperCase() + subject.slice(1)}</td><td class="px-6 py-4 text-center">${aggregatedData[subject].attended}</td><td class="px-6 py-4 text-center">${aggregatedData[subject].total}</td>`;
                studentTableBody.appendChild(row);
            }
        } else {
            studentTableHeader.innerHTML = `<tr><th scope="col" class="px-6 py-3">Subject</th><th scope="col" class="px-6 py-3 text-center">Attended</th><th scope="col" class="px-6 py-3 text-center">Total</th><th scope="col" class="px-6 py-3 text-center">Activity</th></tr>`;
            studentSubjects.forEach(subject => {
                ['lectures', 'labs'].forEach(activity => {
                    const attendedCount = attendanceDataCache[subject][activity][selectedMonth] || 0;
                    const totalCount = studentInfoCache.totalClasses[subject][activity][selectedMonth] || 0;
                    if (totalCount > 0) {
                        const row = document.createElement('tr');
                        row.innerHTML = `<td class="px-6 py-4 font-medium">${subject.charAt(0).toUpperCase() + subject.slice(1)}</td><td class="px-6 py-4 text-center">${attendedCount}</td><td class="px-6 py-4 text-center">${totalCount}</td><td class="px-6 py-4 text-center">${activity.charAt(0).toUpperCase() + activity.slice(1)}</td>`;
                        studentTableBody.appendChild(row);
                    }
                    grandTotalAttended += attendedCount;
                    grandTotalClasses += totalCount;
                });
            });
        }
        const percentage = grandTotalClasses > 0 ? ((grandTotalAttended / grandTotalClasses) * 100).toFixed(1) : 0;
        attendancePercentageEl.textContent = `${percentage}%`;

    } catch (error) {
        console.error('Error fetching student data:', error);
        alert('Failed to load data. Please try again.');
    }
}

// Event listeners
subjectSelect.addEventListener('change', renderTeacherView);
activitySelect.addEventListener('change', renderTeacherView);
divisionSelect.addEventListener('change', renderTeacherView);
studentMonthSelect.addEventListener('change', renderStudentView);

// Initial render based on role from URL
document.addEventListener('DOMContentLoaded', () => {
    if (userRole === 'teacher') {
        teacherView.classList.remove('hidden');
        renderTeacherView();
    } else {
        studentView.classList.remove('hidden');
        renderStudentView();
    }
});
