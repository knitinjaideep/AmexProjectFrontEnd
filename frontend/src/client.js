import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const addNewStudent = (student) =>
    fetch("v1/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student)
    }).then(checkStatus);

export const getAllStudents = () =>
    fetch("v1/students")
        .then(checkStatus);

export const deleteStudent = studentId => fetch(`v1/students/${studentId}`, {
    method:"DELETE"}).then(checkStatus)

export const updateStudent = (studentId, studentDetails) => fetch(`v1/students/${studentId}`, {
    method: "PUT",
    headers: {
            "Content-Type": "application/json",
    },
    body: JSON.stringify(studentDetails)}).then(checkStatus)