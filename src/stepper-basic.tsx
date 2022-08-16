import * as React from 'react';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Stepper   } from './stepper/Stepper';
import {  Step } from './stepper/Step';
import { StepperChangeEvent } from './stepper/interfaces/StepperChangeEvent';
import '../src/App.scss';
import '@progress/kendo-theme-default/dist/all.css';

const customSteps = [
    { label: 'Success', detail: 'optional', isValid: true, status: 'success', tag:'Start' },
    { label: 'Error', detail: 'optional', isValid: false, status: 'error' },
    { label: 'Active', detail: 'optional', current: true, status: 'active' },
    { label: 'Default', detail: 'optional', status: 'default' },
    { label: 'Disabled', detail: 'optional', disabled:true, status: 'disabled' },   
    { label: 'Pending', detail: 'optional', status: 'pending' },   
];

const CustomStep = (props: any) => {    
return (
      <Step {...props}>
        {}
        <div className={'custom-step'} style={{borderTop: "3px solid "+((props.status === 'error')? '#e87a71': 
        (props.status === 'success')? '#73d85a' : (props.status === 'active')? '#495667': (props.status === 'pending')? 'gold':(props.status === 'default')? '#ccccd3':
        (props.status === 'disabled')? '#EBEBEE':'#EBEBEE')}}>
                <span className={'k-step-indicator'} />
                <div className='label-main'>
                  <div className="k-step-label">{props.label}</div>
                  {props.detail?
                    <div className="k-step-label-optional">{props.detail}</div>:
                    <div className="k-step-label-optional">&nbsp;</div>}
                </div>
          </div>
      </Step>
    );
};

const App = () => {
    const [value, setValue] = React.useState(1);
    const [orientation, setOrientation] = React.useState<any>("horizontal");
    const handleChange = (e: StepperChangeEvent) => {
        setValue(e.value);
    };
    const handleOrientationChange = (e : any) => {
      setOrientation(e.target.value);
    };
    return (
        <div className='stepper-main-container'>
          <h1>Kendo Stepper TAG</h1>
          <p className='change-orientation'>Change the orientation:</p>
          <DropDownList
            data={["horizontal", "vertical"]}
            value={orientation}
            onChange={handleOrientationChange}
          />
          <Stepper
            tagType= 'yes'
            value={value}
            onChange={handleChange}
            items={customSteps}
            orientation={orientation}
            item={CustomStep}
            successIcon="k-icon k-i-check-circle"
            errorIcon="k-icon k-i-close-circle"
          />
        </div>
    );
};
export default App;