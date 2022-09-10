import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { AiOutlineRead, AiOutlineBook, AiOutlineInfoCircle, AiOutlineForward } from 'react-icons/ai';
import axios from 'axios';

const CreateTerm = (props) => {

    const [data, setData] = useState({
        term: "",
        definition: ""
    });

    const onChangeTermData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitTermData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/all_term/add', data)
        .then(res => {
            alert(res.data.list)
            console.log(res.data)
            window.location = '/'
        });
        
        setData({
            term: "",
            definition: ""
        });
    }

    return (
        <div style={{ marginTop: 10 }}>
            <h3><AiOutlineBook /> Create Term</h3>
            <Form onSubmit={onSubmitTermData}>
                <FormGroup row>
                    <Col>
                        <Label><AiOutlineRead /> Term </Label>
                        <Input
                            type="text"
                            name="term"
                            className="form-control"
                            value={data.term}
                            onChange={onChangeTermData} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Label><AiOutlineInfoCircle /> Definition </Label>
                        <Input
                            type="text"
                            name="definition"
                            className="form-control"
                            value={data.definition}
                            onChange={onChangeTermData} />
                    </Col>
                </FormGroup>
                
                <Button color="primary"><AiOutlineForward /> Submit</Button>
            </Form>
        </div>
    );
}

export default CreateTerm;