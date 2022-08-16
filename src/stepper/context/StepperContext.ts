import * as React from 'react';
import { StepProps } from '../interfaces/StepProps';
import { StepChangeEvent } from '../interfaces/StepChangeEvent';
import { StepFocusEvent } from '../interfaces/StepFocusEvent';

/** @hidden */
export type StepperContextType = {
    animationDuration?: number | boolean;
    isVertical?: boolean;
    //isChunked?: boolean; //TAF
    item?: React.ComponentType<StepProps>;
    linear?: boolean;
    mode?: 'steps' | 'labels';
    numOfSteps?: number;
    value: number;
    successIcon?: string;
    errorIcon?: string;
    onChange?: (event: StepChangeEvent) => void;
    onFocus?: (event: StepFocusEvent) => void;
};

/**
 * @hidden
 */
const defaultContext: StepperContextType = {
    linear: false,
    mode: 'steps',
    value: 0
};

/** @hidden */
export const StepperContext: React.Context<StepperContextType> = React.createContext<StepperContextType>(defaultContext);
