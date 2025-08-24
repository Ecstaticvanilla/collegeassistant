// Get the user role from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const userRole = urlParams.get('role');

const portalTitle = document.getElementById('portal-title');
const portalSubtitle = document.getElementById('portal-subtitle');
const attendanceDescription = document.getElementById('attendance-description');
const timetableDescription = document.getElementById('timetable-description');
const gradesDescription = document.getElementById('grades-description');

if (userRole === 'teacher') {
    portalTitle.textContent = "Welcome to Teacher Portal";
    portalSubtitle.textContent = "Select an option below to continue";
    attendanceDescription.textContent = "Maintain attendance records";
    timetableDescription.textContent = "View and edit class schedules";
    gradesDescription.textContent = "Manage exam results and grades";
} else { // Defaults to student if role is not 'teacher'
    portalTitle.textContent = "Welcome to Student Portal";
    portalSubtitle.textContent = "Select an option below to continue";
    attendanceDescription.textContent = "View and track your attendance records";
    timetableDescription.textContent = "Check your class schedule and timings";
    gradesDescription.textContent = "Access your exam results and grades";
}

// Add role to the links for other pages
const attendanceLink = document.getElementById('attendance-card');
const timetableLink = document.getElementById('timetable-card');
const gradesLink = document.getElementById('grades-card');

attendanceLink.href += `?role=${userRole}`;
timetableLink.href += `?role=${userRole}`;
gradesLink.href += `?role=${userRole}`;
