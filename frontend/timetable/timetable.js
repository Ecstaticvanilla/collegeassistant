// Sample data structure for the timetable.
// Simulates a backend data source.
const timetableData = {
    'divisionA': {
        'A1': {
            'Monday': [
                { time: '09:00', subject: 'math', activity: 'Lecture' },
                { time: '10:00', subject: 'physics', activity: 'Lecture' },
                { time: '11:00', subject: 'chemistry', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Lab' }
            ],
            'Tuesday': [
                { time: '09:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '10:00', subject: 'math', activity: 'Lecture' },
                { time: '11:00', subject: 'physics', activity: 'Tutorial' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'math', activity: 'Tutorial' }
            ],
            'Wednesday': [
                { time: '09:00', subject: 'physics', activity: 'Lecture' },
                { time: '10:00', subject: 'chemistry', activity: 'Lab' },
                { time: '11:00', subject: 'math', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Tutorial' }
            ],
            'Thursday': [
                { time: '09:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '10:00', subject: 'math', activity: 'Lecture' },
                { time: '11:00', subject: 'physics', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Lab' }
            ],
            'Friday': [
                { time: '09:00', subject: 'physics', activity: 'Lab' },
                { time: '10:00', subject: 'math', activity: 'Lab' },
                { time: '11:00', subject: 'chemistry', activity: 'Tutorial' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Tutorial' }
            ]
        },
        'A2': {
            'Monday': [
                { time: '09:00', subject: 'physics', activity: 'Lab' },
                { time: '10:00', subject: 'math', activity: 'Lab' },
                { time: '11:00', subject: 'chemistry', activity: 'Tutorial' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Tutorial' }
            ],
            'Tuesday': [
                { time: '09:00', subject: 'math', activity: 'Lecture' },
                { time: '10:00', subject: 'physics', activity: 'Lecture' },
                { time: '11:00', subject: 'chemistry', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Lab' }
            ],
            'Wednesday': [
                { time: '09:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '10:00', subject: 'math', activity: 'Lecture' },
                { time: '11:00', subject: 'physics', activity: 'Tutorial' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'math', activity: 'Tutorial' }
            ],
            'Thursday': [
                { time: '09:00', subject: 'physics', activity: 'Lecture' },
                { time: '10:00', subject: 'chemistry', activity: 'Lab' },
                { time: '11:00', subject: 'math', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Tutorial' }
            ],
            'Friday': [
                { time: '09:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '10:00', subject: 'math', activity: 'Lecture' },
                { time: '11:00', subject: 'physics', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Lab' }
            ]
        }
    },
    'divisionB': {
        'B1': {
            'Monday': [
                { time: '09:00', subject: 'math', activity: 'Lab' },
                { time: '10:00', subject: 'physics', activity: 'Lab' },
                { time: '11:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Lecture' }
            ],
            'Tuesday': [
                { time: '09:00', subject: 'physics', activity: 'Tutorial' },
                { time: '10:00', subject: 'math', activity: 'Tutorial' },
                { time: '11:00', subject: 'chemistry', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'math', activity: 'Lecture' }
            ],
            'Wednesday': [
                { time: '09:00', subject: 'physics', activity: 'Lecture' },
                { time: '10:00', subject: 'chemistry', activity: 'Tutorial' },
                { time: '11:00', subject: 'math', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Lab' }
            ],
            'Thursday': [
                { time: '09:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '10:00', subject: 'physics', activity: 'Lab' },
                { time: '11:00', subject: 'math', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Tutorial' }
            ],
            'Friday': [
                { time: '09:00', subject: 'math', activity: 'Tutorial' },
                { time: '10:00', subject: 'physics', activity: 'Lecture' },
                { time: '11:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'math', activity: 'Lab' }
            ]
        },
        'B2': {
            'Monday': [
                { time: '09:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '10:00', subject: 'math', activity: 'Lecture' },
                { time: '11:00', subject: 'physics', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Lab' }
            ],
            'Tuesday': [
                { time: '09:00', subject: 'physics', activity: 'Lecture' },
                { time: '10:00', subject: 'chemistry', activity: 'Tutorial' },
                { time: '11:00', subject: 'math', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Lecture' }
            ],
            'Wednesday': [
                { time: '09:00', subject: 'math', activity: 'Lab' },
                { time: '10:00', subject: 'physics', activity: 'Lab' },
                { time: '11:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'physics', activity: 'Lecture' }
            ],
            'Thursday': [
                { time: '09:00', subject: 'math', activity: 'Tutorial' },
                { time: '10:00', subject: 'physics', activity: 'Lecture' },
                { time: '11:00', subject: 'chemistry', activity: 'Lecture' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'math', activity: 'Lab' }
            ],
            'Friday': [
                { time: '09:00', subject: 'physics', activity: 'Tutorial' },
                { time: '10:00', subject: 'math', activity: 'Tutorial' },
                { time: '11:00', subject: 'chemistry', activity: 'Lab' },
                { time: '12:00', subject: 'break', activity: 'Break' },
                { time: '13:00', subject: 'chemistry', activity: 'Tutorial' }
            ]
        }
    }
};

const studentInfo = {
    'student1': { name: 'Alice Johnson', division: 'divisionA', batch: 'A1' },
    'student2': { name: 'Bob Williams', division: 'divisionA', batch: 'A2' },
    'student3': { name: 'Charlie Davis', division: 'divisionB', batch: 'B1' },
    'student4': { name: 'Diana Evans', division: 'divisionB', batch: 'B2' }
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const subjects = {
    'math': 'Mathematics',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'break': 'Break'
};

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

// Get the user role from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const userRole = urlParams.get('role');

// Simulating the current student logged in
const currentStudentId = 'student1';

/**
 * Renders the teacher's timetable view.
 */
function renderTeacherView() {
    const division = divisionSelect.value;
    const batch = batchSelect.value;
    const subjectFilter = subjectFilterSelect.value;

    teacherTimetableTable.innerHTML = ''; // Clear previous table body

    // Render table headers dynamically
    teacherTableHeader.innerHTML = `
        <th scope="col" class="px-6 py-3">Time</th>
        ${days.map(day => `<th scope="col" class="px-6 py-3 text-center">${day}</th>`).join('')}
    `;

    // Iterate through each time slot
    times.forEach(time => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${time}</td>`;

        // Iterate through each day of the week
        days.forEach(day => {
            const period = timetableData[division][batch][day].find(p => p.time === time) || { subject: '', activity: '' };

            // Check if the period should be displayed based on the subject filter
            const displayPeriod = subjectFilter === 'all' || period.subject === subjectFilter;
            const cellContent = displayPeriod ? `${subjects[period.subject] || period.subject} - ${period.activity}` : '';
            const cellValue = `${period.subject}:${period.activity}`;

            // Create editable cell with data attributes
            row.innerHTML += `
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <input type="text" value="${cellValue}" class="editable-cell" data-day="${day}" data-time="${time}" data-division="${division}" data-batch="${batch}">
                </td>
            `;
        });
        teacherTimetableTable.appendChild(row);
    });

    // Add event listeners for editing
    teacherTimetableTable.querySelectorAll('.editable-cell').forEach(input => {
        input.addEventListener('change', (e) => {
            const { day, time, division, batch } = e.target.dataset;
            const [subject, activity] = e.target.value.split(':');
            updateTimetable(division, batch, day, time, subject, activity);
        });
    });
}

/**
 * Updates the timetable data with a new subject and activity.
 */
function updateTimetable(division, batch, day, time, subject, activity) {
    const period = timetableData[division][batch][day].find(p => p.time === time);
    if (period) {
        period.subject = subject || '';
        period.activity = activity || '';
    } else {
        timetableData[division][batch][day].push({ time, subject, activity });
    }
    renderTeacherView(); // Re-render to show changes
}

/**
 * Renders the student's timetable view.
 */
function renderStudentView() {
    const student = studentInfo[currentStudentId];
    if (!student) {
        studentNameEl.textContent = 'User Not Found';
        return;
    }

    studentNameEl.textContent = student.name;
    studentDivisionText.textContent = student.division.toUpperCase();
    studentBatchText.textContent = student.batch;

    const studentDivision = student.division;
    const studentBatch = student.batch;

    studentTimetableTable.innerHTML = ''; // Clear previous table body

    // Render table headers dynamically
    studentTableHeader.innerHTML = `
        <th scope="col" class="px-6 py-3">Time</th>
        ${days.map(day => `<th scope="col" class="px-6 py-3 text-center">${day}</th>`).join('')}
    `;

    // Iterate through each time slot
    times.forEach(time => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${time}</td>`;

        // Iterate through each day of the week
        days.forEach(day => {
            const period = timetableData[studentDivision][studentBatch][day].find(p => p.time === time);
            const subject = period ? (subjects[period.subject] || period.subject) : '';
            const activity = period ? period.activity : '';
            
            row.innerHTML += `
                <td class="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                    ${subject}<br>
                    <span class="text-xs text-gray-500">${activity}</span>
                </td>
            `;
        });
        studentTimetableTable.appendChild(row);
    });
}

// Event listeners for role and select boxes
divisionSelect.addEventListener('change', () => {
    // Dynamically update batches based on division selection
    const division = divisionSelect.value;
    batchSelect.innerHTML = '';
    const batches = Object.keys(timetableData[division]);
    batches.forEach(batch => {
        const option = document.createElement('option');
        option.value = batch;
        option.textContent = `Batch ${batch}`;
        batchSelect.appendChild(option);
    });
    renderTeacherView();
});

batchSelect.addEventListener('change', renderTeacherView);
subjectFilterSelect.addEventListener('change', renderTeacherView);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup of batch options based on default division
    const initialDivision = divisionSelect.value;
    const batches = Object.keys(timetableData[initialDivision]);
    batches.forEach(batch => {
        const option = document.createElement('option');
        option.value = batch;
        option.textContent = `Batch ${batch}`;
        batchSelect.appendChild(option);
    });
    
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
