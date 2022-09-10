import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { AiOutlineRead, AiOutlineBook, AiOutlineInfoCircle, AiOutlineForward } from 'react-icons/ai';
import axios from 'axios';

const EditTerm = (props) => {

    const params = useParams();

    const [data, setData] = useState({
        term: "",
        definition: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:4000/all_term/${params.id}`
            );
            setData({ ...result.data });
        };
        fetchData();
    }, []);

    const onChangeTermData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }

    const onSubmitTermData = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/all_term/update/${params.id}`, data)
        .then(res => {
            alert(res.data)
            console.log(res.data)
        });
        props.history.push('/');
    }

    return (
        <div style={{ marginTop: 10 }}>
            <h3><AiOutlineBook /> Edit Term</h3>
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
                
                
                
                <Button color="primary"><AiOutlineForward /> Update Data</Button>
            </Form>
        </div>
    );
}

export default EditTerm;