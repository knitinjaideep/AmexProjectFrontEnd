import {Drawer, Input, Col, Select, Form, Row, Button} from 'antd';
import { addNewStudent } from './client';
const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer}) {
    const onCLose = () => setShowDrawer(false);

    const onFinish = student => {
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student)
            .then(() => {
                console.log("Student added")
            }).catch(err => {
                console.log("The error is ", err)
            })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
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
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              requiredMark>
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
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="joining_date"
                        label="Joining Date"
                        rules={[{required: true, message: 'Please enter student joining'}]}
                    >
                        <Input placeholder="Please enter student email"/>
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
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;