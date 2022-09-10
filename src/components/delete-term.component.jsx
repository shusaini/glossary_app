import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { AiOutlineRead, AiOutlineBook, AiOutlineInfoCircle, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

const DeleteTerm = (props) => {

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

    const onDeleteTermData = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/all_term/delete/${params.id}`, data)
        .then(res => {
            alert(res.data)
            console.log(res.data)
            window.location = '/'
        });
    }

    return (
        <div style={{ marginTop: 10 }}>
            <h3><AiOutlineBook /> Delete Term</h3>
            <Form onSubmit={onDeleteTermData}>
                <FormGroup row>
                    <Col>
                        <Label><AiOutlineRead /> Term </Label>
                        <Input
                            readOnly
                            type="text"
                            name="term"
                            className="form-control"
                            value={data.term} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Label><AiOutlineInfoCircle /> Definition </Label>
                        <Input
                            readOnly
                            type="text"
                            name="definition"
                            className="form-control"
                            value={data.definition} />
                    </Col>
                </FormGroup>
                
                <Button color="danger"><AiOutlineDelete /> Delete Term</Button>
            </Form>
        </div>
    );
}

export default DeleteTerm;