import './App.css';
import { useState, useEffect } from 'react';
import { getAllStudents } from './client';
import { Table, Empty, Button } from "antd"; 
import StudentDrawerForm from './StudentDrawerForm';
function App() {
  const [students, setStudents] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const columns = [
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
    >
    </StudentDrawerForm>
    <Table 
      dataSource={students}
      columns={columns}
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
    <div 
      style={{ margin:'0 auto', maxWidth: '800px', marginTop: '100px', padding: 24, minHeight: 360 }}
    >
      {renderStudents()}
    </div>
  )
}

export default App;
