import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
    Button,
    FormControl,
    TextField,
    Dropdown,
    DropdownItem
} from '@ellucian/react-design-system/core';
import axios from 'axios';
const styles = () => ({
    form: {
        '& .contact-input-field': {
            marginTop: '1rem',
            marginBottom: '0.3rem',
            display: 'block'
        }
    },
    contactArea: {
        marginTop: '2rem'
    },
});
let customId='customId'
const EditExpenses = ()=>{
    let { id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const handleChange = (name, value) => {
        const newFormData = {...formData, ...{[name]: value}};
        setFormData(newFormData);
    }
    const onSubmit =  () => {
        axios
            .patch(`http://localhost:8000/api/expenses/edit/${formData._id}`, formData)
            .then((response) => {
                history.push('/');
                console.log('created Successfully'+response);
            })
            .catch((error) => console.error('creating Record:', error));
        };

        const expenseData =  () => {
            axios
                .get(`http://localhost:8000/api/expenses/${id}`, formData)
                .then((response) => {
                    console.log(response.data);
                    setFormData(response.data);
                })
                .catch((error) => console.error('creating Record:', error));
            };
           useEffect(() => {
            expenseData();
          }, []);
        return (
            <div>
                <form name='demo-contact-form'>
                    <FormControl id={`${customId}_Container`} component='fieldset'>
                       {/* <TextField name='_id' label='id' onChange={(event) => handleChange('_id', event.target.value)} required className='contact-input-field'  hidden /> */}
                        <TextField name='description' value={formData.description} label='Description' onChange={(event) => handleChange('description', event.target.value)} required className='contact-input-field'/>
                        <TextField name='amount' value={formData.amount} label='Amount' className='contact-input-field' onChange={(event) => handleChange('amount', event.target.value)} />
                        <Dropdown name='spentReceived'
                        label="Spent/Received" value={formData.spentReceived}
                        className='contact-input-field' onChange={(event) => handleChange('spentReceived', event.target.value)} >
                        {['Spent','Recieved'].map(option => {
                            return (
                                <DropdownItem
                                    key={option}
                                    label={option}
                                    value={option}
                                />
                            );
                        })}
                    </Dropdown>
                    <Dropdown name='category'
                        label="Category" value={formData.category}
                        className='contact-input-field' onChange={(event) => handleChange('category', event.target.value)} >
                        {['Received Income', 'Personal Spend', 'Academic Spend'].map(option => {
                            return (
                                <DropdownItem
                                    key={option}
                                    label={option}
                                    value={option}
                                />
                            );
                        })}
                    </Dropdown>
        
                        <Button type='Button' onClick={onSubmit}>Update Expenses</Button>
                    </FormControl>
                </form>
            </div>
        );
    };

    EditExpenses.propTypes = {
        classes: PropTypes.object.isRequired,
      };

export default withStyles(styles)(EditExpenses);

