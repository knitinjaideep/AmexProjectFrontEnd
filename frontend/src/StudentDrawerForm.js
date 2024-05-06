import {Drawer, Input, Col, Select, Form, Row, Button} from 'antd';
import { updateStudent, addNewStudent } from './client';
import { successNotification, errorNotification } from './Notification';
import { useEffect } from 'react';

const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents, selectedStudent, setSelectedStudent}) {
    const onCLose = () => 
    {
        setShowDrawer(false);
        setSelectedStudent(null);
    }

    const onFinish = student => {
        console.log(JSON.stringify(student, null, 2))
        if (selectedStudent) {
            updateStudent(selectedStudent.studentId, student)
            .then(() => {
                onCLose();
                successNotification("Student successfully updated", `${student.name} was updated`);
                fetchStudents();
            })
            .catch(err => {
            errorNotification(`Error updating student ${student.name}`);
            console.log("The error is ", err);
            });
        }
        else {
        addNewStudent(student)
            .then(() => {
                onCLose();
                successNotification("Student successfully added", `${student.name} was added into the system`);
                fetchStudents();
            }).catch(err => {
                errorNotification(`Error adding student ${student.name}`)
                console.log("The error is ", err)
            })
        }
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    const [ form ] = Form.useForm(); 
    // Update the form fields when selectedStudent changes
    useEffect(() => {
        form.setFieldsValue({
        name: selectedStudent?.name,
        date_of_birth: selectedStudent?.date_of_birth,
        joining_date: selectedStudent?.joining_date,
        class_name: selectedStudent?.class_name
        });
    }, [selectedStudent, form]);


    return <Drawer
        title={selectedStudent ? "Edit Student": "Create new student"}
        width={720}
        onClose={onCLose}
        open={showDrawer}
        styles={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form form={form} 
              layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              requiredMark
              initialValues={selectedStudent ? {
                name: selectedStudent.name,
                date_of_birth: selectedStudent.date_of_birth,
                joining_date: selectedStudent.joining_date,
                class_name: selectedStudent.class_name
            } : null}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="date_of_birth"
                        label="Date of Birth"
                        rules={[{required: true, message: 'Please enter student date of birth'}]}
                    >
                        <Input placeholder="Please enter student date of birth" disabled={selectedStudent ? true : false} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="joining_date"
                        label="Joining Date"
                        rules={[{required: true, message: 'Please enter student joining date'}]}
                    >
                        <Input placeholder="Please enter student joining date" disabled={selectedStudent ? true : false} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="class_name"
                        label="Class Name"
                        rules={[{required: true, message: 'Please select the student\'s enrolled class'}]}
                    >
                        <Select placeholder="Please select a class">
                            <Option value="MATHEMATICS">MATHEMATICS</Option>
                            <Option value="SCIENCE">SCIENCE</Option>
                            <Option value="HISTORY">HISTORY</Option>
                            <Option value="GEOGRAPHY">GEOGRAPHY</Option>
                            <Option value="PHYSICAL_EDUCATION">PHYSICAL_EDUCATION</Option>
                            <Option value="COMPUTER_SCIENCE">COMPUTER_SCIENCE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
                
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            {selectedStudent ? "Update" : "Add"} Student
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;