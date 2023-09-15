/* eslint-disable no-mixed-spaces-and-tabs */
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
	   const errorInitialValue = {
        amount : '',
        description : ''
    }
    const [errorObj, setErrorObj]= useState(errorInitialValue)
   
    const handleChange = (name, value) => {
        const newFormData = {...formData, ...{[name]: value}};
        setFormData(newFormData);
    }
	
	    const validate  = () => {
        let err = {...errorInitialValue};
        const result = Object.keys(errorInitialValue).map((eachProperty) => {
            if(['', null , undefined].includes(formData?.[eachProperty])){
                err[eachProperty] = `${eachProperty} field is required`;
                return false
            }
            return true
        })
        setErrorObj(err);
        return result.every((eachResult) => Boolean(eachResult))
    }
	
    const onSubmit =  () => {
	    const isValid = validate();
        console.log(isValid);
        if(isValid) {
        axios
            .patch(`http://localhost:8000/api/expenses/edit/${formData._id}`, formData)
            .then((response) => {
                history.push('/');
                console.log('created Successfully'+response);
            })
            .catch((error) => console.error('creating Record:', error));
		}
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
                       
                       <TextField style={{marginBottom:'1rem'}} name='description' error={errorObj.description !== ''} helperText={errorObj.description} value={formData.description} label='Description' onChange={(event) => handleChange('description', event.target.value)} required className='contact-input-field'/>

                        <div>
                        <TextField style={{marginBottom:'1rem'}} name='amount' required error={errorObj.amount !== ''} helperText={errorObj.amount} value={formData.amount} label='Amount' className='contact-input-field' onChange={(event) => handleChange('amount', event.target.value)} />
                        </div>

                        <div>
                        <Dropdown style={{marginBottom:'1rem'}} name='spentReceived'
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
                    </div>

                    <div>
                    <Dropdown style={{marginBottom:'1rem'}} name='category'
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
                    </div>

                    <div>
                        <Button style={{marginBottom:'2rem'}} type='Button' onClick={onSubmit}>Update Expenses</Button>
                        </div>
                    </FormControl>
                </form>
            </div>
        );
    };
    EditExpenses.propTypes = {
        classes: PropTypes.object.isRequired,
      };
export default withStyles(styles)(EditExpenses);