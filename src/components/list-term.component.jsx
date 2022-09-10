import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Badge } from 'reactstrap';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const ListBar = (props) => {

    return (
        <tr>
            <td>{props.term.term}</td>
            <td>{props.term.definition}</td>
            <td>
                <Link to={"/edit/" + props.term._id}><AiOutlineEdit /></Link>
                <Link to={"/delete/"+props.term._id}><AiOutlineDelete /></Link>
            </td>
        </tr>
    );
}

const ListTerm = () => {
    const [listData, setListData] = useState({ lists: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:4000/all_term/'
            );
            setListData({ lists: result.data });
        };
        fetchData();
    }, []);

    return (
        <div>
            <h3>List Term</h3>
            <Table striped style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Term</th>
                        <th>Definition</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listData.lists.map((current, i) => (
                        <ListBar term={current} key={i} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListTerm;