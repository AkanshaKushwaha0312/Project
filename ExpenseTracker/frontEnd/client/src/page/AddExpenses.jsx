/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react';
 //import { format} from 'date-fns';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { DatePicker } from '@ellucian/react-design-system/core';
import { useHistory } from 'react-router-dom';
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
            marginRight: '2rem' ,
            display: 'block'
        }
    },
    contactArea: {
        marginTop: '2rem'
    },
});
let customId='customId';
const AddExpenses = ()=>{
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const errorInitialValue = {
        amount : '',
        description : '',
        expenditureDate : ''
    }
    const [errorObj, setErrorObj]= useState(errorInitialValue)
    console.log(formData);
    const handleChange = (name, value) => {
        console.log('value line 32 ',value);
      //  if (name === 'expenditureDate') {
         //   value = new Date(value).toISOString().split('T')[0];
         //   const formattedDate = originalDate
        // const date = new Date();
         //let day = date.getDate();
         //let month = date.getMonth() + 1;
         //let year = date.getFullYear();
         // This arrangement can be altered based on how we want the date's format to appear.
          //value = `${day}-${month}-${year}`;
         //console.log(value); // "17-6-2022"
//          }
          console.log('value - line 46', value);
        const newFormData = {...formData, [name]: value};
        console.log('newFormDate line 48',newFormData);
        setFormData(newFormData);
    }
    const handleDateChange = (field,value) => {
        setFormData({
            ...formData,
            [field]: value
        });
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
            .post('http://localhost:8000/api/expenses/add', formData)
            .then((response) => {
                history.push('/');
                console.log('created Successfully'+response);
            })
            .catch((error) => console.error('creating Record:', error));
        }
        };
        return (
            <div>
                <form name='demo-contact-form'>
                    <FormControl id={`${customId}_Container`} component='fieldset'>
                        <TextField style={{marginBottom:'1rem'}} name='description' error={errorObj.description !== ''} helperText={errorObj.description} label='Description' required onChange={(event) => handleChange('description', event.target.value)} className='contact-input-field'/>
                        <div>
                        <TextField style={{marginBottom:'1rem'}} name='amount' label='Amount' error={errorObj.amount !== ''} helperText={errorObj.amount} required className='contact-input-field' onChange={(event) => handleChange('amount', event.target.value)} />
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
               <DatePicker style={{marginBottom:'2rem'}}
                name='expenditureDate'
				error={errorObj.expenditureDate !== ''}
				helperText={errorObj.expenditureDate}
                label="Date"
                required
                placeholder="Select a date"
                value={formData.expenditureDate}
                onDateChange={(date) => handleDateChange('expenditureDate', date)}/>
                </div>
                <div>

                        <Button style={{marginTop: '2rem'}} type='Button' onClick={onSubmit}>Add Expenses</Button>
                    </div>
                    </FormControl>
                </form>
            </div>
        );
    };
    AddExpenses.propTypes = {
        classes: PropTypes.object.isRequired,
      };
	  
 export default withStyles(styles)(AddExpenses);