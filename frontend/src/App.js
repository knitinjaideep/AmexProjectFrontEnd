import './App.css';
import { useState, useEffect } from 'react';
import { deleteStudent, getAllStudents } from './client';
import { Table, Empty, Button, Radio, Popconfirm } from "antd"; 
import StudentDrawerForm from './StudentDrawerForm';
import {errorNotification, successNotification} from "./Notification";

function App() {
  const [students, setStudents] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification( "Student deleted", `Student with ID ${studentId} was deleted`);
        callback();
    }).catch(err => {
                errorNotification(`Error adding student ${studentId}`)
                console.log("The error is ", err)
            })
}

  const editStudent = (student) => {
    // Set the selected student for editing
    setSelectedStudent(student);
    // Open the drawer
    setShowDrawer(true);
  };

  const columns = fetchStudents => [
    {
      title: "Student Id",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of birth",
      dataIndex:  "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Class Name",
      dataIndex: "class_name",
      key: "class_name",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      key: "joining_date",
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, student) =>
        <Radio.Group>
          <Popconfirm
              placement='topRight'
              title={`Are you sure to delete ${student.name}`}
              onConfirm={() => removeStudent(student.studentId, fetchStudents)}
              okText='Yes'
              cancelText='No'>
              <Radio.Button value="small">Delete</Radio.Button>
          </Popconfirm>
          <Radio.Button onClick={() => editStudent(student)} value="small">Edit</Radio.Button>
        </Radio.Group>
    } 
  ]

  const fetchStudents = () => 
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setStudents(data)
      });
        

  useEffect(() => {
    console.log("component is mounted")
    fetchStudents();
  }, [])

  const renderStudents = () => {
    if (students.length <= 0) {
      return <Empty />;
    }
    return <>
    <StudentDrawerForm
      showDrawer={showDrawer}
      setShowDrawer={setShowDrawer}
      fetchStudents={fetchStudents}
      selectedStudent={selectedStudent} 
      setSelectedStudent={setSelectedStudent}
    >
    </StudentDrawerForm>
    <Table 
      dataSource={students}
      columns={columns(fetchStudents)}
      bordered 
      title={()=>
      <Button
        type="primary"
        onClick={() => setShowDrawer(!showDrawer)}
      >
        Add new Student
      </Button>}
      pagination={{ pageSize: 50 }}
      rowKey={(student) => student.studentId}/>
    </>
  }

  return (
    <div style={{ margin:'0 auto', maxWidth: '1800px', marginTop: '100px', padding: 24, minHeight: 360 }}>
      {renderStudents()}
    </div>
  )
}

export default App;
