// Sample data structure for student attendance.
// Now includes divisions and separates total classes from attended classes.
const attendanceData = {
    'divisionA': {
        'totalClasses': {
            'math': {
                'lectures': { 'Jul': 12, 'Aug': 15, 'Sep': 10, 'Oct': 12, 'Nov': 11, 'Dec': 6 },
                'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 4, 'Oct': 4, 'Nov': 4, 'Dec': 2 }
            },
            'physics': {
                'lectures': { 'Jul': 12, 'Aug': 15, 'Sep': 10, 'Oct': 12, 'Nov': 11, 'Dec': 6 },
                'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 4, 'Oct': 4, 'Nov': 4, 'Dec': 2 }
            },
            'chemistry': {
                'lectures': { 'Jul': 12, 'Aug': 15, 'Sep': 10, 'Oct': 12, 'Nov': 11, 'Dec': 6 },
                'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 4, 'Oct': 4, 'Nov': 4, 'Dec': 2 }
            }
        },
        'students': {
            'student1': {
                name: 'Alice Johnson',
                attendance: {
                    'math': {
                        'lectures': { 'Jul': 10, 'Aug': 15, 'Sep': 8, 'Oct': 12, 'Nov': 10, 'Dec': 5 },
                        'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 2, 'Oct': 4, 'Nov': 3, 'Dec': 2 }
                    },
                    'physics': {
                        'lectures': { 'Jul': 8, 'Aug': 14, 'Sep': 10, 'Oct': 11, 'Nov': 9, 'Dec': 5 },
                        'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 4, 'Oct': 4, 'Nov': 3, 'Dec': 2 }
                    },
                    'chemistry': {
                        'lectures': { 'Jul': 10, 'Aug': 13, 'Sep': 9, 'Oct': 12, 'Nov': 11, 'Dec': 6 },
                        'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 4, 'Oct': 4, 'Nov': 4, 'Dec': 2 }
                    }
                }
            },
            'student2': {
                name: 'Bob Williams',
                attendance: {
                    'math': {
                        'lectures': { 'Jul': 11, 'Aug': 13, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 6 },
                        'labs': { 'Jul': 3, 'Aug': 3, 'Sep': 4, 'Oct': 2, 'Nov': 4, 'Dec': 1 }
                    },
                    'physics': {
                        'lectures': { 'Jul': 10, 'Aug': 15, 'Sep': 10, 'Oct': 12, 'Nov': 11, 'Dec': 6 },
                        'labs': { 'Jul': 4, 'Aug': 2, 'Sep': 4, 'Oct': 4, 'Nov': 3, 'Dec': 2 }
                    },
                    'chemistry': {
                        'lectures': { 'Jul': 11, 'Aug': 15, 'Sep': 8, 'Oct': 10, 'Nov': 10, 'Dec': 5 },
                        'labs': { 'Jul': 4, 'Aug': 3, 'Sep': 4, 'Oct': 3, 'Nov': 3, 'Dec': 2 }
                    }
                }
            }
        }
    },
    'divisionB': {
        'totalClasses': {
            'math': {
                'lectures': { 'Jul': 10, 'Aug': 13, 'Sep': 9, 'Oct': 11, 'Nov': 10, 'Dec': 5 },
                'labs': { 'Jul': 3, 'Aug': 2, 'Sep': 3, 'Oct': 3, 'Nov': 3, 'Dec': 1 }
            },
            'physics': {
                'lectures': { 'Jul': 11, 'Aug': 14, 'Sep': 9, 'Oct': 10, 'Nov': 10, 'Dec': 5 },
                'labs': { 'Jul': 3, 'Aug': 3, 'Sep': 3, 'Oct': 3, 'Nov': 3, 'Dec': 2 }
            },
            'chemistry': {
                'lectures': { 'Jul': 10, 'Aug': 12, 'Sep': 8, 'Oct': 10, 'Nov': 9, 'Dec': 4 },
                'labs': { 'Jul': 2, 'Aug': 2, 'Sep': 3, 'Oct': 3, 'Nov': 3, 'Dec': 1 }
            }
        },
        'students': {
            'student3': {
                name: 'Charlie Davis',
                attendance: {
                    'math': {
                        'lectures': { 'Jul': 10, 'Aug': 13, 'Sep': 9, 'Oct': 11, 'Nov': 10, 'Dec': 5 },
                        'labs': { 'Jul': 3, 'Aug': 2, 'Sep': 3, 'Oct': 3, 'Nov': 3, 'Dec': 1 }
                    },
                    'physics': {
                        'lectures': { 'Jul': 11, 'Aug': 14, 'Sep': 9, 'Oct': 10, 'Nov': 10, 'Dec': 5 },
                        'labs': { 'Jul': 3, 'Aug': 3, 'Sep': 3, 'Oct': 3, 'Nov': 3, 'Dec': 2 }
                    },
                    'chemistry': {
                        'lectures': { 'Jul': 10, 'Aug': 12, 'Sep': 8, 'Oct': 10, 'Nov': 9, 'Dec': 4 },
                        'labs': { 'Jul': 2, 'Aug': 2, 'Sep': 3, 'Oct': 3, 'Nov': 3, 'Dec': 1 }
                    }
                }
            },
            'student4': {
                name: 'Diana Evans',
                attendance: {
                    'math': {
                        'lectures': { 'Jul': 9, 'Aug': 12, 'Sep': 8, 'Oct': 10, 'Nov': 9, 'Dec': 4 },
                        'labs': { 'Jul': 2, 'Aug': 1, 'Sep': 2, 'Oct': 3, 'Nov': 2, 'Dec': 1 }
                    },
                    'physics': {
                        'lectures': { 'Jul': 10, 'Aug': 13, 'Sep': 8, 'Oct': 9, 'Nov': 9, 'Dec': 4 },
                        'labs': { 'Jul': 3, 'Aug': 2, 'Sep': 2, 'Oct': 2, 'Nov': 2, 'Dec': 1 }
                    },
                    'chemistry': {
                        'lectures': { 'Jul': 9, 'Aug': 11, 'Sep': 7, 'Oct': 9, 'Nov': 8, 'Dec': 3 },
                        'labs': { 'Jul': 2, 'Aug': 2, 'Sep': 2, 'Oct': 2, 'Nov': 2, 'Dec': 1 }
                    }
                }
            }
        }
    }
};

// DOM Elements
const userRoleSelect = document.getElementById('user-role');
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
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentStudentId = 'student1'; // Example student, 'Alice Johnson'

/**
 * Renders the attendance table for the teacher view.
 */
function renderTeacherView() {
    const subject = subjectSelect.value;
    const activityType = activitySelect.value;
    const division = divisionSelect.value;

    teacherTableBody.innerHTML = ''; // Clear previous data
    
    // Get the students and total classes for the selected division
    const studentsInDivision = attendanceData[division].students;
    const totalClasses = attendanceData[division].totalClasses[subject][activityType];

    // Render the monthly total inputs
    renderMonthlyTotalInputs(totalClasses);

    // Create the attendance rows for each student
    for (const studentId in studentsInDivision) {
        const student = studentsInDivision[studentId];
        let totalAttended = 0;

        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-100', 'transition-colors', 'duration-200');

        let rowContent = `<td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${student.name}</td>`;

        months.forEach(month => {
            const attendedCount = student.attendance[subject][activityType][month] || 0;
            totalAttended += attendedCount;

            rowContent += `
                <td class="px-3 py-2 text-center border-l border-gray-300">
                    <input type="number" value="${attendedCount}" min="0" max="${totalClasses[month]}" class="w-12 text-center bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-student-id="${studentId}" data-subject="${subject}" data-activity="${activityType}" data-month="${month}" data-type="attended">
                </td>
            `;
        });

        // Add the total column
        const overallTotal = Object.values(totalClasses).reduce((sum, val) => sum + val, 0);
        rowContent += `
            <td class="px-3 py-2 text-center font-bold border-l border-gray-300">${totalAttended} / ${overallTotal}</td>
        `;

        row.innerHTML = rowContent;
        teacherTableBody.appendChild(row);

        // Add event listener to update data on change
        row.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const { studentId, subject, activity, month } = e.target.dataset;
                const value = parseInt(e.target.value) || 0;
                updateAttendance(studentId, subject, activity, month, value);
            });
        });
    }
}

/**
 * Renders the monthly total inputs for the teacher.
 * @param {object} totalClasses - The object containing total classes per month.
 */
function renderMonthlyTotalInputs(totalClasses) {
    totalClassesInputsContainer.innerHTML = ''; // Clear previous inputs
    months.forEach(month => {
        const total = totalClasses[month] || 0;
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'space-x-2');
        div.innerHTML = `
            <label class="font-medium text-gray-700">${month} Total:</label>
            <input type="number" value="${total}" min="0" class="monthly-total-input" data-month="${month}">
        `;
        totalClassesInputsContainer.appendChild(div);

        // Add event listener to update the total for a given month
        div.querySelector('input').addEventListener('change', (e) => {
            const month = e.target.dataset.month;
            const newTotal = parseInt(e.target.value) || 0;
            const subject = subjectSelect.value;
            const activityType = activitySelect.value;
            const division = divisionSelect.value;

            updateMonthlyTotal(division, subject, activityType, month, newTotal);
            renderTeacherView(); // Re-render the view to update max values
        });
    });
}

/**
 * Updates the monthly total for a given subject and activity.
 */
function updateMonthlyTotal(division, subject, activity, month, newTotal) {
    if (!attendanceData[division].totalClasses[subject][activity]) {
        attendanceData[division].totalClasses[subject][activity] = {};
    }
    attendanceData[division].totalClasses[subject][activity][month] = newTotal;
}

/**
 * Updates a single student's attended classes count.
 */
function updateAttendance(studentId, subject, activity, month, newAttended) {
    // Find the student regardless of division
    let student = attendanceData['divisionA'].students[studentId];
    if (!student) {
        student = attendanceData['divisionB'].students[studentId];
    }
    
    if (student) {
        student.attendance[subject][activity][month] = newAttended;
    }
    renderTeacherView(); // Re-render the view to update total attendance
}

/**
 * Renders the attendance record for the student view.
 */
function renderStudentView() {
    const student = attendanceData['divisionA'].students[currentStudentId] || attendanceData['divisionB'].students[currentStudentId];

    if (!student) {
        return; // Exit if student not found
    }

    studentNameEl.textContent = student.name;
    studentTableBody.innerHTML = ''; // Clear previous data
    studentTableHeader.innerHTML = ''; // Clear previous header

    const selectedMonth = studentMonthSelect.value;

    let grandTotalAttended = 0;
    let grandTotalClasses = 0;
    const studentSubjects = Object.keys(student.attendance);

    if (selectedMonth === 'all') {
        // Build the aggregated data for all months
        const aggregatedData = {};
        studentSubjects.forEach(subject => {
            aggregatedData[subject] = { attended: 0, total: 0 };
            ['lectures', 'labs'].forEach(activity => {
                months.forEach(month => {
                    const attendedCount = student.attendance[subject][activity][month] || 0;
                    // Find the division of the student to get the correct total classes
                    let studentDivision = 'divisionA';
                    if (!attendanceData['divisionA'].students[currentStudentId]) {
                        studentDivision = 'divisionB';
                    }
                    const totalCount = attendanceData[studentDivision].totalClasses[subject][activity][month] || 0;
                    
                    aggregatedData[subject].attended += attendedCount;
                    aggregatedData[subject].total += totalCount;

                    grandTotalAttended += attendedCount;
                    grandTotalClasses += totalCount;
                });
            });
        });

        // Render the header for "All Months"
        studentTableHeader.innerHTML = `
            <tr>
                <th scope="col" class="px-6 py-3">Subject</th>
                <th scope="col" class="px-6 py-3 text-center">Attended</th>
                <th scope="col" class="px-6 py-3 text-center">Total</th>
            </tr>
        `;

        // Render the table body for "All Months"
        for (const subject in aggregatedData) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-gray-700">${aggregatedData[subject].attended}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-gray-700">${aggregatedData[subject].total}</td>
            `;
            studentTableBody.appendChild(row);
        }

    } else { // Specific month selected
        // Render the header for a specific month
        studentTableHeader.innerHTML = `
            <tr>
                <th scope="col" class="px-6 py-3">Subject</th>
                <th scope="col" class="px-6 py-3 text-center">Attended</th>
                <th scope="col" class="px-6 py-3 text-center">Total</th>
                <th scope="col" class="px-6 py-3 text-center">Activity</th>
            </tr>
        `;

        studentSubjects.forEach(subject => {
            ['lectures', 'labs'].forEach(activity => {
                const attendedCount = student.attendance[subject][activity][selectedMonth] || 0;
                // Find the division of the student to get the correct total classes
                let studentDivision = 'divisionA';
                if (!attendanceData['divisionA'].students[currentStudentId]) {
                    studentDivision = 'divisionB';
                }
                const totalCount = attendanceData[studentDivision].totalClasses[subject][activity][selectedMonth] || 0;
                
                // Only render a row if there was attendance for the specific month and activity
                if (totalCount > 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-700">${attendedCount}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-700">${totalCount}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-500">${activity.charAt(0).toUpperCase() + activity.slice(1)}</td>
                    `;
                    studentTableBody.appendChild(row);
                }
                
                // Also update grand totals for percentage calculation for the specific month
                grandTotalAttended += attendedCount;
                grandTotalClasses += totalCount;
            });
        });
    }

    // Calculate and display the total attendance percentage
    const percentage = grandTotalClasses > 0 ? ((grandTotalAttended / grandTotalClasses) * 100).toFixed(1) : 0;
    attendancePercentageEl.textContent = `${percentage}%`;
}


// Event listeners
userRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'teacher') {
        teacherView.classList.remove('hidden');
        studentView.classList.add('hidden');
        renderTeacherView();
    } else {
        studentView.classList.remove('hidden');
        teacherView.classList.add('hidden');
        renderStudentView();
    }
});

subjectSelect.addEventListener('change', renderTeacherView);
activitySelect.addEventListener('change', renderTeacherView);
divisionSelect.addEventListener('change', renderTeacherView);
studentMonthSelect.addEventListener('change', renderStudentView);

// Initial render based on default selected role
document.addEventListener('DOMContentLoaded', () => {
    renderTeacherView();
});
