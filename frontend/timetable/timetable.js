// timetable/timetable.js

// Constants
const API_BASE_URL = 'http://localhost:3000/api/timetable';
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const subjects = {
    'math': 'Mathematics',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'break': 'Break'
};
const urlParams = new URLSearchParams(window.location.search);
const userRole = urlParams.get('role');
const studentId = sessionStorage.getItem('studentId') || 'student1';

// DOM Elements
const teacherView = document.getElementById('teacher-view');
const studentView = document.getElementById('student-view');
const divisionSelect = document.getElementById('division-select');
const batchSelect = document.getElementById('batch-select');
const subjectFilterSelect = document.getElementById('subject-filter-select');
const teacherTimetableTable = document.getElementById('teacher-timetable-table');
const teacherTableHeader = document.getElementById('teacher-table-header');
const studentTimetableTable = document.getElementById('student-timetable-table');
const studentTableHeader = document.getElementById('student-table-header');
const studentNameEl = document.getElementById('student-name');
const studentDivisionText = document.getElementById('student-division-text');
const studentBatchText = document.getElementById('student-batch-text');

// Global variables for fetched data
let timetableDataCache = {};
let studentInfoCache = {};
let divisionDataCache = {
    'divisionA': ['A1', 'A2'],
    'divisionB': ['B1', 'B2']
};

/**
 * Renders the teacher's timetable view.
 */
async function renderTeacherView() {
    const division = divisionSelect.value;
    const batch = batchSelect.value;
    const subjectFilter = subjectFilterSelect.value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/teacher?division=${division}&batch=${batch}`);
        if (!response.ok) throw new Error('Failed to fetch timetable data');
        timetableDataCache = await response.json();
        
        teacherTimetableTable.innerHTML = '';
        teacherTableHeader.innerHTML = `<tr><th scope="col" class="px-6 py-3">Time</th>${days.map(day => `<th scope="col" class="px-6 py-3 text-center">${day}</th>`).join('')}</tr>`;

        times.forEach(time => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="px-6 py-4 font-medium">${time}</td>`;
            days.forEach(day => {
                const period = timetableDataCache[day].find(p => p.time === time) || { subject: '', activity: '' };
                const displayPeriod = subjectFilter === 'all' || period.subject === subjectFilter;
                const cellValue = displayPeriod ? `${period.subject}:${period.activity}` : '';
                row.innerHTML += `<td class="px-6 py-4 text-center"><input type="text" value="${cellValue}" class="editable-cell" data-day="${day}" data-time="${time}" data-division="${division}" data-batch="${batch}"></td>`;
            });
            teacherTimetableTable.appendChild(row);
        });

        teacherTimetableTable.querySelectorAll('.editable-cell').forEach(input => {
            input.addEventListener('change', (e) => {
                const { day, time, division, batch } = e.target.dataset;
                const [subject, activity] = e.target.value.split(':');
                updateTimetable(division, batch, day, time, subject, activity);
            });
        });
    } catch (error) {
        console.error('Error fetching teacher timetable:', error);
        alert('Failed to load data. Please check the server.');
    }
}

/**
 * Updates the timetable data in the database.
 */
async function updateTimetable(division, batch, day, time, subject, activity) {
    try {
        const response = await fetch(`${API_BASE_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ division, batch, day, time, subject, activity })
        });
        if (!response.ok) throw new Error('Failed to update timetable');
        renderTeacherView();
    } catch (error) {
        console.error('Error updating timetable:', error);
        alert('Failed to save data. Please check the server.');
    }
}

/**
 * Renders the student's timetable view.
 */
async function renderStudentView() {
    try {
        const studentInfoResponse = await fetch(`http://localhost:3000/api/grades/student-info?studentId=${studentId}`);
        if (!studentInfoResponse.ok) throw new Error('Failed to fetch student info');
        studentInfoCache = await studentInfoResponse.json();
        
        const { division, batch, name } = studentInfoCache;
        const timetableResponse = await fetch(`${API_BASE_URL}/student?division=${division}&batch=${batch}`);
        if (!timetableResponse.ok) throw new Error('Failed to fetch timetable data');
        timetableDataCache = await timetableResponse.json();

        studentNameEl.textContent = name;
        studentDivisionText.textContent = division.toUpperCase();
        studentBatchText.textContent = batch;
        studentTimetableTable.innerHTML = '';
        studentTableHeader.innerHTML = `<tr><th scope="col" class="px-6 py-3">Time</th>${days.map(day => `<th scope="col" class="px-6 py-3 text-center">${day}</th>`).join('')}</tr>`;

        times.forEach(time => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="px-6 py-4 font-medium">${time}</td>`;
            days.forEach(day => {
                const period = timetableDataCache[day].find(p => p.time === time);
                const subjectName = period ? (subjects[period.subject] || period.subject) : '';
                const activity = period ? period.activity : '';
                row.innerHTML += `<td class="px-6 py-4 text-center text-gray-700">${subjectName}<br><span class="text-xs text-gray-500">${activity}</span></td>`;
            });
            studentTimetableTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching student timetable:', error);
        alert('Failed to load data. Please check the server.');
    }
}

// Event listeners
divisionSelect.addEventListener('change', () => {
    const division = divisionSelect.value;
    batchSelect.innerHTML = divisionDataCache[division].map(batch => `<option value="${batch}">Batch ${batch}</option>`).join('');
    renderTeacherView();
});
batchSelect.addEventListener('change', renderTeacherView);
subjectFilterSelect.addEventListener('change', renderTeacherView);

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
