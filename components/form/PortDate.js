import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import { FormGroup, Label, Button } from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";

class PortDate extends Component {

    constructor(props){
        super(props);

        const dateValue = props.initialDate ? new Date(props.initialDate) : new Date();

        this.state = {
            dateValue: dateValue,
            isHidden: false
        }
    }

    setFieldValueAndTouched(date, touched){
        const { setFieldValue, setFieldTouched } = this.props.form;
        const { name } = this.props.field;

        setFieldValue(name, date, true);
        setFieldTouched(name, touched, true);
    }

    handleChange = date => {

        this.setState({ dateValue: date });
        this.setFieldValueAndTouched(date, true);

    };

    toggleDate(date){

        this.setState({ isHidden : !this.state.isHidden });
        this.setFieldValueAndTouched(date, true);
        
    }

    render() {

        const { label, form: { touched, errors }, field, canBeDisabled } = this.props;
        const { isHidden, dateValue } = this.state;

        return (
            <FormGroup>
                <Label>{label}</Label>
                <div className="input-group">
                    {
                        !isHidden &&
                        <DatePicker
                            selected={this.state.dateValue}
                            onChange={this.handleChange}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            maxDate={new Date()}
                            dropdownMode="select"
                        />
                    }
                    { canBeDisabled && !isHidden && <Button onClick={() => this.toggleDate(null)}> Still Working Here...</Button>}
                    { canBeDisabled && isHidden && 
                        <Fragment>
                            <span> Still Working Here</span>
                            <Button onClick={() => this.toggleDate(dateValue)}> Set End Date</Button>
                        </Fragment>
                    }
                    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
                </div>
            </FormGroup>
        );
    }
}

export default PortDate;

// import React, { Component } from "react";
// import DatePicker from "react-datepicker";
// import moment from "moment";

// import "react-datepicker/dist/react-datepicker.css";

// class PortDate extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             dateValue: moment()
//         }
        
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(date) {
//         const selected = moment(date).toDate()
//         this.setState({
//             dateValue: selected
//         });
//     };

//     render() {
//         return (
//             <DatePicker
//                 selected={this.state.dateValue}
//                 onChange={this.handleChange}
//             />
//         );
//     }
// }

// export default PortDate;