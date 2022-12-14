import { StepperHandle } from '../interfaces/StepperHandle';
import { BaseEvent } from '@progress/kendo-react-common';

/**
 * The arguments for the `onChange` Stepper event.
 */
export interface StepperChangeEvent extends BaseEvent<StepperHandle> {
    /**
     * The index of the selected Step.
     */
    value: number;
}
